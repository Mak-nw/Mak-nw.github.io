// Resolves a CSS custom property (hex, color-mix(), color(srgb ...)) to 'rgb(r, g, b)' via a 1x1 canvas.
// Shared helper for canvas/WebGL modules that must take colours from design tokens.
export function tokenToRgb(name, fallback = [0, 0, 0]) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return fallback;
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return fallback;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#000';
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

export function tokenToCss(name, fallback) {
  const [r, g, b] = tokenToRgb(name, fallback);
  return `rgb(${r}, ${g}, ${b})`;
}
