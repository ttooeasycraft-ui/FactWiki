import { useState, useEffect, useRef } from "react";

const LS_KEY = "factwiki_ezbot_url";
const ACTIVE_MS = 10 * 60 * 1000; // 10 min = ativo

interface Player {
  player: string;
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export default function Radar() {
  const [apiUrl, setApiUrl] = useState(() =>
    localStorage.getItem(LS_KEY) || ""
  );
  const [urlDraft, setUrlDraft] = useState(apiUrl);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showConfig, setShowConfig] = useState(!apiUrl);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [error, setError] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const accent = "var(--accent-color, #22C55E)";

  function saveUrl() {
    const u = urlDraft.trim().replace(/\/$/, "");
    setApiUrl(u);
    localStorage.setItem(LS_KEY, u);
    setShowConfig(false);
  }

  useEffect(() => {
    if (!apiUrl) return;
    async function fetchPlayers() {
      try {
        const r = await fetch(`${apiUrl}/api/radar/players`, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        setPlayers(d.players ?? []);
        setLastUpdate(Date.now());
        setError("");
      } catch (e: any) {
        setError("Erro ao buscar dados: " + e.message);
      }
    }
    fetchPlayers();
    intervalRef.current = setInterval(fetchPlayers, 4000);
    return () => clearInterval(intervalRef.current!);
  }, [apiUrl]);

  // Map dimensions
  const MAP_SIZE = 300;
  const WORLD_RANGE = 3000; // mostrar ±3000 blocos
  const scale = MAP_SIZE / (WORLD_RANGE * 2);

  function toCanvas(coord: number): number {
    return MAP_SIZE / 2 + coord * scale;
  }

  function timeAgo(ts: number): string {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return `${s}s atrás`;
    if (s < 3600) return `${Math.floor(s / 60)}min atrás`;
    return `${Math.floor(s / 3600)}h atrás`;
  }

  function dist(x: number, z: number): string {
    return Math.round(Math.sqrt(x * x + z * z)).toString();
  }

  function dotColor(ts: number): string {
    const age = Date.now() - ts;
    if (age < 60000) return "#22C55E"; // < 1 min: verde vivo
    if (age < 3 * 60000) return "#86EFAC"; // < 3 min: verde médio
    if (age < 7 * 60000) return "#FCD34D"; // < 7 min: amarelo
    return "#9CA3AF"; // > 7 min: cinza
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
            📡 Radar de Extração
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#555", margin: "0.25rem 0 0" }}>
            Jogadores marcados no mundo de extração • atualiza a cada 4s
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            padding: "0.35rem 0.75rem", borderRadius: "99px",
            background: players.length > 0 ? "rgba(34,197,94,0.1)" : "rgba(100,100,100,0.1)",
            border: `1px solid ${players.length > 0 ? "rgba(34,197,94,0.25)" : "rgba(100,100,100,0.15)"}`,
            fontSize: "0.75rem", fontWeight: 700,
            color: players.length > 0 ? accent : "#555",
          }}>
            {players.length > 0 ? `${players.length} jogador${players.length > 1 ? "es" : ""} detectado${players.length > 1 ? "s" : ""}` : "Nenhum jogador ativo"}
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.375rem", padding: "0.4rem 0.75rem",
              color: "#666", fontSize: "0.75rem", cursor: "pointer",
            }}
          >
            ⚙️ API
          </button>
        </div>
      </div>

      {/* Config */}
      {showConfig && (
        <div style={{
          background: "#111", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "0.75rem", padding: "1.25rem", marginBottom: "1.5rem",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#aaa", margin: "0 0 0.25rem" }}>
            URL base da API do EzBot_IA (ex: <code style={{ color: accent }}>https://xxxx.replit.app</code>)
          </p>
          <p style={{ fontSize: "0.7rem", color: "#555", margin: "0 0 0.75rem" }}>
            O bot precisa estar online e com o módulo Radar ativo para aparecer dados aqui.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text" value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveUrl()}
              placeholder="https://xxxxx.replit.app"
              style={{
                flex: 1, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.375rem", padding: "0.5rem 0.75rem",
                color: "#fff", fontSize: "0.8rem", outline: "none",
              }}
            />
            <button onClick={saveUrl} style={{
              background: accent, color: "#000", border: "none",
              borderRadius: "0.375rem", padding: "0.5rem 1rem",
              fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
            }}>
              Salvar
            </button>
          </div>
        </div>
      )}

      {!apiUrl ? (
        <div style={{
          background: "#111", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "0.75rem", padding: "3rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📡</div>
          <p style={{ color: "#555", fontSize: "0.9rem" }}>Configure a URL da API para ver as coordenadas ao vivo.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "start" }}>

          {/* ── Mapa 2D ──────────────────────────────────────────────────── */}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Mapa de Extração (±{WORLD_RANGE} blocos)
            </div>
            <div style={{ position: "relative", width: MAP_SIZE, height: MAP_SIZE, background: "#0d1a10", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "0.5rem", overflow: "hidden" }}>
              {/* Grid de referência */}
              {[-2000, -1000, 0, 1000, 2000].map((v) => (
                <div key={`hg${v}`} style={{ position: "absolute", left: 0, right: 0, top: toCanvas(v), height: 1, background: v === 0 ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.04)" }} />
              ))}
              {[-2000, -1000, 0, 1000, 2000].map((v) => (
                <div key={`vg${v}`} style={{ position: "absolute", top: 0, bottom: 0, left: toCanvas(v), width: 1, background: v === 0 ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.04)" }} />
              ))}
              {/* Rótulos dos eixos */}
              <span style={{ position: "absolute", top: 2, left: toCanvas(0) + 4, fontSize: 9, color: "rgba(34,197,94,0.5)" }}>+Z</span>
              <span style={{ position: "absolute", top: toCanvas(0) + 4, left: 2, fontSize: 9, color: "rgba(34,197,94,0.5)" }}>+X</span>
              {/* Centro (spawn) */}
              <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#fff", top: toCanvas(0) - 3, left: toCanvas(0) - 3, boxShadow: "0 0 6px #fff" }} />
              {/* Jogadores */}
              {players.map((p) => {
                const cx = toCanvas(p.x);
                const cz = toCanvas(p.z);
                const color = dotColor(p.timestamp);
                if (cx < 0 || cx > MAP_SIZE || cz < 0 || cz > MAP_SIZE) return null;
                return (
                  <div key={p.player} style={{ position: "absolute", top: cz - 5, left: cx - 5 }} title={`${p.player}: ${p.x},${p.y},${p.z}`}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}`, border: "1px solid rgba(0,0,0,0.4)" }} />
                    <span style={{ position: "absolute", left: 14, top: 0, fontSize: 8, color, whiteSpace: "nowrap", fontWeight: 700, textShadow: "0 0 4px #000" }}>
                      {p.player}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Legenda */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
              {[["#22C55E", "< 1 min"], ["#86EFAC", "< 3 min"], ["#FCD34D", "< 7 min"], ["#9CA3AF", "> 7 min"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                  <span style={{ fontSize: "0.6rem", color: "#555" }}>{l}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                <span style={{ fontSize: "0.6rem", color: "#555" }}>Spawn (0,0)</span>
              </div>
            </div>
          </div>

          {/* ── Tabela de jogadores ────────────────────────────────────────── */}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Avistamentos Recentes
            </div>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.5rem", padding: "0.75rem", fontSize: "0.75rem", color: "#ef4444", marginBottom: "0.75rem" }}>
                {error}
              </div>
            )}

            {players.length === 0 ? (
              <div style={{
                background: "#111", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "0.75rem", padding: "2rem", textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
                <p style={{ color: "#555", fontSize: "0.8rem", margin: 0 }}>
                  {apiUrl ? "Nenhum jogador detectado nos últimos 10 minutos." : "Configure a URL da API acima."}
                </p>
                <p style={{ color: "#444", fontSize: "0.7rem", marginTop: "0.4rem" }}>
                  O bot precisa estar no mundo de extração e ouvindo o chat.
                </p>
              </div>
            ) : (
              <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", overflow: "hidden" }}>
                {players.map((p, i) => {
                  const color = dotColor(p.timestamp);
                  const isActive = Date.now() - p.timestamp < ACTIVE_MS;
                  return (
                    <div key={p.player} style={{
                      display: "grid", gridTemplateColumns: "auto 1fr auto auto",
                      alignItems: "center", gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      borderBottom: i < players.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      opacity: isActive ? 1 : 0.5,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>{p.player}</div>
                        <div style={{ fontSize: "0.7rem", color: "#555", marginTop: "0.15rem" }}>
                          X: {p.x} &nbsp; Y: {p.y} &nbsp; Z: {p.z}
                        </div>
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#555", textAlign: "right" }}>
                        <div>{dist(p.x, p.z)} blocos</div>
                        <div>do spawn</div>
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "#444", textAlign: "right", minWidth: "5rem" }}>
                        {timeAgo(p.timestamp)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {lastUpdate > 0 && (
              <p style={{ fontSize: "0.65rem", color: "#333", marginTop: "0.5rem", textAlign: "right" }}>
                Última atualização: {new Date(lastUpdate).toLocaleTimeString("pt-BR")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
