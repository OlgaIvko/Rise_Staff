// ===== БОКОВОЕ МОДАЛЬНОЕ ОКНО =====
class SideDemoModal {
  constructor() {
    // Поиск элементов
    this.overlay = document.getElementById("sideModalOverlay");
    this.modal = document.getElementById("sideModal");
    this.closeBtn = document.getElementById("closeSideModalBtn");
    this.closeModalFormBtn = document.getElementById("closeModalFormBtn");
    this.form = document.getElementById("sideModalForm");
    this.success = document.getElementById("sideModalSuccess");
    this.closeSuccessBtn = document.getElementById("closeSideSuccessBtn");
    this.miniModal = document.getElementById("sideModalMini");
    this.miniCloseBtn = document.getElementById("closeMiniBtn");
    this.consent = document.getElementById("modalConsent");
    this.submitBtn = document.getElementById("modalSubmitBtn");

    // Таймер для мини-модалки
    this.miniTimer = null;

    // Проверка наличия элементов
    if (!this.overlay) {
      console.error("❌ Элементы модального окна не найдены!");
      return;
    }

    console.log("✅ SideDemoModal инициализирован");
    this.init();
  }

  init() {
    // Закрытие по крестику в хедере
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    // Закрытие по кнопке в форме
    if (this.closeModalFormBtn) {
      this.closeModalFormBtn.addEventListener("click", (e) => {
        e.preventDefault();
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

    // Обработка чекбокса
    if (this.consent && this.submitBtn) {
      // Начальное состояние
      this.submitBtn.disabled = true;
      this.submitBtn.style.opacity = "0.6";

      this.consent.addEventListener("change", () => {
        this.submitBtn.disabled = !this.consent.checked;
        this.submitBtn.style.opacity = this.consent.checked ? "1" : "0.6";
        this.submitBtn.style.cursor = this.consent.checked
          ? "pointer"
          : "not-allowed";
      });
    }

    // ===== ИСПРАВЛЕНО: НЕ БЛОКИРУЕМ ОТПРАВКУ =====
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        console.log("📤 Отправка формы (класс SideDemoModal)");
        // НЕ вызываем preventDefault - пусть работает простой обработчик
      });
    }

    // Закрыть окно успеха
    if (this.closeSuccessBtn) {
      this.closeSuccessBtn.addEventListener("click", () => this.close());
    }

    // Открытие по клику на мини-версию
    if (this.miniModal) {
      this.miniModal.addEventListener("click", (e) => {
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
        this.scheduleNextMini(60000);
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
    document.body.style.overflow = "hidden";
    console.log("✅ Модальное окно открыто");

    // Сбрасываем состояние формы
    if (this.form) this.form.reset();
    if (this.consent) this.consent.checked = false;
    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.style.opacity = "0.6";
    }
    if (this.success) this.success.style.display = "none";
    if (this.form) this.form.style.display = "block";

    // Скрываем мини-версию
    this.hideMini();

    // Отменяем запланированный показ мини
    if (this.miniTimer) {
      clearTimeout(this.miniTimer);
      this.miniTimer = null;
    }

    // ПРОВЕРКА: если заявка уже отправлена - не открываем
    if (localStorage.getItem("demoRequested") === "true") {
      console.log("⏭️ Заявка уже отправлена, модалка не открывается");
      return;
    }

    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    console.log("✅ Модальное окно открыто");

    // Сбрасываем состояние формы
    if (this.form) this.form.reset();
    if (this.consent) this.consent.checked = false;
    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.style.opacity = "0.6";
    }
    if (this.success) this.success.style.display = "none";
    if (this.form) this.form.style.display = "block";

    // Скрываем мини-версию
    this.hideMini();

    // Отменяем запланированный показ мини
    if (this.miniTimer) {
      clearTimeout(this.miniTimer);
      this.miniTimer = null;
    }
  }

  close() {
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
    console.log("✅ Модальное окно закрыто");

    // Планируем следующее появление мини-модалки
    this.scheduleNextMini(30000);
  }

  scheduleNextMini(delay = 30000) {
    if (this.miniTimer) {
      clearTimeout(this.miniTimer);
    }
    // ПРОВЕРКА: если заявка уже отправлена - не планируем
    if (localStorage.getItem("demoRequested") === "true") {
      console.log("⏭️ Заявка уже отправлена, мини-модалка не планируется");
      return;
    }

    this.miniTimer = setTimeout(() => {
      if (!this.isOpen() && !sessionStorage.getItem("miniModalClosed")) {
        this.showMini();
      }
    }, delay);
    const demoRequested = localStorage.getItem("demoRequested");

    if (demoRequested) {
      console.log("⏭️ Заявка уже была, мини-модалка не появится");
      return;
    }

    this.miniTimer = setTimeout(() => {
      if (!this.isOpen() && !sessionStorage.getItem("miniModalClosed")) {
        this.showMini();
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
      console.log("✅ Мини-модалка показана");

      setTimeout(() => {
        this.hideMini();
        this.scheduleNextMini(60000);
      }, 15000);
    }

    if (localStorage.getItem("demoRequested") === "true") {
      console.log("⏭️ Заявка уже отправлена, мини-модалка не показывается");
      return;
    }

    if (
      this.miniModal &&
      !sessionStorage.getItem("miniModalClosed") &&
      !this.isOpen()
    ) {
      this.miniModal.classList.add("show");
      console.log("✅ Мини-модалка показана");

      setTimeout(() => {
        this.hideMini();
        this.scheduleNextMini(60000);
      }, 15000);
    }
  }

  hideMini() {
    if (this.miniModal) {
      this.miniModal.classList.remove("show");
    }
  }

  setupAutoPopup() {
    const demoRequested = localStorage.getItem("demoRequested");

    if (demoRequested) return;

    setTimeout(() => {
      if (!sessionStorage.getItem("miniModalClosed")) {
        this.showMini();
      }
    }, 10000);

    setTimeout(() => {
      if (!sessionStorage.getItem("sidePopupShown") && !demoRequested) {
        this.open();
        sessionStorage.setItem("sidePopupShown", "true");
      }
    }, 45000);

    window.addEventListener("scroll", () => {
      if (sessionStorage.getItem("sideScrollPopup") || demoRequested) return;

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent > 60 && !this.isOpen()) {
        this.open();
        sessionStorage.setItem("sideScrollPopup", "true");
      }
    });

    document.addEventListener("mouseleave", (e) => {
      if (sessionStorage.getItem("sideExitPopup") || demoRequested) return;

      if (e.clientY < 0 && !this.isOpen()) {
        this.open();
        sessionStorage.setItem("sideExitPopup", "true");
      }
    });

    // ПРОВЕРКА: если заявка уже отправлена - ничего не настраиваем
    if (localStorage.getItem("demoRequested") === "true") {
      console.log("⏭️ Заявка уже отправлена, автопоказ отключен");
      return;
    }

    setTimeout(() => {
      if (!sessionStorage.getItem("miniModalClosed")) {
        this.showMini();
      }
    }, 10000);

    setTimeout(() => {
      if (
        !sessionStorage.getItem("sidePopupShown") &&
        !localStorage.getItem("demoRequested")
      ) {
        this.open();
        sessionStorage.setItem("sidePopupShown", "true");
      }
    }, 45000);

    window.addEventListener("scroll", () => {
      if (
        sessionStorage.getItem("sideScrollPopup") ||
        localStorage.getItem("demoRequested") === "true"
      )
        return;

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent > 60 && !this.isOpen()) {
        this.open();
        sessionStorage.setItem("sideScrollPopup", "true");
      }
    });

    document.addEventListener("mouseleave", (e) => {
      if (
        sessionStorage.getItem("sideExitPopup") ||
        localStorage.getItem("demoRequested") === "true"
      )
        return;

      if (e.clientY < 0 && !this.isOpen()) {
        this.open();
        sessionStorage.setItem("sideExitPopup", "true");
      }
    });
  }
}

// ===== МОДАЛЬНОЕ ОКНО ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ =====
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
  }

  isOpen() {
    return this.overlay.classList.contains("active");
  }

  open() {
    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    console.log("Privacy modal opened");
  }

  close() {
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
    console.log("Privacy modal closed");
  }
}
// Тестовые функции - добавьте в конец файла
window.testModalClose = function () {
  const modal = document.getElementById("sideModalOverlay");
  if (modal) modal.classList.remove("active");
  console.log("🔧 Тест: модалка закрыта");
};

window.testModalOpen = function () {
  const modal = document.getElementById("sideModalOverlay");
  if (modal) modal.classList.add("active");
  console.log("🔧 Тест: модалка открыта");
};
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

// ПРИНУДИТЕЛЬНАЯ АКТИВАЦИЯ - добавьте в конец файла
setTimeout(() => {
  console.log("🔄 Принудительная активация обработчиков");

  // Находим кнопки закрытия
  const closeBtn = document.getElementById("closeSideModalBtn");
  const closeFormBtn = document.getElementById("closeModalFormBtn");
  const overlay = document.getElementById("sideModalOverlay");

  // Добавляем прямые обработчики (дублирующие, для надежности)
  if (closeBtn) {
    closeBtn.onclick = function () {
      if (overlay) overlay.classList.remove("active");
      document.body.style.overflow = "";
      console.log("🔧 Прямое закрытие по крестику");
    };
  }

  if (closeFormBtn) {
    closeFormBtn.onclick = function () {
      if (overlay) overlay.classList.remove("active");
      document.body.style.overflow = "";
      console.log("🔧 Прямое закрытие по кнопке в форме");
    };
  }

  console.log("✅ Принудительная активация завершена");
}, 1000);

// ===== САМЫЙ ПРОСТОЙ ОБРАБОТЧИК =====
document.addEventListener("DOMContentLoaded", function () {
  console.log("🔄 Запуск простого обработчика");

  const form = document.getElementById("sideModalForm");

  if (!form) {
    console.error("❌ Форма не найдена");
    return;
  }

  console.log("✅ Форма найдена");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("📤 Отправка формы");

    const consent = document.getElementById("modalConsent");

    if (!consent || !consent.checked) {
      alert("Нужно согласиться");
      return;
    }

    // Показываем сообщение об отправке
    alert("Отправка...");

    // Отправляем форму стандартным способом
    this.submit();
  });
});
// ===== УПРАВЛЕНИЕ МОДАЛКОЙ =====
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("sideModalOverlay");
  const closeBtn = document.getElementById("closeSideModalBtn");
  const closeFormBtn = document.getElementById("closeModalFormBtn");
  const closeSuccessBtn = document.getElementById("closeSideSuccessBtn");

  // Функция открытия
  window.openModal = function () {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // Функция закрытия
  window.closeModal = function () {
    overlay.classList.remove("active");
    document.body.style.overflow = "";

    // Сбрасываем форму
    const form = document.getElementById("sideModalForm");
    const success = document.getElementById("sideModalSuccess");
    if (form) form.style.display = "block";
    if (success) success.style.display = "none";
  };

  // Закрытие по крестику
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeFormBtn) closeFormBtn.addEventListener("click", closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener("click", closeModal);

  // Закрытие по клику на фон
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  // Открытие по кнопкам
  document.querySelectorAll('[href="#demo"], .btn--primary').forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Обработка отправки формы
  const form = document.getElementById("sideModalForm");
  const success = document.getElementById("sideModalSuccess");

  if (form) {
    form.addEventListener("submit", function () {
      setTimeout(() => {
        form.style.display = "none";
        success.style.display = "block";
      }, 100);
    });
  }

  // Мини-модалка
  const miniModal = document.getElementById("sideModalMini");
  const miniClose = document.getElementById("closeMiniBtn");

  if (miniModal) {
    miniModal.addEventListener("click", function (e) {
      if (!e.target.closest(".side-modal-mini-close")) {
        openModal();
        miniModal.classList.remove("show");
      }
    });
  }

  if (miniClose) {
    miniClose.addEventListener("click", function (e) {
      e.stopPropagation();
      miniModal.classList.remove("show");
    });
  }

  // Показ мини-модалки через 10 сек
  setTimeout(() => {
    if (miniModal && !localStorage.getItem("demoRequested")) {
      miniModal.classList.add("show");
    }
  }, 10000);

  // В самом конце файла, в простом обработчике:
  document.addEventListener("DOMContentLoaded", function () {
    console.log("🔄 Запуск простого обработчика");

    const form = document.getElementById("sideModalForm");

    if (!form) {
      console.error("❌ Форма не найдена");
      return;
    }

    console.log("✅ Форма найдена");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      console.log("📤 Отправка формы");

      const consent = document.getElementById("modalConsent");

      if (!consent || !consent.checked) {
        alert("Нужно согласиться");
        return;
      }

      // СОХРАНЯЕМ В LOCALSTORAGE ЧТО ЗАЯВКА ОТПРАВЛЕНА
      localStorage.setItem("demoRequested", "true");
      localStorage.setItem("demoRequestTime", new Date().toISOString());

      // Показываем сообщение об отправке
      const formElement = document.getElementById("sideModalForm");
      const successElement = document.getElementById("sideModalSuccess");

      if (formElement && successElement) {
        formElement.style.display = "none";
        successElement.style.display = "block";
      }

      // Отправляем форму стандартным способом
      this.submit();

      console.log("✅ Заявка отправлена, модалки больше не появятся");
    });
  });
});
