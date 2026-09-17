"use strict";


/* =========================================
   IMAGE COLLECTION
========================================= */

const images = {

  hero:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=90",

  salon:
    "https://images.unsplash.com/photo-1521590832167-7bcb752127f5?auto=format&fit=crop&w=1200&q=90",

  hair:
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=90",

  makeup:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=90",

  skin:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=90",

  nails:
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=90",

  bride:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=90",

  portrait:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=90",

  wellness:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=90",

  hairTwo:
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=90"

};



/* =========================================
   SERVICE DATA
   EACH SERVICE SUPPORTS 10 SUBCATEGORIES
========================================= */

const serviceData = [

  {
    number: "01",

    name: "Hair",

    description:
      "Cuts, styling, colour and restorative hair treatments.",

    price:
      "From ₹799",

    image:
      images.hair,

    subcategories: [

      {
        name: "Haircut & Finish",
        price: "From ₹799"
      },

      {
        name: "Blow Dry & Styling",
        price: "From ₹899"
      },

      {
        name: "Hair Colour",
        price: "From ₹1,999"
      },

      {
        name: "Root Touch-Up",
        price: "From ₹999"
      },

      {
        name: "Global Colour",
        price: "From ₹2,499"
      },

      {
        name: "Highlights",
        price: "From ₹2,499"
      },

      {
        name: "Hair Spa",
        price: "From ₹1,199"
      },

      {
        name: "Keratin / Smoothening",
        price: "From ₹2,999"
      },

      {
        name: "Repair Treatment",
        price: "From ₹1,499"
      },

      {
        name: "Bridal Hair Styling",
        price: "From ₹1,999"
      }

    ]

  },


  {
    number: "02",

    name: "Makeup",

    description:
      "Bridal, party, editorial and occasion makeup.",

    price:
      "From ₹1,999",

    image:
      images.makeup,

    subcategories: [

      {
        name: "Party Makeup",
        price: "From ₹1,999"
      },

      {
        name: "Engagement Makeup",
        price: "From ₹2,999"
      },

      {
        name: "Bridal Makeup",
        price: "From ₹5,999"
      },

      {
        name: "Reception Makeup",
        price: "From ₹3,999"
      },

      {
        name: "Editorial Makeup",
        price: "From ₹2,999"
      },

      {
        name: "HD Makeup",
        price: "From ₹2,999"
      },

      {
        name: "Soft Glam",
        price: "From ₹2,499"
      },

      {
        name: "Eye Makeup",
        price: "From ₹999"
      },

      {
        name: "Makeup Touch-Up",
        price: "From ₹799"
      },

      {
        name: "Draping",
        price: "From ₹699"
      }

    ]

  },


  {
    number: "03",

    name: "Skin",

    description:
      "Facials, clean-ups and personalised skin rituals.",

    price:
      "From ₹999",

    image:
      images.skin,

    subcategories: [

      {
        name: "Classic Facial",
        price: "From ₹999"
      },

      {
        name: "Deep Cleansing",
        price: "From ₹899"
      },

      {
        name: "Glow Facial",
        price: "From ₹1,499"
      },

      {
        name: "Hydration Ritual",
        price: "From ₹1,299"
      },

      {
        name: "Detan",
        price: "From ₹799"
      },

      {
        name: "Clean-Up",
        price: "From ₹699"
      },

      {
        name: "Back Clean-Up",
        price: "From ₹999"
      },

      {
        name: "Face Massage",
        price: "From ₹599"
      },

      {
        name: "Pre-Bridal Skin Ritual",
        price: "From ₹1,999"
      },

      {
        name: "Personalised Skin Ritual",
        price: "Price on consultation"
      }

    ]

  },


  {
    number: "04",

    name: "Nails",

    description:
      "Classic manicures, gel finishes and nail art.",

    price:
      "From ₹599",

    image:
      images.nails,

    subcategories: [

      {
        name: "Classic Manicure",
        price: "From ₹599"
      },

      {
        name: "Classic Pedicure",
        price: "From ₹799"
      },

      {
        name: "Gel Manicure",
        price: "From ₹999"
      },

      {
        name: "Gel Pedicure",
        price: "From ₹1,199"
      },

      {
        name: "French Tips",
        price: "From ₹899"
      },

      {
        name: "Nail Art",
        price: "From ₹199"
      },

      {
        name: "Chrome Finish",
        price: "From ₹1,199"
      },

      {
        name: "Extensions",
        price: "From ₹1,999"
      },

      {
        name: "Extension Refill",
        price: "From ₹1,299"
      },

      {
        name: "Removal & Care",
        price: "From ₹399"
      }

    ]

  },


  {
    number: "05",

    name: "Bridal",

    description:
      "Complete bridal beauty planning and artistry.",

    price:
      "From ₹5,999",

    image:
      images.bride,

    subcategories: [

      {
        name: "Bridal Makeup",
        price: "From ₹5,999"
      },

      {
        name: "Bridal Hair",
        price: "From ₹1,999"
      },

      {
        name: "Bridal Draping",
        price: "From ₹699"
      },

      {
        name: "Bridal Nails",
        price: "From ₹1,499"
      },

      {
        name: "Bridal Facial",
        price: "From ₹1,999"
      },

      {
        name: "Pre-Bridal Glow",
        price: "From ₹1,999"
      },

      {
        name: "Engagement Look",
        price: "From ₹2,999"
      },

      {
        name: "Reception Look",
        price: "From ₹3,999"
      },

      {
        name: "Bridesmaid Look",
        price: "From ₹2,499"
      },

      {
        name: "Bridal Consultation",
        price: "On consultation"
      }

    ]

  },


  {
    number: "06",

    name: "Wellness",

    description:
      "Relaxing rituals designed for your reset.",

    price:
      "From ₹899",

    image:
      images.wellness,

    subcategories: [

      {
        name: "Relaxation Ritual",
        price: "From ₹899"
      },

      {
        name: "Head Massage",
        price: "From ₹599"
      },

      {
        name: "Shoulder Ritual",
        price: "From ₹699"
      },

      {
        name: "Hand Ritual",
        price: "From ₹499"
      },

      {
        name: "Foot Ritual",
        price: "From ₹599"
      },

      {
        name: "Body Polish",
        price: "From ₹1,499"
      },

      {
        name: "Aromatherapy",
        price: "From ₹999"
      },

      {
        name: "Bridal Relaxation",
        price: "From ₹1,499"
      },

      {
        name: "Wellness Consultation",
        price: "On consultation"
      },

      {
        name: "Custom Ritual",
        price: "On consultation"
      }

    ]

  }

];



/* =========================================
   GALLERY DATA
========================================= */

const galleryData = [

  {
    title: "Bridal artistry",
    image: images.bride
  },

  {
    title: "Hair transformation",
    image: images.hair
  },

  {
    title: "Skin ritual",
    image: images.skin
  },

  {
    title: "The beauty edit",
    image: images.makeup
  },

  {
    title: "Nail atelier",
    image: images.nails
  },

  {
    title: "Salon moments",
    image: images.salon
  },

  {
    title: "Editorial beauty",
    image: images.portrait
  },

  {
    title: "Hair craft",
    image: images.hairTwo
  },

  {
    title: "Wellness ritual",
    image: images.wellness
  }

];



/* =========================================
   DOM REFERENCES
========================================= */

const app =
  document.getElementById("app");

const navigation =
  document.getElementById("navigation");

const navOverlay =
  document.getElementById("navOverlay");

const menuButton =
  document.getElementById("menuButton");

const closeButton =
  document.getElementById("closeButton");

const loader =
  document.getElementById("loader");

const year =
  document.getElementById("year");



/* =========================================
   NAVIGATION DRAWER
========================================= */

function openMenu() {

  navigation.classList.add("active");

  navOverlay.classList.add("active");

  document.body.classList.add("menu-open");

  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );

}


function closeMenu() {

  navigation.classList.remove("active");

  navOverlay.classList.remove("active");

  document.body.classList.remove("menu-open");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

}


menuButton.addEventListener(
  "click",
  openMenu
);


closeButton.addEventListener(
  "click",
  closeMenu
);


navOverlay.addEventListener(
  "click",
  closeMenu
);


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeMenu();

    }

  }
);



/* =========================================
   PAGE BANNER
========================================= */

function createBanner(
  eyebrow,
  title
) {

  return `

    <section class="page-banner">

      <span class="eyebrow">
        ${eyebrow}
      </span>

      <h1>
        ${title}
      </h1>

    </section>

  `;

}



/* =========================================
   HOME PAGE
========================================= */

function homePage() {

  return `

    <div class="page">


      <!-- HERO -->

      <section class="hero">

        <div
          class="hero-background"
          aria-hidden="true"
        ></div>


        <div class="hero-copy reveal">

          <span class="eyebrow">
            A modern beauty atelier
          </span>


          <h1>

            Beauty,<br>

            <em>
              beautifully
            </em><br>

            considered.

          </h1>


          <p class="hero-text">

            A refined space for hair, skin, makeup and wellness.
            Thoughtful beauty rituals, crafted around you.

          </p>


          <a
            class="text-link"
            href="#enquiry"
            data-route
          >
            Begin your experience ↗
          </a>

        </div>


        <div class="hero-label">
          Your beauty story.
        </div>

      </section>



      <!-- =========================================
           MOVING RIBBON
      ========================================= -->

      <section
        class="word-ribbon"
        aria-label="Apsara beauty values"
      >

        <div class="word-ribbon-track">

          <span>BEAUTY</span>
          <b>✦</b>

          <span>ELEGANCE</span>
          <b>✦</b>

          <span>DIGNITY</span>
          <b>✦</b>

          <span>GRACE</span>
          <b>✦</b>

          <span>CONFIDENCE</span>
          <b>✦</b>

          <span>CARE</span>
          <b>✦</b>


          <span>BEAUTY</span>
          <b>✦</b>

          <span>ELEGANCE</span>
          <b>✦</b>

          <span>DIGNITY</span>
          <b>✦</b>

          <span>GRACE</span>
          <b>✦</b>

          <span>CONFIDENCE</span>
          <b>✦</b>

          <span>CARE</span>
          <b>✦</b>

        </div>

      </section>



      <!-- =========================================
           ABOUT
      ========================================= -->

      <section
        class="section about-section"
      >

        <div class="about-grid">


          <img
            class="about-photo reveal"
            src="${images.salon}"
            alt="Elegant salon interior"
            loading="lazy"
          >


          <div class="about-copy reveal">

            <span class="eyebrow">
              About the atelier
            </span>


            <h2>

              Where beauty meets<br>

              <em>
                intention.
              </em>

            </h2>


            <p>

              At Apsara, every detail is designed to make you
              feel seen, cared for and confident. From a
              considered consultation to the final touch,
              our artists bring precision and warmth to
              every appointment.

            </p>


            <a
              class="text-link"
              href="#contact"
              data-route
            >
              Discover Apsara ↗
            </a>

          </div>

        </div>

      </section>



      <!-- =========================================
           STATS
      ========================================= -->

      <section class="stats">


        <div class="stat">

          <strong
            class="stat-number"
            data-target="12"
            data-suffix="+"
          >
            0+
          </strong>

          <span>
            Years of experience
          </span>

        </div>


        <div class="stat">

          <strong
            class="stat-number"
            data-target="12"
            data-suffix="k"
          >
            0k
          </strong>

          <span>
            Happy clients
          </span>

        </div>


        <div class="stat">

          <strong
            class="stat-number"
            data-target="1"
            data-suffix="m"
          >
            0m
          </strong>

          <span>
            Beauty moments
          </span>

        </div>


      </section>



      <!-- =========================================
           SERVICES PREVIEW
      ========================================= -->

      <section class="section">


        <div class="section-heading">


          <h2 class="section-title">

            Our signature<br>

            <em>
              services.
            </em>

          </h2>


          <p class="section-intro">

            A complete beauty experience, from everyday
            refinement to your most important occasions.

          </p>

        </div>


        <div class="service-grid">


          ${serviceData
            .slice(0, 4)
            .map(service => `

              <article
                class="service-card reveal"
              >

                <img
                  src="${service.image}"
                  alt="${service.name}"
                  loading="lazy"
                >


                <span class="service-number">
                  ${service.number}
                </span>


                <h3>
                  ${service.name}
                </h3>


                <p>
                  ${service.description}
                </p>

              </article>

            `)
            .join("")}


        </div>


        <a
          class="text-link"
          href="#services"
          data-route
        >
          View all services ↗
        </a>


      </section>


    </div>

  `;

}



/* =========================================
   GALLERY PAGE
========================================= */

function galleryPage() {

  return `

    <div class="page">


      ${createBanner(
        "The visual diary",
        "Work gallery."
      )}


      <section class="section">


        <div class="section-heading">


          <h2 class="section-title">

            A little<br>

            <em>
              inspiration.
            </em>

          </h2>


          <p class="section-intro">

            A collection of beauty moments,
            transformations and details from our atelier.

          </p>


        </div>


        <div class="gallery-grid">


          ${galleryData
            .map(item => `

              <figure
                class="gallery-item reveal"
              >

                <img
                  src="${item.image}"
                  alt="${item.title}"
                  loading="lazy"
                >

                <figcaption>
                  ${item.title}
                </figcaption>

              </figure>

            `)
            .join("")}


        </div>


      </section>


    </div>

  `;

}



/* =========================================
   SERVICES PAGE
========================================= */

function servicesPage() {

  return `

    <div class="page">


      ${createBanner(
        "The beauty menu",
        "Our services."
      )}


      <section class="section">


        <div class="section-heading">


          <h2 class="section-title">

            Made for<br>

            <em>
              your ritual.
            </em>

          </h2>


          <p class="section-intro">

            Every service begins with a conversation
            and ends with a little more confidence.

          </p>


        </div>


        <div class="services-list">


          ${serviceData
            .map(service => `

              <article
                class="service-row service-row-expanded reveal"
              >


                <div class="service-main">


                  <span class="service-number">
                    ${service.number}
                  </span>


                  <h3>
                    ${service.name}
                  </h3>


                  <p>
                    ${service.description}
                  </p>


                  <div
                    class="service-subcategories"
                  >


                    ${service.subcategories
                      .map(
                        (item, index) => `

                          <div
                            class="service-subcategory"
                          >

                            <span
                              class="subcategory-number"
                            >
                              ${String(index + 1)
                                .padStart(2, "0")}
                            </span>


                            <span
                              class="subcategory-name"
                            >
                              ${item.name}
                            </span>


                            <span
                              class="subcategory-price"
                            >
                              ${item.price}
                            </span>

                          </div>

                        `
                      )
                      .join("")}


                  </div>


                </div>


                <span class="service-price">
                  ${service.price}
                </span>


              </article>

            `)
            .join("")}


        </div>


      </section>


    </div>

  `;

}



/* =========================================
   CONTACT PAGE
========================================= */

function contactPage() {

  return `

    <div class="page">


      ${createBanner(
        "Come say hello",
        "Contact us."
      )}


      <section class="section">


        <div
          class="contact-grid contact-grid-clean"
        >


          <div
            class="contact-details reveal"
          >


            <span class="eyebrow">
              Visit the atelier
            </span>


            <h2>

              Let's create<br>

              <em>
                something beautiful.
              </em>

            </h2>



            <!-- ADDRESS -->

            <div class="detail">

              <small>
                Address
              </small>

              <p>

                123, Your Main Street<br>

                Your City, India

              </p>

            </div>



            <!-- PHONE -->

            <div class="detail">

              <small>
                Call
              </small>

              <a
                class="contact-action"
                href="tel:+919999999999"
              >
                +91 99999 99999
              </a>

            </div>



            <!-- WHATSAPP -->

            <div class="detail">

              <small>
                WhatsApp
              </small>

              <a
                class="contact-action"
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener"
              >
                Chat on WhatsApp ↗
              </a>

            </div>



            <!-- INSTAGRAM -->

            <div class="detail">

              <small>
                Instagram
              </small>

              <a
                class="contact-action"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener"
              >
                @apsarabeautyatelier ↗
              </a>

            </div>



            <!-- EMAIL -->

            <div class="detail">

              <small>
                Email
              </small>

              <a
                class="contact-action"
                href="mailto:hello@apsarabeauty.in"
              >
                hello@apsarabeauty.in
              </a>

            </div>



            <!-- HOURS -->

            <div class="detail">

              <small>
                Working hours
              </small>

              <p>

                Monday – Sunday<br>

                10:00 – 21:00

              </p>

            </div>


          </div>


        </div>


      </section>


    </div>

  `;

}



/* =========================================
   ENQUIRY PAGE
========================================= */

function enquiryPage() {

  const serviceOptions =
    serviceData
      .map(service => {

        return `

          <option
            value="${service.name}"
          >
            ${service.name}
          </option>

        `;

      })
      .join("");


  return `

    <div class="page">


      ${createBanner(
        "Your next beauty moment",
        "Make an enquiry."
      )}


      <section class="section">


        <div class="enquiry-grid">


          <div
            class="enquiry-copy reveal"
          >


            <span class="eyebrow">
              A considered beginning
            </span>


            <h2 class="section-title">

              Tell us what<br>

              <em>
                you need.
              </em>

            </h2>


            <p class="section-intro">

              Complete the form and our team will contact
              you to confirm availability and discuss
              your preferences.

            </p>


          </div>



          <form
            class="form-card reveal"
            id="enquiryForm"
          >


            <h2>
              Book your visit.
            </h2>



            <!-- NAME + PHONE -->

            <div class="form-row">


              <div class="field">

                <label for="name">
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                >

              </div>


              <div class="field">

                <label for="phone">
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91"
                  required
                >

              </div>


            </div>



            <!-- EMAIL -->

            <div class="field">

              <label for="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
              >

            </div>



            <!-- SERVICE + DATE -->

            <div class="form-row">


              <div class="field">

                <label for="service">
                  Service
                </label>

                <select
                  id="service"
                  name="service"
                  required
                >

                  <option value="">
                    Choose service
                  </option>

                  ${serviceOptions}

                </select>

              </div>


              <div class="field">

                <label for="date">
                  Preferred date
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                >

              </div>


            </div>



            <!-- MESSAGE -->

            <div class="field">

              <label for="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell us anything we should know..."
              ></textarea>

            </div>



            <!-- SUBMIT -->

            <button
              class="submit-button"
              type="submit"
            >

              Send enquiry ↗

            </button>


            <p
              class="form-status"
              id="formStatus"
              role="status"
              aria-live="polite"
            ></p>


          </form>


        </div>


      </section>


    </div>

  `;

}



/* =========================================
   ROUTING
========================================= */

const pages = {

  home:
    homePage,

  gallery:
    galleryPage,

  services:
    servicesPage,

  contact:
    contactPage,

  enquiry:
    enquiryPage

};



function getCurrentRoute() {

  const route =
    window.location.hash
      .replace("#", "")
      .split("?")[0]
      .toLowerCase();


  return pages[route]
    ? route
    : "home";

}



/* =========================================
   STAT COUNTER ANIMATION
========================================= */

function initializeStatCounters() {

  const counters =
    document.querySelectorAll(
      ".stat-number"
    );


  if (!counters.length) {
    return;
  }


  /* Respect reduced-motion setting */

  if (
    window
      .matchMedia(
        "(prefers-reduced-motion: reduce)"
      )
      .matches
  ) {

    counters.forEach(counter => {

      counter.textContent =
        `${counter.dataset.target}${counter.dataset.suffix || ""}`;

    });

    return;

  }


  function animateCounter(counter) {

    const target =
      Number(counter.dataset.target);

    const suffix =
      counter.dataset.suffix || "";

    const duration =
      1600;

    const startTime =
      performance.now();


    function tick(now) {

      const progress =
        Math.min(
          (now - startTime) / duration,
          1
        );


      const eased =
        1 - Math.pow(
          1 - progress,
          3
        );


      const value =
        Math.round(
          target * eased
        );


      counter.textContent =
        `${value}${suffix}`;


      if (progress < 1) {

        requestAnimationFrame(
          tick
        );

      } else {

        counter.textContent =
          `${target}${suffix}`;

      }

    }


    requestAnimationFrame(
      tick
    );

  }



  /* Fallback */

  if (
    !("IntersectionObserver" in window)
  ) {

    counters.forEach(
      animateCounter
    );

    return;

  }



  /* Start only when visible */

  const observer =
    new IntersectionObserver(

      (
        entries,
        observerInstance
      ) => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              animateCounter(
                entry.target
              );

              observerInstance
                .unobserve(
                  entry.target
                );

            }

          }
        );

      },

      {
        threshold: 0.35
      }

    );


  counters.forEach(
    counter =>
      observer.observe(counter)
  );

}



/* =========================================
   RENDER PAGE
========================================= */

function renderPage() {

  const route =
    getCurrentRoute();


  app.innerHTML =
    pages[route]();


  closeMenu();


  updateActiveLinks(
    route
  );


  initializeRevealAnimations();


  initializeStatCounters();


  if (
    route === "enquiry"
  ) {

    initializeForm();

  }


  window.scrollTo({

    top: 0,

    behavior: "auto"

  });

}



/* =========================================
   ACTIVE NAVIGATION
========================================= */

function updateActiveLinks(
  route
) {

  document
    .querySelectorAll(
      "[data-route]"
    )
    .forEach(link => {

      const href =
        link.getAttribute(
          "href"
        );


      link.classList.toggle(

        "active",

        href === "#" + route

      );


      link.onclick = () => {

        closeMenu();

      };

    });

}



/* =========================================
   REVEAL ANIMATIONS
========================================= */

function initializeRevealAnimations() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      (
        entries,
        observerInstance
      ) => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              observerInstance.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.1
      }

    );


  elements.forEach(
    element =>
      observer.observe(element)
  );

}



/* =========================================
   ENQUIRY FORM
========================================= */

function initializeForm() {

  const form =
    document.getElementById(
      "enquiryForm"
    );


  const status =
    document.getElementById(
      "formStatus"
    );


  if (
    !form ||
    !status
  ) {

    return;

  }


  form.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const formData =
        new FormData(form);


      const name =
        formData.get(
          "name"
        );


      status.textContent =
        `Thank you, ${name}. Your enquiry has been recorded in this demo. Please connect the form to your email or WhatsApp backend before going live.`;


      form.reset();

    }
  );

}



/* =========================================
   DATE RESTRICTION
========================================= */

function restrictPastDates() {

  const dateInput =
    document.getElementById(
      "date"
    );


  if (!dateInput) {
    return;
  }


  const today =
    new Date();


  const yearValue =
    today.getFullYear();


  const monthValue =
    String(
      today.getMonth() + 1
    ).padStart(2, "0");


  const dayValue =
    String(
      today.getDate()
    ).padStart(2, "0");


  dateInput.min =
    `${yearValue}-${monthValue}-${dayValue}`;

}



/* =========================================
   HASH ROUTING
========================================= */

window.addEventListener(
  "hashchange",
  () => {

    renderPage();

  }
);



/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    if (year) {

      year.textContent =
        new Date().getFullYear();

    }


    restrictPastDates();


    renderPage();


    setTimeout(
      () => {

        if (loader) {

          loader.classList.add(
            "hidden"
          );

        }

      },
      1100
    );


  }
);



/* =========================================
   FINISH
========================================= */
