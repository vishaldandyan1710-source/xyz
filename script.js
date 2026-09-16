/* =========================================
   CIAO BELLA — MAIN JAVASCRIPT
========================================= */


/* =========================================
   NAVBAR
========================================= */

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {

  if (!nav) return;

  nav.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

});


/* =========================================
   MOBILE MENU
========================================= */

const menu = document.querySelector(".menu");
const links = document.querySelector(".navlinks");

if (menu && links) {

  menu.addEventListener("click", () => {

    const isOpen =
      links.style.display === "flex";

    if (isOpen) {

      links.style.display = "none";

    } else {

      links.style.display = "flex";

      links.style.position = "absolute";

      links.style.top = "70px";

      links.style.left = "14px";

      links.style.right = "14px";

      links.style.flexDirection = "column";

      links.style.background =
        "var(--cream)";

      links.style.padding = "25px";

      links.style.boxShadow =
        "0 20px 50px rgba(0,0,0,.12)";

    }

  });


  links.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      if (window.innerWidth <= 800) {

        links.style.display = "none";

      }

    });

  });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });


/* =========================================
   GALLERY FILTER
========================================= */

const filterButtons =
  document.querySelectorAll(".filter");

const galleryItems =
  document.querySelectorAll(".masonry figure");


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    button.classList.add("active");


    const category =
      button.dataset.filter;


    galleryItems.forEach(item => {

      const itemCategory =
        item.dataset.category;


      if (
        category === "all" ||
        itemCategory === category
      ) {

        item.style.display = "block";

      } else {

        item.style.display = "none";

      }

    });

  });

});


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const lightbox =
  document.querySelector(".lightbox");

const lightboxImage =
  lightbox?.querySelector("img");

const closeButton =
  document.querySelector(".close");


galleryItems.forEach(item => {

  item.addEventListener("click", () => {

    if (!lightbox || !lightboxImage) return;


    const image =
      item.querySelector("img");


    lightboxImage.src =
      image.src;

    lightboxImage.alt =
      image.alt;


    lightbox.classList.add("open");

    document.body.style.overflow =
      "hidden";

  });

});


function closeLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove("open");

  document.body.style.overflow = "";

}


closeButton?.addEventListener(
  "click",
  closeLightbox
);


lightbox?.addEventListener(
  "click",
  event => {

    if (event.target === lightbox) {

      closeLightbox();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeLightbox();

    }

  }
);


/* =========================================
   WHATSAPP ENQUIRY FORM
========================================= */

const enquiryForm =
  document.querySelector("#enquiryForm");


if (enquiryForm) {

  enquiryForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const formData =
        new FormData(enquiryForm);


      const name =
        formData.get("name") || "";

      const phone =
        formData.get("phone") || "";

      const email =
        formData.get("email") || "";

      const service =
        formData.get("service") || "";

      const date =
        formData.get("date") || "";

      const time =
        formData.get("time") || "";

      const message =
        formData.get("message") || "";


      const whatsappMessage =
`Hello Ciao Bella,

I would like to make an enquiry.

Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}
Preferred Date: ${date}
Preferred Time: ${time}

Message:
${message}`;


      const whatsappURL =
        "https://wa.me/919888955800?text=" +
        encodeURIComponent(
          whatsappMessage
        );


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      event => {

        const target =
          document.querySelector(
            anchor.getAttribute("href")
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth"
        });

      }
    );

  });
