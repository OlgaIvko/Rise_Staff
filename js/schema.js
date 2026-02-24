// schema.js - Schema.org разметка для Rise Staff
(function () {
  const scripts = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Rise Staff",
      description:
        "Платформа для автоматизации найма, обучения и управления командой в риэлторском агентстве",
      url: "https://risestaff.ru",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "RUB",
        availability: "https://schema.org/PreOrder",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "124",
      },
      featureList: [
        "Геймификация процессов",
        "Автоматизация найма",
        "Обучение персонала",
        "Интеграция с amoCRM",
        "Уровни и челленджи",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Как работает геймификация в Rise Staff?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Мы превращаем рабочие процессы в уровни и челленджи. Сотрудники видят четкий карьерный путь и получают награды за достижения.",
          },
        },
        {
          "@type": "Question",
          name: "С какими CRM интегрируется Rise Staff?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "У нас готовая интеграция с amoCRM. Интеграция с Bitrix24 находится в разработке.",
          },
        },
      ],
    },
  ];

  scripts.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.body.appendChild(script);
  });

  console.log("✅ Schema.org разметка добавлена");
})();
