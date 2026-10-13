// Services hero: world map with supply routes from Hamburg (inline SVG, see services.html).
// CSS animates the dashed route flow and the hub pulse; here only small "packets" travel along the live routes
// (one rAF loop, getPointAtLength -> transform/opacity). The loop runs only while the map is on screen and the tab is visible.
// prefers-reduced-motion: reduce = static frame (no packets, CSS animations are switched off in services.css).
const NS = 'http://www.w3.org/2000/svg';

export function initHeroMap(wrap) {
  const svg = wrap?.querySelector('[data-hero-map]');
  if (!svg) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const layer = svg.querySelector('.hero-map__packets');
  const live = [...svg.querySelectorAll('.route--live')];
  if (!layer || !live.length) return;

  const packets = live.map((path, i) => {
    const el = document.createElementNS(NS, 'circle');
    el.setAttribute('class', 'packet');
    el.setAttribute('r', '2.5');
    el.setAttribute('opacity', '0');
    layer.append(el);
    return { path, el, len: path.getTotalLength(), dur: 4200 + (i % 5) * 700, phase: (i * 0.37) % 1 };
  });

  let raf = 0;
  let onScreen = false;
  const frame = (now) => {
    for (const p of packets) {
      const t = (now / p.dur + p.phase) % 1;
      const pt = p.path.getPointAtLength(t * p.len);
      p.el.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      p.el.setAttribute('opacity', Math.min(1, t * 8, (1 - t) * 8).toFixed(2));
    }
    raf = requestAnimationFrame(frame);
  };
  const sync = () => {
    const run = onScreen && !document.hidden && !reduced.matches;
    if (run && !raf) raf = requestAnimationFrame(frame);
    if (!run && raf) {
      cancelAnimationFrame(raf); raf = 0;
      if (reduced.matches) packets.forEach((p) => p.el.setAttribute('opacity', '0'));
    }
    svg.classList.toggle('is-paused', !(onScreen && !document.hidden));
  };
  new IntersectionObserver((e) => { onScreen = e[e.length - 1].isIntersecting; sync(); }).observe(svg);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
}
