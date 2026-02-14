// Animated counters
document.addEventListener("DOMContentLoaded", function () {
  initCounters();
});

function initCounters() {
  const counterElements = document.querySelectorAll(".counter");

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to animate counter
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Animate over 50 steps
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 30);
  }

  // Function to handle counter animations
  function handleCounterAnimations() {
    counterElements.forEach((counter) => {
      const parent = counter.closest('[data-animation="counter"]');

      if (
        parent &&
        isInViewport(parent) &&
        !parent.classList.contains("counted")
      ) {
        parent.classList.add("counted");

        const target = parseInt(parent.getAttribute("data-target"));
        const delay = parseInt(parent.getAttribute("data-delay")) || 0;

        setTimeout(() => {
          animateCounter(counter, target);
        }, delay);
      }
    });
  }

  // Initial check
  handleCounterAnimations();

  // Check on scroll
  window.addEventListener("scroll", handleCounterAnimations);

  // Check on resize
  window.addEventListener("resize", handleCounterAnimations);
}
