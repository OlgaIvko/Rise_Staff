// Main JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initLoader();
  initNavigation();
  initHeroCards(); // Используем только initHeroCards
  initScrollAnimations();
  initSolutionSteps();
  initDemoSlider();
  // initContactForm();

  console.log("Rise_Staff initialized");
});

// Loader
function initLoader() {
  const loader = document.querySelector(".loader");

  // Если лоадер не найден, выходим
  if (!loader) {
    console.log("Loader not found");
    return;
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 1000);
  });
}

// Navigation
function initNavigation() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  const navLinks = document.querySelectorAll(".nav__link");

  // Проверяем существование элементов
  if (!toggle || !menu) {
    console.log("Navigation elements not found");
    return;
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      menu.classList.toggle("active");
    });
  }

  // Close menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (toggle) toggle.classList.remove("active");
      if (menu) menu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (!header) return;

    if (window.scrollY > 50) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  });
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-animation]");

  // Если нет элементов с анимацией, выходим
  if (!animatedElements.length) {
    console.log("No animated elements found");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.delay || 0;

          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, parseInt(delay));

          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(element);
  });
}

// Solution steps animation
function initSolutionSteps() {
  const steps = document.querySelectorAll(".solution-step");

  // Если нет steps, выходим
  if (!steps.length) {
    console.log("No solution steps found");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  steps.forEach((step) => {
    observer.observe(step);
  });
}

// Demo slider
function initDemoSlider() {
  const slides = document.querySelectorAll(".demo-slide");
  const dots = document.querySelectorAll(".demo-slider__dot");
  const prevBtn = document.querySelector(".demo-slider__btn--prev");
  const nextBtn = document.querySelector(".demo-slider__btn--next");

  // Если нет слайдов, выходим
  if (!slides.length) {
    console.log("No demo slides found");
    return;
  }

  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlider(slideIndex) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("demo-slide--active");
    });

    // Remove active class from all dots
    if (dots.length) {
      dots.forEach((dot) => {
        dot.classList.remove("demo-slider__dot--active");
      });
    }

    // Show current slide
    slides[slideIndex].classList.add("demo-slide--active");

    if (dots[slideIndex]) {
      dots[slideIndex].classList.add("demo-slider__dot--active");
    }

    currentSlide = slideIndex;
  }

  // Next slide
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      updateSlider(nextSlide);
    });
  }

  // Previous slide
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider(prevSlide);
    });
  }

  // Dots navigation
  if (dots.length) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateSlider(index);
      });
    });
  }

  // Auto-advance slides
  let slideInterval;

  function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      updateSlider(nextSlide);
    }, 5000);
  }

  // Initialize first slide
  updateSlider(0);
  startAutoSlide();

  // Останавливаем автопрокрутку при наведении
  const slider = document.querySelector(".demo-slider");
  if (slider) {
    slider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    slider.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }
}

// Contact form

// Contact form - ИСПРАВЛЕННАЯ ВЕРСИЯ
// function initContactForm() {
//   const form = document.getElementById("demo-form");

//   if (!form) {
//     console.log("Contact form not found");
//     return;
//   }

//   // НЕ отменяем стандартную отправку (e.preventDefault() НЕ ВЫЗЫВАЕМ!)
//   form.addEventListener("submit", function (e) {
//     // Визуальные изменения: меняем кнопку, но форму не блокируем
//     const submitBtn = form.querySelector(".btn");
//     if (submitBtn) {
//       submitBtn.innerHTML =
//         '<i class="fas fa-spinner fa-spin"></i> Отправка...';
//       submitBtn.disabled = true;
//     }
//     // Форма продолжит отправку самостоятельно, как обычная HTML-форма
//     // Благодаря полю _next, пользователь будет перенаправлен на thanks.html
//   });
// }
// Hero Cards Slider
function initHeroCards() {
  const cards = document.querySelectorAll(".hero-card");
  const dots = document.querySelectorAll(".hero-cards__dot");
  const prevBtn = document.querySelector(".hero-cards__nav-btn--prev");
  const nextBtn = document.querySelector(".hero-cards__nav-btn--next");

  if (!cards.length) return;

  let currentCard = 0;
  const totalCards = cards.length;
  let autoSlideInterval;

  function updateCards(cardIndex) {
    // Скрыть все карточки
    cards.forEach((card) => {
      card.classList.remove("hero-card--active");
    });

    // Убрать активные точки
    dots.forEach((dot) => {
      dot.classList.remove("hero-cards__dot--active");
    });

    // Показать текущую карточку
    cards[cardIndex].classList.add("hero-card--active");

    // Активировать точку
    if (dots[cardIndex]) {
      dots[cardIndex].classList.add("hero-cards__dot--active");
    }

    currentCard = cardIndex;
  }

  // Навигация
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      const prevCard = (currentCard - 1 + totalCards) % totalCards;
      updateCards(prevCard);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      const nextCard = (currentCard + 1) % totalCards;
      updateCards(nextCard);
      startAutoSlide();
    });
  }

  // Навигация по точкам
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      updateCards(index);
      startAutoSlide();
    });
  });

  // Автопрокрутка
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      const nextCard = (currentCard + 1) % totalCards;
      updateCards(nextCard);
    }, 5000);
  }

  // Инициализация
  updateCards(0);
  startAutoSlide();

  // Остановка автопрокрутки при наведении
  const cardsContainer = document.querySelector(".hero__cards");
  if (cardsContainer) {
    cardsContainer.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });

    cardsContainer.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function () {
  initHeroCards();
  console.log("Rise_Staff - Hero Cards initialized");
});
// Анимация для карточек Solution
function initSolutionCards() {
  const cards = document.querySelectorAll(".solution-grid__card");

  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Не отключаем наблюдение, чтобы анимация не повторялась
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
}

// Запуск при загрузке
document.addEventListener("DOMContentLoaded", function () {
  initSolutionCards();
});

// ===== ГЛАВНЫЙ ФАЙЛ ИНИЦИАЛИЗАЦИИ =====

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен, инициализация компонентов...");

  // Инициализация модальных окон (они уже инициализируются в своих файлах)
  // Но мы можем добавить дополнительные обработчики

  // Добавляем обработчики на все кнопки "Демо-доступ"
  document
    .querySelectorAll('.cta-button, .btn-primary, [href="#demo"], #demoTrigger')
    .forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        // Используем глобальный экземпляр
        if (window.sideDemoModal) {
          window.sideDemoModal.open();
          window.sideDemoModal.hideMini();
        } else {
          console.error("sideDemoModal не инициализирован");
        }
      });
    });

  // Ссылка на политику конфиденциальности в cookie
  const privacyLink = document.getElementById("privacyLink");
  if (privacyLink && window.privacyModal) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.privacyModal.open();
    });
  }

  // Для отладки в консоли
  window.openSideModal = () => window.sideDemoModal?.open();
  window.closeSideModal = () => window.sideDemoModal?.close();
  window.showMiniModal = () => window.sideDemoModal?.showMini();
  window.hideMiniModal = () => window.sideDemoModal?.hideMini();

  console.log("✅ Все компоненты инициализированы");
  console.log(
    "ℹ️ Команды для отладки: openSideModal(), closeSideModal(), showMiniModal(), hideMiniModal()",
  );

  // Сброс для тестирования
  window.resetSideModal = () => {
    localStorage.removeItem("demoRequested");
    sessionStorage.clear();
    location.reload();
  };
});
