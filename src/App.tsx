import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import Home from "@/pages/Home";
import XPMining from "@/pages/XPMining";
import Spawners from "@/pages/Spawners";
import Factions from "@/pages/Factions";
import Rules from "@/pages/Rules";
import Shop from "@/pages/Shop";
import HowToJoin from "@/pages/HowToJoin";
import {
  Home as HomeIcon,
  BookOpen,
  LogIn,
  ShoppingCart,
  Zap,
  Box,
  Swords,
  Settings,
  Menu,
  X,
  Heart,
} from "lucide-react";

const navItems = [
  {
    section: "CONTEÚDO",
    items: [
      { label: "Início", path: "/", icon: HomeIcon },
      { label: "Regras", path: "/regras", icon: BookOpen },
      { label: "Como Entrar", path: "/como-entrar", icon: LogIn },
      { label: "Loja", path: "/loja", icon: ShoppingCart },
    ],
  },
  {
    section: "SISTEMAS",
    items: [
      { label: "Mineração", path: "/xp-mineracao", icon: Zap },
      { label: "Spawners", path: "/spawners", icon: Box },
      { label: "Facções", path: "/faccoes", icon: Swords },
    ],
  },
];

function SupportPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#161616",
          border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: "0.75rem",
          padding: "1.5rem",
          width: "100%",
          maxWidth: 320,
          position: "relative",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "none",
            border: "none",
            color: "#555",
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(232,67,147,0.12)",
              border: "1px solid rgba(232,67,147,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Heart size={15} style={{ color: "#e84393" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>
              Gostou do FactWiki?
            </div>
            <div style={{ fontSize: "0.72rem", color: "#666" }}>
              Obrigado por usar nosso guia!
            </div>
          </div>
        </div>

        <p style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.65, margin: "0 0 1rem" }}>
          O FactWiki é feito pela comunidade, com carinho, para ajudar todo mundo
          a dominar o Factions Matrix. Se este guia te ajudou, compartilha com
          seus aliados no servidor! 🏰
        </p>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "0.875rem",
            fontSize: "0.78rem",
            color: "#888",
          }}
        >
          Sugestões? Fale com a gente no Discord:
          <a
            href="https://discord.gg/factions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "0.5rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.4rem",
              background: "rgba(34,197,94,0.07)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22C55E",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.14)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.07)")}
          >
            💬 discord.gg/factions
          </a>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const [location] = useLocation();
  const [showSupport, setShowSupport] = useState(false);

  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "#0f0f0f",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 0.75rem 0.75rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#22C55E",
              borderRadius: "0.375rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "0.75rem",
              color: "#000",
              letterSpacing: "-0.02em",
              flexShrink: 0,
            }}
          >
            FM
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: "0.6rem", color: "#555", fontWeight: 600, letterSpacing: "0.05em" }}>
              FW
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.04em",
              }}
            >
              FACTWIKI
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <button
            style={{ background: "none", border: "none", color: "#555", cursor: "pointer", padding: "0.25rem", borderRadius: "0.25rem" }}
            title="Configurações"
          >
            <Settings size={15} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", color: "#555", cursor: "pointer", padding: "0.25rem", borderRadius: "0.25rem" }}
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <nav style={{ flex: 1, padding: "0.5rem 0.5rem 1rem" }}>
        {navItems.map((group) => (
          <div key={group.section}>
            <div className="section-label">{group.section}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`sidebar-link${isActive ? " active" : ""}`}
                  onClick={onClose}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div
        style={{
          padding: "0.625rem 0.75rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "0.62rem", color: "#444" }}>
          FactWiki — factionsmatrix.com
        </span>
        <button
          title="Apoiar o projeto"
          onClick={() => setShowSupport(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.2rem",
            display: "flex",
            alignItems: "center",
            color: "#555",
            transition: "color 0.15s",
            borderRadius: "0.25rem",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e84393")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}
        >
          <Heart size={13} />
        </button>
      </div>

      {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
    </aside>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="hidden-mobile" style={{ display: "flex" }}>
        <Sidebar />
      </div>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }}
            onClick={() => setMenuOpen(false)}
          />
          <div style={{ position: "relative", zIndex: 51 }}>
            <Sidebar onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          className="mobile-header"
          style={{
            display: "none",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#0f0f0f",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", padding: "0.25rem" }}
          >
            <Menu size={20} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: 26,
                height: 26,
                background: "#22C55E",
                borderRadius: "0.3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.6rem",
                color: "#000",
              }}
            >
              FM
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", letterSpacing: "0.04em" }}>
              FACTWIKI
            </span>
          </div>
        </div>

        <main style={{ flex: 1, padding: "2rem", maxWidth: 820, width: "100%" }}>
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "1rem 2rem",
            fontSize: "0.75rem",
            color: "#444",
            textAlign: "center",
          }}
        >
          FactWiki — factionsmatrix.com — Todos os direitos reservados
        </footer>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-header { display: flex !important; }
          main { padding: 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/regras" component={Rules} />
          <Route path="/como-entrar" component={HowToJoin} />
          <Route path="/loja" component={Shop} />
          <Route path="/xp-mineracao" component={XPMining} />
          <Route path="/spawners" component={Spawners} />
          <Route path="/faccoes" component={Factions} />
        </Switch>
      </Layout>
    </WouterRouter>
  );
}

export default App;
