
    // Mobile navigation is initialized after shared components load in components.js.

    // 4. Animated Counters for Stats Grid
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCounters = () => {
      const epidemiologySec = document.getElementById('epidemiology');
      if (!epidemiologySec) return;

      const position = epidemiologySec.getBoundingClientRect();
      if (position.top < window.innerHeight && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = Math.ceil(target / 40);

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = count;
              setTimeout(updateCount, 40);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    };
    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();
  

(function () {
 const form = document.getElementById('alsakeena-contact-form');
 if (!form) return;
 const status = document.getElementById('contact-form-status');
 const submit = form.querySelector('[type="submit"]');
 form.addEventListener('submit', async function (event) {
  event.preventDefault();
  if (!form.reportValidity()) return;
  submit.disabled = true;
  submit.setAttribute('aria-busy', 'true');
  status.textContent = 'Sending your message…';
  try {
   const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.message || 'Message could not be sent.');
   status.textContent = data.message;
   status.className = 'text-sm text-green-800 font-semibold';
   form.reset();
  } catch (error) {
   status.textContent = error.message || 'Unable to send. Please email info@alsakeena.org directly.';
   status.className = 'text-sm text-red-700 font-semibold';
  } finally {
   submit.disabled = false;
   submit.removeAttribute('aria-busy');
  }
 });
})();
