document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('active');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const videos = document.querySelectorAll('video');
  videos.forEach(video => video.addEventListener('play', () => videos.forEach(other => { if (other !== video) other.pause(); })));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) entry.target.pause(); }), { threshold: .2 });
    videos.forEach(video => observer.observe(video));
    const reveal = new IntersectionObserver((entries, currentObserver) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); currentObserver.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -35px' });
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
  } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('active'));
});
