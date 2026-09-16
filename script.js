"use strict";


/* =========================================
   CIAO BELLA
   WEBSITE JAVASCRIPT
   ========================================= */


/* -----------------------------------------
   DEFAULT WEBSITE IMAGES
   ----------------------------------------- */

const DEFAULT_IMAGES = {

  hero:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=85",

  feature1:
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85",

  feature2:
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",

  closing:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85",

  gallery1:
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",

  gallery2:
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=85",

  gallery3:
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",

  gallery4:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",

  gallery5:
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1000&q=85",

  gallery6:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"

};


/* -----------------------------------------
   ADMIN PASSWORD
   ----------------------------------------- */

const PASSWORD = "Vis1967@";


/* -----------------------------------------
   IMAGE NAMES SHOWN IN ADMIN PANEL
   ----------------------------------------- */

const IMAGE_NAMES = {

  hero: "Hero image",

  feature1: "Hair colour feature",

  feature2: "Nails feature",

  closing: "Closing section",

  gallery1: "Gallery — Hair colour",

  gallery2: "Gallery — Beauty",

  gallery3: "Gallery — Nails",

  gallery4: "Gallery — Bridal",

  gallery5: "Gallery — Styling",

  gallery6: "Gallery — Details"

};


/* =========================================
   PAGE LOAD
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  let storedImages = null;

  try {

    storedImages = JSON.parse(
      localStorage.getItem("ciaoBellaImages")
    );

  } catch (error) {

    storedImages = null;

  }


  const images =
    storedImages || { ...DEFAULT_IMAGES };


  applyImages(images);

  setupReveals();

  setupCursor();

  setupMenu();

  setupAdmin(images);

  setupEnquiry();


  setTimeout(function () {

    const loader = document.querySelector(".loader");

    if (loader) {
      loader.classList.add("done");
    }

  }, 900);

});



/* =========================================
   APPLY IMAGES
   ========================================= */

function applyImages(images) {

  const elements =
    document.querySelectorAll(".image-editable");


  elements.forEach(function (element) {

    const key =
      element.dataset.imageKey;


    if (!key || !images[key]) {
      return;
    }


    element.style.backgroundImage =
      'linear-gradient(0deg, rgba(20,9,4,.18), rgba(20,9,4,.02)), url("' +
      images[key] +
      '")';

  });

}



/* =========================================
   SCROLL REVEAL ANIMATION
   ========================================= */

function setupReveals() {

  const elements =
    document.querySelectorAll(".reveal");


  if (!elements.length) {
    return;
  }


  if (!("IntersectionObserver" in window)) {

    elements.forEach(function (element) {

      element.classList.add("visible");

    });

    return;
  }


  const observer =
    new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12
      }

    );


  elements.forEach(function (element) {

    observer.observe(element);

  });

}



/* =========================================
   MOUSE GLOW
   ========================================= */

function setupCursor() {

  const glow =
    document.querySelector(".cursor-glow");


  if (!glow) {
    return;
  }


  window.addEventListener(
    "pointermove",
    function (event) {

      glow.style.left =
        event.clientX + "px";

      glow.style.top =
        event.clientY + "px";

    }
  );

}



/* =========================================
   MOBILE MENU
   ========================================= */

function setupMenu() {

  const button =
    document.querySelector(".menu-btn");

  const links =
    document.querySelector(".nav-links");


  if (!button || !links) {
    return;
  }


  button.addEventListener(
    "click",
    function () {

      links.classList.toggle("mobile");

    }
  );


  const menuLinks =
    links.querySelectorAll("a");


  menuLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        links.classList.remove("mobile");

      }
    );

  });

}



/* =========================================
   ADMIN IMAGE STUDIO
   ========================================= */

function setupAdmin(images) {

  const panel =
    document.getElementById("adminPanel");

  const openButton =
    document.getElementById("adminOpen");

  const closeButton =
    document.getElementById("adminClose");


  if (!panel || !openButton) {
    return;
  }


  /* OPEN ADMIN */

  openButton.addEventListener(
    "click",
    function () {

      panel.classList.add("open");

      panel.setAttribute(
        "aria-hidden",
        "false"
      );

    }
  );


  /* CLOSE ADMIN */

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      function () {

        panel.classList.remove("open");

        panel.setAttribute(
          "aria-hidden",
          "true"
        );

      }
    );

  }


  /* CLICK OUTSIDE */

  panel.addEventListener(
    "click",
    function (event) {

      if (event.target === panel) {

        panel.classList.remove("open");

        panel.setAttribute(
          "aria-hidden",
          "true"
        );

      }

    }
  );


  /* LOGIN ELEMENTS */

  const loginButton =
    document.getElementById(
      "adminLoginBtn"
    );

  const passwordInput =
    document.getElementById(
      "adminPassword"
    );

  const error =
    document.getElementById(
      "adminError"
    );

  const loginBox =
    document.getElementById(
      "adminLogin"
    );

  const editor =
    document.getElementById(
      "adminEditor"
    );

  const fields =
    document.getElementById(
      "imageFields"
    );


  /* LOGIN */

  if (loginButton) {

    loginButton.addEventListener(
      "click",
      function () {

        const enteredPassword =
          passwordInput
            ? passwordInput.value
            : "";


        if (
          enteredPassword === PASSWORD
        ) {

          if (loginBox) {
            loginBox.hidden = true;
          }

          if (editor) {
            editor.hidden = false;
          }

          buildFields(
            fields,
            images
          );

        } else {

          if (error) {

            error.textContent =
              "Incorrect password.";

          }

        }

      }
    );

  }


  /* ENTER KEY LOGIN */

  if (passwordInput) {

    passwordInput.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {

          if (loginButton) {
            loginButton.click();
          }

        }

      }
    );

  }


  /* SAVE IMAGES */

  const saveButton =
    document.getElementById(
      "saveImages"
    );


  if (saveButton) {

    saveButton.addEventListener(
      "click",
      function () {

        const nextImages = {
          ...images
        };


        const inputs =
          document.querySelectorAll(
            ".image-url-input"
          );


        inputs.forEach(
          function (input) {

            const key =
              input.dataset.key;


            const value =
              input.value.trim();


            if (key) {

              nextImages[key] =
                value ||
                DEFAULT_IMAGES[key];

            }

          }
        );


        try {

          localStorage.setItem(
            "ciaoBellaImages",
            JSON.stringify(nextImages)
          );

        } catch (error) {

          alert(
            "Could not save images in this browser."
          );

          return;

        }


        applyImages(nextImages);


        alert(
          "Images updated successfully."
        );

      }
    );

  }


  /* RESET IMAGES */

  const resetButton =
    document.getElementById(
      "resetImages"
    );


  if (resetButton) {

    resetButton.addEventListener(
      "click",
      function () {

        const confirmed =
          window.confirm(
            "Reset all images to the original demo images?"
          );


        if (!confirmed) {
          return;
        }


        try {

          localStorage.removeItem(
            "ciaoBellaImages"
          );

        } catch (error) {}


        window.location.reload();

      }
    );

  }

}



/* =========================================
   BUILD ADMIN IMAGE FIELDS
   ========================================= */

function buildFields(
  container,
  images
) {

  if (!container) {
    return;
  }


  container.innerHTML = "";


  Object.keys(DEFAULT_IMAGES)
    .forEach(function (key) {

      const wrapper =
        document.createElement("div");

      wrapper.className =
        "image-field";


      const label =
        document.createElement("label");

      label.textContent =
        IMAGE_NAMES[key] || key;


      const input =
        document.createElement("input");

      input.className =
        "image-url-input";

      input.type = "url";

      input.dataset.key =
        key;

      input.value =
        images[key] ||
        DEFAULT_IMAGES[key];

      input.placeholder =
        "Paste direct image URL";


      const image =
        document.createElement("img");

      image.className =
        "image-preview";

      image.alt =
        IMAGE_NAMES[key] || key;

      image.src =
        images[key] ||
        DEFAULT_IMAGES[key];


      input.addEventListener(
        "input",
        function () {

          const value =
            input.value.trim();


          if (value) {

            image.src = value;

          }

        }
      );


      image.addEventListener(
        "error",
        function () {

          image.style.opacity =
            "0.3";

        }
      );


      wrapper.appendChild(label);

      wrapper.appendChild(input);

      wrapper.appendChild(image);

      container.appendChild(wrapper);

    });

}



/* =========================================
   SAFE HTML ATTRIBUTE ESCAPE
   ========================================= */

function escapeAttribute(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/"/g, "&quot;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;");

}



/* =========================================
   WHATSAPP ENQUIRY FORM
   ========================================= */

function setupEnquiry() {

  const form =
    document.getElementById(
      "enquiryForm"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const data =
        new FormData(form);


      const name =
        data.get("name") || "";


      const phone =
        data.get("phone") || "";


      const email =
        data.get("email") ||
        "Not provided";


      const service =
        data.get("service") || "";


      const date =
        data.get("date") ||
        "Flexible";


      const message =
        data.get("message") ||
        "";


      const whatsappMessage =

        "Hi Ciao Bella, I'd like to make an enquiry.\n\n" +

        "Name: " +
        name +
        "\n" +

        "Phone: " +
        phone +
        "\n" +

        "Email: " +
        email +
        "\n" +

        "Service: " +
        service +
        "\n" +

        "Preferred date: " +
        date +
        "\n" +

        "Message: " +
        message;


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
