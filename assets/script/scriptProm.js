// Efecto parallax para la imagen de fondo
window.addEventListener("scroll", function () {
  const background = document.getElementById("promHeroBackground");
  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.5;
  background.style.transform = `translateY(${rate}px)`;
});

// Efecto de entrada para la tarjeta
window.addEventListener("load", function () {
  const card = document.getElementById("promHeroCard");
  setTimeout(function () {
    card.classList.add("visible");
  }, 300);
});

// También activar la animación al hacer scroll
window.addEventListener("scroll", function () {
  const card = document.getElementById("promHeroCard");
  const cardPosition = card.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (cardPosition < screenPosition) {
    card.classList.add("visible");
  }
});
/********************Promociones info // dentro **************************/
// Intersection Observer para animaciones de entrada
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Animar elementos principales
      const leftSection = document.getElementById("promInfo-left");
      const rightSection = document.getElementById("promInfo-right");
      const image = document.getElementById("promInfo-image");
      const card = document.getElementById("promInfo-card");

      if (leftSection) leftSection.classList.add("animate");
      if (rightSection) rightSection.classList.add("animate");
      if (image) image.classList.add("animate");
      if (card) card.classList.add("animate");

      // Animar items de características con delay
      const featureItems = document.querySelectorAll(".promInfo-feature-item");
      featureItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate");
        }, 100 + index * 100);
      });

      // Crear partículas flotantes
      createFloatingParticles();
    }
  });
}, observerOptions);

// Observar la sección principal
const section = document.getElementById("promInfo-section");
if (section) {
  observer.observe(section);
}

// Función para crear partículas flotantes
function createFloatingParticles() {
  const container = document.getElementById("particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.className = "promInfo-particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 6 + "s";
      particle.style.animationDuration = 3 + Math.random() * 6 + "s";
      container.appendChild(particle);

      // Remover partícula después de la animación
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 8000);
    }, i * 200);
  }
}

// Efecto de paralaje para el fondo
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const section = document.getElementById("promInfo-section");
  if (section) {
    const rate = scrolled * -0.5;
    section.style.backgroundPosition = `center ${rate}px`;
  }
});

// Efectos adicionales al hacer hover en el botón
const button = document.querySelector(".promInfo-button");
if (button) {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-3px) scale(1.02)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0) scale(1)";
  });
}

// Efecto de cursor personalizado para elementos interactivos
document.addEventListener("mousemove", (e) => {
  const interactiveElements = document.querySelectorAll(
    ".promInfo-feature-item, .promInfo-button"
  );
  interactiveElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      element.style.boxShadow = `${(x - rect.width / 2) * 0.1}px ${
        (y - rect.height / 2) * 0.1
      }px 20px rgba(88, 4, 4, 0.1)`;
    }
  });
});
/****************************Slider para promocionms paquetes ************************/
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("promSlider");
  const track = slider.querySelector(".promSlider-track");
  const slides = slider.querySelectorAll(".promSlider-slide");
  const dots = slider.querySelectorAll(".promSlider-dot");
  const prevBtn = slider.querySelector(".promSlider-prev");
  const nextBtn = slider.querySelector(".promSlider-next");

  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  // Función para actualizar el slider
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Actualizar clases activas
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Navegación con botones
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  });

  // Navegación con puntos
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Touch events para móviles
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;

    const diffX = startX - currentX;

    // Si el desplazamiento es significativo, cambiar de slide
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Deslizar hacia la izquierda (siguiente)
        currentIndex = (currentIndex + 1) % slides.length;
      } else {
        // Deslizar hacia la derecha (anterior)
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      }
      updateSlider();
    }
  });

  // Mouse events para desktop (simulando touch)
  slider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;

    const diffX = startX - currentX;

    // Si el desplazamiento es significativo, cambiar de slide
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Deslizar hacia la izquierda (siguiente)
        currentIndex = (currentIndex + 1) % slides.length;
      } else {
        // Deslizar hacia la derecha (anterior)
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      }
      updateSlider();
    }
  });

  // Efecto de entrada cuando el slider está en el viewport
  function checkVisibility() {
    const rect = slider.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Si el slider está en el viewport, activarlo
    if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
      slider.classList.add("active");
    }
  }

  // Verificar visibilidad al cargar y al hacer scroll
  window.addEventListener("load", checkVisibility);
  window.addEventListener("scroll", checkVisibility);

  // Autoavance opcional (descomenta si lo quieres)
  /*
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            }, 5000);
            */
});
/**************************** Other Promociones // paquetes*************************/
// Intersection Observer para activar animaciones cuando la sección esté visible
const promOtherObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("promOther-animated")
      ) {
        entry.target.classList.add("promOther-animated");
      }
    });
  },
  {
    threshold: 0.2, // Se activa cuando el 20% de la sección es visible
    rootMargin: "0px 0px -50px 0px", // Margen para activar un poco antes
  }
);

// Observar la sección
const promOtherSection = document.getElementById("promOther-section");
if (promOtherSection) {
  promOtherObserver.observe(promOtherSection);
}
/*************************Paquete VIP*****************************/
class HoneymoonVIP {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupEventListeners();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              document
                .getElementById("promVipContent")
                .classList.add("animate");
            }, 200);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(document.getElementById("promVipSection"));
  }

  setupEventListeners() {
    // Botón reservar
    document.getElementById("promVipReserve").addEventListener("click", () => {
      this.openWhatsApp();
    });

    // Botón explorar detalles
    document.getElementById("promVipExplore").addEventListener("click", () => {
      this.openModal();
    });

    // Cerrar modal
    document.getElementById("promVipClose").addEventListener("click", () => {
      this.closeModal();
    });

    // Cerrar modal al hacer clic fuera
    document.getElementById("promVipModal").addEventListener("click", (e) => {
      if (e.target.id === "promVipModal") {
        this.closeModal();
      }
    });

    // Navegación del slider
    document.getElementById("promVipPrev").addEventListener("click", () => {
      this.prevSlide();
    });

    document.getElementById("promVipNext").addEventListener("click", () => {
      this.nextSlide();
    });

    // Dots navigation
    document.querySelectorAll(".promVip-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index);
      });
    });

    // Touch events para móvil
    const slider = document.getElementById("promVipSlider");
    slider.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    slider.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
      },
      { passive: true }
    );

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (document.getElementById("promVipModal").classList.contains("show")) {
        if (e.key === "ArrowLeft") this.prevSlide();
        if (e.key === "ArrowRight") this.nextSlide();
        if (e.key === "Escape") this.closeModal();
      }
    });

    // Auto-slide (opcional)
    this.autoSlideInterval = null;
  }

  openWhatsApp() {
    const phoneNumber = "6716051";
    const message =
      "Hola! Estoy interesado en reservar el Paquete V.I.P que vi en la página web. ¿Podrían brindarme más información?";
    const whatsappURL = `https://wa.me/591${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  }

  openModal() {
    document.getElementById("promVipModal").classList.add("show");
    document.body.style.overflow = "hidden";
    this.startAutoSlide();
  }

  closeModal() {
    document.getElementById("promVipModal").classList.remove("show");
    document.body.style.overflow = "auto";
    this.stopAutoSlide();
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlider();
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    this.updateSlider();
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateSlider();
  }

  updateSlider() {
    const slider = document.getElementById("promVipSlider");
    const translateX = -this.currentSlide * (100 / this.totalSlides);
    slider.style.transform = `translateX(${translateX}%)`;

    // Update dots
    document.querySelectorAll(".promVip-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new HoneymoonVIP();
});

// Pausar auto-slide cuando el usuario interactúa
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pausar cuando la pestaña no está visible
  }
});
