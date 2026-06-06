import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
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
  Palette,
  Type,
  Cpu,
  Sliders,
  User,
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

// ─── Support Popup ──────────────────────────────────────────────────────────

function SupportPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(0,0,0,0.5)",
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

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.875rem", fontSize: "0.78rem", color: "#888" }}>
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
              color: "var(--accent-color, #22C55E)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            💬 discord.gg/factions
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Panel ──────────────────────────────────────────────────────────

type SettingsTab = "aparencia" | "performance" | "personalizar";

const TABS: { id: SettingsTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "aparencia", label: "Aparência", icon: Palette },
  { id: "performance", label: "Performance", icon: Cpu },
  { id: "personalizar", label: "Personalizar", icon: Sliders },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 99,
        background: value ? "var(--accent-color, #22C55E)" : "#333",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: value ? 21 : 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}

function SectionLabel({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 0 0.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" }}>
      <Icon size={11} style={{ color: "var(--accent-color, #22C55E)" }} />
      {label}
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div>
        <div style={{ fontSize: "0.8rem", color: "#ddd", fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: "0.7rem", color: "#555", lineHeight: 1.4, marginTop: "0.1rem" }}>{desc}</div>}
      </div>
      {children}
    </div>
  );
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, update, themes, fontSizeOptions, isValidHex } = useSettings();
  const [tab, setTab] = useState<SettingsTab>("aparencia");
  const [customHexInput, setCustomHexInput] = useState(settings.customThemeHex ?? "");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        display: "flex",
        background: "rgba(0,0,0,0.6)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 300,
          height: "100%",
          background: "#111",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Settings size={16} style={{ color: "var(--accent-color, #22C55E)" }} />
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>Configurações</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", padding: "0.25rem" }}>
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.25rem", padding: "0.75rem 0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1,
                  padding: "0.35rem 0.25rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: tab === t.id ? "rgba(34,197,94,0.12)" : "transparent",
                  color: tab === t.id ? "var(--accent-color, #22C55E)" : "#555",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.2rem",
                  transition: "all 0.15s",
                  marginBottom: "0.5rem",
                }}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, padding: "0 1rem 1rem" }}>

          {/* ── APARÊNCIA ── */}
          {tab === "aparencia" && (
            <div>
              <SectionLabel icon={Palette} label="Cor do Tema" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.4rem", paddingBottom: "0.75rem" }}>
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => update({ themeId: theme.id, customThemeHex: null })}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.375rem",
                      border: `1px solid ${settings.themeId === theme.id && !settings.customThemeHex ? theme.hex : "rgba(255,255,255,0.08)"}`,
                      background: settings.themeId === theme.id && !settings.customThemeHex ? `${theme.hex}18` : "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: theme.hex, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.75rem", color: "#ccc", fontWeight: 500 }}>{theme.label}</span>
                  </button>
                ))}
              </div>

              <SectionLabel icon={Palette} label="Cor Personalizada (HEX)" />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", paddingBottom: "0.75rem" }}>
                <input
                  type="text"
                  value={customHexInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomHexInput(val);
                    if (isValidHex(val)) update({ customThemeHex: val });
                  }}
                  placeholder="#22C55E"
                  maxLength={7}
                  style={{
                    flex: 1,
                    background: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.375rem",
                    padding: "0.4rem 0.6rem",
                    color: "#fff",
                    fontSize: "0.8rem",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    outline: "none",
                  }}
                />
                {isValidHex(customHexInput) && (
                  <div style={{ width: 32, height: 32, borderRadius: "0.375rem", background: customHexInput, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                )}
              </div>
              {settings.customThemeHex && (
                <button
                  onClick={() => { update({ customThemeHex: null, themeId: "verde" }); setCustomHexInput(""); }}
                  style={{ fontSize: "0.7rem", color: "#666", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "0.5rem" }}
                >
                  Remover cor personalizada
                </button>
              )}

              <SectionLabel icon={Type} label="Tamanho do Texto" />
              <div style={{ display: "flex", gap: "0.4rem", paddingBottom: "0.75rem" }}>
                {fontSizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => update({ fontSize: opt.id })}
                    style={{
                      flex: 1,
                      padding: "0.4rem",
                      borderRadius: "0.375rem",
                      border: `1px solid ${settings.fontSize === opt.id ? "var(--accent-color, #22C55E)" : "rgba(255,255,255,0.08)"}`,
                      background: settings.fontSize === opt.id ? "rgba(34,197,94,0.1)" : "transparent",
                      color: settings.fontSize === opt.id ? "var(--accent-color, #22C55E)" : "#666",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "monospace",
                      transition: "all 0.15s",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── PERFORMANCE ── */}
          {tab === "performance" && (
            <div>
              <SectionLabel icon={Cpu} label="Otimização" />
              <SettingRow label="Modo Leve" desc="Desativa animações e transições. Recomendado para celulares fracos.">
                <Toggle value={settings.liteMode} onChange={(v) => update({ liteMode: v })} />
              </SettingRow>
              <SettingRow label="Sidebar Compacta" desc="Esconde os textos do menu lateral para ganhar espaço.">
                <Toggle value={settings.sidebarCompact} onChange={(v) => update({ sidebarCompact: v })} />
              </SettingRow>
            </div>
          )}

          {/* ── PERSONALIZAR ── */}
          {tab === "personalizar" && (
            <div>
              <SectionLabel icon={User} label="Seu Nome" />
              <div style={{ paddingBottom: "0.75rem" }}>
                <input
                  type="text"
                  value={settings.playerName}
                  onChange={(e) => update({ playerName: e.target.value })}
                  placeholder="Seu nick no servidor..."
                  maxLength={24}
                  style={{
                    width: "100%",
                    background: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 0.75rem",
                    color: "#fff",
                    fontSize: "0.8rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <SectionLabel icon={Sliders} label="Conteúdo" />
              <SettingRow label="Dica do Dia" desc="Exibe a dica do dia na página inicial.">
                <Toggle value={settings.showTips} onChange={(v) => update({ showTips: v })} />
              </SettingRow>
            </div>
          )}
        </div>

        {/* Footer reset */}
        <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => {
              update({ themeId: "verde", customThemeHex: null, liteMode: false, fontSize: "normal", sidebarCompact: false, showTips: true, playerName: "" });
              setCustomHexInput("");
            }}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#555", fontSize: "0.75rem", cursor: "pointer", transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ccc")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}
          >
            Restaurar padrões
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ onClose }: { onClose?: () => void }) {
  const [location] = useLocation();
  const [showSupport, setShowSupport] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useSettings();

  return (
    <aside
      style={{
        width: settings.sidebarCompact ? 56 : 220,
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
        transition: "width 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 0.75rem 0.75rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "var(--accent-color, #22C55E)",
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
          {!settings.sidebarCompact && (
            <div style={{ lineHeight: 1, overflow: "hidden" }}>
              <div style={{ fontSize: "0.6rem", color: "#555", fontWeight: 600, letterSpacing: "0.05em" }}>FW</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                FACTWIKI
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
          <button
            onClick={() => setShowSettings(true)}
            style={{ background: "none", border: "none", color: "#555", cursor: "pointer", padding: "0.25rem", borderRadius: "0.25rem", transition: "color 0.15s" }}
            title="Configurações"
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent-color, #22C55E)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}
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

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0.5rem 0.5rem 1rem" }}>
        {settings.playerName && !settings.sidebarCompact && (
          <div style={{ padding: "0.4rem 0.75rem 0.2rem", fontSize: "0.7rem", color: "var(--accent-color, #22C55E)", fontWeight: 600 }}>
            👋 {settings.playerName}
          </div>
        )}
        {navItems.map((group) => (
          <div key={group.section}>
            {!settings.sidebarCompact && <div className="section-label">{group.section}</div>}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`sidebar-link${isActive ? " active" : ""}`}
                  onClick={onClose}
                  title={settings.sidebarCompact ? item.label : undefined}
                  style={settings.sidebarCompact ? { justifyContent: "center", padding: "0.5rem" } : {}}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {!settings.sidebarCompact && item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "0.625rem 0.75rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: settings.sidebarCompact ? "center" : "space-between",
        }}
      >
        {!settings.sidebarCompact && (
          <span style={{ fontSize: "0.62rem", color: "#444" }}>FactWiki — factionsmatrix.com</span>
        )}
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
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </aside>
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="hidden-mobile" style={{ display: "flex" }}>
        <Sidebar />
      </div>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
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
                background: "var(--accent-color, #22C55E)",
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
        .lite-mode * { transition: none !important; animation: none !important; }
      `}</style>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function AppInner() {
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

export default function App() {
  return (
    <SettingsProvider>
      <AppInner />
    </SettingsProvider>
  );
}
