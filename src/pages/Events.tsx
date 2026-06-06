import { Radio, Clock } from "lucide-react";

export default function Events() {
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
          <Radio size={18} style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>
            Eventos e Notícias
          </h1>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
            Acompanhe o que acontece no servidor
          </p>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "1.25rem 0" }} />

      <div
        style={{
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: "0.75rem",
          padding: "2rem",
          background: "linear-gradient(135deg, rgba(34,197,94,0.04) 0%, transparent 60%)",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📡</div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.75rem",
            borderRadius: 99,
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#22C55E",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          <Clock size={12} />
          Em Breve
        </div>
        <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#fff", marginBottom: "0.75rem" }}>
          Central de Eventos e Notícias
        </h2>
        <p style={{ color: "#888", fontSize: "0.875rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Esta seção vai ser a sua central de informações ao vivo sobre o Factions
          Matrix. Aqui você vai acompanhar eventos especiais como Raid Wars,
          torneios de PvP, atualizações do servidor, novidades de temporada e
          comunicados importantes da administração. Fique ligado!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0.75rem" }}>
        {[
          { icon: "🏆", title: "Torneios", desc: "Competições PvP com prêmios exclusivos" },
          { icon: "💥", title: "Raid Wars", desc: "Eventos especiais de invasão entre facções" },
          { icon: "📣", title: "Atualizações", desc: "Novidades e mudanças do servidor" },
          { icon: "🎁", title: "Drops Especiais", desc: "Itens raros e promoções por tempo limitado" },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "0.5rem",
              padding: "1rem",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{item.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#ccc", marginBottom: "0.25rem" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#666", lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "0.875rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(34,197,94,0.15)",
          background: "rgba(34,197,94,0.03)",
          fontSize: "0.825rem",
          color: "#888",
          lineHeight: 1.6,
        }}
      >
        🔔 Para não perder nenhum evento, entre no Discord oficial:{" "}
        <a
          href="https://discord.gg/factions"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#22C55E", textDecoration: "none" }}
        >
          discord.gg/factions
        </a>
      </div>
    </div>
  );
}
