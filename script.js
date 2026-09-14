document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector(".site-nav");
  var menu = document.querySelector(".menu");
  var links = document.querySelector(".nav-links");

  if (menu && links) {
    menu.onclick = function () {
      links.classList.toggle("open");
    };
  }

  if (links) {
    links.querySelectorAll("a").forEach(function (a) {
      a.onclick = function () {
        links.classList.remove("open");
      };
    });
  }

  function navScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }
  }

  navScroll();
  window.addEventListener("scroll", navScroll);

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var hero = document.querySelector(".hero-media");

    if (hero) {
      gsap.to(hero, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    document.querySelectorAll(".reveal").forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true
        }
      });
    });

    document.querySelectorAll(".clip").forEach(function (el) {
      gsap.to(el.children, {
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        }
      });
    });
  }

  var form = document.getElementById("enquiryForm");

  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      var name = form.elements["name"].value;
      var phone = form.elements["phone"].value;
      var service = form.elements["service"].value;

      var text =
        "Hello Amoura, I would like to enquire.%0A%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Phone: " + encodeURIComponent(phone) + "%0A" +
        "Service: " + encodeURIComponent(service);

      window.open(
        "https://wa.me/919999999999?text=" + text,
        "_blank"
      );
    };
  }
});
