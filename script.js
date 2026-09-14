/* =========================================================
   AMOURA INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const loader = document.querySelector(".page-loader");

  if (loader) {
    setTimeout(() => {
      loader.style.pointerEvents = "none";
    }, 1800);
  }


  /* =======================================================
     MOBILE / SIDE MENU
     ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const menuClose = document.getElementById("menuClose");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    if (!sideMenu) return;

    sideMenu.classList.add("open");

    if (menuOverlay) {
      menuOverlay.classList.add("open");
    }

    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!sideMenu) return;

    sideMenu.classList.remove("open");

    if (menuOverlay) {
      menuOverlay.classList.remove("open");
    }

    document.body.classList.remove("menu-open");
  }

  if (menuButton) {
    menuButton.addEventListener("click", openMenu);
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  document.querySelectorAll("[data-menu-link], .main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealItems = document.querySelectorAll(
    ".reveal, .reveal-delay, .reveal-image"
  );

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          /*
           * Once an item has appeared we don't need
           * to keep observing it.
           */
          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    }
  );


  revealItems.forEach(item => {
    revealObserver.observe(item);
  });


  /* =======================================================
     SVG DRAW ANIMATION
     ======================================================= */

  const svgGroups = document.querySelectorAll(
    ".hero-art, .service-art, .testimonial-art, .gallery-hero-art, .gallery-bottom-art, .contact-hero-art, .enquiry-art, .enquiry-bottom-art"
  );

  const svgObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const paths = entry.target.querySelectorAll(".draw-line");

          paths.forEach((path, index) => {

            setTimeout(() => {
              path.classList.add("active");
            }, index * 45);

          });

          svgObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.2
    }
  );


  svgGroups.forEach(group => {
    svgObserver.observe(group);
  });


  /* =======================================================
     COUNTERS
     ======================================================= */

  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let start = 0;
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {

          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          /*
           * Smooth easing.
           */
          const eased = 1 - Math.pow(1 - progress, 3);

          const current = Math.floor(
            eased * target
          );

          if (target >= 1000) {
            counter.textContent =
              current.toLocaleString("en-IN");
          } else {
            counter.textContent = current;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            if (target >= 1000) {
              counter.textContent =
                target.toLocaleString("en-IN");
            } else {
              counter.textContent = target;
            }
          }
        }

        requestAnimationFrame(updateCounter);

        counterObserver.unobserve(counter);
      });

    },
    {
      threshold: 0.7
    }
  );


  counters.forEach(counter => {
    counterObserver.observe(counter);
  });


  /* =======================================================
     HEADER ON SCROLL
     ======================================================= */

  const header = document.getElementById("siteHeader");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* =======================================================
     IMAGE PARALLAX
     ======================================================= */

  const heroArt = document.querySelector(".hero-art");

  if (heroArt && window.matchMedia("(min-width: 901px)").matches) {

    window.addEventListener("scroll", () => {

      const scroll = window.scrollY;

      if (scroll < window.innerHeight * 1.2) {

        const movement = scroll * 0.08;

        heroArt.style.transform =
          `translateY(${movement}px)`;

      }

    }, {
      passive: true
    });

  }


  /* =======================================================
     IMAGE HOVER MAGNETIC EFFECT
     ======================================================= */

  const imageCards = document.querySelectorAll(
    ".gallery-card, .gallery-tile"
  );

  imageCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth < 901) return;

      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      const img = card.querySelector("img");

      if (img) {

        img.style.transform =
          `scale(1.04) translate(${x * 8}px, ${y * 8}px)`;

      }

    });

    card.addEventListener("mouseleave", () => {

      const img = card.querySelector("img");

      if (img) {
        img.style.transform = "";
      }

    });

  });


  /* =======================================================
     APPOINTMENT FORM
     ======================================================= */

  const appointmentForm =
    document.getElementById("appointmentForm");

  const formStatus =
    document.getElementById("formStatus");

  if (appointmentForm) {

    appointmentForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const formData =
          new FormData(appointmentForm);

        const name =
          formData.get("name");

        const phone =
          formData.get("phone");

        const service =
          formData.get("service");

        const date =
          formData.get("date");

        const time =
          formData.get("time");

        const message =
          formData.get("message");

        /*
         * Change this number to the real
         * Amoura WhatsApp number.
         */
        const whatsappNumber =
          "919999999999";

        const whatsappMessage =
`Hello Amoura,

I would like to enquire about an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred date: ${date}
Preferred time: ${time || "Any time"}

Message:
${message || "No additional message."}`;

        const whatsappURL =
          "https://wa.me/" +
          whatsappNumber +
          "?text=" +
          encodeURIComponent(whatsappMessage);

        if (formStatus) {

          formStatus.textContent =
            "Thank you. Opening WhatsApp to complete your enquiry…";

          formStatus.style.opacity = "1";
        }

        setTimeout(() => {

          window.open(
            whatsappURL,
            "_blank"
          );

        }, 700);

      }
    );

  }


  /* =======================================================
     IMAGE LOADING
     ======================================================= */

  document.querySelectorAll("img").forEach(img => {

    if (img.complete) {
      img.classList.add("loaded");
    } else {

      img.addEventListener(
        "load",
        () => {
          img.classList.add("loaded");
        },
        {
          once: true
        }
      );

    }

  });


  /* =======================================================
     SMOOTH ANCHOR LINKS
     ======================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(anchor => {

    anchor.addEventListener(
      "click",
      event => {

        const id =
          anchor.getAttribute("href");

        if (!id || id === "#") return;

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     STAGGER SERVICE ITEMS
     ======================================================= */

  const serviceItems =
    document.querySelectorAll(".service-item");

  serviceItems.forEach((item, index) => {

    item.style.transitionDelay =
      `${index * 0.08}s`;

  });


  /* =======================================================
     STAGGER PRICE ROWS
     ======================================================= */

  const priceRows =
    document.querySelectorAll(".price-row");

  priceRows.forEach((row, index) => {

    row.style.transitionDelay =
      `${index * 0.06}s`;

  });


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  document.querySelectorAll(
    ".current-year"
  ).forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });

});
