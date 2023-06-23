document.addEventListener('DOMContentLoaded', (event) => {
  const text = document.querySelector('.text');
  text.classList.add('active');
});

const carousel = document.querySelector('.carousel');
const slidesContainer = carousel.querySelector('.slides');
const slides = Array.from(slidesContainer.children);
const slideWidth = slides[0].offsetWidth;
const slideMargin = 10; // Defina a margem entre os slides aqui

let currentIndex = 0;

// Função para mover os slides
function moveSlides() {
  const translateX = -currentIndex * (slideWidth );
  slidesContainer.style.transform = `translateX(${translateX}px)`;
}

// Evento de clique na seta "Anterior"
const leftArrow = carousel.querySelector('.left-arrow');
leftArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveSlides();
});

// Evento de clique na seta "Próximo"
const rightArrow = carousel.querySelector('.right-arrow');
rightArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveSlides();
});
