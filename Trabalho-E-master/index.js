document.addEventListener('DOMContentLoaded', (event) => {
  const text = document.querySelector('.text');
  text.classList.add('active');
  });

  const carousel = document.querySelector('.carousel');
  const slidesContainer = carousel.querySelector('.slides');
  const slides = Array.from(slidesContainer.children);
  const prevButton = carousel.querySelector('.prev-button');
  const nextButton = carousel.querySelector('.next-button');
  const slideWidth = slides[0].offsetWidth;
  const slideMargin = 10; // Defina a margem entre os slides aqui
  const swipeThreshold = slideWidth / 4; // Defina o limiar de deslize aqui
  
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let currentIndex = 0;
  
  // Função para mover os slides
  function moveSlides() {
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
  }
  
  // Função para iniciar o arrasto (drag)
  function dragStart(index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
      slidesContainer.classList.add('grabbing');
    };
  }
  
  // Função para arrastar (drag) o carrossel
  function dragMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      const diff = currentPosition - startPos;
      currentTranslate = prevTranslate + diff;
      moveSlides();
    }
  }
  
  // Função para finalizar o arrasto (drag)
  function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
  
    const diff = currentTranslate - prevTranslate;
    if (diff < -swipeThreshold && currentIndex < slides.length - 1) {
      currentIndex++;
    } else if (diff > swipeThreshold && currentIndex > 0) {
      currentIndex--;
    }
  
    currentTranslate = currentIndex * (-slideWidth - slideMargin);
    prevTranslate = currentTranslate;
  
    moveSlides();
    slidesContainer.classList.remove('grabbing');
  }
  
  // Função para obter a posição X do evento de toque ou clique
  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }
  
  // Adicionar eventos de arrasto (drag) para dispositivos móveis
  slides.forEach((slide, index) => {
    slide.addEventListener('touchstart', dragStart(index), { passive: true });
    slide.addEventListener('touchmove', dragMove, { passive: true });
    slide.addEventListener('touchend', dragEnd, { passive: true });
  
    slide.addEventListener('mousedown', dragStart(index));
    slide.addEventListener('mousemove', dragMove);
    slide.addEventListener('mouseup', dragEnd);
    slide.addEventListener('mouseleave', dragEnd);
  });
  
  // Evento de clique no botão "Próximo"
  nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    currentTranslate = currentIndex * (-slideWidth - slideMargin);
    prevTranslate = currentTranslate;
    moveSlides();
  });
  
  // Evento de clique no botão "Anterior"
  prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }
    currentTranslate = currentIndex * (-slideWidth - slideMargin);
    prevTranslate = currentTranslate;
    moveSlides();
  });
  
  // Redimensionar os slides e recalcular a posição dos slides
  function resizeSlides() {
    slideWidth = slides[0].offsetWidth;
    currentTranslate = currentIndex * (-slideWidth - slideMargin);
    prevTranslate = currentTranslate;
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
  }
  
  // Chamar a função de redimensionamento ao carregar a página e ao redimensionar a janela
  window.addEventListener('load', resizeSlides);
  window.addEventListener('resize', resizeSlides);
  