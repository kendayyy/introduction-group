export const tokens = {
  color: {
    ink: "#14212B",
    teal: "#1C6E7D",
    copper: "#B68A4A",
    text: "#1A1D1F",
    muted: "#5F6B73",
    background: "#FFFFFF",
    surface: "#F5F6F7",
    border: "#D9D9D9",
  },
  containerMaxPx: 1280,
  proseMaxPx: 760,
  radiusMaxPx: 8,
  letterSpacing: "0",
  mobileHeroMaxPx: 32,
  gutterPx: { mobile: 16, tablet: 20, desktop: 24 },
  sectionPx: {
    mobile: 72,
    tablet: 96,
    desktop: 128,
  },
  breakpointsPx: {
    mobile: 375,
    small: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1200,
    wide: 1440,
  },
  motion: {
    entranceMinMs: 240,
    entranceMaxMs: 320,
    entranceTranslatePx: 12,
    hoverScale: 1.03,
    hoverMs: 450,
  },
} as const;

export function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function toLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function contrastRatio(foreground: string, background: string) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  const luminance = (color: { r: number; g: number; b: number }) =>
    0.2126 * toLinear(color.r) +
    0.7152 * toLinear(color.g) +
    0.0722 * toLinear(color.b);
  const lighter = Math.max(luminance(fg), luminance(bg));
  const darker = Math.min(luminance(fg), luminance(bg));
  return (lighter + 0.05) / (darker + 0.05);
}
