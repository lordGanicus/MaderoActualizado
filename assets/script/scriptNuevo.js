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
/***************************Seccion salones********************************/
// Efecto de entrada al hacer scroll
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".pqt-container");

  // Hacer visible el contenedor con un pequeño retraso
  setTimeout(() => {
    container.classList.add("visible");
  }, 100);

  // Efecto hover mejorado para desktop
  const services = document.querySelectorAll(".pqt-service");

  services.forEach((service) => {
    service.addEventListener("mouseenter", () => {
      services.forEach((s) => {
        if (s !== service) {
          s.style.flex = "0.5";
          s.style.filter = "brightness(0.6)";
        } else {
          s.style.filter = "brightness(1)";
        }
      });
    });

    service.addEventListener("mouseleave", () => {
      services.forEach((s) => {
        s.style.flex = "1";
        s.style.filter = "brightness(0.85)";
      });
    });
  });

  // Slider para móviles/tablets
  const slides = document.querySelectorAll(".pqt-slide");
  const dots = document.querySelectorAll(".pqt-slider-dot");
  const leftArrow = document.querySelector(".pqt-slider-arrow.left");
  const rightArrow = document.querySelector(".pqt-slider-arrow.right");
  let currentSlide = 0;

  // Asegurar que el primer slide esté visible inmediatamente
  function initializeSlider() {
    showSlide(0);

    // Precargar imágenes para evitar problemas de visualización
    const imageUrls = [
      "https://res.cloudinary.com/ds9subkxg/image/upload/v1749841183/15-A%C3%91OS-8_xpybgl.jpg",
      "https://res.cloudinary.com/ds9subkxg/image/upload/v1749841178/CORPORATIVO4_dspmz6.jpg",
      "https://res.cloudinary.com/ds9subkxg/image/upload/v1749841178/BODA-1_ginwum.jpg",
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  function showSlide(index) {
    // protección por si no hay slides
    if (!slides || slides.length === 0) return;

    // Normalizar índice (wrap)
    index = ((index % slides.length) + slides.length) % slides.length;

    // Ocultar todas las slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Mostrar la slide actual
    slides[index].classList.add("active");

    // Actualizar dots (si existen)
    if (dots && dots.length === slides.length) {
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
      dots[index].classList.add("active");
    }

    currentSlide = index;
  }

  // Navegación con dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      if (!isNaN(index)) showSlide(index);
    });
  });

  // Navegación con flechas
  if (leftArrow) {
    leftArrow.addEventListener("click", function () {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener("click", function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    });
  }

  // --- AÑADIDO: Soporte touch / swipe ---
  // Selecciona el contenedor del slider (prueba varios selectores por si tu estructura es distinta)
  const sliderContainer =
    document.querySelector(".pqt-slider") ||
    document.querySelector(".pqt-slides") ||
    (slides[0] && slides[0].parentElement) ||
    null;

  if (sliderContainer && slides.length > 0) {
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50; // px mínimos para considerar swipe

    sliderContainer.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
        }
      },
      { passive: true }
    );

    sliderContainer.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches && e.touches.length === 1) {
          touchEndX = e.touches[0].clientX;
        }
      },
      { passive: true }
    );

    sliderContainer.addEventListener(
      "touchend",
      function (e) {
        // si no hubo touchmove, usar changedTouches
        if (!touchEndX && e.changedTouches && e.changedTouches.length === 1) {
          touchEndX = e.changedTouches[0].clientX;
        }
        const diff = touchEndX - touchStartX;
        // reset para la siguiente interacción
        touchStartX = 0;
        touchEndX = 0;

        if (Math.abs(diff) > SWIPE_THRESHOLD) {
          if (diff > 0) {
            // swipe derecha -> anterior
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
          } else {
            // swipe izquierda -> siguiente
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
          }
        }
      },
      { passive: true }
    );
  }
  // --- FIN touch support ---

  // Inicializar el slider
  initializeSlider();

  // Auto slide cada 5 segundos
  setInterval(() => {
    if (window.innerWidth <= 992) {
      // Solo en móviles/tablets
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    }
  }, 5000);
});

/*****************************Seccion de cada detalle **********************************/
// Función para verificar si un elemento está en el viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
    (window.innerHeight || document.documentElement.clientHeight) * 0.85
  );
}

// Función para añadir la clase 'visible' a los elementos
function showElementsOnScroll() {
  const section = document.getElementById("serv-services");
  const cards = document.querySelectorAll(".serv-card");

  // Mostrar la sección principal
  if (isInViewport(section)) {
    section.classList.add("visible");

    // Mostrar las tarjetas con retraso escalonado (más lento)
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, 350 * index); // Aumentado a 350ms para un efecto más lento
    });

    // Eliminar el event listener después de activar las animaciones
    window.removeEventListener("scroll", showElementsOnScroll);
  }
}

// Añadir event listener para el scroll
window.addEventListener("scroll", showElementsOnScroll);

// Verificar al cargar la página por si la sección ya está visible
document.addEventListener("DOMContentLoaded", showElementsOnScroll);

/*************************Seccion de habitacion/salones/y restaurantes**********************/
class HabitacionesSlider {
  constructor() {
    this.currentSlide = 0;
    this.autoSlideInterval = null;
    this.isScrolling = false;

    // para detectar el swipe
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.setupElements();
    this.setupScrollEffect();
    this.setupSlider();
    this.setupTouchEvents(); // 👈 nuevo
    this.startAutoSlide();
  }

  setupElements() {
    this.section = document.getElementById("habi-slider");
    this.slides = document.querySelectorAll(".habi-slide");
    this.indicators = document.querySelectorAll(".habi-indicator");
    this.navItems = document.querySelectorAll(".habi-nav-item a");
    this.navIndicator = document.getElementById("habiNavIndicator");
  }

  setupScrollEffect() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.section.classList.add("loaded");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.section);

    window.addEventListener("scroll", () => {
      if (this.isScrolling) return;
      this.isScrolling = true;

      requestAnimationFrame(() => {
        this.handleScrollResize();
        this.isScrolling = false;
      });
    });

    window.addEventListener("resize", () => {
      this.handleScrollResize();
    });

    this.handleScrollResize();
  }

  handleScrollResize() {
    const rect = this.section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 0;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const sectionHeight = rect.height;
      progress = Math.min(visibleHeight / sectionHeight, 1);
    }

    const startWidth = 70;
    const endWidth = 100;
    const currentWidth = startWidth + (endWidth - startWidth) * progress;

    this.section.style.width = `${Math.min(currentWidth, 100)}%`;
  }

  setupSlider() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index);
        this.resetAutoSlide();
      });
    });

    this.navItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.goToSlide(index);
        this.resetAutoSlide();
      });
    });

    this.updateNavIndicator();
  }

  updateNavIndicator() {
    const activeNavItem = document.querySelector(
      `.habi-nav-item:nth-child(${this.currentSlide + 1}) a`
    );
    if (activeNavItem && this.navIndicator) {
      this.navIndicator.style.width = `${activeNavItem.offsetWidth}px`;
      this.navIndicator.style.left = `${activeNavItem.offsetLeft}px`;
    }
  }

  goToSlide(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    this.slides[this.currentSlide].classList.remove("active");
    this.indicators[this.currentSlide].classList.remove("active");

    this.slides[index].classList.add("active");
    this.indicators[index].classList.add("active");

    this.currentSlide = index;
    this.updateNavIndicator();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.goToSlide(this.currentSlide + 1);
    }, 5000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }

  // 👇 soporte para swipe táctil
  setupTouchEvents() {
    if (!this.section) return;

    this.section.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].clientX;
      },
      false
    );

    this.section.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
      },
      false
    );
  }

  handleSwipe() {
    const swipeThreshold = 50; // mínimo en px para considerar swipe
    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        // 👉 swipe derecha → slide anterior
        this.goToSlide(this.currentSlide - 1);
      } else {
        // 👈 swipe izquierda → siguiente slide
        this.goToSlide(this.currentSlide + 1);
      }
      this.resetAutoSlide();
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new HabitacionesSlider();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const event = new Event("scroll");
    window.dispatchEvent(event);
  }, 100);
});
/*******************************--seccion de paquetes--***********************************/
class PromSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".prom-slide");
    this.dots = document.querySelectorAll(".prom-dot");
    this.prevBtn = document.querySelector(".prom-nav-prev");
    this.nextBtn = document.querySelector(".prom-nav-next");
    this.totalSlides = this.slides.length;
    this.isAnimating = false;

    // para swipe
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Initialize first slide
    this.initializeSlide(this.slides[0]);

    // Auto-slide every 8 seconds
    this.autoSlide = setInterval(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    }, 8000);

    // Pause auto-slide on hover
    const section = document.querySelector(".prom-section");
    section.addEventListener("mouseenter", () => {
      clearInterval(this.autoSlide);
    });

    section.addEventListener("mouseleave", () => {
      this.autoSlide = setInterval(() => {
        if (!this.isAnimating) {
          this.nextSlide();
        }
      }, 8000);
    });

    // 👇 soporte para swipe táctil
    this.setupTouchEvents(section);
  }

  initializeSlide(slide) {
    // Force reflow to ensure transitions work
    void slide.offsetWidth;
  }

  goToSlide(slideIndex) {
    if (this.isAnimating || slideIndex === this.currentSlide) return;

    this.isAnimating = true;

    const currentSlide = this.slides[this.currentSlide];
    const nextSlide = this.slides[slideIndex];

    // Remove active classes from current slide
    currentSlide.classList.remove("active");
    this.dots[this.currentSlide].classList.remove("active");

    // Add exiting class for transition
    currentSlide.classList.add("exiting");

    // Update current slide
    this.currentSlide = slideIndex;

    // Add active classes to new slide
    nextSlide.classList.add("active");
    this.dots[this.currentSlide].classList.add("active");

    // Reset animations by forcing reflow
    this.initializeSlide(nextSlide);

    // Allow next transition after animations complete
    setTimeout(() => {
      currentSlide.classList.remove("exiting");
      this.isAnimating = false;
    }, 1000);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  // 👇 nuevo: soporte para swipe táctil
  setupTouchEvents(section) {
    if (!section) return;

    section.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].clientX;
      },
      false
    );

    section.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
      },
      false
    );
  }

  handleSwipe() {
    const swipeThreshold = 50; // px mínimos para considerar swipe
    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        // 👉 swipe derecha
        this.prevSlide();
      } else {
        // 👈 swipe izquierda
        this.nextSlide();
      }
    }
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PromSlider();
});
/***********************--Seccion de reserva-- ****************************/
document.addEventListener("DOMContentLoaded", function () {
  const resSection = document.querySelector(".res-section");

  // Función para verificar si el elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Función para manejar el scroll
  function handleScroll() {
    if (isInViewport(resSection)) {
      resSection.classList.add("res-visible");
      // Remover el event listener después de que la animación se active
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // Agregar event listener para el scroll
  window.addEventListener("scroll", handleScroll);

  // Verificar si ya está en el viewport al cargar la página
  if (isInViewport(resSection)) {
    resSection.classList.add("res-visible");
    window.removeEventListener("scroll", handleScroll);
  }
});
/************************--Seccion de testimonios--************************/
document.addEventListener("DOMContentLoaded", function () {
  // Variables para el slider
  const slider = document.getElementById("sec-slider");
  const cards = document.querySelectorAll(".sec-card");
  const prevButton = document.querySelector(".sec-prev");
  const nextButton = document.querySelector(".sec-next");
  const dotsContainer = document.getElementById("sec-dots");

  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  let isAnimating = false;
  let totalSlides = cards.length - cardsPerView + 1;

  // Inicializar el slider
  function initSlider() {
    cardsPerView = getCardsPerView();
    totalSlides = cards.length - cardsPerView + 1;

    // Limpiar puntos existentes
    dotsContainer.innerHTML = "";

    // Crear puntos de navegación
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("sec-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        if (!isAnimating) goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }

    updateSlider();
  }

  // Función para determinar cuántas tarjetas mostrar según el ancho de pantalla
  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  // Función para actualizar el slider
  function updateSlider() {
    if (isAnimating) return;

    isAnimating = true;
    const cardWidth = 100 / cardsPerView;
    slider.style.transform = `translateX(-${currentIndex * cardWidth}%)`;

    // Actualizar puntos activos
    const dots = document.querySelectorAll(".sec-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Habilitar botones después de la animación
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Función para ir a una diapositiva específica
  function goToSlide(index) {
    // Asegurarse de que el índice esté dentro de los límites
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentIndex = index;
    updateSlider();
  }

  // Event listeners para los botones de navegación
  prevButton.addEventListener("click", () => {
    if (isAnimating) return;
    goToSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    if (isAnimating) return;
    goToSlide(currentIndex + 1);
  });

  // Actualizar en redimensionamiento de ventana
  window.addEventListener("resize", () => {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      currentIndex = 0;
      initSlider();
    }
  });

  // Animación de entrada al hacer scroll
  function checkVisibility() {
    const section = document.querySelector(".sec-section");
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.85) {
      section.classList.add("visible");
      window.removeEventListener("scroll", checkVisibility);
    }
  }

  // Swipe para móviles
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      if (isAnimating) return;

      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const minSwipeDistance = 50;

    if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
      // Swipe izquierda - siguiente
      goToSlide(currentIndex + 1);
    }

    if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
      // Swipe derecha - anterior
      goToSlide(currentIndex - 1);
    }
  }

  // Inicializar
  initSlider();
  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // Verificar al cargar la página

  // Auto slide cada 5 segundos
  setInterval(() => {
    if (!isAnimating) {
      if (currentIndex < totalSlides - 1) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(0); // Volver al inicio
      }
    }
  }, 5000);
});
/****************Ubicacion  y contacto **********************/
// Slider functionality
let currentSlideIndex = 0;
const totalSlides = 3;

function changeSlide(direction) {
  currentSlideIndex += direction;

  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }

  updateSlider();
}

function currentSlide(n) {
  currentSlideIndex = n - 1;
  updateSlider();
}

function updateSlider() {
  const container = document.getElementById("slider-container");
  const translateX = -currentSlideIndex * (100 / totalSlides);
  container.style.transform = `translateX(${translateX}%)`;

  // Update dots
  const dots = document.querySelectorAll(".ubi-slider-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });
}

// Auto slide
setInterval(() => {
  changeSlide(1);
}, 5000);

// Map modal functionality
function openMap() {
  const modal = document.getElementById("mapModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Pequeño retraso para permitir que el display:block se aplique antes de añadir la clase
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeMap() {
  const modal = document.getElementById("mapModal");
  modal.classList.remove("show");

  // Esperar a que termine la transición antes de ocultar completamente
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("mapModal");
  if (event.target === modal) {
    closeMap();
  }
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMap();
  }
});

// Toggle contact items on mobile
function toggleContactItem(element) {
  // Only toggle on mobile devices
  if (window.innerWidth >= 768) return;

  const content = element.nextElementSibling;
  const icon = element.querySelector(".contact-toggle-icon");

  element.classList.toggle("active");
  content.classList.toggle("open");
  icon.classList.toggle("rotated");
}

// Animación al hacer scroll
function checkScroll() {
  const section = document.getElementById("ubicacion-section");
  const slider = document.getElementById("image-slider");
  const contactItems = document.querySelectorAll(".ubi-contact-item");

  const sectionPosition = section.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
    section.classList.add("visible");
    slider.classList.add("visible");

    // Animamos cada elemento de contacto con un pequeño retraso entre ellos
    contactItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 150);
    });
  }
}

// Verificar scroll al cargar y al hacer scroll
window.addEventListener("load", checkScroll);
window.addEventListener("scroll", checkScroll);
/*******Habitacion dentro // info  y modal ********/
// ================= TOUCH EVENTS PARA EL SLIDER =================
const sliderContainer = document.getElementById("slider-container");
let startX = 0;
let isDragging = false;

sliderContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

sliderContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  const translateX =
    -currentSlideIndex * (100 / totalSlides) +
    (diff / sliderContainer.offsetWidth) * 100;
  sliderContainer.style.transform = `translateX(${translateX}%)`;
});

sliderContainer.addEventListener("touchend", (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;
  const threshold = 50; // mínimo swipe para cambiar slide

  if (diffX > threshold) changeSlide(-1); // swipe derecha
  else if (diffX < -threshold) changeSlide(1); // swipe izquierda
  else updateSlider(); // si no alcanzó el threshold, vuelve al slide actual
});

/***********************************************************************/
