import { Zap, AlertTriangle } from "lucide-react";

const ores = [
  { name: "Carvão", img: "/ore-coal.png", xp: "4.6 XP", bar: 0.575 },
  { name: "Redstone", img: "/ore-redstone.png", xp: "5.7 XP", bar: 0.7125 },
  { name: "Lápis-Lazúli", img: "/ore-lapis.png", xp: "5.7 XP", bar: 0.7125 },
  { name: "Ferro", img: "/ore-iron.png", xp: "6.9 XP", bar: 0.8625 },
  { name: "Ouro", img: "/ore-gold.png", xp: "8.0 XP", bar: 1 },
];

export default function XPMining() {
  return (
    <div className="fade-in-up">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: "rgba(34,197,94,0.12)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Zap size={18} style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>
            XP e Mineração
          </h1>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
            Tabela de XP confirmados pelo servidor
          </p>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "1.25rem 0" }} />

      <p style={{ color: "#aaa", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Ao minerar blocos no servidor Factions Matrix você ganha XP que contribui
        para o seu progresso. Abaixo estão os valores confirmados de XP por minério.
        Mine estrategicamente — priorize minérios de maior XP para subir de nível
        mais rápido.
      </p>

      <div
        style={{
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: "0.625rem",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            padding: "0.625rem 1rem",
            background: "rgba(34,197,94,0.08)",
            borderBottom: "1px solid rgba(34,197,94,0.15)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#22C55E",
            gap: "1rem",
          }}
        >
          <span>Minério</span>
          <span>XP por Bloco</span>
          <span style={{ minWidth: 100 }}>Relativo</span>
        </div>

        {ores.map((ore, i) => (
          <div
            key={ore.name}
            className="table-row-alt"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              padding: "0.75rem 1rem",
              gap: "1rem",
              alignItems: "center",
              borderBottom: i < ores.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <img
                src={ore.img}
                alt={ore.name}
                style={{ width: 28, height: 28, imageRendering: "pixelated", flexShrink: 0 }}
              />
              <span style={{ color: "#e5e5e5", fontSize: "0.875rem", fontWeight: 500 }}>
                {ore.name}
              </span>
            </div>
            <div
              style={{
                fontWeight: 700,
                color: "#22C55E",
                fontSize: "0.9rem",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
              }}
            >
              {ore.xp}
            </div>
            <div style={{ minWidth: 100 }}>
              <div
                style={{
                  height: 6,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 99,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${ore.bar * 100}%`,
                    background: "#22C55E",
                    borderRadius: 99,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "0.875rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(250, 173, 20, 0.25)",
          background: "rgba(250, 173, 20, 0.05)",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <AlertTriangle size={16} style={{ color: "#faad14", flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: "0.825rem", color: "#ccc", lineHeight: 1.6 }}>
          <strong style={{ color: "#faad14" }}>Atenção:</strong> Outros valores de
          XP (spawners, plantação, PvP) serão adicionados em breve conforme as
          informações forem divulgadas pelo servidor.
        </div>
      </div>

      <div
        style={{
          border: "1px solid rgba(34,197,94,0.15)",
          borderRadius: "0.5rem",
          padding: "1rem 1.25rem",
          background: "rgba(34,197,94,0.03)",
        }}
      >
        <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          💡 Dicas de Mineração
        </h3>
        <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#aaa", fontSize: "0.825rem", lineHeight: 1.8 }}>
          <li>Priorize Ouro (<strong style={{ color: "#22C55E" }}>8.0 XP</strong>) para maximizar o ganho por bloco</li>
          <li>Ferro (<strong style={{ color: "#22C55E" }}>6.9 XP</strong>) é mais fácil de encontrar e rende bem</li>
          <li>Redstone e Lápis são equivalentes (<strong style={{ color: "#22C55E" }}>5.7 XP</strong>) cada</li>
          <li>Use ferramentas com Fortune para maximizar drops</li>
          <li>Mine em Y = -58 para encontrar os melhores minérios no Java Edition</li>
        </ul>
      </div>
    </div>
  );
}
