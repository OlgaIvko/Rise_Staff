// simple-buttons.js - ПОЛНАЯ РАБОЧАЯ ВЕРСИЯ

console.log("🟢 simple-buttons.js загружен");

// Запускаем после загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM загружен, активируем формы");
  activateButtons();
});

// Главная функция
function activateButtons() {
  addButtonStyles();
  setupMainForm();
  setupModalForm();
  setupModalOpeners();
}

// Настройка основной формы
function setupMainForm() {
  const form = document.getElementById("demo-form");
  const consent = document.getElementById("formConsent");
  const button = document.getElementById("formSubmitBtn");

  if (!form || !consent || !button) {
    console.warn("❌ Основная форма не найдена");
    return;
  }

  console.log("✅ Основная форма найдена");

  // Начальное состояние
  button.disabled = true;
  button.style.opacity = "0.6";

  // Обработчик чекбокса
  consent.addEventListener("change", function () {
    button.disabled = !this.checked;
    button.style.opacity = this.checked ? "1" : "0.6";
    button.style.cursor = this.checked ? "pointer" : "not-allowed";
  });

  // Обработчик отправки
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!consent.checked) {
      showNotification("Необходимо согласиться на обработку данных", "warning");
      return;
    }

    // Блокируем кнопку
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Отправка...";

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/Rtarzhakayev@gmail.com",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      console.log("Ответ:", result);

      if (response.ok) {
        showNotification("✅ Спасибо! Мы свяжемся с вами", "success");
        form.reset();
        consent.checked = false;
        button.disabled = true;
        button.style.opacity = "0.6";
      } else {
        showNotification("❌ Ошибка отправки", "error");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      showNotification("❌ Ошибка соединения", "error");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

// Настройка модальной формы
function setupModalForm() {
  const form = document.getElementById("sideModalForm");
  const consent = document.getElementById("modalConsent");
  const button = document.getElementById("modalSubmitBtn");

  if (!form || !consent || !button) {
    console.warn("❌ Модальная форма не найдена");
    return;
  }

  console.log("✅ Модальная форма найдена");

  // Начальное состояние
  button.disabled = true;
  button.style.opacity = "0.6";

  // Обработчик чекбокса
  consent.addEventListener("change", function () {
    button.disabled = !this.checked;
    button.style.opacity = this.checked ? "1" : "0.6";
    button.style.cursor = this.checked ? "pointer" : "not-allowed";
    console.log("Чекбокс:", this.checked ? "✅" : "❌");
  });

  // Обработчик отправки
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("📤 Отправка модальной формы");

    if (!consent.checked) {
      showNotification("Необходимо согласиться на обработку данных", "warning");
      return;
    }

    // Блокируем кнопку
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Отправка...";

    const formData = new FormData(form);
    console.log("Данные:", Object.fromEntries(formData));

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/Rtarzhakayev@gmail.com",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      console.log("Ответ:", result);

      if (response.ok) {
        showNotification("✅ Спасибо! Мы свяжемся с вами", "success");

        // Сбрасываем форму
        form.reset();
        consent.checked = false;
        button.disabled = true;
        button.style.opacity = "0.6";

        // Закрываем модалку через 2 секунды
        setTimeout(() => {
          // Пробуем разные способы закрыть
          if (window.sideDemoModal && window.sideDemoModal.close) {
            window.sideDemoModal.close();
          } else {
            const closeBtn = document.getElementById("closeSideModalBtn");
            if (closeBtn) closeBtn.click();
          }
        }, 2000);
      } else {
        showNotification("❌ Ошибка отправки", "error");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      showNotification("❌ Ошибка соединения", "error");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

// Кнопки открытия модалки
function setupModalOpeners() {
  const buttons = document.querySelectorAll(
    '[href="#demo"], .btn--primary, .btn-primary',
  );

  buttons.forEach((btn) => {
    if (btn.id === "formSubmitBtn" || btn.id === "modalSubmitBtn") return;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Открываем модалку");

      if (window.sideDemoModal && window.sideDemoModal.open) {
        window.sideDemoModal.open();

        // Сбрасываем чекбокс
        setTimeout(() => {
          const modalConsent = document.getElementById("modalConsent");
          const modalButton = document.getElementById("modalSubmitBtn");
          if (modalConsent && modalButton) {
            modalConsent.checked = false;
            modalButton.disabled = true;
            modalButton.style.opacity = "0.6";
          }
        }, 300);
      }
    });
  });
}

// Уведомления
function showNotification(text, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === "success" ? "#10B981" : type === "warning" ? "#F59E0B" : "#EF4444"};
    color: white;
    border-radius: 8px;
    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.2);
    z-index: 10002;
    animation: slideIn 0.3s ease;
    font-weight: 500;
  `;

  notification.textContent = text;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) notification.remove();
    }, 300);
  }, 3000);
}

// Стили
function addButtonStyles() {
  if (document.getElementById("button-styles")) return;

  const style = document.createElement("style");
  style.id = "button-styles";
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    .consent-label {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
    }
    .consent-checkbox {
      width: 18px;
      height: 18px;
      accent-color: #2A5BDB;
    }
    .consent-text {
      font-size: 14px;
      color: #6B7280;
    }
    .consent-link {
      color: #2A5BDB;
      text-decoration: none;
    }
    .consent-link:hover {
      text-decoration: underline;
    }
  `;

  document.head.appendChild(style);
}

// Функции для отладки
window.testModal = function () {
  const consent = document.getElementById("modalConsent");
  const button = document.getElementById("modalSubmitBtn");
  if (consent && button) {
    consent.checked = true;
    button.disabled = false;
    button.style.opacity = "1";
    console.log("✅ Тест: кнопка активирована");
  }
};

console.log("✅ simple-buttons.js готов");
console.log("📝 Команда: testModal()");
// simple-modal.js - ПРОСТАЯ РАБОЧАЯ МОДАЛКА

console.log("🟢 simple-modal.js загружен");

document.addEventListener("DOMContentLoaded", function () {
  // ===== ЭЛЕМЕНТЫ =====
  const overlay = document.getElementById("simpleModalOverlay");
  const openBtn = document.getElementById("testOpenModalBtn");
  const closeBtn = document.getElementById("simpleCloseBtn");
  const cancelBtn = document.getElementById("simpleCancelBtn");
  const form = document.getElementById("simpleModalForm");
  const consent = document.getElementById("simpleConsent");
  const submitBtn = document.getElementById("simpleSubmitBtn");
  const successMsg = document.getElementById("simpleSuccessMessage");

  // ===== ОТКРЫТИЕ =====
  function openModal() {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Сбрасываем форму
    form.reset();
    form.style.display = "block";
    successMsg.style.display = "none";
    consent.checked = false;
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    submitBtn.style.cursor = "not-allowed";

    console.log("✅ Модалка открыта");
  }

  // ===== ЗАКРЫТИЕ =====
  function closeModal() {
    overlay.style.display = "none";
    document.body.style.overflow = "";
    console.log("✅ Модалка закрыта");
  }

  // Кнопки открытия
  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }

  // Кнопки закрытия
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  // Закрытие по клику на фон
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // ===== ЧЕКБОКС =====
  consent.addEventListener("change", function () {
    if (this.checked) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
      console.log("✅ Кнопка активирована");
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.5";
      submitBtn.style.cursor = "not-allowed";
    }
  });

  // ===== ОТПРАВКА =====
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("📤 Отправка формы...");

    if (!consent.checked) {
      alert("Поставьте галочку согласия");
      return;
    }

    // Блокируем кнопку
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Отправка...";

    // Собираем данные
    const formData = new FormData();
    formData.append("name", document.getElementById("simpleName").value);
    formData.append("phone", document.getElementById("simplePhone").value);
    formData.append(
      "email",
      document.getElementById("simpleEmail").value || "не указан",
    );
    formData.append("_subject", "🔔 Заявка из простой модалки");
    formData.append("_token", "4154a2bbfc843db5b94a9ff017365cc4");

    console.log("Отправляем:", Object.fromEntries(formData));

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/Rtarzhakayev@gmail.com",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      console.log("Ответ:", result);

      if (response.ok) {
        // Показываем сообщение об успехе
        form.style.display = "none";
        successMsg.style.display = "block";

        // Закрываем через 2 секунды
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        alert("Ошибка отправки. Попробуйте позже");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения");
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  // ===== ДЛЯ ВАШИХ КНОПОК =====
  // Добавляем обработчик на все кнопки с классом btn--primary
  document
    .querySelectorAll('.btn--primary, .cta-button, [href="#demo"]')
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });

  console.log("✅ Простая модалка готова");
});

// Глобальная функция для теста
window.testSimpleModal = function () {
  document.getElementById("simpleModalOverlay").style.display = "flex";
}; // fix-modal.js - ИСПРАВЛЕНИЕ ОТПРАВКИ ДЛЯ ВАШЕЙ МОДАЛКИ

console.log("🔧 Исправление отправки модалки");

document.addEventListener("DOMContentLoaded", function () {
  // Находим вашу форму
  const modalForm = document.getElementById("sideModalForm");
  const modalConsent = document.getElementById("modalConsent");
  const modalButton = document.getElementById("modalSubmitBtn");

  if (!modalForm || !modalConsent || !modalButton) {
    console.error("❌ Элементы модалки не найдены");
    return;
  }

  console.log("✅ Элементы модалки найдены");

  // Убираем старый обработчик (создаем новую форму)
  const newForm = modalForm.cloneNode(true);
  modalForm.parentNode.replaceChild(newForm, modalForm);

  // Получаем новые элементы
  const newModalForm = document.getElementById("sideModalForm");
  const newConsent = document.getElementById("modalConsent");
  const newButton = document.getElementById("modalSubmitBtn");

  // Начальное состояние
  newButton.disabled = true;
  newButton.style.opacity = "0.6";

  // Обработчик чекбокса
  newConsent.addEventListener("change", function () {
    newButton.disabled = !this.checked;
    newButton.style.opacity = this.checked ? "1" : "0.6";
    newButton.style.cursor = this.checked ? "pointer" : "not-allowed";
    console.log("Чекбокс:", this.checked ? "✅" : "❌");
  });

  // Обработчик отправки
  newModalForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("📤 Отправка формы...");

    if (!newConsent.checked) {
      alert("Поставьте галочку согласия");
      return;
    }

    // Блокируем кнопку
    newButton.disabled = true;
    const originalText = newButton.textContent;
    newButton.textContent = "Отправка...";

    // Собираем данные
    const formData = new FormData(newModalForm);
    formData.append("_token", "4154a2bbfc843db5b94a9ff017365cc4");

    console.log("Данные:", Object.fromEntries(formData));

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/Rtarzhakayev@gmail.com",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      console.log("Ответ:", result);

      if (response.ok) {
        alert("✅ Спасибо! Заявка отправлена");

        // Очищаем форму
        newModalForm.reset();
        newConsent.checked = false;
        newButton.disabled = true;
        newButton.style.opacity = "0.6";
        newButton.textContent = "Отправить заявку";

        // Закрываем модалку
        setTimeout(() => {
          const closeBtn = document.getElementById("closeSideModalBtn");
          if (closeBtn) closeBtn.click();
        }, 3500);
      } else {
        alert("❌ Ошибка отправки");
        newButton.disabled = false;
        newButton.textContent = originalText;
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("❌ Ошибка соединения");
      newButton.disabled = false;
      newButton.textContent = originalText;
    }
  });

  console.log("✅ Исправление готово");
});

// Ручной тест
window.testModalSend = function () {
  const consent = document.getElementById("modalConsent");
  const button = document.getElementById("modalSubmitBtn");
  if (consent && button) {
    consent.checked = true;
    button.disabled = false;
    button.style.opacity = "1";
    console.log("✅ Кнопка активирована");
  }
};
// simple-buttons.js - ИСПРАВЛЕННАЯ ВЕРСИЯ

console.log("🟢 simple-buttons.js загружен");

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM загружен, активируем формы");
  activateButtons();
});

function activateButtons() {
  addButtonStyles();
  setupMainForm();
  setupModalForm();
  setupModalOpeners();
}

// Настройка основной формы
function setupMainForm() {
  const form = document.getElementById("demo-form");
  const consent = document.getElementById("formConsent");
  const button = document.getElementById("formSubmitBtn");

  if (!form || !consent || !button) {
    console.warn("❌ Основная форма не найдена");
    return;
  }

  console.log("✅ Основная форма найдена");

  button.disabled = true;
  button.style.opacity = "0.6";

  consent.addEventListener("change", function () {
    button.disabled = !this.checked;
    button.style.opacity = this.checked ? "1" : "0.6";
    button.style.cursor = this.checked ? "pointer" : "not-allowed";
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!consent.checked) {
      showNotification("Необходимо согласиться на обработку данных", "warning");
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Отправка...";

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/Rtarzhakayev@gmail.com",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      console.log("Ответ:", result);

      if (response.ok && result.success === "true") {
        showNotification("✅ Спасибо! Мы свяжемся с вами", "success");
        form.reset();
        consent.checked = false;
        button.disabled = true;
        button.style.opacity = "0.6";
      } else {
        showNotification("❌ Ошибка отправки", "error");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      showNotification("❌ Ошибка соединения", "error");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}
