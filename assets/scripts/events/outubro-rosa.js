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
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => element.classList.add('active'));
  }

  const eventDate = new Date('2026-10-24T07:30:00-03:00').getTime();
  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const countdownNote = document.getElementById('countdown-note');

  function updateCountdown() {
    if (!days || !hours || !minutes || !countdownNote) return;
    const distance = eventDate - Date.now();

    if (distance <= 0) {
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      countdownNote.textContent = 'O Outubro Rosa chegou. Bom evento!';
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
