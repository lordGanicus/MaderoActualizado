document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".habInfo-nav-button");
  const sections = document.querySelectorAll(".habInfo-cards-grid");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-section");

      // Remove active class from all buttons and sections
      navButtons.forEach((btn) => btn.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show target section with animation
      const targetElement = document.getElementById(targetSection + "-section");
      setTimeout(() => {
        targetElement.classList.add("active");
      }, 100);
    });
  });

  // Add smooth hover effects to cards
  const cards = document.querySelectorAll(".habInfo-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll(".habInfo-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
/***************************************/
