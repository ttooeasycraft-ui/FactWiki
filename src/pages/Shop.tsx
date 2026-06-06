import { ShoppingCart, Clock } from "lucide-react";

export default function Shop() {
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
          <ShoppingCart size={18} style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>
            Loja
          </h1>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
            Guia da loja do Factions Matrix
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
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛒</div>
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
          Guia da Loja em preparação
        </h2>
        <p style={{ color: "#888", fontSize: "0.875rem", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
          Em breve aqui você vai encontrar um guia completo sobre os itens
          disponíveis na loja do Factions Matrix: desde kits e ranks até spawners
          e boosters. Vamos detalhar o custo-benefício de cada compra para você
          tomar a melhor decisão para sua jornada no servidor.
        </p>
      </div>

      <a
        href="https://factionsmatrix.com/loja"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          background: "#22C55E",
          color: "#000",
          fontWeight: 700,
          fontSize: "0.875rem",
          textDecoration: "none",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        <ShoppingCart size={16} />
        Acessar Loja Oficial
      </a>
    </div>
  );
}
