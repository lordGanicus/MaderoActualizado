// WhatsApp functionality
document.getElementById("reservarBtn").addEventListener("click", function (e) {
  e.preventDefault();
  const phoneNumber = "61239790";
  const message =
    "Hola, me gustaría reservar en el restaurante Cielo Urbano. ¿Podrían ayudarme con la disponibilidad?";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
});

// Animation controller
class ScrollAnimationController {
  constructor() {
    this.heroSection = document.getElementById("heroSection");
    this.isAnimatedIn = false;
    this.isAnimatedOut = false;
    this.init();
  }

  init() {
    // Initial animation on load
    setTimeout(() => {
      this.animateIn();
    }, 300);

    // Scroll event listener
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });

    // Intersection Observer for more precise control
    this.setupIntersectionObserver();
  }

  animateIn() {
    if (!this.isAnimatedIn) {
      this.heroSection.classList.remove("animate-out");
      this.heroSection.classList.add("animate-in");
      this.isAnimatedIn = true;
      this.isAnimatedOut = false;
    }
  }

  animateOut() {
    if (!this.isAnimatedOut) {
      this.heroSection.classList.remove("animate-in");
      this.heroSection.classList.add("animate-out");
      this.isAnimatedOut = true;
      this.isAnimatedIn = false;
    }
  }

  handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollThreshold = windowHeight * 0.3; // 30% of viewport

    if (scrollPosition > scrollThreshold) {
      this.animateOut();
    } else {
      this.animateIn();
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio > 0.7) {
              this.animateIn();
            }
          } else {
            this.animateOut();
          }
        });
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(this.heroSection);
  }
}

// Initialize animation controller when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ScrollAnimationController();
});

// Additional smooth scroll enhancement
document.documentElement.style.scrollBehavior = "smooth";

/***************************efecto de animacion par ael after hero*****************/
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".skyhero-afterhero");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          target.classList.add("visible");
          observer.unobserve(target); // Se ejecuta solo una vez
        }
      });
    },
    { threshold: 0.3 } // Se activa cuando el 30% es visible
  );

  observer.observe(target);
});
/********************************Sky menu -- Menu *******************************/
// Efectos de entrada mejorados y profesionales para ambas secciones
document.addEventListener("DOMContentLoaded", function () {
  // Elementos de la primera sección (Cielo Urbano)
  const card1 = document.querySelector(".skyMenu-card");
  const largeImage1 = document.querySelector(".skyMenu-large-image");
  const smallImage1 = document.querySelector(".skyMenu-small-image");
  const listItems1 = document.querySelectorAll(".skyMenu-options-list li");
  let animationTriggered1 = false;

  // Elementos de la segunda sección (Sport Bar)
  const card2 = document.querySelector(".sportBar-card");
  const largeImage2 = document.querySelector(".sportBar-large-image");
  const smallImage2 = document.querySelector(".sportBar-small-image");
  let animationTriggered2 = false;

  // Función para verificar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Función para manejar la animación de entrada de la primera sección
  function handleScrollAnimation1() {
    if (isInViewport(card1) && !animationTriggered1) {
      animationTriggered1 = true;

      // Animación del card
      card1.classList.add("visible");

      // Animación de la imagen grande con retardo
      setTimeout(() => {
        largeImage1.classList.add("visible");
      }, 300);

      // Animación de la imagen pequeña con retardo
      setTimeout(() => {
        smallImage1.classList.add("visible");
      }, 600);

      // Animación escalonada para los elementos de la lista
      listItems1.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible");
        }, 800 + index * 100);
      });
    }
  }

  // Función para manejar la animación de entrada de la segunda sección
  function handleScrollAnimation2() {
    if (isInViewport(card2) && !animationTriggered2) {
      animationTriggered2 = true;

      // Animación del card
      card2.classList.add("visible");

      // Animación de la imagen grande con retardo
      setTimeout(() => {
        largeImage2.classList.add("visible");
      }, 300);

      // Animación de la imagen pequeña con retardo
      setTimeout(() => {
        smallImage2.classList.add("visible");
      }, 600);
    }
  }

  // Preparar elementos para animación
  listItems1.forEach((item) => {
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Verificar al cargar la página
  handleScrollAnimation1();
  handleScrollAnimation2();

  // Verificar al hacer scroll
  window.addEventListener("scroll", function () {
    handleScrollAnimation1();
    handleScrollAnimation2();
  });

  // Funcionalidad de WhatsApp para reservar (primera sección)
  document
    .getElementById("reservarBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const phoneNumber = "61239790";
      const message =
        "Hola, me gustaría reservar en el restaurante Cielo Urbano. ¿Podrían ayudarme con la disponibilidad?";
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");
    });

  // Funcionalidad para el botón de explorar (segunda sección)
  document
    .getElementById("explorarSportBarBtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert("Explorando Urban Center Sport Bar");
      // Aquí puedes agregar la funcionalidad específica para este botón
    });

  // Efecto de parallax suave para el fondo
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const skyMenuSection = document.querySelector(".skyMenu-section");
    const sportBarSection = document.querySelector(".sportBar-section");

    if (skyMenuSection) {
      skyMenuSection.style.backgroundPositionY = -(scrolled * 0.5) + "px";
    }

    if (sportBarSection) {
      sportBarSection.style.backgroundPositionY = -(scrolled * 0.5) + "px";
    }
  });

  if (window.innerWidth > 768) {
    // Función para calcular rotación limitada a ±90°
    function calculateRotation(x, rect) {
      const centerX = rect.width / 2;
      const relativeX = (x - centerX) / centerX; // valor entre -1 y 1
      return Math.max(-90, Math.min(90, -(relativeX * 90))); // clamp entre -90 y 90
    }

    // Primera sección
    const container1 = document.querySelector(".skyMenu-container");

    container1.addEventListener("mousemove", function (e) {
      const rect = container1.getBoundingClientRect();
      const rotateZ = calculateRotation(e.clientX - rect.left, rect);

      if (largeImage1) {
        largeImage1.style.transform = `translateY(-50%) scale(1.05) rotate(${rotateZ}deg)`;
      }

      if (smallImage1) {
        smallImage1.style.transform = `scale(1.05) rotate(${rotateZ / 2}deg)`;
      }
    });

    container1.addEventListener("mouseleave", function () {
      if (largeImage1) {
        largeImage1.style.transform = "translateY(-50%) scale(1.05) rotate(0)";
      }
      if (smallImage1) {
        smallImage1.style.transform = "scale(1.05) rotate(0)";
      }
    });

    // Segunda sección
    const container2 = document.querySelector(".sportBar-container");

    container2.addEventListener("mousemove", function (e) {
      const rect = container2.getBoundingClientRect();
      const rotateZ = calculateRotation(e.clientX - rect.left, rect);

      if (largeImage2) {
        largeImage2.style.transform = `translateY(-50%) scale(1.05) rotate(${rotateZ}deg)`;
      }

      if (smallImage2) {
        smallImage2.style.transform = `scale(1.05) rotate(${rotateZ / 2}deg)`;
      }
    });

    container2.addEventListener("mouseleave", function () {
      if (largeImage2) {
        largeImage2.style.transform = "translateY(-50%) scale(1.05) rotate(0)";
      }
      if (smallImage2) {
        smallImage2.style.transform = "scale(1.05) rotate(0)";
      }
    });
  }
});

/******************************* Sky Carta Menus a la carta ***************************/
try {
  let currentIndex = 0; // Empezamos desde el primer grupo de 3
  const slides = document.getElementById("slides");
  const totalSlides = 6;
  const totalGroups = 2; // 2 grupos de 3 slides (0-2, 3-5)
  let isTransitioning = false;
  let autoPlayInterval;

  // Variables para touch
  let startX = 0;
  let isDragging = false;

  // Crear indicadores de puntos
  function createDots() {
    const dotsContainer = document.getElementById("dots-container");
    dotsContainer.innerHTML = ""; // Limpiar los puntos existentes
    for (let i = 0; i < totalGroups; i++) {
      // Cambié de totalSlides a totalGroups (2 puntos)
      const dot = document.createElement("div");
      dot.className = "skyCarta-dot";
      // Marcar como activo si pertenece al grupo actual
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    // Transición tipo ventana: cada movimiento desplaza exactamente 3 slides (100%)
    const translateX = -(currentIndex * 100);
    slides.style.transform = `translateX(${translateX}%)`;
    slides.style.transition = "transform 5s ease"; // Añadimos la transición lenta de 5 segundos

    // Actualizar clases de cards
    const cards = document.querySelectorAll(".skyCarta-card");
    cards.forEach((card, index) => {
      card.classList.remove("center");
      // El card central siempre es el del medio de los 3 visibles
      if (index === currentIndex * 3 + 1) {
        // Aseguramos que el card central siempre sea el correcto
        card.classList.add("center");
      }
    });

    // Actualizar puntos - mostrar activos los del grupo actual
    const dots = document.querySelectorAll(".skyCarta-dot");
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentIndex) {
        dot.classList.add("active");
      }
    });
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (currentIndex + 1) % totalGroups; // Avanzar al siguiente grupo
    updateSlider();

    setTimeout(() => {
      isTransitioning = false;
    }, 5000); // Espera igual al tiempo de la transición (5 segundos)
  }

  function previousSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (currentIndex - 1 + totalGroups) % totalGroups; // Retroceder al grupo anterior
    updateSlider();

    setTimeout(() => {
      isTransitioning = false;
    }, 5000); // Espera igual al tiempo de la transición (5 segundos)
  }

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = index;
    updateSlider();

    setTimeout(() => {
      isTransitioning = false;
    }, 5000); // Espera igual al tiempo de la transición (5 segundos)
  }

  function reservar() {
    alert(
      "¡Gracias por tu interés! Te contactaremos pronto para tu reserva especial."
    );
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000); // Cambia de slide cada 4 segundos
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event Listeners para botones
  document.getElementById("nextBtn").addEventListener("click", () => {
    console.log("Next button clicked");
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    console.log("Previous button clicked");
    stopAutoPlay();
    previousSlide();
    startAutoPlay();
  });

  // Pausar auto-play en hover
  const sliderContainer = document.querySelector(".skyCarta-slider-container");
  sliderContainer.addEventListener("mouseenter", stopAutoPlay);
  sliderContainer.addEventListener("mouseleave", startAutoPlay);

  // Touch Events
  sliderContainer.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoPlay();
    },
    { passive: true }
  );

  sliderContainer.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
    },
    { passive: false }
  );

  sliderContainer.addEventListener(
    "touchend",
    (e) => {
      if (!isDragging) return;

      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const minSwipeDistance = 50;

      if (Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }

      isDragging = false;
      startAutoPlay();
    },
    { passive: true }
  );

  // Mouse Events (para desktop)
  let isMouseDown = false;
  let mouseStartX = 0;

  sliderContainer.addEventListener("mousedown", (e) => {
    mouseStartX = e.clientX;
    isMouseDown = true;
    stopAutoPlay();
  });

  sliderContainer.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
  });

  sliderContainer.addEventListener("mouseup", (e) => {
    if (!isMouseDown) return;

    const diffX = mouseStartX - e.clientX;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    isMouseDown = false;
    startAutoPlay();
  });

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      stopAutoPlay();
      previousSlide();
      startAutoPlay();
    } else if (e.key === "ArrowRight") {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    }
  });

  // Inicializar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, initializing slider");
    createDots();
    updateSlider();
    startAutoPlay();
    console.log("Slider initialized with currentIndex:", currentIndex);
  });

  // Manejar cambio de tamaño de ventana
  window.addEventListener("resize", () => {
    updateSlider();
  });
} catch (error) {
  console.error("Error en el slider: ", error);
}
/***************************Syky Modal restobar frame facebook**********************/
try {
  // Opciones del IntersectionObserver
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  // Crear el IntersectionObserver
  const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      try {
        if (entry.isIntersecting) {
          const targetElement = entry.target;

          // Verificamos qué clase tiene el elemento observado
          if (targetElement.classList.contains("skyResto-main")) {
            targetElement.style.opacity = "1";
            targetElement.style.transform = "translateY(0)";
            targetElement.style.transition = "all 1s ease-out";
          }

          if (targetElement.classList.contains("skyResto-menu")) {
            targetElement.classList.add("skyResto-visible-left");

            // Animamos los elementos del menú con un efecto de retraso
            const menuItems = targetElement.querySelectorAll(
              ".skyResto-menu-item"
            );
            menuItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("skyResto-stagger");
              }, index * 200);
            });
          }

          if (targetElement.classList.contains("skyResto-facebook")) {
            targetElement.classList.add("skyResto-visible-right");
          }
        }
      } catch (error) {
        console.error(
          "Error procesando la intersección de un elemento:",
          error
        );
      }
    });
  }, observerOptions);

  // Función para observar los elementos cuando se carga el DOM
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const elementsToObserve = [
        ".skyResto-main",
        ".skyResto-menu",
        ".skyResto-facebook",
      ];

      elementsToObserve.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          myObserver.observe(element);
        }
      });
    } catch (error) {
      console.error("Error al agregar los elementos a la observación:", error);
    }
  });

  // Funcionalidad del toggle de tarjetas de menú
  function toggleCard(card) {
    try {
      const isActive = card.classList.contains("active");

      // Cerramos todas las tarjetas primero
      document.querySelectorAll(".skyResto-menu-card").forEach((c) => {
        c.classList.remove("active");
      });

      // Si esta tarjeta no estaba activa, la abrimos
      if (!isActive) {
        card.classList.add("active");
      }
    } catch (error) {
      console.error("Error al alternar la tarjeta del menú:", error);
    }
  }

  // Funcionalidad del modal de imágenes
  let currentSlide = 0;
  const totalSlides = 5;

  function openModal() {
    try {
      const modal = document.getElementById("imageModal");
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error al abrir el modal:", error);
    }
  }

  function closeModal() {
    try {
      const modal = document.getElementById("imageModal");
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    } catch (error) {
      console.error("Error al cerrar el modal:", error);
    }
  }

  function updateSlider() {
    try {
      const track = document.getElementById("sliderTrack");
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    } catch (error) {
      console.error("Error al actualizar el slider:", error);
    }
  }

  function nextSlide() {
    try {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    } catch (error) {
      console.error("Error al pasar al siguiente slide:", error);
    }
  }

  function prevSlide() {
    try {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    } catch (error) {
      console.error("Error al pasar al slide anterior:", error);
    }
  }

  // Auto-play del slider
  let autoPlayInterval;

  function startAutoPlay() {
    try {
      autoPlayInterval = setInterval(nextSlide, 4000);
    } catch (error) {
      console.error("Error al iniciar la reproducción automática:", error);
    }
  }

  function stopAutoPlay() {
    try {
      clearInterval(autoPlayInterval);
    } catch (error) {
      console.error("Error al detener la reproducción automática:", error);
    }
  }

  // Iniciar auto-play cuando se abra el modal
  document
    .getElementById("imageModal")
    .addEventListener("transitionend", (e) => {
      try {
        if (e.target.classList.contains("active")) {
          startAutoPlay();
        }
      } catch (error) {
        console.error("Error al manejar la transición del modal:", error);
      }
    });

  // Detener auto-play cuando se cierre el modal
  document.addEventListener("click", (e) => {
    try {
      if (e.target.classList.contains("skyResto-modal")) {
        closeModal();
        stopAutoPlay();
      }
    } catch (error) {
      console.error("Error al cerrar el modal:", error);
    }
  });

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    try {
      const modal = document.getElementById("imageModal");
      if (modal.classList.contains("active")) {
        switch (e.key) {
          case "Escape":
            closeModal();
            stopAutoPlay();
            break;
          case "ArrowLeft":
            prevSlide();
            break;
          case "ArrowRight":
            nextSlide();
            break;
        }
      }
    } catch (error) {
      console.error("Error en la navegación del teclado:", error);
    }
  });

  // Desplazamiento suave
  document.documentElement.style.scrollBehavior = "smooth";

  // Efecto parallax para el fondo del hero
  window.addEventListener("scroll", () => {
    try {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector(".skyResto-hero");
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    } catch (error) {
      console.error("Error al aplicar el efecto parallax:", error);
    }
  });
} catch (error) {
  console.error("Error en el script principal:", error);
}
/********************************Restaurante last ********************************/
// Detectar cuando la sección SkyLast entra en la vista
// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  const skyLastSection = document.querySelector(".skyLast-container");
  const particlesContainer = document.getElementById("particles-container");

  // Variable para controlar si la animación ya se activó
  let animationActivated = false;

  // Crear partículas para el efecto
  function createParticles() {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.classList.add("skyLast-particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 5 + "s";
      particle.style.width = Math.random() * 4 + 2 + "px";
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // Función para verificar si el elemento está en la vista
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Activar animación cuando la sección esté en la vista
  function checkScroll() {
    if (!animationActivated && isElementInViewport(skyLastSection)) {
      skyLastSection.classList.add("active");
      animationActivated = true;
      console.log("SkyLast activado - Entró en el viewport");
    }
  }

  // Inicializar partículas
  createParticles();

  // Verificar al cargar la página (por si ya está en vista)
  checkScroll();

  // Y también al hacer scroll
  window.addEventListener("scroll", checkScroll);
});

/*********************************Urban Center***********************************/
// Intersection Observer for entrance animations
const centerInfoObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const centerInfoObserver = new IntersectionObserver((centerInfoEntries) => {
  centerInfoEntries.forEach((centerInfoEntry) => {
    if (centerInfoEntry.isIntersecting) {
      centerInfoEntry.target.classList.add("visible");

      // Animate list items with delay
      if (centerInfoEntry.target.classList.contains("centerInfo-card")) {
        const centerInfoListItems = centerInfoEntry.target.querySelectorAll(
          ".centerInfo-options-list li"
        );
        centerInfoListItems.forEach((centerInfoItem, centerInfoIndex) => {
          setTimeout(() => {
            centerInfoItem.classList.add("visible");
          }, centerInfoIndex * 100);
        });
      }
    }
  });
}, centerInfoObserverOptions);

// Observe elements
document.addEventListener("DOMContentLoaded", function () {
  const centerInfoElementsToObserve = [
    ".centerInfo-card",
    ".centerInfo-large-image",
    ".centerInfo-small-image",
    ".centerInfo-tilted-image-container",
    ".centerInfo-content",
  ];

  centerInfoElementsToObserve.forEach((centerInfoSelector) => {
    const centerInfoElements = document.querySelectorAll(centerInfoSelector);
    centerInfoElements.forEach((centerInfoEl) =>
      centerInfoObserver.observe(centerInfoEl)
    );
  });
});

// Modal functionality
let centerInfoSlideIndex = 1;

function centerInfoOpenModal() {
  document.getElementById("centerInfoModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function centerInfoCloseModal() {
  document.getElementById("centerInfoModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function centerInfoChangeSlide(centerInfoN) {
  centerInfoShowSlide((centerInfoSlideIndex += centerInfoN));
}

function centerInfoCurrentSlide(centerInfoN) {
  centerInfoShowSlide((centerInfoSlideIndex = centerInfoN));
}

function centerInfoShowSlide(centerInfoN) {
  const centerInfoSlides = document.querySelectorAll(".centerInfo-slide");
  const centerInfoDots = document.querySelectorAll(".centerInfo-dot");

  if (centerInfoN > centerInfoSlides.length) {
    centerInfoSlideIndex = 1;
  }
  if (centerInfoN < 1) {
    centerInfoSlideIndex = centerInfoSlides.length;
  }

  centerInfoSlides.forEach((centerInfoSlide) =>
    centerInfoSlide.classList.remove("active")
  );
  centerInfoDots.forEach((centerInfoDot) =>
    centerInfoDot.classList.remove("active")
  );

  centerInfoSlides[centerInfoSlideIndex - 1].classList.add("active");
  centerInfoDots[centerInfoSlideIndex - 1].classList.add("active");
}

// Touch support for mobile
let centerInfoStartX = 0;
let centerInfoEndX = 0;

document
  .querySelector(".centerInfo-slider")
  .addEventListener("touchstart", function (centerInfoE) {
    centerInfoStartX = centerInfoE.touches[0].clientX;
  });

document
  .querySelector(".centerInfo-slider")
  .addEventListener("touchend", function (centerInfoE) {
    centerInfoEndX = centerInfoE.changedTouches[0].clientX;
    centerInfoHandleSwipe();
  });

function centerInfoHandleSwipe() {
  if (centerInfoStartX - centerInfoEndX > 50) {
    centerInfoChangeSlide(1); // Swipe left
  }
  if (centerInfoEndX - centerInfoStartX > 50) {
    centerInfoChangeSlide(-1); // Swipe right
  }
}

// Close modal when clicking outside
window.onclick = function (centerInfoEvent) {
  const centerInfoModal = document.getElementById("centerInfoModal");
  if (centerInfoEvent.target == centerInfoModal) {
    centerInfoCloseModal();
  }
};

// Keyboard navigation
document.addEventListener("keydown", function (centerInfoEvent) {
  const centerInfoModal = document.getElementById("centerInfoModal");
  if (centerInfoModal.style.display === "block") {
    if (centerInfoEvent.key === "ArrowLeft") {
      centerInfoChangeSlide(-1);
    } else if (centerInfoEvent.key === "ArrowRight") {
      centerInfoChangeSlide(1);
    } else if (centerInfoEvent.key === "Escape") {
      centerInfoCloseModal();
    }
  }
});
