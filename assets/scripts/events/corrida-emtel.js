document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  if ('IntersectionObserver' in window) {
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => revealOnScroll.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('active'));
  }

  if (!reduceMotion) {
    const parallaxItems = [
      document.querySelector('.hero-content'),
      document.querySelector('.kit-image'),
      document.querySelector('.awards-panel'),
      document.querySelector('.event-map')
    ].filter(Boolean);

    parallaxItems.forEach(item => item.classList.add('is-parallax'));

    let ticking = false;

    const updateParallax = () => {
      const viewportMid = window.innerHeight / 2;

      parallaxItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemMid = rect.top + rect.height / 2;
        const strength = index === 0 ? 0.035 : 0.025;
        const offset = (viewportMid - itemMid) * strength;

        item.style.setProperty('--parallax-y', `${Math.max(-18, Math.min(18, offset)).toFixed(2)}px`);
      });

      ticking = false;
    };

    const requestParallax = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
  }
});
