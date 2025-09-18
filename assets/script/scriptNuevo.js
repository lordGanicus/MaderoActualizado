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
    // Ocultar todas las slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Mostrar la slide actual
    slides[index].classList.add("active");

    // Actualizar dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[index].classList.add("active");

    currentSlide = index;
  }

  // Navegación con dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      showSlide(index);
    });
  });

  // Navegación con flechas
  leftArrow.addEventListener("click", function () {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
  });

  rightArrow.addEventListener("click", function () {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
  });

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

    this.init();
  }

  init() {
    this.setupElements();
    this.setupScrollEffect();
    this.setupSlider();
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

    // También manejar el redimensionamiento
    window.addEventListener("resize", () => {
      this.handleScrollResize();
    });

    // Inicializar
    this.handleScrollResize();
  }

  handleScrollResize() {
    const rect = this.section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calcular el progreso del scroll cuando la sección está visible
    let progress = 0;

    if (rect.top <= windowHeight && rect.bottom >= 0) {
      // La sección está en viewport
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const sectionHeight = rect.height;
      progress = Math.min(visibleHeight / sectionHeight, 1);
    }

    // Interpolar entre 70% y 100% basado en el progreso
    const startWidth = 70;
    const endWidth = 100;
    const currentWidth = startWidth + (endWidth - startWidth) * progress;

    this.section.style.width = `${Math.min(currentWidth, 100)}%`;
  }

  setupSlider() {
    // Configurar eventos para los indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index);
        this.resetAutoSlide();
      });
    });

    // Configurar eventos para los elementos de navegación
    this.navItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.goToSlide(index);
        this.resetAutoSlide();
      });
    });

    // Configurar el indicador de navegación
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
    // Validar índice
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    // Ocultar slide actual
    this.slides[this.currentSlide].classList.remove("active");
    this.indicators[this.currentSlide].classList.remove("active");

    // Mostrar nuevo slide
    this.slides[index].classList.add("active");
    this.indicators[index].classList.add("active");

    this.currentSlide = index;
    this.updateNavIndicator();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.goToSlide(this.currentSlide + 1);
    }, 5000); // Cambia cada 5 segundos
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new HabitacionesSlider();
});

// Manejar redimensionamiento de ventana
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Re-calcular el efecto de scroll en resize
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
