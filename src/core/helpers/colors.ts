type RGBA = { r: number; g: number; b: number; a: number };

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function padHex(n: number) {
  return n.toString(16).padStart(2, '0');
}

function normalizeHexStrict(hex: string): string {
  const raw = hex.replace('#', '').toLowerCase();
  if (![3, 6, 8].includes(raw.length)) {
    throw new Error(
      `Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu ${raw.length}`,
    );
  }
  if (raw.length === 3) {
    return raw
      .split('')
      .map(c => c + c)
      .join('');
  }
  return raw;
}

function normalizeHexTolerant(hex: string): string {
  let raw = hex.replace('#', '').toLowerCase();
  if (raw.length === 3) {
    return raw
      .split('')
      .map(c => c + c)
      .join('');
  }
  if (raw.length === 6 || raw.length === 8) {
    return raw;
  }
  if (raw.length > 6 && raw.length <= 10) {
    return raw.slice(0, 8);
  }
  throw new Error(`Hex inválido: comprimento inesperado ${raw.length}`);
}

function hexToRgba(hex: string, tolerant = false): RGBA {
  const raw = tolerant ? normalizeHexTolerant(hex) : normalizeHexStrict(hex);
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  const a = raw.length === 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function rgbaToHex({ r, g, b, a }: RGBA): string {
  const ai = Math.round(clamp01(a) * 255);
  return (
    '#' +
    padHex(Math.round(r)).toUpperCase() +
    padHex(Math.round(g)).toUpperCase() +
    padHex(Math.round(b)).toUpperCase() +
    padHex(ai).toUpperCase()
  );
}

export function applyOpacity(
  hex: string,
  opacity: number,
  tolerant = false,
): string {
  const clamped = clamp01(opacity);
  const rgba = hexToRgba(hex, tolerant);
  rgba.a = clamped;
  return rgbaToHex(rgba);
}
