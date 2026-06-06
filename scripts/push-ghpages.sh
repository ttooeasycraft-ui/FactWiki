#!/usr/bin/env bash
set -euo pipefail

OWNER="ttooeasycraft-ui"
REPO="FactWiki"
BRANCH="gh-pages"
DIST_DIR="artifacts/factwiki/dist"
API="https://api.github.com"
HDR_AUTH="Authorization: Bearer $GITHUB_TOKEN"
HDR_ACCEPT="Accept: application/vnd.github+json"
HDR_VER="X-GitHub-Api-Version: 2022-11-28"

echo "=== Getting branch SHA ==="
BRANCH_DATA=$(curl -s -H "$HDR_AUTH" -H "$HDR_ACCEPT" -H "$HDR_VER" \
  "$API/repos/$OWNER/$REPO/git/ref/heads/$BRANCH")
BASE_SHA=$(echo "$BRANCH_DATA" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).object.sha))")
echo "Base SHA: $BASE_SHA"

COMMIT_DATA=$(curl -s -H "$HDR_AUTH" -H "$HDR_ACCEPT" -H "$HDR_VER" \
  "$API/repos/$OWNER/$REPO/git/commits/$BASE_SHA")
BASE_TREE=$(echo "$COMMIT_DATA" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).tree.sha))")
echo "Base tree SHA: $BASE_TREE"

echo "=== Creating blobs and tree entries ==="
TREE_ENTRIES="[]"

create_blob() {
  local file_path="$1"
  local rel_path="$2"
  local mime="$3"

  if [ "$mime" = "binary" ]; then
    local b64
    b64=$(base64 -w 0 "$file_path")
    local payload
    payload=$(node -e "console.log(JSON.stringify({content:'$b64',encoding:'base64'}))")
    local blob_resp
    blob_resp=$(curl -s -X POST -H "$HDR_AUTH" -H "$HDR_ACCEPT" -H "$HDR_VER" \
      -H "Content-Type: application/json" \
      --data "$payload" \
      "$API/repos/$OWNER/$REPO/git/blobs")
  else
    local content
    content=$(cat "$file_path")
    local payload
    payload=$(node -e "
const fs = require('fs');
const c = fs.readFileSync('$file_path', 'utf8');
console.log(JSON.stringify({content: c, encoding: 'utf-8'}));
")
    local blob_resp
    blob_resp=$(curl -s -X POST -H "$HDR_AUTH" -H "$HDR_ACCEPT" -H "$HDR_VER" \
      -H "Content-Type: application/json" \
      --data "$payload" \
      "$API/repos/$OWNER/$REPO/git/blobs")
  fi

  local blob_sha
  blob_sha=$(echo "$blob_resp" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).sha))")
  echo "$rel_path:$blob_sha"
}

# Build tree entries as JSON using node
node << 'NODESCRIPT'
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const OWNER = 'ttooeasycraft-ui';
const REPO = 'FactWiki';
const TOKEN = process.env.GITHUB_TOKEN;
const DIST = 'artifacts/factwiki/dist';

function apiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'FactWiki-Deploy',
        ...(data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', d => raw += d);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch { reject(new Error('Parse error: ' + raw.slice(0,200))); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function collectFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const relPath = base ? `${base}/${e.name}` : e.name;
    const fullPath = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...collectFiles(fullPath, relPath));
    else files.push({ relPath, fullPath });
  }
  return files;
}

async function createBlob(fullPath, relPath) {
  const isBinary = /\.(png|jpg|jpeg|gif|webp|ico|svg|woff|woff2|ttf|eot)$/i.test(relPath);
  const body = isBinary
    ? { content: fs.readFileSync(fullPath).toString('base64'), encoding: 'base64' }
    : { content: fs.readFileSync(fullPath, 'utf8'), encoding: 'utf-8' };
  const res = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/blobs`, body);
  if (!res.sha) throw new Error(`Blob failed for ${relPath}: ${JSON.stringify(res)}`);
  console.error(`  blob: ${relPath} → ${res.sha.slice(0,8)}`);
  return res.sha;
}

async function main() {
  // Get branch
  const branch = await apiRequest('GET', `/repos/${OWNER}/${REPO}/git/ref/heads/gh-pages`);
  const baseSHA = branch.object.sha;
  console.error('Base SHA: ' + baseSHA);

  const commitInfo = await apiRequest('GET', `/repos/${OWNER}/${REPO}/git/commits/${baseSHA}`);
  const baseTree = commitInfo.tree.sha;
  console.error('Base tree: ' + baseTree);

  // Create blobs for all files
  const files = collectFiles(DIST);
  console.error(`Uploading ${files.length} files...`);
  const treeItems = [];
  for (const f of files) {
    const sha = await createBlob(f.fullPath, f.relPath);
    treeItems.push({ path: f.relPath, mode: '100644', type: 'blob', sha });
  }

  // Create tree (empty base so we replace everything)
  const treeRes = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/trees`, {
    tree: treeItems,
  });
  console.error('New tree: ' + treeRes.sha);

  // Create commit
  const commitRes = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message: 'deploy: settings panel, emoji ores, theme colors',
    tree: treeRes.sha,
    parents: [baseSHA],
  });
  console.error('New commit: ' + commitRes.sha);

  // Update ref
  const refRes = await apiRequest('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/gh-pages`, {
    sha: commitRes.sha,
    force: true,
  });
  console.error('Updated ref: ' + JSON.stringify(refRes.object));
  console.log('SUCCESS:' + commitRes.sha);
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
NODESCRIPT
