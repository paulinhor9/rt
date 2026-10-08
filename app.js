const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  reveals.forEach(el => observer.observe(el));
}

const counters = document.querySelectorAll('[data-counter]');
const formatCounter = el => Number(el.dataset.counter).toLocaleString('pt-BR') + (el.dataset.suffix || '');
counters.forEach(el => { el.textContent = formatCounter(el); });
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const el = entry.target;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / 1000, 1);
        el.textContent = Math.floor(Number(el.dataset.counter) * (1 - Math.pow(1 - progress, 3))).toLocaleString('pt-BR') + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: .5 });
  counters.forEach(el => observer.observe(el));
}

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
document.documentElement.classList.add('js-nav');
menu.hidden = false;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia('(min-width: 981px)').addEventListener('change', closeMenu);
