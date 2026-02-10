type RGBA = { r: number; g: number; b: number; a: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function normalizeHex(hex: string, tolerant: boolean): string {
  let raw = hex.replace('#', '').toLowerCase();

  if (raw.length === 3) {
    raw = raw.replace(/./g, c => c + c);
  }

  if (raw.length === 6 || raw.length === 8) {
    return raw;
  }

  if (tolerant && raw.length > 6 && raw.length <= 10) {
    return raw.slice(0, 8);
  }

  throw new Error(`Hex inválido: comprimento ${raw.length}`);
}

function hexToRgba(hex: string, tolerant: boolean): RGBA {
  const raw = normalizeHex(hex, tolerant);
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16),
    a: raw.length === 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1,
  };
}

function rgbaToHex({ r, g, b, a }: RGBA): string {
  const toHex = (n: number) =>
    Math.round(n).toString(16).padStart(2, '0').toUpperCase();

  return '#' + toHex(r) + toHex(g) + toHex(b) + toHex(clamp01(a) * 255);
}

export function applyOpacity(
  hex: string,
  opacity: number,
  tolerant = false,
): string {
  const { r, g, b } = hexToRgba(hex, tolerant);
  return rgbaToHex({ r, g, b, a: clamp01(opacity) });
}
