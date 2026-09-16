/* =========================================================
   CIAO BELLA WEBSITE
   Main JavaScript
   ========================================================= */


/* =========================================================
   NAVIGATION
   ========================================================= */

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {

    if (!nav) return;

    if (window.scrollY > 30) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menu = document.querySelector(".menu");
const links = document.querySelector(".navlinks");

if (menu && links) {

    menu.addEventListener("click", () => {

        const open = links.classList.toggle("mobile-open");

        if (open) {

            links.style.display = "flex";
            links.style.position = "absolute";
            links.style.top = "70px";
            links.style.left = "14px";
            links.style.right = "14px";
            links.style.flexDirection = "column";
            links.style.background = "var(--cream)";
            links.style.padding = "25px";
            links.style.boxShadow =
                "0 20px 50px rgba(0,0,0,.12)";

        } else {

            links.style.display = "";

        }

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const observer = new IntersectionObserver(
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
    .forEach(element => observer.observe(element));


/* =========================================================
   GALLERY FILTER
   ========================================================= */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            const category = button.dataset.filter;

            document
                .querySelectorAll(".masonry figure")
                .forEach(item => {

                    if (
                        category === "all" ||
                        item.dataset.category === category
                    ) {

                        item.style.display = "block";

                    } else {

                        item.style.display = "none";

                    }

                });

        });

    });


/* =========================================================
   LIGHTBOX
   ========================================================= */

const lightbox =
    document.querySelector(".lightbox");

const lightboxImage =
    lightbox?.querySelector("img");


document
    .querySelectorAll(".masonry figure")
    .forEach(figure => {

        figure.addEventListener("click", () => {

            if (!lightbox) return;

            const image =
                figure.querySelector("img");

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            lightbox.classList.add("open");

        });

    });


document
    .querySelector(".close")
    ?.addEventListener("click", () => {

        lightbox.classList.remove("open");

    });


lightbox?.addEventListener("click", event => {

    if (event.target === lightbox) {

        lightbox.classList.remove("open");

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        lightbox?.classList.remove("open");

    }

});


/* =========================================================
   WHATSAPP ENQUIRY
   ========================================================= */

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


            const encoded =
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                `https://wa.me/919888955800?text=${encoded}`,
                "_blank"
            );

        }
    );

}


/* =========================================================
   ADMIN IMAGE MANAGEMENT
   =========================================================

   IMPORTANT:

   This is a CLIENT-SIDE admin system.

   Password:
   Vis1967@

   Open:

   yoursite.com/?admin=1

   Images are saved in browser localStorage.

   This does NOT provide true server-side security.
   ========================================================= */


/* ADMIN PASSWORD */

const ADMIN_PASSWORD = "Vis1967@";


/* Check whether admin mode is requested */

const urlParams =
    new URLSearchParams(window.location.search);

const adminRequested =
    urlParams.get("admin") === "1";


/* Storage key */

const IMAGE_STORAGE_KEY =
    "ciaoBellaImageSettings";


/* =========================================================
   LOAD SAVED IMAGES
   ========================================================= */

function loadSavedImages() {

    try {

        return JSON.parse(
            localStorage.getItem(
                IMAGE_STORAGE_KEY
            )
        ) || {};

    } catch (error) {

        return {};

    }

}


/* =========================================================
   SAVE IMAGE
   ========================================================= */

function saveImage(imageId, imageURL) {

    const images =
        loadSavedImages();

    images[imageId] =
        imageURL;

    localStorage.setItem(
        IMAGE_STORAGE_KEY,
        JSON.stringify(images)
    );

}


/* =========================================================
   APPLY SAVED IMAGES
   ========================================================= */

function applySavedImages() {

    const savedImages =
        loadSavedImages();

    document
        .querySelectorAll("img[data-image-id]")
        .forEach(image => {

            const id =
                image.dataset.imageId;

            if (savedImages[id]) {

                image.src =
                    savedImages[id];

            }

        });

}


/* Apply saved images immediately */

applySavedImages();


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function startAdminMode() {

    const password =
        prompt(
            "Ciao Bella Admin\n\nEnter admin password:"
        );


    if (password !== ADMIN_PASSWORD) {

        alert(
            "Incorrect password."
        );

        return;

    }


    activateAdminEditor();

}


/* =========================================================
   ADMIN EDITOR
   ========================================================= */

function activateAdminEditor() {


    /* Toolbar */

    const toolbar =
        document.createElement("div");

    toolbar.className =
        "admin-toolbar";


    toolbar.innerHTML = `

        <div>

            <strong>
                CIAO BELLA ADMIN
            </strong>

            <span>
                Click any website image to replace it
            </span>

        </div>

        <div>

            <button
                class="admin-button"
                id="adminReset"
            >
                Reset Images
            </button>

            <button
                class="admin-button"
                id="adminExit"
            >
                Exit
            </button>

        </div>

    `;


    document.body.appendChild(toolbar);


    /* Help box */

    const help =
        document.createElement("div");

    help.className =
        "admin-help";


    help.innerHTML = `

        <strong>
            Image Editor
        </strong>

        <br><br>

        Click an image anywhere on the website.

        <br><br>

        You can enter:

        <br>
        • Image URL
        <br>
        • Image link
        <br>
        • Data URL

        <br><br>

        Changes are saved in this browser.

    `;


    document.body.appendChild(help);


    /* Make images editable */

    document
        .querySelectorAll("img[data-image-id]")
        .forEach(image => {

            image.classList.add(
                "admin-image-active"
            );


            image.title =
                "Admin: click to replace image";


            image.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    editImage(image);

                }
            );

        });


    /* Reset button */

    document
        .querySelector("#adminReset")
        ?.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Reset all saved image changes?"
                    );

                if (!confirmed) return;

                localStorage.removeItem(
                    IMAGE_STORAGE_KEY
                );

                location.reload();

            }
        );


    /* Exit admin */

    document
        .querySelector("#adminExit")
        ?.addEventListener(
            "click",
            () => {

                const cleanURL =
                    window.location.pathname;

                window.location.href =
                    cleanURL;

            }
        );

}


/* =========================================================
   EDIT INDIVIDUAL IMAGE
   ========================================================= */

function editImage(image) {

    const currentURL =
        image.src;


    const newURL =
        prompt(
            "Replace this image.\n\nPaste the new image URL:",
            currentURL
        );


    if (!newURL) return;


    image.src =
        newURL;


    saveImage(
        image.dataset.imageId,
        newURL
    );


    alert(
        "Image updated and saved on this browser."
    );

}


/* =========================================================
   START ADMIN IF REQUESTED
   ========================================================= */

if (adminRequested) {

    /*
       Small delay so the page loads first.
    */

    setTimeout(
        startAdminMode,
        500
    );

}


/* =========================================================
   OPTIONAL ADMIN SHORTCUT
   =========================================================

   Press:

   CTRL + SHIFT + A

   to open admin login.

   On mobile, use ?admin=1 instead.
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "a"
        ) {

            startAdminMode();

        }

    }
);
