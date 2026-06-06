import { Box, Clock, Wrench } from "lucide-react";

export default function Spawners() {
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
          <Box size={18} style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>
            Spawners
          </h1>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
            Sistema de spawners do Factions Matrix
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
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚙️</div>
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
          Em Desenvolvimento
        </div>
        <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#fff", marginBottom: "0.75rem" }}>
          Guia de Spawners em preparação
        </h2>
        <p style={{ color: "#888", fontSize: "0.875rem", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
          Estamos preparando um guia completo sobre o sistema de Spawners do
          Factions Matrix. Em breve você vai encontrar aqui como obter spawners,
          quais tipos existem, como configurar sua farm e quais mobs rendem mais
          recursos por hora.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0.75rem" }}>
        {[
          { icon: "🎯", title: "Tipos de Spawner", desc: "Quais mobs podem ser spawnados e suas diferenças" },
          { icon: "🏗️", title: "Como Construir", desc: "Layout ideal para farms de spawners eficientes" },
          { icon: "💰", title: "Lucro por Hora", desc: "Comparação de drops e ganhos por tipo de mob" },
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
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.825rem",
          color: "#666",
        }}
      >
        <Wrench size={15} style={{ flexShrink: 0 }} />
        Conteúdo sendo preparado pela equipe do FactWiki. Contribuições são bem-vindas!
      </div>
    </div>
  );
}
