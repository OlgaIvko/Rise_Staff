// ===== FAQ АККОРДЕОН =====
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isExpanded = question.getAttribute("aria-expanded") === "true";

      // Закрываем все другие открытые вопросы
      faqItems.forEach((otherItem) => {
        const otherQuestion = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");

        if (
          otherItem !== item &&
          otherQuestion.getAttribute("aria-expanded") === "true"
        ) {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherAnswer.setAttribute("aria-hidden", "true");
        }
      });

      // Открываем/закрываем текущий
      question.setAttribute("aria-expanded", !isExpanded);
      answer.setAttribute("aria-hidden", isExpanded);
    });
  });
});
