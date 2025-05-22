export function applyOpacity(hex: string, opacity: number): string {
  const normalizedHex =
    hex.length === 4
      ? '#' + hex[1].repeat(2) + hex[2].repeat(2) + hex[3].repeat(2)
      : hex;

  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');

  return normalizedHex + alpha;
}
