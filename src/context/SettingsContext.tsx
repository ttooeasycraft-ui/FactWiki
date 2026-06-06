import { createContext, useContext, useEffect, useState } from "react";

export interface Settings {
  themeId: string;
  customThemeHex: string | null;
  liteMode: boolean;
  fontSize: "compact" | "normal" | "large";
  sidebarCompact: boolean;
  showTips: boolean;
  playerName: string;
}

const THEMES = [
  { id: "verde", label: "Verde", hsl: "142 71% 45%", hex: "#22C55E" },
  { id: "ciano", label: "Ciano", hsl: "185 100% 45%", hex: "#00d4e8" },
  { id: "ouro", label: "Ouro", hsl: "45 100% 50%", hex: "#ffcc00" },
  { id: "rosa", label: "Rosa", hsl: "325 100% 55%", hex: "#ff00aa" },
];

const FONT_SIZE_OPTIONS: { id: Settings["fontSize"]; label: string }[] = [
  { id: "compact", label: "Compacto" },
  { id: "normal", label: "Normal" },
  { id: "large", label: "Grande" },
];

const DEFAULT_SETTINGS: Settings = {
  themeId: "verde",
  customThemeHex: null,
  liteMode: false,
  fontSize: "normal",
  sidebarCompact: false,
  showTips: true,
  playerName: "",
};

const STORAGE_KEY = "factwiki_app_settings_v1";

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(s: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function applyTheme(themeId: string, customHex: string | null) {
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  const hsl = customHex ? hexToHsl(customHex) : theme.hsl;
  document.documentElement.style.setProperty("--primary-hsl", hsl);
  const [h, s, l] = hsl.split(" ").map((v) => parseFloat(v));
  document.documentElement.style.setProperty("--color-green", customHex ?? theme.hex);
  document.documentElement.style.setProperty("--accent-color", customHex ?? theme.hex);
  // Update CSS variable used in index.css for --color-green
  document.documentElement.style.setProperty("--tw-prose-links", customHex ?? theme.hex);
}

function applyFontSize(size: Settings["fontSize"]) {
  document.documentElement.classList.remove("font-compact", "font-normal-size", "font-large");
  if (size === "compact") document.documentElement.style.fontSize = "13px";
  else if (size === "large") document.documentElement.style.fontSize = "17px";
  else document.documentElement.style.fontSize = "16px";
}

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6
      : max === g ? ((b - r) / d + 2) / 6
      : ((r - g) / d + 4) / 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}

interface SettingsCtx {
  settings: Settings;
  update: (partial: Partial<Settings>) => void;
  themes: typeof THEMES;
  fontSizeOptions: typeof FONT_SIZE_OPTIONS;
  isValidHex: (h: string) => boolean;
}

const SettingsContext = createContext<SettingsCtx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    applyTheme(settings.themeId, settings.customThemeHex);
    applyFontSize(settings.fontSize);
  }, [settings.themeId, settings.customThemeHex, settings.fontSize]);

  useEffect(() => {
    if (settings.liteMode) {
      document.documentElement.classList.add("lite-mode");
    } else {
      document.documentElement.classList.remove("lite-mode");
    }
  }, [settings.liteMode]);

  function update(partial: Partial<Settings>) {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }

  return (
    <SettingsContext.Provider value={{ settings, update, themes: THEMES, fontSizeOptions: FONT_SIZE_OPTIONS, isValidHex }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
