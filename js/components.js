/* Shared header and footer for the static AlSakeena site. */
(async function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const components = [
    ['site-header', 'components/header.html'],
    ['site-footer', 'components/footer.html']
  ];
  await Promise.all(components.map(async ([id, url]) => {
    const target = document.getElementById(id);
    if (!target) return;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      target.outerHTML = await response.text();
    } catch (error) {
      console.error('Could not load ' + url, error);
      target.textContent = 'Unable to load site navigation. Please refresh the page.';
    }
  }));
  document.querySelectorAll('header nav a, #mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const dest = href.split('#')[0] || page;
    if (dest === page && !href.includes('#contact')) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const button = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (button && menu) {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'mobile-menu');
    button.addEventListener('click', () => {
      const opening = menu.classList.contains('hidden');
      menu.classList.toggle('hidden', !opening);
      button.setAttribute('aria-expanded', String(opening));
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
    }));
  }
})();
