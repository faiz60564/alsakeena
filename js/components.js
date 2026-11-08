/* Shared header and footer for the static AlSakeena site. */
(async function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const components = [
    ['site-header', 'components/header.html?v=scope-header'],
    ['site-footer', 'components/footer.html?v=orange-logo']
  ];
  await Promise.all(components.map(async ([id, url]) => {
    const target = document.getElementById(id);
    if (!target) return;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      let markup = await response.text();
      if (id === 'site-header' && ['about.html', 'scope.html'].includes(page)) {
        const template = document.createElement('template');
        template.innerHTML = markup;
        template.content.querySelector('.as-header-pillars')?.remove();
        markup = template.innerHTML;
      }
      target.outerHTML = markup;
    } catch (error) {
      console.error('Could not load ' + url, error);
      target.textContent = 'Unable to load site navigation. Please refresh the page.';
    }
  }));
  const updateActiveNavigation = () => {
    const currentHash = location.hash || '#top';
    document.querySelectorAll('.as-unified-nav a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const [dest, fragment] = href.split('#');
      const isCurrent = (dest || page) === page && (!fragment || '#' + fragment === currentHash);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
  const header = document.querySelector('.as-unified-header');
  const updateHeaderHeight = () => {
    if (header) document.documentElement.style.setProperty('--as-sticky-header-height', header.getBoundingClientRect().height + 'px');
  };
  const alignFramework = () => {
    if (location.hash !== '#pillars') return;
    document.getElementById('pillars')?.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  updateActiveNavigation();
  updateHeaderHeight();
  if (header && typeof ResizeObserver !== 'undefined') new ResizeObserver(updateHeaderHeight).observe(header);
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener('hashchange', () => {
    updateActiveNavigation();
    alignFramework();
  });
  // Fragment navigation can happen before the asynchronous header changes the layout.
  requestAnimationFrame(() => requestAnimationFrame(alignFramework));
  const button = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('main-nav');
  if (button && menu) {
    const setOpen = opening => {
      menu.dataset.open = String(opening);
      button.setAttribute('aria-expanded', String(opening));
      button.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    };
    setOpen(false);
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        button.focus();
      }
    });
  }
})();
