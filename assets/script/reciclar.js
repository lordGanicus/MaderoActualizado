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
      const restaurantesToggle = document.getElementById("restaurantesToggle");
      const restaurantesMenu = document.getElementById("restaurantesMenu");
      const socialFlower = document.getElementById("socialFlower");
      const socialCenter = document.getElementById("socialCenter");

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
      if (restaurantesToggle && restaurantesMenu) {
        restaurantesToggle.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("Toggle clicked");
          this.classList.toggle("active");
          restaurantesMenu.classList.toggle("active");
        });

        restaurantesMenu.addEventListener("click", function (e) {
          e.stopPropagation();
          // No prevenir default para que el link navegue
        });

        document.addEventListener("click", function (e) {
          console.log("Document clicked on:", e.target);

          if (
            !restaurantesToggle.contains(e.target) &&
            !restaurantesMenu.contains(e.target)
          ) {
            console.log("Click fuera del menú, cerrando menú");
            restaurantesToggle.classList.remove("active");
            restaurantesMenu.classList.remove("active");
          } else {
            console.log("Click dentro del menú o toggle");
          }
        });
      }

      const menuLinks = document.querySelectorAll(
        ".menu-links a:not(.dropdown-toggle a)"
      );
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

    if (socialFlower && socialCenter) {
      socialCenter.addEventListener("click", function (e) {
        e.stopPropagation();
        socialFlower.classList.toggle("active");
      });

      document.addEventListener("click", function (e) {
        if (!socialFlower.contains(e.target)) {
          socialFlower.classList.remove("active");
        }
      });
    } else {
      console.warn("No se encontró #socialFlower o #socialCenter");
    }
  }

  try {
    fetch("/assets/paginas/footer-top.html")
      .then((res) => res.text())
      .then((data) => {
        const footerTop = document.getElementById("footer-top");
        if (footerTop) footerTop.innerHTML = data;
      })
      .catch((error) => console.error("Error al cargar footer-top:", error));
  } catch (error) {
    console.error("Error en carga de footer-top:", error);
  }

  try {
    fetch("/assets/paginas/footer-bottom.html")
      .then((res) => res.text())
      .then((data) => {
        const footerBottom = document.getElementById("footer-bottom");
        if (footerBottom) footerBottom.innerHTML = data;
      })
      .catch((error) => console.error("Error al cargar footer-bottom:", error));
  } catch (error) {
    console.error("Error en carga de footer-bottom:", error);
  }

  // Slider para habitaciones
  try {
    const sr = ScrollReveal({
      distance: "60px",
      duration: 1000,
      delay: 200,
      reset: false,
      easing: "ease-in-out",
    });

    if (sr) {
      sr.reveal(
        ".text, .heading, .package-container, .servicio, #section-text, .tarjeta-habitacion, .tarjeta-suite",
        { origin: "top" }
      );

      sr.reveal(".ride-container .box", {
        delay: 300,
        origin: "bottom",
      });

      sr.reveal(".nav-header", {
        delay: 300,
        origin: "left",
      });
    }
  } catch (error) {
    console.error("Error en ScrollReveal:", error);
  }
  /*********************************************************/
  // Sliders para habitaciones estándar
  try {
    const sliders = document.querySelectorAll(".slider-habitacion");

    sliders.forEach((slider) => {
      try {
        const images = slider.querySelector(".imagenes-slider");
        const prevBtn = slider.querySelector(".anterior");
        const nextBtn = slider.querySelector(".siguiente");
        let currentIndex = 0;

        function updateSlider() {
          if (images)
            images.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % 3;
            updateSlider();
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + 3) % 3;
            updateSlider();
          });
        }
      } catch (error) {
        console.error("Error en slider de habitación:", error);
      }
    });
  } catch (error) {
    console.error("Error en sliders de habitaciones:", error);
  }

  // Movimiento de slider para suites
  try {
    const suiteSliders = document.querySelectorAll(".slider-suite");

    suiteSliders.forEach((slider) => {
      try {
        const images = slider.querySelector(".imagenes-suite-slider");
        const prevBtn = slider.querySelector(".anterior-suite");
        const nextBtn = slider.querySelector(".siguiente-suite");
        let currentIndex = 0;

        function updateSlider() {
          if (images)
            images.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % 3;
            updateSlider();
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + 3) % 3;
            updateSlider();
          });
        }

        // Auto-avance opcional
        if (images && nextBtn) {
          setInterval(() => {
            currentIndex = (currentIndex + 1) % 3;
            updateSlider();
          }, 3500);
        }
      } catch (error) {
        console.error("Error en slider de suite:", error);
      }
    });
  } catch (error) {
    console.error("Error en sliders de suites:", error);
  }

  // Slider para restaurante
  try {
    document.querySelectorAll(".restaurante-card").forEach((card) => {
      try {
        const slider = card.querySelector(".restaurante-slider");
        if (!slider) return;

        const imgContainer = slider.querySelector(".restaurante-img-large");
        const prevBtn = card.querySelector(".restaurante-prev");
        const nextBtn = card.querySelector(".restaurante-next");
        const images = imgContainer?.querySelectorAll("img");

        if (!images || images.length === 0) return;

        let currentIndex = 0;
        const totalImages = images.length;

        function updateSlider() {
          if (imgContainer)
            imgContainer.style.transform = `translateX(-${
              currentIndex * 100
            }%)`;
        }

        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
          });
        }

        // Auto-slide
        if (imgContainer && nextBtn) {
          setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
          }, 3500);
        }
      } catch (error) {
        console.error("Error en slider de restaurante:", error);
      }
    });
  } catch (error) {
    console.error("Error en sliders de restaurantes:", error);
  }
});

// Acordeón para los servicios
try {
  document.querySelectorAll(".servicio-header").forEach((header) => {
    try {
      header.addEventListener("click", () => {
        const servicio = header.parentElement;
        if (servicio) servicio.classList.toggle("active");
      });
    } catch (error) {
      console.error("Error en acordeón de servicio:", error);
    }
  });
} catch (error) {
  console.error("Error en acordeones de servicios:", error);
}

try {
  document.querySelectorAll(".package-tab").forEach((btn) => {
    try {
      btn.addEventListener("click", () => {
        btn.classList.remove("shine");
        void btn.offsetWidth;
        btn.classList.add("shine");
      });
    } catch (error) {
      console.error("Error en botón shine:", error);
    }
  });
} catch (error) {
  console.error("Error en botones shine:", error);
}

/***************************script para salones */
try {
  // Initialize hero slider
  const heroSliderElement = document.querySelector(".hero-slider .swiper");
  if (heroSliderElement) {
    try {
      const heroSlider = new Swiper(".hero-slider .swiper", {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    } catch (error) {
      console.error("Error en hero slider:", error);
    }
  }

  // Initialize package sliders
  const packageSliders = document.querySelectorAll(".package-slider");
  packageSliders.forEach((slider) => {
    try {
      new Swiper(slider, {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    } catch (error) {
      console.error("Error en package slider:", error);
    }
  });

  // Tab functionality
  const tabs = document.querySelectorAll(".package-tab");
  const contents = document.querySelectorAll(".package-content");

  tabs.forEach((tab) => {
    try {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active");
        const tabId = tab.getAttribute("data-tab");
        const content = document.getElementById(tabId);
        if (content) content.classList.add("active");
      });
    } catch (error) {
      console.error("Error en tab:", error);
    }
  });
} catch (error) {
  console.error("Error en scripts de salones:", error);
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    // Elementos del DOM
    const navToggle = document.getElementById("navToggle");
    const menuLateral = document.getElementById("menuLateral");
    const overlay = document.getElementById("overlay");
    const reservaBtn = document.getElementById("reservaBtn");
    const restaurantesToggle = document.getElementById("restaurantesToggle");
    const restaurantesMenu = document.getElementById("restaurantesMenu");
    const socialFlower = document.getElementById("socialFlower");
    const socialCenter = document.getElementById("socialCenter");

    // Toggle del menú lateral
    if (navToggle && menuLateral && overlay) {
      try {
        navToggle.addEventListener("click", function () {
          this.classList.toggle("active");
          menuLateral.classList.toggle("active");
          overlay.classList.toggle("active");

          // Deshabilitar scroll cuando el menú está abierto
          if (menuLateral.classList.contains("active")) {
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "";
          }
        });
      } catch (error) {
        console.error("Error en toggle del menú lateral:", error);
      }
    }

    // Cerrar menú al hacer clic en overlay
    if (overlay && navToggle && menuLateral) {
      try {
        overlay.addEventListener("click", function () {
          navToggle.classList.remove("active");
          menuLateral.classList.remove("active");
          this.classList.remove("active");
          document.body.style.overflow = "";
        });
      } catch (error) {
        console.error("Error en cierre de overlay:", error);
      }
    }

    // Botón de reserva
    if (reservaBtn) {
      try {
        reservaBtn.addEventListener("click", function () {
          window.open(
            "https://wa.me/59167160515?text=Hola%2C%20quiero%20realizar%20una%20reserva",
            "_blank"
          );
        });
      } catch (error) {
        console.error("Error en botón de reserva:", error);
      }
    }

    // Dropdown de restaurantes
    if (restaurantesToggle && restaurantesMenu) {
      try {
        restaurantesToggle.addEventListener("click", function (e) {
          e.preventDefault();
          this.classList.toggle("active");
          restaurantesMenu.classList.toggle("active");
        });
      } catch (error) {
        console.error("Error en dropdown de restaurantes:", error);
      }
    }

    // Efecto floral redes sociales
    if (socialCenter && socialFlower) {
      try {
        socialCenter.addEventListener("click", function () {
          socialFlower.classList.toggle("active");

          // Cambiar ícono de + a x cuando está activo
          const icon = this.querySelector("i");
          if (icon) {
            if (socialFlower.classList.contains("active")) {
              icon.classList.remove("fa-plus");
              icon.classList.add("fa-times");
            } else {
              icon.classList.remove("fa-times");
              icon.classList.add("fa-plus");
            }
          }
        });
      } catch (error) {
        console.error("Error en efecto floral redes sociales:", error);
      }
    }

    // Cerrar menú al hacer clic en un enlace (para móviles)
    try {
      const menuLinks = document.querySelectorAll(
        ".menu-links a:not(.dropdown-toggle a)"
      );

      if (menuLinks.length > 0 && navToggle && menuLateral && overlay) {
        menuLinks.forEach((link) => {
          try {
            link.addEventListener("click", function () {
              if (window.innerWidth <= 992) {
                navToggle.classList.remove("active");
                menuLateral.classList.remove("active");
                overlay.classList.remove("active");
                document.body.style.overflow = "";
              }
            });
          } catch (error) {
            console.error("Error en cierre de menú por enlace:", error);
          }
        });
      }
    } catch (error) {
      console.error("Error al seleccionar enlaces del menú:", error);
    }
  } catch (error) {
    console.error("Error general en el código principal:", error);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".package-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Quitar la clase active de todos
      tabs.forEach((t) => t.classList.remove("active"));
      // Poner active solo al que clickeaste
      tab.classList.add("active");
    });
  });
});
