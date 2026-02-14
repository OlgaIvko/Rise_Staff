// Additional animation effects

document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to problem cards
  const problemCards = document.querySelectorAll(".problem-card");

  problemCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Animate principle visuals on scroll
  const principles = document.querySelectorAll(".principle");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const principleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const visual = entry.target.querySelector(".visual-placeholder");
        if (visual) {
          visual.style.animation = "pulse 2s ease-in-out";

          setTimeout(() => {
            visual.style.animation = "";
          }, 2000);
        }
      }
    });
  }, observerOptions);

  principles.forEach((principle) => {
    principleObserver.observe(principle);
  });

  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const heroBg = document.getElementById("hero-bg");
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroBg) {
      heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
  });

  // Animate CTA button on hover
  const ctaButton = document.querySelector(".btn-submit");
  if (ctaButton) {
    ctaButton.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    ctaButton.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  }

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-submit, .control-btn",
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .btn-primary, .btn-submit, .control-btn {
            position: relative;
            overflow: hidden;
        }
    `;

  document.head.appendChild(rippleStyle);
});
