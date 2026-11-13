// Shared page enhancements and contact form submission.
document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.counter');
  const epidemiologySec = document.getElementById('epidemiology');
  let animated = false;
  if (counters.length && epidemiologySec) {
    const animateCounters = () => {
      if (animated || epidemiologySec.getBoundingClientRect().top >= window.innerHeight) return;
      animated = true;
      counters.forEach(counter => {
        const target = Number(counter.getAttribute('data-target')) || 0;
        let count = 0;
        const speed = Math.max(1, Math.ceil(target / 40));
        const updateCount = () => {
          count = Math.min(target, count + speed);
          counter.textContent = String(count);
          if (count < target) setTimeout(updateCount, 40);
        };
        updateCount();
      });
    };
    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();
  }

  const form = document.getElementById('alsakeena-contact-form');
  if (!form) return;
  const status = document.getElementById('contact-form-status');
  const submit = form.querySelector('button[type="submit"]');
  if (!status || !submit) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submit.disabled = true;
    status.textContent = 'Sending your message…';
    status.className = 'text-sm text-slate-600';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send your message.');
      status.textContent = result.message;
      status.className = 'text-sm text-green-800 font-semibold';
      form.reset();
    } catch (error) {
      status.textContent = error.message || 'Unable to send your message. Please email info@alsakeena.org directly.';
      status.className = 'text-sm text-red-700 font-semibold';
    } finally {
      submit.disabled = false;
    }
  });
});
