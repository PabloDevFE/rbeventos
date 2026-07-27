document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Mobile Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if(mobileToggle && navMenu) {
        mobileToggle.setAttribute('aria-expanded', 'false');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
            
            // Troca o ícone do menu
            const icon = mobileToggle.querySelector('i');
            if(isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Fechar menu mobile ao clicar num link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', 'Abrir menu');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Efeito Reveal on Scroll (Usando Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Ativa quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Para a animação acontecer apenas uma vez
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Navbar Shadow/Background no Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

});
