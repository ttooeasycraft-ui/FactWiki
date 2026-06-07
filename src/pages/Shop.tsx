import { useState, useMemo } from "react";
import { ShoppingCart, Search, ExternalLink, AlertTriangle, Clock } from "lucide-react";

const BASE = import.meta.env.BASE_URL;
const IMG = (name: string) => `${BASE}items/${name}`;

interface ShopItem {
  name: string;
  img: string;
  buy?: number | null;
  sell?: number | null;
  qty?: number | string;
  note?: string;
}

interface Category {
  id: string;
  label: string;
  emoji: string;
  items: ShopItem[];
}

const categories: Category[] = [
  {
    id: "stone",
    label: "Pedra",
    emoji: "🪨",
    items: [
      { name: "Stone", img: "stone.png", buy: 5000, qty: 64 },
      { name: "Cracked Stone Bricks", img: "cracked_stone_bricks.png", buy: 5000, qty: 64 },
      { name: "Mossy Stone Bricks", img: "mossy_stone_bricks.png", buy: 5000, qty: 64 },
      { name: "Chiseled Stone Bricks", img: "chiseled_stone_bricks.png", buy: 5000, qty: 64 },
      { name: "Stone Bricks", img: "stone_bricks.png", buy: 5000, qty: 64 },
      { name: "Stone Brick Wall", img: "stone_brick_wall.png", buy: 5000, qty: 64 },
      { name: "Granite", img: "granite.png", buy: 5000, qty: 64 },
      { name: "Smooth Stone", img: "smooth_stone.png", buy: 5000, qty: 64 },
      { name: "Polished Diorite", img: "polished_diorite.png", buy: 5000, qty: 64 },
      { name: "Diorite", img: "diorite.png", buy: 5000, qty: 64 },
      { name: "Andesite", img: "andesite.png", buy: 5000, qty: 64 },
      { name: "Mossy Cobblestone", img: "mossy_cobblestone.png", buy: 5000, qty: 64 },
      { name: "Cobblestone", img: "cobblestone.png", buy: 5000, qty: 64 },
    ],
  },
  {
    id: "nether",
    label: "Nether",
    emoji: "⬛",
    items: [
      { name: "Nether Brick", img: "nether_brick.png", buy: 5000, qty: 64 },
      { name: "Nether Bricks", img: "nether_bricks.png", buy: 5000, qty: 64 },
      { name: "Red Nether Bricks", img: "red_nether_bricks.png", buy: 5000, qty: 64 },
      { name: "Cracked Nether Bricks", img: "cracked_nether_bricks.png", buy: 5000, qty: 64 },
      { name: "Chiseled Nether Bricks", img: "chiseled_nether_bricks.png", buy: 5000, qty: 64 },
      { name: "Basalt", img: "basalt.png", buy: 5000, qty: 64 },
      { name: "Blackstone", img: "blackstone.png", buy: 5000, qty: 64 },
      { name: "Polished Blackstone", img: "polished_blackstone.png", buy: 5000, qty: 64 },
      { name: "Polished Blackstone Bricks", img: "polished_blackstone_bricks.png", buy: 5000, qty: 64 },
      { name: "Cracked Polished Blackstone Bricks", img: "cracked_polished_blackstone_bricks.png", buy: 5000, qty: 64 },
      { name: "Chiseled Polished Blackstone", img: "chiseled_polished_blackstone.png", buy: 5000, qty: 64 },
      { name: "Gilded Blackstone", img: "gilded_blackstone.png", buy: 5000, qty: 64 },
      { name: "Netherrack", img: "netherrack.png", buy: 5000, qty: 64 },
    ],
  },
  {
    id: "nature",
    label: "Natureza",
    emoji: "🌿",
    items: [
      { name: "Grass Block", img: "grass_block.png", buy: 5000, qty: 64 },
      { name: "Mycelium", img: "mycelium.png", buy: 5000, qty: 64 },
      { name: "Podzol", img: "podzol.png", buy: 5000, qty: 64 },
      { name: "Soul Sand", img: "soul_sand.png", buy: 5000, qty: 64 },
      { name: "Sand", img: "sand.png", buy: 5000, qty: 64 },
      { name: "Crimson Nylium", img: "crimson_nylium.png", buy: 5000, qty: 64 },
      { name: "Warped Nylium", img: "warped_nylium.png", buy: 5000, qty: 64 },
    ],
  },
  {
    id: "logs",
    label: "Madeiras",
    emoji: "🪵",
    items: [
      { name: "Dark Oak Log", img: "dark_oak_log.png", buy: 5000, qty: 64 },
      { name: "Oak Log", img: "oak_log.png", buy: 5000, qty: 64 },
      { name: "Pale Oak Log", img: "pale_oak_log.png", buy: 5000, qty: 64 },
      { name: "Mangrove Log", img: "mangrove_log.png", buy: 5000, qty: 64 },
      { name: "Cherry Log", img: "cherry_log.png", buy: 5000, qty: 64 },
      { name: "Crimson Stem", img: "crimson_stem.png", buy: 5000, qty: 64 },
      { name: "Warped Stem", img: "warped_stem.png", buy: 5000, qty: 64 },
    ],
  },
  {
    id: "ore_blocks",
    label: "Blocos de Minério",
    emoji: "💎",
    items: [
      { name: "Coal Block", img: "coal_block.png", sell: 9, qty: 1 },
      { name: "Lapis Block", img: "lapis_block.png", sell: 45, qty: 1 },
      { name: "Iron Block", img: "iron_block.png", sell: 36, qty: 1 },
      { name: "Gold Block", img: "gold_block.png", sell: 54, qty: 1 },
      { name: "Diamond Block", img: "diamond_block.png", sell: 72, qty: 1 },
      { name: "Redstone Block", img: "redstone_block.png", sell: 45, qty: 1 },
    ],
  },
  {
    id: "construction",
    label: "Construção",
    emoji: "🏗️",
    items: [
      { name: "Purpur Block", img: "purpur_block.png", buy: 5000, qty: 64 },
      { name: "Chiseled Quartz Block", img: "chiseled_quartz_block.png", buy: 5000, qty: 64 },
      { name: "Quartz Block", img: "quartz_block.png", buy: 5000, qty: 64 },
      { name: "Quartz Pillar", img: "quartz_pillar.png", buy: 5000, qty: 64 },
      { name: "Sea Lantern", img: "sea_lantern.png", buy: 5000, qty: 64 },
      { name: "Prismarine", img: "prismarine.png", buy: 5000, qty: 64 },
      { name: "Dark Prismarine", img: "dark_prismarine.png", buy: 5000, qty: 64 },
      { name: "Sandstone", img: "sandstone.png", buy: 5000, qty: 64 },
      { name: "Smooth Sandstone", img: "smooth_sandstone.png", buy: 5000, qty: 64 },
      { name: "Cut Sandstone", img: "cut_sandstone.png", buy: 5000, qty: 64 },
      { name: "Packed Mud", img: "packed_mud.png", buy: 5000, qty: 64 },
      { name: "Red Sandstone", img: "red_sandstone.png", buy: 5000, qty: 64 },
      { name: "Smooth Red Sandstone", img: "smooth_red_sandstone.png", buy: 5000, qty: 64 },
      { name: "Cut Red Sandstone", img: "cut_red_sandstone.png", buy: 5000, qty: 64 },
      { name: "Polished Tuff", img: "polished_tuff.png", buy: 5000, qty: 64 },
      { name: "Tuff", img: "tuff.png", buy: 5000, qty: 64 },
      { name: "Tuff Bricks", img: "tuff_bricks.png", buy: 5000, qty: 64 },
      { name: "Deepslate", img: "deepslate.png", buy: 5000, qty: 64 },
      { name: "Bricks", img: "bricks.png", buy: 5000, qty: 64 },
      { name: "Resin Bricks", img: "resin_bricks.png", buy: 5000, qty: 64 },
      { name: "Sponge", img: "sponge.png", buy: 5000, qty: 64 },
      { name: "Magma Block", img: "magma_block.png", buy: 5000, qty: 64 },
      { name: "Glass", img: "glass.png", buy: 5000, qty: 64 },
      { name: "White Wool", img: "white_wool.png", buy: 5000, qty: 64 },
      { name: "Terracotta", img: "terracotta.png", buy: 5000, qty: 64 },
      { name: "Gravel", img: "gravel.png", buy: 5000, qty: 64 },
    ],
  },
  {
    id: "light",
    label: "Iluminação",
    emoji: "🔆",
    items: [
      { name: "Jack O'Lantern", img: "jack_o_lantern.png", buy: 5000, qty: 8 },
      { name: "Campfire", img: "campfire.png", buy: 5000, qty: 1 },
      { name: "Redstone Lamp", img: "redstone_lamp.png", buy: 3780, qty: 64 },
      { name: "Smoker", img: "smoker.png", buy: 5500, qty: 64 },
      { name: "Verdant Froglight", img: "verdant_froglight.png", buy: 5000, qty: 64 },
      { name: "Ochre Froglight", img: "ochre_froglight.png", buy: 5000, qty: 64 },
      { name: "Pearlescent Froglight", img: "pearlescent_froglight.png", buy: 5000, qty: 64 },
      { name: "Scaffolding", img: "scaffolding.png", buy: 5000, qty: 16 },
    ],
  },
  {
    id: "food",
    label: "Comida",
    emoji: "🌾",
    items: [
      { name: "Melon", img: "melon.png", sell: 6.75, qty: 1 },
      { name: "Melon Slice", img: "melon_slice.png", sell: 0.75, qty: 1 },
      { name: "Sugar Cane", img: "sugar_cane.png", sell: 2.25, qty: 1 },
      { name: "Nether Wart", img: "nether_wart.png", sell: 6, qty: 1 },
      { name: "Carrot", img: "carrot.png", sell: 0.45, qty: 1 },
      { name: "Baked Potato", img: "baked_potato.png", sell: 12, qty: 1 },
      { name: "Apple", img: "apple.png", sell: 6, qty: 1 },
    ],
  },
  {
    id: "dyes",
    label: "Corantes",
    emoji: "🎨",
    items: [
      { name: "Orange Dye", img: "orange_dye.png", buy: 5000, qty: 64 },
      { name: "Purple Dye", img: "purple_dye.png", buy: 5000, qty: 64 },
      { name: "Pink Dye", img: "pink_dye.png", buy: 5000, qty: 64 },
      { name: "Lime Dye", img: "lime_dye.png", buy: 5000, qty: 64 },
      { name: "Blue Dye", img: "blue_dye.png", buy: 5000, qty: 64 },
      { name: "Yellow Dye", img: "yellow_dye.png", buy: 5000, qty: 64 },
      { name: "Red Dye", img: "red_dye.png", buy: 5000, qty: 64 },
      { name: "Magenta Dye", img: "magenta_dye.png", buy: 5000, qty: 64 },
      { name: "Light Blue Dye", img: "light_blue_dye.png", buy: 5000, qty: 64 },
      { name: "Green Dye", img: "green_dye.png", buy: 5000, qty: 64 },
      { name: "Gray Dye", img: "gray_dye.png", buy: 5000, qty: 64 },
      { name: "Brown Dye", img: "brown_dye.png", buy: 5000, qty: 64 },
      { name: "White Dye", img: "white_dye.png", buy: 5000, qty: 64 },
      { name: "Black Dye", img: "black_dye.png", buy: 5000, qty: 64 },
    ],
  },
  {
    id: "tools",
    label: "Ferramentas",
    emoji: "🔧",
    items: [
      { name: "Flint and Steel", img: "flint_and_steel.png", buy: 4000, qty: 1 },
      { name: "Cobweb", img: "cobweb.png", buy: 50000, qty: 1 },
      { name: "Ladder", img: "ladder.png", buy: 5000, qty: 8 },
      { name: "Oak Sign", img: "oak_sign.png", buy: 5000, qty: 1 },
      { name: "Ice", img: "ice.png", buy: 5000, qty: 64 },
      { name: "Lever", img: "lever.png", buy: 5000, qty: 8 },
      { name: "Redstone Torch", img: "redstone_torch.png", buy: 5000, qty: null },
      { name: "Spyglass", img: "spyglass.png", buy: 10000, qty: 1 },
      { name: "Blast Furnace", img: "blast_furnace.png", buy: 4000, qty: 1 },
      { name: "Chest", img: "chest.png", buy: 2000, qty: 1 },
      { name: "Barrel", img: "barrel.png", buy: 2000, qty: 1 },
      { name: "Bookshelf", img: "bookshelf.png", buy: 10000, qty: 8 },
      { name: "Enchanting Table", img: "enchanting_table.png", buy: 20000, qty: 1 },
      { name: "Anvil", img: "anvil.png", buy: 10000, qty: 1 },
    ],
  },
  {
    id: "special",
    label: "Especiais",
    emoji: "💣",
    items: [
      { name: "TNT", img: "tnt.png", buy: null, qty: null, note: "Preço a definir" },
      { name: "TNT de Impulso", img: "tnt_minecart.png", buy: null, qty: null, note: "Preço a definir" },
      { name: "Dispenser", img: "dispenser.png", buy: null, qty: null, note: "Preço a definir" },
      { name: "Repeater", img: "repeater.png", buy: null, qty: null, note: "Preço a definir" },
      { name: "End Stone", img: "end_stone.png", buy: 3780, qty: 64 },
      { name: "Bedrock", img: "bedrock.png", buy: 5500, qty: 64 },
      { name: "Ender Pearl", img: "ender_pearl.png", buy: 18000, qty: 1 },
      { name: "Red Stained Glass", img: "red_stained_glass.png", buy: null, qty: null, note: "Preço a definir" },
    ],
  },
  {
    id: "minerals",
    label: "Minérios",
    emoji: "⛏️",
    items: [
      { name: "Diamond", img: "diamond.png", sell: 8, qty: 1 },
      { name: "Gold Ingot", img: "gold_ingot.png", sell: 6, qty: 1 },
      { name: "Iron Ingot", img: "iron_ingot.png", sell: 4, qty: 1 },
      { name: "Baked Potato", img: "baked_potato.png", sell: 12, qty: 1 },
      { name: "Apple", img: "apple.png", sell: 6, qty: 1 },
      { name: "Carrot", img: "carrot.png", sell: 4.5, qty: 1 },
      { name: "Nether Wart", img: "nether_wart.png", sell: 6, qty: 1 },
      { name: "Sugar Cane", img: "sugar_cane.png", sell: 2.25, qty: 1 },
      { name: "Melon Slice", img: "melon_slice.png", sell: 0.75, qty: 1 },
      { name: "Melon", img: "melon.png", sell: 6.75, qty: 1 },
      { name: "Coal", img: "coal.png", sell: 1, qty: 1 },
      { name: "Redstone", img: "redstone.png", sell: 0.5, qty: 1 },
      { name: "Lapis Lazuli", img: "lapis_lazuli.png", sell: 0.5, qty: 1 },
      { name: "Amethyst Shard", img: "amethyst_shard.png", sell: null, qty: 1, note: "Em breve" },
      { name: "Leather", img: "leather.png", sell: 3, qty: 1 },
      { name: "Goat Horn", img: "goat_horn.png", sell: 6, qty: 1 },
    ],
  },
  {
    id: "coming_soon",
    label: "Em Breve",
    emoji: "🔜",
    items: [
      { name: "Dead Bush", img: "dead_bush.png", buy: null, qty: null, note: "Em breve" },
      { name: "Amethyst Shard", img: "amethyst_shard.png", buy: null, qty: null, note: "Em breve" },
      { name: "Ovos de Spawner", img: "heavy_core.png", buy: null, qty: null, note: "Em breve" },
      { name: "Granja de Mobs", img: "spawner.png", buy: null, qty: null, note: "Em breve" },
    ],
  },
];

function fmt(v: number | null | undefined): string {
  if (v == null) return "—";
  if (v >= 1000) return v.toLocaleString("pt-BR");
  return v.toLocaleString("pt-BR", { minimumFractionDigits: v % 1 !== 0 ? 2 : 0 });
}

function ItemIcon({ src, name }: { src: string; name: string }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        flexShrink: 0,
        imageRendering: "pixelated",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={src}
        alt={name}
        style={{ width: 28, height: 28, imageRendering: "pixelated", objectFit: "contain" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

export default function Shop() {
  const [activeTab, setActiveTab] = useState("stone");
  const [search, setSearch] = useState("");

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return activeCategory.items;
    return activeCategory.items.filter((i) => i.name.toLowerCase().includes(q));
  }, [activeCategory, search]);

  const allFiltered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase().trim();
    return categories.flatMap((cat) =>
      cat.items
        .filter((i) => i.name.toLowerCase().includes(q))
        .map((i) => ({ ...i, catLabel: cat.label }))
    );
  }, [search]);

  const accent = "var(--accent-color, #22C55E)";

  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ShoppingCart size={18} style={{ color: accent }} />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>Loja</h1>
          <p style={{ color: "#666", fontSize: "0.8rem", margin: 0 }}>Preços da loja in-game do Factions Matrix</p>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "1.25rem 0" }} />

      {/* Server info */}
      <div
        style={{
          border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
          borderRadius: "0.625rem",
          padding: "1rem 1.25rem",
          background: `color-mix(in srgb, ${accent} 4%, transparent)`,
          marginBottom: "1.25rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem", marginBottom: "0.2rem" }}>
            Loja In-Game — Factions Matrix
          </div>
          <div style={{ fontSize: "0.78rem", color: "#888" }}>
            IP: <span style={{ color: accent, fontFamily: "monospace", fontWeight: 600 }}>factionsmatrix.com</span>
            {" · "}Java & Bedrock{" · "}
            Loja física acessível dentro do servidor
          </div>
        </div>
        <a
          href="https://factionsmatrix.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.45rem 0.875rem",
            borderRadius: "0.375rem",
            background: accent,
            color: "#000",
            fontWeight: 700,
            fontSize: "0.78rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <ExternalLink size={13} />
          Site Oficial
        </a>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#555", pointerEvents: "none" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar item..."
          style={{
            width: "100%",
            background: "#111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.5rem",
            padding: "0.5rem 0.75rem 0.5rem 2.2rem",
            color: "#fff",
            fontSize: "0.875rem",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${accent} 40%, transparent)`; }}
          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "0.9rem" }}
          >✕</button>
        )}
      </div>

      {/* Global search results */}
      {search.trim() && allFiltered ? (
        <div>
          <div style={{ fontSize: "0.7rem", color: "#666", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            {allFiltered.length} resultado{allFiltered.length !== 1 ? "s" : ""} para "{search}"
          </div>
          <ItemTable items={allFiltered} accent={accent} showCategory />
        </div>
      ) : (
        <>
          {/* Category tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.375rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              marginBottom: "0.75rem",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  flexShrink: 0,
                  padding: "0.35rem 0.75rem",
                  borderRadius: "0.375rem",
                  border: `1px solid ${activeTab === cat.id ? `color-mix(in srgb, ${accent} 40%, transparent)` : "rgba(255,255,255,0.07)"}`,
                  background: activeTab === cat.id ? `color-mix(in srgb, ${accent} 12%, transparent)` : "transparent",
                  color: activeTab === cat.id ? accent : "#666",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Category header */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.1rem" }}>{activeCategory.emoji}</span>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", margin: 0 }}>{activeCategory.label}</h2>
            <span style={{ fontSize: "0.7rem", color: "#555", marginLeft: "0.25rem" }}>
              ({activeCategory.items.length} itens)
            </span>
          </div>

          <ItemTable items={filtered} accent={accent} />
        </>
      )}

      {/* Disclaimer */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(250, 173, 20, 0.25)",
          background: "rgba(250, 173, 20, 0.05)",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.625rem",
        }}
      >
        <AlertTriangle size={14} style={{ color: "#faad14", flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: "0.775rem", color: "#888", lineHeight: 1.5 }}>
          <strong style={{ color: "#faad14" }}>Aviso:</strong> Alguns preços podem não estar 100% corretos.
          Itens marcados com <Clock size={11} style={{ display: "inline", verticalAlign: "middle", color: "#faad14" }} /> ainda
          não têm preço definido. Confirme os valores diretamente na loja dentro do servidor{" "}
          <strong style={{ color: "#ccc" }}>factionsmatrix.com</strong>.
        </div>
      </div>
    </div>
  );
}

function ItemTable({
  items,
  accent,
  showCategory,
}: {
  items: (ShopItem & { catLabel?: string })[];
  accent: string;
  showCategory?: boolean;
}) {
  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#555", fontSize: "0.875rem" }}>
        Nenhum item encontrado.
      </div>
    );
  }

  const hasBuy = items.some((i) => i.buy != null);
  const hasSell = items.some((i) => i.sell != null);

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "0.625rem",
        overflow: "hidden",
        marginBottom: "0.75rem",
      }}
    >
      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: showCategory
            ? "auto 1fr auto auto auto auto"
            : "auto 1fr auto auto auto",
          padding: "0.5rem 1rem",
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#555",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <span></span>
        <span>Item</span>
        {showCategory && <span style={{ textAlign: "right" }}>Cat.</span>}
        {hasBuy && <span style={{ textAlign: "right" }}>Comprar</span>}
        {hasSell && <span style={{ textAlign: "right" }}>Vender</span>}
        <span style={{ textAlign: "right" }}>Qtd</span>
      </div>

      {/* Table rows */}
      {items.map((item, i) => (
        <div
          key={`${item.name}-${i}`}
          style={{
            display: "grid",
            gridTemplateColumns: showCategory
              ? "auto 1fr auto auto auto auto"
              : "auto 1fr auto auto auto",
            padding: "0.5rem 1rem",
            gap: "0.5rem",
            alignItems: "center",
            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
            transition: "background 0.1s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `color-mix(in srgb, ${accent} 4%, transparent)`)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent")}
        >
          {/* Icon */}
          <ItemIcon src={IMG(item.img)} name={item.name} />

          {/* Name */}
          <div>
            <span style={{ fontSize: "0.825rem", color: "#e0e0e0", fontWeight: 500 }}>{item.name}</span>
            {item.note && (
              <span style={{ fontSize: "0.65rem", color: "#faad14", marginLeft: "0.375rem", fontWeight: 600 }}>
                [{item.note}]
              </span>
            )}
          </div>

          {/* Category label */}
          {showCategory && (
            <span style={{ fontSize: "0.65rem", color: "#555", textAlign: "right", whiteSpace: "nowrap" }}>
              {(item as any).catLabel}
            </span>
          )}

          {/* Buy price */}
          {hasBuy && (
            <div style={{ textAlign: "right", minWidth: 64 }}>
              {item.buy != null ? (
                <span style={{ fontSize: "0.8rem", color: "#f87171", fontWeight: 600, fontFamily: "monospace" }}>
                  💸 {fmt(item.buy)}
                </span>
              ) : (
                <span style={{ color: "#333", fontSize: "0.8rem" }}>—</span>
              )}
            </div>
          )}

          {/* Sell price */}
          {hasSell && (
            <div style={{ textAlign: "right", minWidth: 60 }}>
              {item.sell != null ? (
                <span style={{ fontSize: "0.8rem", color: accent, fontWeight: 600, fontFamily: "monospace" }}>
                  💰 {fmt(item.sell)}
                </span>
              ) : (
                <span style={{ color: "#333", fontSize: "0.8rem" }}>—</span>
              )}
            </div>
          )}

          {/* Qty */}
          <div style={{ textAlign: "right", minWidth: 32 }}>
            {item.qty != null ? (
              <span style={{ fontSize: "0.75rem", color: "#666", fontFamily: "monospace" }}>×{item.qty}</span>
            ) : (
              <span style={{ color: "#333", fontSize: "0.75rem" }}>—</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
