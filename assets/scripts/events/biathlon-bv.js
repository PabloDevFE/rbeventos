document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    const icon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));

      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');

        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
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
});
