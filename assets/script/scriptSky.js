// WhatsApp functionality
try {
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
} catch (error) {
  console.error("Error en la funcionalidad de WhatsApp:", error);
}

// Animation controller
try {
  class ScrollAnimationController {
    constructor() {
      this.heroSection = document.getElementById("heroSection");
      this.isAnimatedIn = false;
      this.isAnimatedOut = false;
      this.init();
    }

    init() {
      try {
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
      } catch (error) {
        console.error("Error en init de ScrollAnimationController:", error);
      }
    }

    animateIn() {
      try {
        if (!this.isAnimatedIn && this.heroSection) {
          this.heroSection.classList.remove("animate-out");
          this.heroSection.classList.add("animate-in");
          this.isAnimatedIn = true;
          this.isAnimatedOut = false;
        }
      } catch (error) {
        console.error("Error en animateIn:", error);
      }
    }

    animateOut() {
      try {
        if (!this.isAnimatedOut && this.heroSection) {
          this.heroSection.classList.remove("animate-in");
          this.heroSection.classList.add("animate-out");
          this.isAnimatedOut = true;
          this.isAnimatedIn = false;
        }
      } catch (error) {
        console.error("Error en animateOut:", error);
      }
    }

    handleScroll() {
      try {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollThreshold = windowHeight * 0.3;

        if (scrollPosition > scrollThreshold) {
          this.animateOut();
        } else {
          this.animateIn();
        }
      } catch (error) {
        console.error("Error en handleScroll:", error);
      }
    }

    setupIntersectionObserver() {
      try {
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

        if (this.heroSection) {
          observer.observe(this.heroSection);
        }
      } catch (error) {
        console.error("Error en setupIntersectionObserver:", error);
      }
    }
  }

  // Initialize animation controller when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    try {
      new ScrollAnimationController();
    } catch (error) {
      console.error("Error al inicializar ScrollAnimationController:", error);
    }
  });

  // Additional smooth scroll enhancement
  try {
    document.documentElement.style.scrollBehavior = "smooth";
  } catch (error) {
    console.error("Error al aplicar scroll suave:", error);
  }
} catch (error) {
  console.error("Error en el controlador de animación:", error);
}

/***************************efecto de animacion para el after hero*****************/
try {
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const target = document.querySelector(".skyhero-afterhero");

      if (target) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                target.classList.add("visible");
                observer.unobserve(target);
              }
            });
          },
          { threshold: 0.3 }
        );

        observer.observe(target);
      }
    } catch (error) {
      console.error("Error en el efecto after hero:", error);
    }
  });
} catch (error) {
  console.error("Error en la sección after hero:", error);
}

/********************************Sky menu -- Menu *******************************/
try {
  document.addEventListener("DOMContentLoaded", function () {
    try {
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
        try {
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return (
            rect.top <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
        } catch (error) {
          console.error("Error en isInViewport:", error);
          return false;
        }
      }

      // Función para manejar la animación de entrada de la primera sección
      function handleScrollAnimation1() {
        try {
          if (isInViewport(card1) && !animationTriggered1) {
            animationTriggered1 = true;

            // Animación del card
            card1.classList.add("visible");

            // Animación de la imagen grande con retardo
            setTimeout(() => {
              if (largeImage1) largeImage1.classList.add("visible");
            }, 300);

            // Animación de la imagen pequeña con retardo
            setTimeout(() => {
              if (smallImage1) smallImage1.classList.add("visible");
            }, 600);

            // Animación escalonada para los elementos de la lista
            listItems1.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("visible");
              }, 800 + index * 100);
            });
          }
        } catch (error) {
          console.error("Error en handleScrollAnimation1:", error);
        }
      }

      // Función para manejar la animación de entrada de la segunda sección
      function handleScrollAnimation2() {
        try {
          if (isInViewport(card2) && !animationTriggered2) {
            animationTriggered2 = true;

            // Animación del card
            card2.classList.add("visible");

            // Animación de la imagen grande con retardo
            setTimeout(() => {
              if (largeImage2) largeImage2.classList.add("visible");
            }, 300);

            // Animación de la imagen pequeña con retardo
            setTimeout(() => {
              if (smallImage2) smallImage2.classList.add("visible");
            }, 600);
          }
        } catch (error) {
          console.error("Error en handleScrollAnimation2:", error);
        }
      }

      // Preparar elementos para animación
      listItems1.forEach((item) => {
        try {
          item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        } catch (error) {
          console.error("Error al preparar elementos de lista:", error);
        }
      });

      // Verificar al cargar la página
      handleScrollAnimation1();
      handleScrollAnimation2();

      // Verificar al hacer scroll
      window.addEventListener("scroll", function () {
        try {
          handleScrollAnimation1();
          handleScrollAnimation2();
        } catch (error) {
          console.error("Error en el evento scroll:", error);
        }
      });

      // Funcionalidad de WhatsApp para reservar (primera sección)
      const reservarBtn = document.getElementById("reservarBtn");
      if (reservarBtn) {
        reservarBtn.addEventListener("click", function (e) {
          try {
            e.preventDefault();
            const phoneNumber = "61239790";
            const message =
              "Hola, me gustaría reservar en el restaurante Cielo Urbano. ¿Podrían ayudarme con la disponibilidad?";
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, "_blank");
          } catch (error) {
            console.error("Error en el botón de reservar:", error);
          }
        });
      }

      // Funcionalidad para el botón de explorar (segunda sección)
      const explorarBtn = document.getElementById("explorarSportBarBtn");
      if (explorarBtn) {
        explorarBtn.addEventListener("click", function (e) {
          try {
            e.preventDefault();
            alert("Explorando Urban Center Sport Bar");
          } catch (error) {
            console.error("Error en el botón de explorar:", error);
          }
        });
      }

      // Efecto de parallax suave para el fondo
      window.addEventListener("scroll", function () {
        try {
          const scrolled = window.pageYOffset;
          const skyMenuSection = document.querySelector(".skyMenu-section");
          const sportBarSection = document.querySelector(".sportBar-section");

          if (skyMenuSection) {
            skyMenuSection.style.backgroundPositionY = -(scrolled * 0.5) + "px";
          }

          if (sportBarSection) {
            sportBarSection.style.backgroundPositionY =
              -(scrolled * 0.5) + "px";
          }
        } catch (error) {
          console.error("Error en el efecto parallax:", error);
        }
      });

      if (window.innerWidth > 768) {
        // Función para calcular rotación limitada a ±90°
        function calculateRotation(x, rect) {
          try {
            const centerX = rect.width / 2;
            const relativeX = (x - centerX) / centerX;
            return Math.max(-90, Math.min(90, -(relativeX * 90)));
          } catch (error) {
            console.error("Error en calculateRotation:", error);
            return 0;
          }
        }

        // Primera sección
        const container1 = document.querySelector(".skyMenu-container");
        if (container1) {
          container1.addEventListener("mousemove", function (e) {
            try {
              const rect = container1.getBoundingClientRect();
              const rotateZ = calculateRotation(e.clientX - rect.left, rect);

              if (largeImage1) {
                largeImage1.style.transform = `translateY(-50%) scale(1.05) rotate(${rotateZ}deg)`;
              }

              if (smallImage1) {
                smallImage1.style.transform = `scale(1.05) rotate(${
                  rotateZ / 2
                }deg)`;
              }
            } catch (error) {
              console.error("Error en mousemove container1:", error);
            }
          });

          container1.addEventListener("mouseleave", function () {
            try {
              if (largeImage1) {
                largeImage1.style.transform =
                  "translateY(-50%) scale(1.05) rotate(0)";
              }
              if (smallImage1) {
                smallImage1.style.transform = "scale(1.05) rotate(0)";
              }
            } catch (error) {
              console.error("Error en mouseleave container1:", error);
            }
          });
        }

        // Segunda sección
        const container2 = document.querySelector(".sportBar-container");
        if (container2) {
          container2.addEventListener("mousemove", function (e) {
            try {
              const rect = container2.getBoundingClientRect();
              const rotateZ = calculateRotation(e.clientX - rect.left, rect);

              if (largeImage2) {
                largeImage2.style.transform = `translateY(-50%) scale(1.05) rotate(${rotateZ}deg)`;
              }

              if (smallImage2) {
                smallImage2.style.transform = `scale(1.05) rotate(${
                  rotateZ / 2
                }deg)`;
              }
            } catch (error) {
              console.error("Error en mousemove container2:", error);
            }
          });

          container2.addEventListener("mouseleave", function () {
            try {
              if (largeImage2) {
                largeImage2.style.transform =
                  "translateY(-50%) scale(1.05) rotate(0)";
              }
              if (smallImage2) {
                smallImage2.style.transform = "scale(1.05) rotate(0)";
              }
            } catch (error) {
              console.error("Error en mouseleave container2:", error);
            }
          });
        }
      }
    } catch (error) {
      console.error("Error en la inicialización del Sky Menu:", error);
    }
  });
} catch (error) {
  console.error("Error en la sección Sky Menu:", error);
}

/******************************* Sky Carta Menus a la carta ***************************/
try {
  let currentIndex = 0;
  const slides = document.getElementById("slides");
  const totalSlides = 6;
  const totalGroups = 2;
  let isTransitioning = false;
  let autoPlayInterval;

  // Variables para touch
  let startX = 0;
  let isDragging = false;

  // Crear indicadores de puntos
  function createDots() {
    try {
      const dotsContainer = document.getElementById("dots-container");
      if (!dotsContainer) return;

      dotsContainer.innerHTML = "";
      for (let i = 0; i < totalGroups; i++) {
        const dot = document.createElement("div");
        dot.className = "skyCarta-dot";
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    } catch (error) {
      console.error("Error en createDots:", error);
    }
  }

  function updateSlider() {
    try {
      if (!slides) return;

      const translateX = -(currentIndex * 100);
      slides.style.transform = `translateX(${translateX}%)`;
      slides.style.transition = "transform 5s ease";

      const cards = document.querySelectorAll(".skyCarta-card");
      cards.forEach((card, index) => {
        card.classList.remove("center");
        if (index === currentIndex * 3 + 1) {
          card.classList.add("center");
        }
      });

      const dots = document.querySelectorAll(".skyCarta-dot");
      dots.forEach((dot, index) => {
        dot.classList.remove("active");
        if (index === currentIndex) {
          dot.classList.add("active");
        }
      });
    } catch (error) {
      console.error("Error en updateSlider:", error);
    }
  }

  function nextSlide() {
    try {
      if (isTransitioning) return;
      isTransitioning = true;

      currentIndex = (currentIndex + 1) % totalGroups;
      updateSlider();

      setTimeout(() => {
        isTransitioning = false;
      }, 5000);
    } catch (error) {
      console.error("Error en nextSlide:", error);
      isTransitioning = false;
    }
  }

  function previousSlide() {
    try {
      if (isTransitioning) return;
      isTransitioning = true;

      currentIndex = (currentIndex - 1 + totalGroups) % totalGroups;
      updateSlider();

      setTimeout(() => {
        isTransitioning = false;
      }, 5000);
    } catch (error) {
      console.error("Error en previousSlide:", error);
      isTransitioning = false;
    }
  }

  function goToSlide(index) {
    try {
      if (isTransitioning) return;
      isTransitioning = true;

      currentIndex = index;
      updateSlider();

      setTimeout(() => {
        isTransitioning = false;
      }, 5000);
    } catch (error) {
      console.error("Error en goToSlide:", error);
      isTransitioning = false;
    }
  }

  function reservar() {
    try {
      alert(
        "¡Gracias por tu interés! Te contactaremos pronto para tu reserva especial."
      );
    } catch (error) {
      console.error("Error en reservar:", error);
    }
  }

  function startAutoPlay() {
    try {
      autoPlayInterval = setInterval(nextSlide, 4000);
    } catch (error) {
      console.error("Error en startAutoPlay:", error);
    }
  }

  function stopAutoPlay() {
    try {
      clearInterval(autoPlayInterval);
    } catch (error) {
      console.error("Error en stopAutoPlay:", error);
    }
  }

  // Event Listeners para botones
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      try {
        console.log("Next button clicked");
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      } catch (error) {
        console.error("Error en nextBtn click:", error);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      try {
        console.log("Previous button clicked");
        stopAutoPlay();
        previousSlide();
        startAutoPlay();
      } catch (error) {
        console.error("Error en prevBtn click:", error);
      }
    });
  }

  // Pausar auto-play en hover
  const sliderContainer = document.querySelector(".skyCarta-slider-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopAutoPlay);
    sliderContainer.addEventListener("mouseleave", startAutoPlay);

    // Touch Events
    sliderContainer.addEventListener(
      "touchstart",
      (e) => {
        try {
          startX = e.touches[0].clientX;
          isDragging = true;
          stopAutoPlay();
        } catch (error) {
          console.error("Error en touchstart:", error);
        }
      },
      { passive: true }
    );

    sliderContainer.addEventListener(
      "touchmove",
      (e) => {
        try {
          if (!isDragging) return;
          e.preventDefault();
        } catch (error) {
          console.error("Error en touchmove:", error);
        }
      },
      { passive: false }
    );

    sliderContainer.addEventListener(
      "touchend",
      (e) => {
        try {
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
        } catch (error) {
          console.error("Error en touchend:", error);
        }
      },
      { passive: true }
    );

    // Mouse Events (para desktop)
    let isMouseDown = false;
    let mouseStartX = 0;

    sliderContainer.addEventListener("mousedown", (e) => {
      try {
        mouseStartX = e.clientX;
        isMouseDown = true;
        stopAutoPlay();
      } catch (error) {
        console.error("Error en mousedown:", error);
      }
    });

    sliderContainer.addEventListener("mousemove", (e) => {
      try {
        if (!isMouseDown) return;
        e.preventDefault();
      } catch (error) {
        console.error("Error en mousemove:", error);
      }
    });

    sliderContainer.addEventListener("mouseup", (e) => {
      try {
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
      } catch (error) {
        console.error("Error en mouseup:", error);
      }
    });
  }

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    try {
      if (e.key === "ArrowLeft") {
        stopAutoPlay();
        previousSlide();
        startAutoPlay();
      } else if (e.key === "ArrowRight") {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      }
    } catch (error) {
      console.error("Error en keydown:", error);
    }
  });

  // Inicializar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    try {
      console.log("DOM loaded, initializing slider");
      createDots();
      updateSlider();
      startAutoPlay();
      console.log("Slider initialized with currentIndex:", currentIndex);
    } catch (error) {
      console.error("Error al inicializar el slider:", error);
    }
  });

  // Manejar cambio de tamaño de ventana
  window.addEventListener("resize", () => {
    try {
      updateSlider();
    } catch (error) {
      console.error("Error en resize:", error);
    }
  });
} catch (error) {
  console.error("Error en la sección Sky Carta:", error);
}

/***************************Sky Modal restobar frame facebook**********************/
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

          if (targetElement.classList.contains("skyResto-main")) {
            targetElement.style.opacity = "1";
            targetElement.style.transform = "translateY(0)";
            targetElement.style.transition = "all 1s ease-out";
          }

          if (targetElement.classList.contains("skyResto-menu")) {
            targetElement.classList.add("skyResto-visible-left");

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

      document.querySelectorAll(".skyResto-menu-card").forEach((c) => {
        c.classList.remove("active");
      });

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
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    } catch (error) {
      console.error("Error al abrir el modal:", error);
    }
  }

  function closeModal() {
    try {
      const modal = document.getElementById("imageModal");
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    } catch (error) {
      console.error("Error al cerrar el modal:", error);
    }
  }

  function updateSlider() {
    try {
      const track = document.getElementById("sliderTrack");
      if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
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
  const imageModal = document.getElementById("imageModal");
  if (imageModal) {
    imageModal.addEventListener("transitionend", (e) => {
      try {
        if (e.target.classList.contains("active")) {
          startAutoPlay();
        }
      } catch (error) {
        console.error("Error al manejar la transición del modal:", error);
      }
    });
  }

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
      if (modal && modal.classList.contains("active")) {
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

  // --- Soporte Touch para el Slider ---
  let startX = 0;
  let endX = 0;

  const track = document.getElementById("sliderTrack");
  if (track) {
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", () => {
      const deltaX = endX - startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
      startX = 0;
      endX = 0;
    });
  }

  // Desplazamiento suave
  try {
    document.documentElement.style.scrollBehavior = "smooth";
  } catch (error) {
    console.error("Error al aplicar scroll suave:", error);
  }

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
  console.error("Error en la sección Sky Modal:", error);
}
/********************************Restaurante last ********************************/
try {
  // Detectar cuando la sección SkyLast entra en la vista
  document.addEventListener("DOMContentLoaded", function () {
    try {
      const skyLastSection = document.querySelector(".skyLast-container");
      const particlesContainer = document.getElementById("particles-container");

      // Variable para controlar si la animación ya se activó
      let animationActivated = false;

      // Crear partículas para el efecto
      function createParticles() {
        try {
          if (!particlesContainer) return;

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
        } catch (error) {
          console.error("Error en createParticles:", error);
        }
      }

      // Función para verificar si el elemento está en la vista
      function isElementInViewport(el) {
        try {
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return (
            rect.top <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
        } catch (error) {
          console.error("Error en isElementInViewport:", error);
          return false;
        }
      }

      // Activar animación cuando la sección esté en la vista
      function checkScroll() {
        try {
          if (
            !animationActivated &&
            skyLastSection &&
            isElementInViewport(skyLastSection)
          ) {
            skyLastSection.classList.add("active");
            animationActivated = true;
            console.log("SkyLast activado - Entró en el viewport");
          }
        } catch (error) {
          console.error("Error en checkScroll:", error);
        }
      }

      // Inicializar partículas
      createParticles();

      // Verificar al cargar la página
      checkScroll();

      // Y también al hacer scroll
      window.addEventListener("scroll", checkScroll);
    } catch (error) {
      console.error("Error en la sección Restaurante last:", error);
    }
  });
} catch (error) {
  console.error("Error en la sección Restaurante last:", error);
}

/*********************************Urban Center***********************************/
try {
  // Intersection Observer for entrance animations
  const centerInfoObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const centerInfoObserver = new IntersectionObserver((centerInfoEntries) => {
    try {
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
    } catch (error) {
      console.error("Error en IntersectionObserver:", error);
    }
  }, centerInfoObserverOptions);

  // Observe elements
  document.addEventListener("DOMContentLoaded", function () {
    try {
      const centerInfoElementsToObserve = [
        ".centerInfo-card",
        ".centerInfo-large-image",
        ".centerInfo-small-image",
        ".centerInfo-tilted-image-container",
        ".centerInfo-content",
      ];

      centerInfoElementsToObserve.forEach((centerInfoSelector) => {
        const centerInfoElements =
          document.querySelectorAll(centerInfoSelector);
        centerInfoElements.forEach((centerInfoEl) => {
          if (centerInfoEl) {
            centerInfoObserver.observe(centerInfoEl);
          }
        });
      });
    } catch (error) {
      console.error("Error al observar los elementos:", error);
    }
  });

  // Modal functionality
  let centerInfoSlideIndex = 1;

  function centerInfoOpenModal() {
    try {
      const modal = document.getElementById("centerInfoModal");
      if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    } catch (error) {
      console.error("Error al abrir el modal:", error);
    }
  }

  function centerInfoCloseModal() {
    try {
      const modal = document.getElementById("centerInfoModal");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    } catch (error) {
      console.error("Error al cerrar el modal:", error);
    }
  }

  function centerInfoChangeSlide(centerInfoN) {
    try {
      centerInfoShowSlide((centerInfoSlideIndex += centerInfoN));
    } catch (error) {
      console.error("Error al cambiar el slide:", error);
    }
  }

  function centerInfoCurrentSlide(centerInfoN) {
    try {
      centerInfoShowSlide((centerInfoSlideIndex = centerInfoN));
    } catch (error) {
      console.error("Error al mostrar el slide actual:", error);
    }
  }

  function centerInfoShowSlide(centerInfoN) {
    try {
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

      if (centerInfoSlides[centerInfoSlideIndex - 1]) {
        centerInfoSlides[centerInfoSlideIndex - 1].classList.add("active");
      }
      if (centerInfoDots[centerInfoSlideIndex - 1]) {
        centerInfoDots[centerInfoSlideIndex - 1].classList.add("active");
      }
    } catch (error) {
      console.error("Error al mostrar el slide:", error);
    }
  }

  // Touch support for mobile
  let centerInfoStartX = 0;
  let centerInfoEndX = 0;

  const sliderElement = document.querySelector(".centerInfo-slider");
  if (sliderElement) {
    sliderElement.addEventListener("touchstart", function (centerInfoE) {
      try {
        centerInfoStartX = centerInfoE.touches[0].clientX;
      } catch (error) {
        console.error("Error al iniciar el touchstart:", error);
      }
    });

    sliderElement.addEventListener("touchend", function (centerInfoE) {
      try {
        centerInfoEndX = centerInfoE.changedTouches[0].clientX;
        centerInfoHandleSwipe();
      } catch (error) {
        console.error("Error al finalizar el touchend:", error);
      }
    });
  }

  function centerInfoHandleSwipe() {
    try {
      if (centerInfoStartX - centerInfoEndX > 50) {
        centerInfoChangeSlide(1);
      }
      if (centerInfoEndX - centerInfoStartX > 50) {
        centerInfoChangeSlide(-1);
      }
    } catch (error) {
      console.error("Error al manejar el swipe:", error);
    }
  }

  // Close modal when clicking outside
  window.onclick = function (centerInfoEvent) {
    try {
      const centerInfoModal = document.getElementById("centerInfoModal");
      if (centerInfoEvent.target == centerInfoModal) {
        centerInfoCloseModal();
      }
    } catch (error) {
      console.error("Error al manejar el evento de clic:", error);
    }
  };

  // Keyboard navigation
  document.addEventListener("keydown", function (centerInfoEvent) {
    try {
      const centerInfoModal = document.getElementById("centerInfoModal");
      if (centerInfoModal && centerInfoModal.style.display === "block") {
        if (centerInfoEvent.key === "ArrowLeft") {
          centerInfoChangeSlide(-1);
        } else if (centerInfoEvent.key === "ArrowRight") {
          centerInfoChangeSlide(1);
        } else if (centerInfoEvent.key === "Escape") {
          centerInfoCloseModal();
        }
      }
    } catch (error) {
      console.error("Error en la navegación del teclado:", error);
    }
  });
} catch (error) {
  console.error("Error en la sección Urban Center:", error);
}
