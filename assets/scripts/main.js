// ==========================================
// CONTROLE DO MENU MOBILE (HAMBURGUER)
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Evita scroll no corpo do site quando menu mobile estiver aberto
    document.body.classList.toggle('overflow-hidden');
  });

  // Fecha o menu automaticamente ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    });
  });
}


// ==========================================
// CARROSSEL HERO (AUTOMATICO, INDICADORES E ARRASTE)
// ==========================================
let currentSlide = 0;
const carousel = document.querySelector('.hero-carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let carouselInterval;
let startX = 0;
let startY = 0;
let isDraggingCarousel = false;
let didDragCarousel = false;

function updateIndicators() {
  const indicators = document.querySelectorAll('.carousel-indicator');

  indicators.forEach((indicator, index) => {
    const isActive = index === currentSlide;
    indicator.classList.toggle('active', isActive);
    indicator.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function showSlide(index) {
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  updateIndicators();
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

function startInterval() {
  if (slides.length <= 1) return;

  carouselInterval = setInterval(() => {
    moveSlide(1);
  }, 8000);
}

function resetInterval() {
  clearInterval(carouselInterval);
  startInterval();
}

if (carousel && slides.length) {
  const indicatorsWrapper = document.createElement('div');
  indicatorsWrapper.className = 'carousel-indicators';
  indicatorsWrapper.setAttribute('aria-label', 'Navegacao do carrossel');

  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('aria-label', `Ir para o slide ${index + 1}`);

    indicator.addEventListener('click', (event) => {
      event.preventDefault();
      showSlide(index);
      resetInterval();
    });

    indicatorsWrapper.appendChild(indicator);
  });

  slides.forEach(slide => {
    const slideUrl = slide.getAttribute('data-href');
    if (!slideUrl) return;

    slide.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.target.closest('.slide-link-btn')) return;
      window.location.href = slideUrl;
    });

    slide.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      if (event.target.closest('.slide-link-btn')) return;

      event.preventDefault();
      window.location.href = slideUrl;
    });
  });

  carousel.appendChild(indicatorsWrapper);
  updateIndicators();

  carousel.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
    startY = event.clientY;
    isDraggingCarousel = true;
    didDragCarousel = false;
  });

  carousel.addEventListener('pointermove', (event) => {
    if (!isDraggingCarousel) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didDragCarousel = true;
    }
  });

  carousel.addEventListener('pointerup', (event) => {
    if (!isDraggingCarousel) return;

    const deltaX = event.clientX - startX;
    isDraggingCarousel = false;

    if (Math.abs(deltaX) < 45) return;

    moveSlide(deltaX > 0 ? -1 : 1);
    resetInterval();
  });

  carousel.addEventListener('pointercancel', () => {
    isDraggingCarousel = false;
  });

  carousel.addEventListener('click', (event) => {
    if (!didDragCarousel) return;

    event.preventDefault();
    didDragCarousel = false;
  }, true);

  startInterval();
}

if (prevBtn && nextBtn && slides.length) {
  prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    moveSlide(-1);
    resetInterval();
  });

  nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    moveSlide(1);
    resetInterval();
  });
}


// ==========================================
// FILTRO DE EVENTOS (Estilo TBH Esportes)
// ==========================================
const eventsSection = document.getElementById('eventos');
const filterTabs = eventsSection ? eventsSection.querySelectorAll('.filter-tab') : [];
const eventCards = eventsSection ? eventsSection.querySelectorAll('.event-card') : [];

function updateEventGroupVisibility() {
  if (!eventsSection) return;

  eventsSection.querySelectorAll('.event-month-group').forEach(group => {
    const hasVisibleCard = Array.from(group.querySelectorAll('.event-card')).some(card => card.style.display !== 'none');
    group.style.display = hasVisibleCard ? 'block' : 'none';
  });

  eventsSection.querySelectorAll('.event-year-group').forEach(group => {
    const hasVisibleCard = Array.from(group.querySelectorAll('.event-card')).some(card => card.style.display !== 'none');
    group.style.display = hasVisibleCard ? 'block' : 'none';
  });
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filterValue = tab.getAttribute('data-filter');

    eventCards.forEach(card => {
      const cardStatus = card.getAttribute('data-status');

      if (filterValue === 'todos' || cardStatus === filterValue) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.display = 'none';
      }
    });

    updateEventGroupVisibility();
  });
});
