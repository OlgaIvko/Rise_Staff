// Solution Slider
function initSolutionSlider() {
  const slides = document.querySelectorAll(".solution-slide");
  const contents = document.querySelectorAll(".solution-content__item");
  const dots = document.querySelectorAll(".solution-nav__dot");
  const prevBtn = document.querySelector(".solution-nav__btn--prev");
  const nextBtn = document.querySelector(".solution-nav__btn--next");

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;

  function updateSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("solution-slide--active");
    });

    contents.forEach((content) => {
      content.classList.remove("solution-content__item--active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("solution-nav__dot--active");
    });

    slides[index].classList.add("solution-slide--active");
    contents[index].classList.add("solution-content__item--active");
    dots[index].classList.add("solution-nav__dot--active");

    currentSlide = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      const prev = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlide(prev);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      const next = (currentSlide + 1) % totalSlides;
      updateSlide(next);
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      updateSlide(index);
      startAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      const next = (currentSlide + 1) % totalSlides;
      updateSlide(next);
    }, 6000);
  }

  updateSlide(0);
  startAutoSlide();

  const solutionCard = document.querySelector(".solution-card");
  if (solutionCard) {
    solutionCard.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });

    solutionCard.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }
}
