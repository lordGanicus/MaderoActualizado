// Función para reservar ahora (WhatsApp)
function habInfoReservarAhora(habitacion) {
  const mensaje = `Hola, quiero reservar la ${habitacion}`;
  const mensajeCodificado = encodeURIComponent(mensaje);
  window.open(`https://wa.me/59167160515?text=${mensajeCodificado}`, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".habInfo-nav-button");
  const sections = document.querySelectorAll(".habInfo-cards-grid");
  const indicators = document.querySelectorAll(".habInfo-section-indicator");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-section");

      // Remove active class from all buttons, sections and indicators
      navButtons.forEach((btn) => btn.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));
      indicators.forEach((indicator) => indicator.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show target section with animation
      const targetElement = document.getElementById(targetSection + "-section");
      setTimeout(() => {
        targetElement.classList.add("active");

        // Activate the indicator for the current section
        const currentIndicator = targetElement.querySelector(
          ".habInfo-section-indicator"
        );
        if (currentIndicator) {
          currentIndicator.classList.add("active");
        }

        // Trigger animation for cards in the new section
        setTimeout(() => {
          habInfoAnimateOnScroll();
        }, 300);
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
});

// Animación de entrada al hacer scroll con efecto de "choque"
function habInfoAnimateOnScroll() {
  const suiteItems = document.querySelectorAll(".habInfo-card");

  suiteItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (itemTop < windowHeight - 100) {
      item.classList.add("visible");
    }
  });
}

// Inicializar animaciones al cargar la página
window.addEventListener("load", function () {
  habInfoAnimateOnScroll();
});

// Activar animaciones al hacer scroll
window.addEventListener("scroll", habInfoAnimateOnScroll);

// Funcionalidad de los modales
document.querySelectorAll(".habInfo-button[data-modal]").forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = "habInfo-modal-" + this.getAttribute("data-modal");
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.style.display = "block";
      /*EL primer*/
      //Inicializar Swiper para el slider de imágenes
      new Swiper(".habInfo-swiper", {
        loop: true,
        navigation: {
          nextEl: ".habInfo-swiper-button-next",
          prevEl: ".habInfo-swiper-button-prev",
        },
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
          delay: 5000,
        },
      });
    }
  });
});

// Cerrar modales
document.querySelectorAll(".habInfo-modal-close").forEach((button) => {
  button.addEventListener("click", function () {
    this.closest(".habInfo-modal").style.display = "none";
  });
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("habInfo-modal")) {
    event.target.style.display = "none";
  }
});

// Envío de formularios a WhatsApp
document.querySelectorAll('form[id^="habInfo-form-"]').forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener datos del formulario
    const entrada = this.querySelector(
      'input[type="date"]:first-of-type'
    ).value;
    const salida = this.querySelector('input[type="date"]:last-of-type').value;
    const cantidad = this.querySelector('input[type="number"]').value;

    // Determinar el tipo de habitación según el ID del formulario
    let habitacion = "";
    if (this.id.includes("matrimonial")) habitacion = "suite matrimonial";
    else if (this.id.includes("familiar")) habitacion = "suite familiar";
    else if (this.id.includes("simple"))
      habitacion = "habitación business simple";
    else if (this.id.includes("twin")) habitacion = "habitación business twin";
    else habitacion = "habitación business familiar";

    // Formatear fechas
    const entradaFormateada = entrada
      ? new Date(entrada).toLocaleDateString("es-ES")
      : "--/--/----";
    const salidaFormateada = salida
      ? new Date(salida).toLocaleDateString("es-ES")
      : "--/--/----";

    // Crear mensaje para WhatsApp
    const mensaje = `Hola, quiero reservar la ${habitacion} desde el ${entradaFormateada} hasta el ${salidaFormateada} para ${cantidad} personas.`;
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Abrir WhatsApp
    window.open(
      `https://wa.me/59167160515?text=${mensajeCodificado}`,
      "_blank"
    );
  });
});
/***************************************/
// Intersection Observer para activar la animación
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("habPort-animate");
    }
  });
}, observerOptions);

// Observar la sección del hotel
const hotelSection = document.getElementById("hotelSection");
observer.observe(hotelSection);

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
