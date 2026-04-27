// ---- STARFIELD ----
(function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const count = 120;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --dur: ${(Math.random() * 4 + 2).toFixed(1)}s;
      --delay: ${(Math.random() * 5).toFixed(1)}s;
    `;
    container.appendChild(star);
  }
})();

// ---- NAVBAR SCROLL STYLE ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(5, 14, 5, 0.98)'
    : 'rgba(10, 22, 10, 0.92)';
});

// ---- MOBILE MENU ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- BACK TO TOP ----
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

// ---- SCROLL REVEAL for level cards ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.level-card').forEach(card => revealObserver.observe(card));

// ---- STAT BAR ANIMATION ----
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-fill').forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { fill.style.width = width; }, 100);
        });
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.starter-card').forEach(card => statObserver.observe(card));

// ---- SMOOTH SECTION HIGHLIGHT in NAV ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--gold)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
