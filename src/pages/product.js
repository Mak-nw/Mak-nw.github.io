import details from '../data/product-details.json';
import { applyLang } from '../i18n.js';

const ICONS = { api: 'molecule', excipients: 'puzzle', 'food-grade': 'leaf' };
const LABELS = { api: ['catalog.cat_api', 'API'], excipients: ['catalog.cat_excipients', 'Excipients'], 'food-grade': ['catalog.cat_food', 'Food Grade'] };

const DEFAULT_SLUG = 'anastrozole';
const q = (s) => document.querySelector(s);
const qa = (s) => document.querySelectorAll(s);
const param = new URLSearchParams(location.search).get('slug');
const slug = param && details[param] ? param : (param ? null : DEFAULT_SLUG);
const p = slug ? details[slug] : null;

function setBlock(name, value, fill) {
  const el = q(`[data-block="${name}"]`);
  if (!el) return;
  el.hidden = !value;
  if (value) fill(value);
}

if (!p) {
  qa('[data-product-tags],.product-info').forEach((e) => { e.hidden = true; });
  q('[data-product-missing]').hidden = false;
} else {
  qa('[data-product-name]').forEach((e) => { e.textContent = p.name; });
  document.title = `${p.name} | OSTA Trading GmbH`;
  const cas = q('[data-product-cas]');
  p.categories.filter((c) => LABELS[c]).forEach((c) => {
    cas.before(Object.assign(document.createElement('span'), {
      className: 'chip chip--pill chip--sm',
      innerHTML: `<svg class="icon icon-text" aria-hidden="true"><use href="/assets/icons/sprite.svg#${ICONS[c]}"/></svg><span data-i18n="${LABELS[c][0]}">${LABELS[c][1]}</span>`,
    }));
  });
  applyLang();
  cas.hidden = !p.cas;
  if (p.cas) q('[data-product-cas-value]').textContent = p.cas;
  setBlock('description', p.description, (v) => { q('[data-product-description]').textContent = v; });
  setBlock('formula', p.formula, (v) => { q('[data-product-formula]').textContent = v; });
  setBlock('colour', p.colour, (v) => { q('[data-product-colour]').textContent = v; });
  setBlock('usage', p.usage, (v) => { q('[data-product-usage]').textContent = v; });
  q('[data-product-cta]').href = `/contact.html?product=${encodeURIComponent(slug)}`;
}
