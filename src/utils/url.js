// Base-path-aware URLs (production is served from /osta/, dev from /). BASE_URL always ends with "/".
export const BASE = import.meta.env.BASE_URL;
export const url = (path) => BASE + String(path).replace(/^\//, '');
// Prefix root-absolute href/src values inside an HTML string (i18n content).
export const withBase = (html) => (BASE === '/' ? html : html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${BASE}`));
