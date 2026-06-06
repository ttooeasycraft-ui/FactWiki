import { useState } from "react";
import { LogIn, Copy, Check, Monitor, Smartphone } from "lucide-react";

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
      {copied ? "Copiado!" : "Copiar"}
    </button>
  );
}

const steps = [
  {
    num: "01",
    icon: "💻",
    title: "Abra o Minecraft",
    desc: "Certifique-se de ter o Minecraft Java ou Bedrock instalado. O servidor aceita ambas as versões.",
  },
  {
    num: "02",
    icon: "🌐",
    title: "Vá em Multijogador",
    desc: "Na tela principal, clique em Multijogador (Java) ou em Jogar → Servidores (Bedrock).",
  },
  {
    num: "03",
    icon: "➕",
    title: "Adicionar Servidor",
    desc: 'Clique em "Adicionar Servidor" e insira o endereço abaixo no campo de IP.',
  },
  {
    num: "04",
    icon: "🎮",
    title: "Conectar e Jogar",
    desc: "Salve e clique duas vezes no servidor para conectar. Bem-vindo ao Factions Matrix!",
  },
];

export default function HowToJoin() {
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
          <LogIn size={18} style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>
            Como Entrar
          </h1>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>
            Conecte-se ao servidor Factions Matrix
          </p>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "1.25rem 0" }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem", marginBottom: "1.75rem" }}>
        <div className="ip-box">
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
            <Monitor size={13} style={{ color: "#22C55E" }} />
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22C55E" }}>
              JAVA / PIRATA
            </span>
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#22C55E", marginBottom: "0.4rem", fontFamily: "monospace" }}>
            factionsmatrix.com
          </div>
          <CopyButton text="factionsmatrix.com" />
        </div>
        <div className="ip-box">
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
            <Smartphone size={13} style={{ color: "#22C55E" }} />
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22C55E" }}>
              BEDROCK / MOBILE
            </span>
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#22C55E", marginBottom: "0.4rem", fontFamily: "monospace" }}>
            factionsmatrix.com
          </div>
          <CopyButton text="factionsmatrix.com" />
        </div>
      </div>

      <h2 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "1rem" }}>
        Passo a passo
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
        {steps.map((step, i) => (
          <div
            key={step.num}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              padding: "0.875rem 1rem",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "0.5rem",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 800,
                color: "#22C55E",
                flexShrink: 0,
              }}
            >
              {step.num}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                <span>{step.icon}</span>
                <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#e5e5e5" }}>
                  {step.title}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#888", lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "1rem 1.25rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(34,197,94,0.15)",
          background: "rgba(34,197,94,0.03)",
        }}
      >
        <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          🎮 Dica para jogadores Pirata
        </h3>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#888", lineHeight: 1.6 }}>
          O Factions Matrix aceita contas não oficiais (pirata). Não é necessário
          ter uma conta Premium da Mojang para jogar. Use o mesmo endereço IP e
          conecte normalmente pelo Minecraft Java Edition.
        </p>
      </div>
    </div>
  );
}
