// ===== БОКОВОЕ МОДАЛЬНОЕ ОКНО =====
class SideDemoModal {
  constructor() {
    // Поиск элементов
    this.overlay = document.getElementById("sideModalOverlay");
    this.modal = document.getElementById("sideModal");
    this.closeBtn = document.getElementById("closeSideModalBtn");
    this.form = document.getElementById("sideModalForm");
    this.success = document.getElementById("sideModalSuccess");
    this.closeSuccessBtn = document.getElementById("closeSideSuccessBtn");
    this.miniModal = document.getElementById("sideModalMini");
    this.miniCloseBtn = document.getElementById("closeMiniBtn");

    // Проверка наличия элементов
    if (!this.overlay) {
      console.error("Элементы модального окна не найдены!");
      return;
    }

    this.init();
  }

  init() {
    console.log("Инициализация SideDemoModal");

    // Закрытие по крестику
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    // Закрытие по клику на оверлей
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Закрытие по Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // Обработка формы
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    // Закрыть окно успеха
    if (this.closeSuccessBtn) {
      this.closeSuccessBtn.addEventListener("click", () => this.close());
    }

    // Открытие по клику на мини-версию
    if (this.miniModal) {
      this.miniModal.addEventListener("click", (e) => {
        // Не закрываем если клик на кнопку закрытия
        if (!e.target.closest(".side-modal-mini-close")) {
          this.open();
          this.hideMini();
        }
      });
    }

    // Закрытие мини-версии
    if (this.miniCloseBtn) {
      this.miniCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hideMini();
        sessionStorage.setItem("miniModalClosed", "true");
      });
    }

    // Запускаем автоматические попапы
    this.setupAutoPopup();
  }

  isOpen() {
    return this.overlay.classList.contains("active");
  }

  open() {
    this.overlay.classList.add("active");
    console.log("Модальное окно открыто");

    // Скрываем мини-версию когда открыто полное окно
    this.hideMini();
  }

  close() {
    this.overlay.classList.remove("active");
    console.log("Модальное окно закрыто");

    // Сбрасываем форму
    if (this.form) {
      this.form.reset();
      this.form.style.display = "block";
    }
    if (this.success) {
      this.success.style.display = "none";
    }

    // Планируем следующее появление мини-модалки
    this.scheduleNextMini();
  }

  scheduleNextMini(delay = 30000) {
    // 30 секунд по умолчанию
    // Очищаем предыдущий таймер если был
    if (this.miniTimer) {
      clearTimeout(this.miniTimer);
    }

    const demoRequested = localStorage.getItem("demoRequested");

    // Не показываем если уже была заявка
    if (demoRequested) {
      console.log("Заявка уже была, мини-модалка не появится");
      return;
    }

    // Планируем показ мини-модалки
    this.miniTimer = setTimeout(() => {
      // Проверяем что полная модалка не открыта
      if (!this.isOpen() && !sessionStorage.getItem("miniModalClosed")) {
        this.showMini();
        console.log(`Мини-модалка появится через ${delay / 1000} секунд`);
      }
    }, delay);
  }

  showMini() {
    if (
      this.miniModal &&
      !sessionStorage.getItem("miniModalClosed") &&
      !this.isOpen()
    ) {
      this.miniModal.classList.add("show");
      console.log("Мини-модалка показана");
    }
  }

  hideMini() {
    if (this.miniModal) {
      this.miniModal.classList.remove("show");
    }
  }

  handleSubmit() {
    // Собираем данные формы
    const formData = {
      name: document.getElementById("sideName")?.value || "",
      phone: document.getElementById("sidePhone")?.value || "",
      email: document.getElementById("sideEmail")?.value || "",
      company: document.getElementById("sideCompany")?.value || "",
      agents: document.getElementById("sideAgents")?.value || "",
    };

    console.log("Отправка формы:", formData);

    // Показываем сообщение об успехе
    if (this.form && this.success) {
      this.form.style.display = "none";
      this.success.style.display = "block";
    }

    // Сохраняем в localStorage
    localStorage.setItem("demoRequested", "true");

    // Автоматически закрываем через 3 секунды
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  setupAutoPopup() {
    const demoRequested = localStorage.getItem("demoRequested");

    // Не показываем если уже была заявка
    if (demoRequested) return;

    // Показываем мини-версию через 10 секунд
    setTimeout(() => {
      if (!sessionStorage.getItem("miniModalClosed")) {
        this.showMini();
      }
    }, 10000);

    // Показываем полную версию через 45 секунд
    setTimeout(() => {
      if (!sessionStorage.getItem("sidePopupShown") && !demoRequested) {
        this.open();
        sessionStorage.setItem("sidePopupShown", "true");
      }
    }, 45000);

    // При прокрутке 60%
    window.addEventListener("scroll", () => {
      if (sessionStorage.getItem("sideScrollPopup") || demoRequested) return;

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent > 60) {
        this.open();
        sessionStorage.setItem("sideScrollPopup", "true");
      }
    });

    // При попытке уйти со страницы
    document.addEventListener("mouseleave", (e) => {
      if (sessionStorage.getItem("sideExitPopup") || demoRequested) return;

      if (e.clientY < 0) {
        this.open();
        sessionStorage.setItem("sideExitPopup", "true");
      }
    });
  }
}

// ===== МОДАЛЬНОЕ ОКНО ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ =====
class PrivacyModal {
  constructor() {
    this.overlay = document.getElementById("privacyModalOverlay");
    this.closeBtn = document.getElementById("closePrivacyBtn");
    this.agreeBtn = document.getElementById("agreePrivacyBtn");

    if (!this.overlay) {
      console.warn("Privacy modal elements not found");
      return;
    }

    this.init();
  }

  init() {
    // Закрыть по крестику
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Закрыть по клику на оверлей
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Закрыть по Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // Кнопка "Я согласен"
    if (this.agreeBtn) {
      this.agreeBtn.addEventListener("click", () => {
        this.close();
        // Здесь можно добавить логику для согласия
        localStorage.setItem("privacyAgreed", "true");
      });
    }

    // Открыть по клику на ссылку в cookie
    const privacyLink = document.querySelector(".cookie-text a");
    if (privacyLink) {
      privacyLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    }
    // В методе init() добавьте обработку закрытия мини-модалки
    if (this.miniCloseBtn) {
      this.miniCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hideMini();
        sessionStorage.setItem("miniModalClosed", "true");

        // Планируем следующее появление через 2 минуты
        this.scheduleNextMini(60000); // 1 минуты
      });
    }
  }

  isOpen() {
    return this.overlay.classList.contains("active");
  }

  open() {
    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Блокируем прокрутку
    console.log("Privacy modal opened");
  }

  close() {
    this.overlay.classList.remove("active");
    document.body.style.overflow = ""; // Возвращаем прокрутку
    console.log("Privacy modal closed");
  }
}

// ===== COOKIE СОГЛАСИЕ =====
class CookieConsent {
  constructor() {
    this.cookieConsent = document.getElementById("cookieConsent");
    this.acceptBtn = document.getElementById("acceptCookies");
    this.declineBtn = document.getElementById("declineCookies");

    if (!this.cookieConsent) {
      console.warn("Cookie consent elements not found");
      return;
    }

    this.init();
  }

  init() {
    // Проверяем было ли уже согласие
    const cookieChoice = localStorage.getItem("cookieConsent");

    if (!cookieChoice) {
      // Показываем через 2 секунды
      setTimeout(() => {
        this.show();
      }, 2000);
    }

    // Обработчики кнопок
    if (this.acceptBtn) {
      this.acceptBtn.addEventListener("click", () => this.accept());
    }

    if (this.declineBtn) {
      this.declineBtn.addEventListener("click", () => this.decline());
    }
  }

  show() {
    this.cookieConsent.classList.add("show");
  }

  hide() {
    this.cookieConsent.classList.remove("show");
  }

  accept() {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentTime", new Date().toISOString());
    this.hide();
    console.log("Cookies accepted");
  }

  decline() {
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookieConsentTime", new Date().toISOString());
    this.hide();
    console.log("Cookies declined");
  }
}

// Инициализация
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.privacyModal = new PrivacyModal();
    window.cookieConsent = new CookieConsent();
  });
} else {
  window.privacyModal = new PrivacyModal();
  window.cookieConsent = new CookieConsent();
}

// Инициализация после загрузки DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.sideDemoModal = new SideDemoModal();
  });
} else {
  window.sideDemoModal = new SideDemoModal();
}
