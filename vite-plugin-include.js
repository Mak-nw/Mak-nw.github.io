// Mini-plugin: replaces <!--@include partials/name.html--> with the file content (recursive).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const RE = /<!--@include\s+([^\s>]+)\s*-->/g;

export function includePartials({ root }) {
  const expand = (html, depth = 0) => {
    if (depth > 5) throw new Error('include depth exceeded');
    return html.replace(RE, (_, file) => expand(readFileSync(resolve(root, file), 'utf8'), depth + 1));
  };
  return {
    name: 'osta-include-partials',
    enforce: 'pre',
    transformIndexHtml: { order: 'pre', handler: (html) => expand(html) },
    handleHotUpdate({ file, server }) {
      if (file.includes('/src/partials/')) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}
