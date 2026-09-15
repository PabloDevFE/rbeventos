document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealOnScroll.observe(element);
    });
  } else {
    revealElements.forEach(element => element.classList.add('active'));
  }

  const eventDate = new Date('2026-11-07T06:30:00-03:00').getTime();
  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const countdownNote = document.getElementById('countdown-note');

  function updateCountdown() {
    const distance = eventDate - Date.now();

    if (!days || !hours || !minutes || !countdownNote) return;

    if (distance <= 0) {
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      countdownNote.textContent = 'A Sun Rise Run chegou. Bom evento!';
      return;
    }

    days.textContent = String(Math.floor(distance / 86400000)).padStart(2, '0');
    hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
    minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
  }

  updateCountdown();
  window.setInterval(updateCountdown, 60000);

  const currentYear = document.getElementById('current-year');
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
