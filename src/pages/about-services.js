// About services: stack of 4 always-open cards + lazy 3D media.
// `three` is imported lazily (separate chunk) once the list is within ~1 screen of the viewport;
// one WebGL canvas over the list renders a model into every card's media slot (see about-services-3d.js).
const root = document.querySelector('[data-services]');
if (root) {
  let loading = null;
  const load = () => (loading ||= import('./about-services-3d.js').then((m) => m.initServicesScene(root)).catch(() => null));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { io.disconnect(); load(); } }, { rootMargin: '100% 0px' });
    io.observe(root);
  } else load();
}
