import { BookOpen, Clock } from "lucide-react";

export default function Rules() {
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
          <BookOpen size={18} style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>
            Regras
          </h1>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
            Regras oficiais do Factions Matrix
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
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📋</div>
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
          Seção de Regras em preparação
        </h2>
        <p style={{ color: "#888", fontSize: "0.875rem", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
          Estamos compilando as regras oficiais do servidor Factions Matrix para
          que você tenha tudo em um lugar só. Aqui você vai encontrar as regras de
          conduta, regras de PvP, regras de facções e as penalidades por violações.
          É fundamental ler e seguir as regras para garantir uma boa experiência no servidor.
        </p>
      </div>

      <div
        style={{
          padding: "1rem 1.25rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(250, 173, 20, 0.25)",
          background: "rgba(250, 173, 20, 0.05)",
          fontSize: "0.825rem",
          color: "#ccc",
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: "#faad14" }}>⚠️ Por enquanto</strong>, consulte
        as regras diretamente no Discord oficial do servidor:{" "}
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
