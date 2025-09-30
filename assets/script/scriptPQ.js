/*******Script de paquetes******/
// Efecto de entrada por capas con ScrollTrigger (simulado)
document.addEventListener("DOMContentLoaded", function () {
  // Simular el efecto de entrada por capas cuando la página carga
  // En una implementación real, podrías usar una librería como ScrollMagic o AOS

  // Agregar clase activa después de un pequeño retraso para simular la animación
  setTimeout(function () {
    document.querySelector(".heroPQ-section").classList.add("heroPQ-active");
  }, 300);
});
/**********************************/
// Animaciones de entrada cuando la sección sea visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.1 }
);

// Observar las tarjetas de amenidades para animaciones
document.querySelectorAll(".PQinfo-amenity-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = `opacity 0.6 ease ${
    index * 0.1
  }s, transform 0.6s ease ${index * 0.1}s`;

  observer.observe(card);
});

// Agregar clase animate cuando sea visible
const style = document.createElement("style");
style.textContent = `
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
document.head.appendChild(style);

// Efecto parallax suave para el fondo
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const background = document.querySelector(".PQinfo-background");
  if (background) {
    background.style.transform = `translateY(${scrolled * 0.5}px) scale(${
      1 + scrolled * 0.0001
    })`;
  }
});

// Slider para móviles y tablets
let currentSlide = 0;
const sliderContainer = document.querySelector(".PQinfo-slider-container");
const slides = document.querySelectorAll(".PQinfo-slider-slide");
const dots = document.querySelectorAll(".PQinfo-slider-dot");
const totalSlides = slides.length;
let slideInterval;

// Función para cambiar de slide
function goToSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  sliderContainer.style.transform = `translateX(-${currentSlide * 25}%)`;

  // Actualizar dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Función para siguiente slide
function nextSlide() {
  goToSlide(currentSlide + 1);
}

// Iniciar autoplay
function startSlider() {
  slideInterval = setInterval(nextSlide, 4000);
}

// Detener autoplay
function stopSlider() {
  clearInterval(slideInterval);
}

// Eventos para los dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopSlider();
    goToSlide(index);
    startSlider();
  });
});

// Touch events para el slider
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
  stopSlider();
});

sliderContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  startSlider();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe izquierda - siguiente slide
    nextSlide();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe derecha - slide anterior
    goToSlide(currentSlide - 1);
  }
}

// Iniciar slider si está en vista móvil/tablet
if (window.innerWidth <= 1024) {
  startSlider();
}

// Sliders para modales
const modals = document.querySelectorAll(".PQinfo-modal");
const closeButtons = document.querySelectorAll(".PQinfo-modal-close");
const imageContainers = document.querySelectorAll(".PQinfo-image-container");

// Inicializar sliders para cada modal
modals.forEach((modal) => {
  const slider = modal.querySelector(".PQinfo-modal-slider");
  const prevBtn = modal.querySelector(".PQinfo-modal-prev");
  const nextBtn = modal.querySelector(".PQinfo-modal-next");
  const dots = modal.querySelectorAll(".PQinfo-modal-dot");
  let currentModalSlide = 0;
  const totalModalSlides = 3;

  function goToModalSlide(n) {
    currentModalSlide = (n + totalModalSlides) % totalModalSlides;
    slider.style.transform = `translateX(-${currentModalSlide * 33.333}%)`;

    // Actualizar dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentModalSlide);
    });
  }

  function nextModalSlide() {
    goToModalSlide(currentModalSlide + 1);
  }

  function prevModalSlide() {
    goToModalSlide(currentModalSlide - 1);
  }

  // Event listeners para navegación
  if (nextBtn) {
    nextBtn.addEventListener("click", nextModalSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevModalSlide);
  }

  // Event listeners para dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToModalSlide(index);
    });
  });

  // Touch events para el slider del modal
  let modalTouchStartX = 0;
  let modalTouchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    modalTouchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    modalTouchEndX = e.changedTouches[0].screenX;
    handleModalSwipe();
  });

  function handleModalSwipe() {
    const swipeThreshold = 50;

    if (modalTouchEndX < modalTouchStartX - swipeThreshold) {
      // Swipe izquierda - siguiente slide
      nextModalSlide();
    } else if (modalTouchEndX > modalTouchStartX + swipeThreshold) {
      // Swipe derecha - slide anterior
      prevModalSlide();
    }
  }
});

// Abrir modales al hacer clic en las imágenes
imageContainers.forEach((container) => {
  container.addEventListener("click", () => {
    const slideNumber = container.getAttribute("data-slide");
    const modal = document.getElementById(`PQinfo-modal-${slideNumber}`);
    if (modal) {
      modal.style.display = "flex";
    }
  });
});

// Cerrar modales
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
  });
});

// Cerrar modal al hacer clic fuera de la imagen
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Ajustar el slider al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
  if (window.innerWidth <= 1024) {
    startSlider();
  } else {
    stopSlider();
  }
});
/********************************PQ Eventos corporativos*******************************/
// Función para detectar cuando la sección está en el viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Función para activar las animaciones
function handleScroll() {
  const section = document.querySelector(".corporate-section");
  const heading = document.querySelector(".heading");
  const options = document.querySelectorAll(".setup-option");
  const images = document.querySelectorAll(".setup-gallery img");

  if (isElementInViewport(section)) {
    // Activar animación del heading
    heading.classList.add("animate");

    // Activar animación de las opciones
    options.forEach((option) => {
      option.classList.add("animate");
    });

    // Activar animación de las imágenes
    images.forEach((image) => {
      image.classList.add("animate");
    });

    // Remover el event listener después de activar las animaciones
    window.removeEventListener("scroll", handleScroll);
  }
}

// Activar las animaciones cuando la página carga si la sección ya está visible
document.addEventListener("DOMContentLoaded", function () {
  handleScroll();

  // Agregar event listener para scroll
  window.addEventListener("scroll", handleScroll);
});
/********************PQ dentro slider de complementos********************/
class PQcompleteSlider {
  constructor() {
    this.slider = document.getElementById("PQcomple-slider");
    this.prevBtn = document.getElementById("PQcomple-prev-btn");
    this.nextBtn = document.getElementById("PQcomple-next-btn");
    this.indicators = document.getElementById("PQcomple-indicators");
    this.cards = document.querySelectorAll(".PQcomple-card");

    this.currentIndex = 0;
    this.cardsPerView = 3;
    this.totalCards = this.cards.length;
    this.maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;

    this.init();
  }

  init() {
    this.createIndicators();
    this.bindEvents();
    this.updateSlider();
    this.startAutoSlide();
  }

  createIndicators() {
    this.indicators.innerHTML = "";
    for (let i = 0; i <= this.maxIndex; i++) {
      const indicator = document.createElement("div");
      indicator.className = `PQcomple-indicator ${i === 0 ? "active" : ""}`;
      indicator.addEventListener("click", () => this.goToSlide(i));
      this.indicators.appendChild(indicator);
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Touch/swipe events
    let startX = 0;
    let isDragging = false;

    this.slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    this.slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    this.slider.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      isDragging = false;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });

    // Pause auto-slide on hover
    this.slider.addEventListener("mouseenter", () => this.pauseAutoSlide());
    this.slider.addEventListener("mouseleave", () => this.startAutoSlide());
  }

  updateSlider() {
    const cardWidth = 415; // Width of each card
    const gap = 20; // Gap between cards
    const offset = this.currentIndex * (cardWidth + gap) * this.cardsPerView;

    this.slider.style.transform = `translateX(-${offset}px)`;

    // Update indicators
    const indicatorElements = this.indicators.querySelectorAll(
      ".PQcomple-indicator"
    );
    indicatorElements.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentIndex);
    });

    // Update navigation buttons
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.maxIndex;
  }

  nextSlide() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    this.updateSlider();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex; // Loop to end
    }
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlider();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  pauseAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PQcompleteSlider();
});

// Handle window resize
window.addEventListener("resize", () => {
  // Reinitialize slider on resize to handle responsive changes
  const slider = new PQcompleteSlider();
});
/**********************Js final para Salones***************************/ // Intersection Observer para activar la animación
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -100px 0px",
};

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("habPort-animate");
    }
  });
}, observerOptions);

// Observar la sección del hotel
const hotelSection = document.getElementById("hotelSection");
observer1.observe(hotelSection);

// Efecto parallax controlado y limitado
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const section = document.querySelector(".habPort-div");
  const sectionRect = hotelSection.getBoundingClientRect();

  // Solo aplicar parallax cuando la sección está visible
  if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
    // Limitar el movimiento a un máximo de -50px para evitar que se suba demasiado
    const rate = Math.max(Math.min(scrolled * -0.1, 0), 0);

    if (section) {
      section.style.transform = `translateY(${rate}px) scale(${
        hotelSection.classList.contains("habPort-animate") ? "1" : "1.1"
      })`;
    }
  }
});
/*******************NavBar para salones*******************/
document.addEventListener("DOMContentLoaded", () => {
  fetch("/assets/paginas/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      const navCenter = document.getElementById("nav-center");
      if (navCenter) {
        navCenter.innerHTML = data;

        iniciarNavbar();
      }
    })
    .catch((error) => console.error("Error al cargar navbar:", error));

  function iniciarNavbar() {
    try {
      const navToggle = document.getElementById("navToggle");
      const menuLateral = document.getElementById("menuLateral");
      const overlay = document.getElementById("overlay-header");
      const reservaBtn = document.getElementById("reservaBtn");
      const menuItems = document.querySelectorAll(".menu-item");

      if (navToggle && menuLateral && overlay) {
        navToggle.addEventListener("click", function () {
          this.classList.toggle("active");
          menuLateral.classList.toggle("active");
          overlay.classList.toggle("active");
          document.body.style.overflow = menuLateral.classList.contains(
            "active"
          )
            ? "hidden"
            : "";
        });
      }

      if (overlay && navToggle && menuLateral) {
        overlay.addEventListener("click", function () {
          navToggle.classList.remove("active");
          menuLateral.classList.remove("active");
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        });
      }

      if (reservaBtn) {
        reservaBtn.addEventListener("click", function () {
          window.open(
            "https://wa.me/59167160515?text=Hola%2C%20quiero%20realizar%20una%20reserva",
            "_blank"
          );
        });
      }

      // Para dispositivos móviles
      if (window.innerWidth <= 992) {
        menuItems.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            // Cerrar otros submenús abiertos
            document
              .querySelectorAll(".menu-item.active")
              .forEach((activeItem) => {
                if (activeItem !== this) {
                  activeItem.classList.remove("active");
                }
              });

            this.classList.toggle("active");
          });
        });

        // Cerrar menús al hacer clic fuera
        document.addEventListener("click", function (e) {
          if (!e.target.closest(".menu-item")) {
            document.querySelectorAll(".menu-item.active").forEach((item) => {
              item.classList.remove("active");
            });
          }
        });
      }

      const menuLinks = document.querySelectorAll(".menu-links a");
      menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 992) {
            navToggle.classList.remove("active");
            menuLateral.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
          }
        });
      });
    } catch (error) {
      console.error("Error en la inicialización del navbar:", error);
    }
  }
});
