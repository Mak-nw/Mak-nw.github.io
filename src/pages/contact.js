// Contact page: validation, ?product=<slug> prefill, mock submit.
const form = document.getElementById('contact-form');
const status = document.getElementById('cf-status');
const subject = form.elements.subject;
const message = form.elements.message;

// ?product=<slug> -> subject "Request a quote (RFQ)" + "Product: <slug>" in the message
const slug = new URLSearchParams(location.search).get('product');
if (slug) {
  subject.value = 'rfq';
  const prefix = document.getElementById('cf-product-prefix').textContent.trim() || 'Product:';
  message.value = `${prefix} ${slug}\n`;
}

function validateField(el) {
  const field = el.closest('[data-field]');
  const err = field.querySelector('.field__error');
  const ok = el.value.trim() !== '' && el.checkValidity();
  field.classList.toggle('is-invalid', !ok);
  err.hidden = ok;
  el.setAttribute('aria-invalid', String(!ok));
  return ok;
}

const controls = [...form.querySelectorAll('[required]')];
controls.forEach((el) => {
  el.addEventListener('blur', () => validateField(el));
  el.addEventListener('input', () => { if (el.closest('[data-field]').classList.contains('is-invalid')) validateField(el); });
  el.addEventListener('change', () => { if (el.closest('[data-field]').classList.contains('is-invalid')) validateField(el); });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.hidden = true;
  const results = controls.map(validateField);
  const firstBad = controls[results.indexOf(false)];
  if (firstBad) { firstBad.focus(); return; }

  // TODO: connect backend endpoint here, e.g. fetch('/api/contact', { method: 'POST', body: new FormData(form) }).
  // Currently a mock: show success state only.
  status.hidden = false;
  form.reset();
  controls.forEach((el) => el.removeAttribute('aria-invalid'));
});
