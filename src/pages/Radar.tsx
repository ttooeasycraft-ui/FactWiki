import { useState, useEffect, useRef } from "react";

const LS_KEY = "factwiki_ezbot_url";

type BotState = {
  online: boolean;
  name?: string;
  health?: number;
  food?: number;
  posStr?: string;
  mission?: string;
  missionDesc?: string;
  aiProvider?: string;
  stats?: Record<string, number>;
  inventory?: { name: string; count: number }[];
  reason?: string;
};

export default function Radar() {
  const [apiUrl, setApiUrl] = useState(() =>
    localStorage.getItem(LS_KEY) || ""
  );
  const [urlDraft, setUrlDraft] = useState(apiUrl);
  const [botState, setBotState] = useState<BotState | null>(null);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [showConfig, setShowConfig] = useState(!apiUrl);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function saveUrl() {
    const u = urlDraft.trim().replace(/\/$/, "");
    setApiUrl(u);
    localStorage.setItem(LS_KEY, u);
    setShowConfig(false);
  }

  // Fetch bot status
  useEffect(() => {
    if (!apiUrl) return;
    async function fetchStatus() {
      try {
        const r = await fetch(`${apiUrl}/api/bot/status`, { cache: "no-store" });
        const d = await r.json();
        setBotState(d);
      } catch {
        setBotState({ online: false, reason: "Erro de conexão com a API" });
      }
    }
    fetchStatus();
    intervalRef.current = setInterval(() => {
      fetchStatus();
      setLastRefresh(Date.now());
    }, 4000);
    return () => clearInterval(intervalRef.current!);
  }, [apiUrl]);

  // Refresh map image every 3s
  useEffect(() => {
    const t = setInterval(() => setLastRefresh(Date.now()), 3000);
    return () => clearInterval(t);
  }, []);

  const online = botState?.online ?? false;
  const hp = botState?.health ?? 0;
  const food = botState?.food ?? 0;
  const accent = "var(--accent-color, #22C55E)";

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
            📡 Radar do Bot
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#555", margin: "0.25rem 0 0" }}>
            EzBot_IA — factionsmatrix.com — atualiza a cada 3s
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {apiUrl && (
            <div style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.35rem 0.75rem", borderRadius: "99px",
              background: online ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${online ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
              fontSize: "0.75rem", fontWeight: 700,
              color: online ? accent : "#ef4444",
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: online ? accent : "#ef4444",
                boxShadow: online ? `0 0 6px ${accent}` : "0 0 6px #ef4444",
              }} />
              {online ? `🟢 ${botState?.name || "FactWiki"} Online` : "🔴 Bot Offline"}
            </div>
          )}
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

      {/* Config box */}
      {showConfig && (
        <div style={{
          background: "#111", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "0.75rem", padding: "1.25rem", marginBottom: "1.5rem",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#aaa", marginBottom: "0.75rem", margin: "0 0 0.75rem" }}>
            Cole a URL base da API do EzBot_IA (ex: <code style={{ color: accent }}>https://seu-dominio.replit.app</code>)
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveUrl()}
              placeholder="https://xxxxx.replit.app"
              style={{
                flex: 1, background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.375rem", padding: "0.5rem 0.75rem",
                color: "#fff", fontSize: "0.8rem", outline: "none",
              }}
            />
            <button
              onClick={saveUrl}
              style={{
                background: accent, color: "#000", border: "none",
                borderRadius: "0.375rem", padding: "0.5rem 1rem",
                fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
              }}
            >
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
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
          <p style={{ color: "#555", fontSize: "0.9rem" }}>Configure a URL da API acima para ver o radar do bot.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "start" }}>

          {/* Mini-map */}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Mini-Mapa
            </div>
            <img
              src={`${apiUrl}/api/stream/preview?t=${lastRefresh}`}
              alt="Mini-mapa do bot"
              width={320}
              style={{ borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.06)", display: "block" }}
            />
            <div style={{ fontSize: "0.65rem", color: "#444", marginTop: "0.4rem", textAlign: "center" }}>
              Atualiza a cada 3s •{" "}
              <a href={`${apiUrl}/api/stream/preview`} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>
                Ver imagem
              </a>
            </div>
          </div>

          {/* Stats column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* HP & Food */}
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "1rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Vitais</div>
              {/* HP */}
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
                  <span style={{ color: "#aaa" }}>❤️ HP</span>
                  <span style={{ fontWeight: 700, color: hp > 14 ? "#4CAF50" : hp > 8 ? "#FF9800" : "#F44336" }}>{hp}/20</span>
                </div>
                <div style={{ height: 8, background: "#1a1a1a", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, width: `${(hp / 20) * 100}%`, background: hp > 14 ? "#4CAF50" : hp > 8 ? "#FF9800" : "#F44336", transition: "width 0.5s" }} />
                </div>
              </div>
              {/* Food */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
                  <span style={{ color: "#aaa" }}>🍖 Fome</span>
                  <span style={{ fontWeight: 700, color: "#FF9800" }}>{food}/20</span>
                </div>
                <div style={{ height: 8, background: "#1a1a1a", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, width: `${(food / 20) * 100}%`, background: "#FF9800", transition: "width 0.5s" }} />
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "1rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Status</div>
              {[
                ["📍 Posição", botState?.posStr || "—"],
                ["🎯 Missão", botState?.missionDesc || "—"],
                ["🤖 IA Ativa", botState?.aiProvider || "—"],
                ["⚔️ Mobs Mortos", String(botState?.stats?.mobsKilled ?? 0)],
                ["💎 Diamantes", String(botState?.stats?.diamondCollected ?? 0)],
                ["💀 Mortes", String(botState?.stats?.deaths ?? 0)],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.78rem" }}>
                  <span style={{ color: "#666" }}>{k}</span>
                  <span style={{ fontWeight: 600, color: "#ccc", textAlign: "right", maxWidth: "55%" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Inventory */}
            {(botState?.inventory?.length ?? 0) > 0 && (
              <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "1rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>🎒 Inventário</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: "0.5rem" }}>
                  {botState!.inventory!.slice(0, 18).map((item) => (
                    <div key={item.name} style={{
                      background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "0.375rem", padding: "0.5rem", textAlign: "center",
                    }}>
                      <div style={{ fontSize: "1rem", fontWeight: 800, color: accent }}>{item.count}</div>
                      <div style={{ fontSize: "0.6rem", color: "#555", marginTop: "0.2rem", wordBreak: "break-word", lineHeight: 1.2 }}>
                        {item.name.replace(/_/g, " ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
