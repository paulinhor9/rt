
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .12 });
reveals.forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    const el = entry.target;
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1-p, 3))).toLocaleString('pt-BR') + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.dataset.done = '1';
    }
    requestAnimationFrame(tick);
  });
}, { threshold: .6 });
counters.forEach(el => counterObserver.observe(el));

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 40 ? 'rgba(4,8,5,.92)' : 'rgba(4,8,5,.65)';
});
