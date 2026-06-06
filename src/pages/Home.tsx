import { useState } from "react";
import { Link } from "wouter";
import {
  Lightbulb,
  Copy,
  Check,
  ShoppingCart,
  MessageCircle,
  Zap,
  Swords,
  Box,
} from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copiado!" : "Clique para copiar"}
    </button>
  );
}

const featuredCards = [
  {
    path: "/xp-mineracao",
    icon: Zap,
    title: "Mineração",
    desc: "Tabela de XP por minério e dicas para farmar eficientemente.",
  },
  {
    path: "/faccoes",
    icon: Swords,
    title: "Facções",
    desc: "Tudo sobre criar, gerenciar e dominar facções no servidor.",
  },
  {
    path: "/spawners",
    icon: Box,
    title: "Spawners",
    desc: "Como usar spawners para acumular recursos e vantagens.",
  },
];

export default function Home() {
  return (
    <div className="fade-in-up">
      <div
        style={{
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: "0.75rem",
          padding: "2rem",
          marginBottom: "1.5rem",
          background: "linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(0,0,0,0) 60%)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          BEM-VINDO AO{" "}
          <span style={{ color: "#22C55E" }}>FACTWIKI</span>
        </h1>
        <p style={{ color: "#aaaaaa", fontSize: "0.95rem", maxWidth: 520, lineHeight: 1.6 }}>
          Guia não oficial do Factions Matrix feito pela comunidade. Aprenda
          tudo sobre facções, XP e domine o servidor.
        </p>
      </div>

      <div className="tip-box" style={{ marginBottom: "1.5rem" }}>
        <Lightbulb size={18} style={{ color: "#22C55E", flexShrink: 0, marginTop: 1 }} />
        <div>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#22C55E",
              display: "block",
              marginBottom: "0.2rem",
            }}
          >
            DICA DO DIA
          </span>
          <span style={{ color: "#ddd", fontSize: "0.875rem" }}>
            Mine Ferro e Ouro primeiro para acumular XP rapidamente. O Ouro
            rende <strong style={{ color: "#22C55E" }}>8.0 XP</strong> por
            bloco — o maior valor entre os minérios confirmados!
          </span>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#666",
            marginBottom: "0.75rem",
          }}
        >
          CONECTAR AO SERVIDOR
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <div className="ip-box">
            <div
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#22C55E",
                marginBottom: "0.3rem",
              }}
            >
              JAVA / PIRATA
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#22C55E",
                marginBottom: "0.4rem",
                fontFamily: "monospace",
              }}
            >
              factionsmatrix.com
            </div>
            <CopyButton text="factionsmatrix.com" />
          </div>
          <div className="ip-box">
            <div
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#22C55E",
                marginBottom: "0.3rem",
              }}
            >
              BEDROCK
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#22C55E",
                marginBottom: "0.4rem",
                fontFamily: "monospace",
              }}
            >
              factionsmatrix.com
            </div>
            <CopyButton text="factionsmatrix.com" />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "1.75rem" }}>
        <h2
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#666",
            marginBottom: "0.75rem",
          }}
        >
          LINKS RÁPIDOS
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <a
            href="https://factionsmatrix.com/loja"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(34,197,94,0.2)",
              background: "rgba(34,197,94,0.05)",
              color: "#ddd",
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.5)";
              (e.currentTarget as HTMLElement).style.color = "#22C55E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.2)";
              (e.currentTarget as HTMLElement).style.color = "#ddd";
            }}
          >
            <ShoppingCart size={15} style={{ color: "#22C55E" }} />
            <span>
              <strong style={{ display: "block", fontSize: "0.8rem" }}>Loja</strong>
              <span style={{ fontSize: "0.7rem", color: "#666" }}>factionsmatrix.com</span>
            </span>
          </a>
          <a
            href="https://discord.gg/factions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(34,197,94,0.2)",
              background: "rgba(34,197,94,0.05)",
              color: "#ddd",
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.5)";
              (e.currentTarget as HTMLElement).style.color = "#22C55E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.2)";
              (e.currentTarget as HTMLElement).style.color = "#ddd";
            }}
          >
            <MessageCircle size={15} style={{ color: "#22C55E" }} />
            <span>
              <strong style={{ display: "block", fontSize: "0.8rem" }}>Discord Oficial</strong>
              <span style={{ fontSize: "0.7rem", color: "#666" }}>discord.gg/factions</span>
            </span>
          </a>
        </div>
      </div>

      <div>
        <h2
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#666",
            marginBottom: "0.75rem",
          }}
        >
          O QUE É O FACTIONS MATRIX?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
          {featuredCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.path}
                href={card.path}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="green-card"
                  style={{ padding: "1.25rem", cursor: "pointer" }}
                >
                  <Icon size={20} style={{ color: "#22C55E", marginBottom: "0.5rem" }} strokeWidth={1.8} />
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#fff", marginBottom: "0.25rem" }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.5 }}>
                    {card.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: "1.75rem",
          padding: "0.875rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(250, 173, 20, 0.3)",
          background: "rgba(250, 173, 20, 0.05)",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#faad14", marginBottom: "0.2rem" }}>
            Respeite as Regras do Servidor
          </div>
          <div style={{ fontSize: "0.8rem", color: "#888" }}>
            Este site segue todas as diretrizes do Factions Matrix.
          </div>
        </div>
      </div>
    </div>
  );
}
