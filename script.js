// ==========================================
// CONTROLE DO MENU MOBILE (HAMBÚRGUER)
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
// CARROSSEL HERO (AUTOMÁTICO & CLICÁVEL)
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');

function showSlide(index) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita seguir link ao clicar na navegação
    moveSlide(-1);
    resetInterval();
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    moveSlide(1);
    resetInterval();
  });
}

// Rotação Automática
let carouselInterval = setInterval(() => {
  moveSlide(1);
}, 8000);

function resetInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    moveSlide(1);
  }, 8000);
}


// ==========================================
// FILTRO DE EVENTOS (Estilo TBH Esportes)
// ==========================================
const filterTabs = document.querySelectorAll('.filter-tab');
const eventCards = document.querySelectorAll('.event-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filterValue = tab.getAttribute('data-filter');

    eventCards.forEach(card => {
      const cardStatus = card.getAttribute('data-status');

      if (filterValue === 'todos' || cardStatus === filterValue) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});