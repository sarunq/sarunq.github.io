const carouselContainer = document.querySelector('.carousel-container');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100; // Move the carousel
    carouselContainer.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

   const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });