/* =========================================================
   SALON WEBSITE TEMPLATE ENGINE
========================================================= */


/* =========================================================
   GLOBAL DATA
========================================================= */

let salon = null;


/* =========================================================
   START WEBSITE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadSalon();

});


/* =========================================================
   LOAD SALON.JSON
========================================================= */

async function loadSalon() {

    try {

        const response = await fetch("salon.json");

        if (!response.ok) {

            throw new Error(
                "Could not load salon.json"
            );

        }

        salon = await response.json();

        initializeWebsite();

    } catch (error) {

        console.error(
            "Salon configuration could not be loaded:",
            error
        );

        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:30px;
                font-family:sans-serif;
                text-align:center;
                background:#F5E9D8;
                color:#35241C;
            ">
                <div>
                    <h2>
                        Website configuration could not be loaded.
                    </h2>

                    <p style="margin-top:10px">
                        Make sure salon.json exists and the
                        website is being opened through a web server.
                    </p>
                </div>
            </div>
        `;

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeWebsite() {

    applyTheme();

    populateMetadata();

    populateBrand();

    populateHero();

    populateAbout();

    populateServices();

    populateGallery();

    populateTeam();

    populateReviews();

    populateEnquiry();

    populateContact();

    populateFooter();

    setupNavigation();

    setupMobileMenu();

    setupEnquiryForm();

    setupWhatsApp();

    handleRoute();

}


/* =========================================================
   SAFE VALUE
========================================================= */

function safe(value, fallback = "") {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return fallback;

    }

    return value;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (value === undefined || value === null) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {

    const theme = salon.theme || {};

    const root = document.documentElement;

    if (theme.primary) {

        root.style.setProperty(
            "--primary",
            theme.primary
        );

    }

    if (theme.secondary) {

        root.style.setProperty(
            "--secondary",
            theme.secondary
        );

    }

    if (theme.dark) {

        root.style.setProperty(
            "--dark",
            theme.dark
        );

    }

    if (theme.text) {

        root.style.setProperty(
            "--text",
            theme.text
        );

    }

    if (theme.accent) {

        root.style.setProperty(
            "--accent",
            theme.accent
        );

    }

    if (theme.rose) {

        root.style.setProperty(
            "--rose",
            theme.rose
        );

    }

}


/* =========================================================
   METADATA
========================================================= */

function populateMetadata() {

    const metadata = salon.metadata || {};

    document.title =
        safe(
            metadata.title,
            `${salon.name || "Salon"}`
        );

    const description = document.querySelector(
        'meta[name="description"]'
    );

    if (description) {

        description.setAttribute(
            "content",
            safe(
                metadata.description,
                salon.description || ""
            )
        );

    }

}


/* =========================================================
   BRAND
========================================================= */

function populateBrand() {

    const name = safe(
        salon.name,
        "Salon"
    );

    const elements = [

        "brandName",
        "contactBrand",
        "footerBrand"

    ];

    elements.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent = name;

        }

    });


    if (salon.images && salon.images.logo) {

        const brand = document.querySelector(".brand");

        if (brand) {

            brand.style.backgroundImage =
                `url("${salon.images.logo}")`;

        }

    }

}


/* =========================================================
   HERO
========================================================= */

function populateHero() {

    const hero = salon.hero || {};

    const heroImage =
        document.querySelector(".hero-image");

    if (heroImage && hero.image) {

        heroImage.style.backgroundImage =
            `url("${hero.image}")`;

    }

    const eyebrow =
        document.getElementById("heroEyebrow");

    const title =
        document.getElementById("heroTitle");

    const description =
        document.getElementById("heroDescription");

    const cta =
        document.getElementById("heroCta");


    if (eyebrow) {

        eyebrow.textContent =
            safe(
                hero.eyebrow,
                salon.name
            );

    }


    if (title) {

        title.innerHTML =
            safe(
                hero.title,
                "Beauty,<br>beautifully<br>done."
            );

    }


    if (description) {

        description.textContent =
            safe(
                hero.description,
                salon.description
            );

    }


    if (cta) {

        cta.textContent =
            safe(
                hero.cta,
                "Book Appointment"
            );

    }

}


/* =========================================================
   ABOUT
========================================================= */

function populateAbout() {

    const about =
        salon.about || {};

    const section =
        document.querySelector(
            '[data-section="about"]'
        );

    if (!about.enabled) {

        if (section) {

            section.classList.add(
                "hidden-section"
            );

        }

        return;

    }


    const title =
        document.getElementById("aboutTitle");

    const text =
        document.getElementById("aboutText");

    const image =
        document.getElementById("aboutImage");


    if (title) {

        title.innerHTML =
            safe(
                about.title,
                "Your beauty,<br>our craft."
            );

    }


    if (text) {

        text.textContent =
            safe(
                about.text,
                salon.description
            );

    }


    if (
        image &&
        about.image
    ) {

        image.src = about.image;

        image.alt =
            `${salon.name || "Salon"} interior`;

    }

}


/* =========================================================
   SERVICE HELPERS
========================================================= */

function flattenServices() {

    const serviceGroups =
        Array.isArray(salon.services)
            ? salon.services
            : [];

    const flattened = [];

    serviceGroups.forEach(group => {

        if (!group) return;

        const category =
            safe(group.category, "Services");

        const items =
            Array.isArray(group.items)
                ? group.items
                : [];

        items.forEach(item => {

            if (!item || !item.name) return;

            flattened.push({

                ...item,

                category

            });

        });

    });

    return flattened;

}


/* =========================================================
   SERVICES PAGE
========================================================= */

function populateServices() {

    const container =
        document.getElementById(
            "servicesContainer"
        );

    const select =
        document.getElementById(
            "serviceSelect"
        );

    if (!container) return;


    const groups =
        Array.isArray(salon.services)
            ? salon.services
            : [];


    if (!groups.length) {

        container.innerHTML = `
            <p style="color:var(--muted)">
                Services will be updated soon.
            </p>
        `;

    }


    groups.forEach(group => {

        if (!group) return;

        const items =
            Array.isArray(group.items)
                ? group.items
                : [];

        if (!items.length) return;


        const category =
            safe(
                group.category,
                "Services"
            );


        const categoryElement =
            document.createElement("div");

        categoryElement.className =
            "service-category";


        let rows = "";


        items.forEach(item => {

            if (!item || !item.name) return;


            const price =
                item.price
                    ? escapeHTML(item.price)
                    : "";


            rows += `

                <div class="service-row">

                    <div class="service-name">
                        ${escapeHTML(item.name)}
                    </div>

                    <div class="service-description">
                        ${escapeHTML(
                            safe(
                                item.description,
                                ""
                            )
                        )}
                    </div>

                    <div class="service-price">
                        ${price}
                    </div>

                </div>

            `;

        });


        if (!rows) return;


        categoryElement.innerHTML = `

            <div class="service-category-title">

                <h2>
                    ${escapeHTML(category)}
                </h2>

                <div class="category-line"></div>

            </div>

            <div class="service-list">
                ${rows}
            </div>

        `;


        container.appendChild(
            categoryElement
        );

    });


    /* Populate enquiry dropdown */

    if (select) {

        const allServices =
            flattenServices();

        allServices.forEach(item => {

            const option =
                document.createElement("option");

            option.value =
                item.name;

            option.textContent =
                item.name;

            select.appendChild(option);

        });

    }


    populateFeaturedServices();

}


/* =========================================================
   FEATURED SERVICES
========================================================= */

function populateFeaturedServices() {

    const container =
        document.getElementById(
            "featuredServices"
        );

    if (!container) return;


    const services =
        flattenServices();

    const limit =
        Number(
            salon.home?.featuredServicesLimit
        ) || 6;


    const featured =
        services.slice(0, limit);


    container.innerHTML = "";


    featured.forEach((service, index) => {

        const card =
            document.createElement("div");

        card.className =
            "featured-service";


        card.innerHTML = `

            <div class="featured-service-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <h3>
                ${escapeHTML(service.name)}
            </h3>

            <p>
                ${escapeHTML(
                    safe(
                        service.description,
                        ""
                    )
                )}
            </p>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   GALLERY
========================================================= */

function populateGallery() {

    const container =
        document.getElementById(
            "galleryGrid"
        );

    if (!container) return;


    const images =
        salon.images?.gallery || [];


    container.innerHTML = "";


    images.forEach((image, index) => {

        if (!image) return;


        let src = "";
        let alt = `${salon.name || "Salon"} gallery`;


        if (typeof image === "string") {

            src = image;

        } else {

            src = image.src || "";

            alt =
                image.alt ||
                alt;

        }


        if (!src) return;


        const item =
            document.createElement("div");

        item.className =
            "gallery-item";


        item.innerHTML = `

            <img
                src="${escapeHTML(src)}"
                alt="${escapeHTML(alt)}"
                loading="lazy"
            >

        `;


        container.appendChild(item);

    });


    const description =
        document.getElementById(
            "galleryDescription"
        );


    if (
        description &&
        salon.gallery?.description
    ) {

        description.textContent =
            salon.gallery.description;

    }

}


/* =========================================================
   TEAM
========================================================= */

function populateTeam() {

    const section =
        document.querySelector(
            '[data-section="team"]'
        );

    const container =
        document.getElementById(
            "teamGrid"
        );


    const team =
        Array.isArray(salon.team)
            ? salon.team
            : [];


    const enabled =
        salon.sections?.team === true;


    if (
        !enabled ||
        !team.length
    ) {

        if (section) {

            section.classList.add(
                "hidden-section"
            );

        }

        return;

    }


    team.forEach(member => {

        if (!member || !member.name) return;


        const card =
            document.createElement("div");

        card.className =
            "team-card";


        let imageHTML = "";


        if (member.image) {

            imageHTML = `

                <img
                    class="team-card-image"
                    src="${escapeHTML(member.image)}"
                    alt="${escapeHTML(member.name)}"
                    loading="lazy"
                >

            `;

        }


        card.innerHTML = `

            ${imageHTML}

            <div class="team-card-role">
                ${escapeHTML(
                    safe(
                        member.role,
                        ""
                    )
                )}
            </div>

            <h3>
                ${escapeHTML(member.name)}
            </h3>

            <p>
                ${escapeHTML(
                    safe(
                        member.description,
                        ""
                    )
                )}
            </p>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   REVIEWS
========================================================= */

function populateReviews() {

    const homeContainer =
        document.getElementById(
            "homeReviews"
        );


    const reviews =
        Array.isArray(salon.reviews)
            ? salon.reviews
            : [];


    const enabled =
        salon.sections?.reviews !== false;


    if (
        !enabled ||
        !reviews.length
    ) {

        const section =
            document.querySelector(
                '[data-section="reviews"]'
            );

        if (section) {

            section.classList.add(
                "hidden-section"
            );

        }

        return;

    }


    if (!homeContainer) return;


    reviews.forEach(review => {

        if (!review || !review.text) return;


        const card =
            document.createElement("div");

        card.className =
            "review-card";


        const rating =
            Math.min(
                5,
                Math.max(
                    0,
                    Number(
                        review.rating || 5
                    )
                )
            );


        const stars =
            "★".repeat(rating) +
            "☆".repeat(5 - rating);


        card.innerHTML = `

            <div class="review-stars">
                ${stars}
            </div>

            <p>
                "${escapeHTML(review.text)}"
            </p>

            <strong>
                ${escapeHTML(
                    safe(
                        review.name,
                        "Client"
                    )
                )}
            </strong>

        `;


        homeContainer.appendChild(card);

    });

}


/* =========================================================
   ENQUIRY
========================================================= */

function populateEnquiry() {

    const phone =
        salon.contact?.phone || "";

    const instagram =
        salon.contact?.instagram || "";


    const phoneElement =
        document.getElementById(
            "enquiryPhone"
        );


    const instagramElement =
        document.getElementById(
            "enquiryInstagram"
        );


    if (phoneElement) {

        phoneElement.textContent =
            phone;

        phoneElement.href =
            `tel:${phone.replace(/\s/g, "")}`;

    }


    if (instagramElement) {

        instagramElement.textContent =
            salon.contact?.instagramHandle ||
            instagram;

        if (instagram) {

            instagramElement.href =
                instagram;

        }

    }


    if (salon.enquiry?.description) {

        const description =
            document.getElementById(
                "enquiryDescription"
            );

        if (description) {

            description.textContent =
                salon.enquiry.description;

        }

    }

}


/* =========================================================
   CONTACT
========================================================= */

function populateContact() {

    const contact =
        salon.contact || {};


    const address =
        document.getElementById(
            "contactAddress"
        );

    const phone =
        document.getElementById(
            "contactPhone"
        );

    const instagram =
        document.getElementById(
            "contactInstagram"
        );

    const rating =
        document.getElementById(
            "contactRating"
        );

    const mapsButton =
        document.getElementById(
            "mapsButton"
        );

    const mapFrame =
        document.getElementById(
            "mapFrame"
        );


    if (address) {

        address.innerHTML =
            escapeHTML(
                safe(
                    contact.address,
                    ""
                )
            ).replace(
                /\n/g,
                "<br>"
            );

    }


    if (phone) {

        phone.textContent =
            safe(contact.phone, "");

        phone.href =
            `tel:${safe(
                contact.phone,
                ""
            ).replace(/\s/g, "")}`;

    }


    if (instagram) {

        instagram.textContent =
            safe(
                contact.instagramHandle,
                contact.instagram || ""
            );

        instagram.href =
            safe(
                contact.instagram,
                "#"
            );

    }


    if (rating) {

        const value =
            safe(
                contact.googleRating,
                ""
            );

        rating.textContent =
            value
                ? `★ ${value}`
                : "";

    }


    if (
        mapsButton &&
        contact.mapsUrl
    ) {

        mapsButton.href =
            contact.mapsUrl;

    } else if (mapsButton) {

        mapsButton.style.display =
            "none";

    }


    if (
        mapFrame &&
        contact.mapsEmbedUrl
    ) {

        mapFrame.src =
            contact.mapsEmbedUrl;

    } else if (mapFrame) {

        mapFrame.parentElement.style.display =
            "none";

    }


    populateHours();

}


/* =========================================================
   OPENING HOURS
========================================================= */

function populateHours() {

    const container =
        document.getElementById(
            "openingHours"
        );


    if (!container) return;


    const hours =
        salon.hours || {};


    const entries =
        Object.entries(hours);


    if (!entries.length) {

        const section =
            document.querySelector(
                "[data-contact-hours]"
            );

        if (section) {

            section.style.display =
                "none";

        }

        return;

    }


    const dayNames = {

        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday"

    };


    entries.forEach(
        ([day, time]) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "hours-row";


            row.innerHTML = `

                <span>
                    ${escapeHTML(
                        dayNames[day] || day
                    )}
                </span>

                <span>
                    ${escapeHTML(
                        time
                    )}
                </span>

            `;


            container.appendChild(row);

        }
    );

}


/* =========================================================
   FOOTER
========================================================= */

function populateFooter() {

    const description =
        document.getElementById(
            "footerDescription"
        );

    const phone =
        document.getElementById(
            "footerPhone"
        );

    const instagram =
        document.getElementById(
            "footerInstagram"
        );

    const copyright =
        document.getElementById(
            "copyright"
        );


    if (description) {

        description.textContent =
            safe(
                salon.description,
                ""
            );

    }


    if (phone) {

        phone.textContent =
            safe(
                salon.contact?.phone,
                ""
            );

        phone.href =
            `tel:${safe(
                salon.contact?.phone,
                ""
            ).replace(/\s/g, "")}`;

    }


    if (instagram) {

        instagram.textContent =
            safe(
                salon.contact?.instagramHandle,
                "Instagram"
            );

        instagram.href =
            safe(
                salon.contact?.instagram,
                "#"
            );

    }


    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} ${
                salon.name || "Salon"
            }. All rights reserved.`;

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const page =
                        link.dataset.page;

                    if (!page) return;

                    event.preventDefault();

                    window.location.hash =
                        page;

                }
            );

        });


    window.addEventListener(
        "hashchange",
        handleRoute
    );

}


/* =========================================================
   ROUTING
========================================================= */

function handleRoute() {

    let page =
        window.location.hash
            .replace("#", "")
            .toLowerCase();


    const validPages = [

        "home",
        "services",
        "gallery",
        "enquiry",
        "contact"

    ];


    if (!validPages.includes(page)) {

        page = "home";

    }


    document
        .querySelectorAll(".page")
        .forEach(section => {

            section.classList.remove(
                "active-page"
            );

        });


    const selected =
        document.getElementById(
            `page-${page}`
        );


    if (selected) {

        selected.classList.add(
            "active-page"
        );

    }


    document
        .querySelectorAll(
            ".nav-menu > a[data-page]"
        )
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === page
            );

        });


    document
        .getElementById("navMenu")
        ?.classList.remove("open");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuButton"
        );

    const menu =
        document.getElementById(
            "navMenu"
        );


    if (!button || !menu) return;


    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   WHATSAPP
========================================================= */

function setupWhatsApp() {

    const whatsapp =
        salon.contact?.whatsapp ||
        salon.contact?.phone ||
        "";


    const cleanNumber =
        whatsapp.replace(
            /\D/g,
            ""
        );


    const message =
        safe(
            salon.booking?.defaultMessage,
            `Hello ${salon.name || "Salon"}! I would like to enquire about an appointment.`
        );


    const url =
        cleanNumber
            ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
            : "#";


    const floating =
        document.getElementById(
            "floatingWhatsApp"
        );


    if (floating) {

        floating.href = url;

    }


    document
        .querySelectorAll(
            "[data-whatsapp]"
        )
        .forEach(element => {

            element.href = url;

        });

}


/* =========================================================
   ENQUIRY FORM
========================================================= */

function setupEnquiryForm() {

    const form =
        document.getElementById(
            "enquiryForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();


            const service =
                document.getElementById(
                    "serviceSelect"
                ).value;


            const date =
                document.getElementById(
                    "appointmentDate"
                ).value;


            const time =
                document.getElementById(
                    "appointmentTime"
                ).value;


            const message =
                document.getElementById(
                    "customerMessage"
                ).value.trim();


            let text =
                `Hello ${salon.name || "Salon"}!` +
                `\n\n` +
                `I would like to enquire about an appointment.` +
                `\n\n`;


            text +=
                `Name: ${name}\n`;

            text +=
                `Phone: ${phone}\n`;

            text +=
                `Service: ${service}\n`;


            if (date) {

                text +=
                    `Preferred Date: ${date}\n`;

            }


            if (time) {

                text +=
                    `Preferred Time: ${time}\n`;

            }


            if (message) {

                text +=
                    `Message: ${message}\n`;

            }


            const whatsapp =
                (
                    salon.contact?.whatsapp ||
                    salon.contact?.phone ||
                    ""
                ).replace(
                    /\D/g,
                    ""
                );


            if (!whatsapp) {

                alert(
                    "WhatsApp number is not configured."
                );

                return;

            }


            const url =
                `https://wa.me/${whatsapp}` +
                `?text=${encodeURIComponent(text)}`;


            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =========================================================
   OPTIONAL SECTION CONTROL
========================================================= */

function applySectionVisibility() {

    const sections =
        salon.sections || {};


    Object.entries(sections)
        .forEach(
            ([name, enabled]) => {

                const elements =
                    document.querySelectorAll(
                        `[data-section="${name}"]`
                    );


                elements.forEach(element => {

                    if (!enabled) {

                        element.classList.add(
                            "hidden-section"
                        );

                    }

                });

            }
        );

}


/* Run visibility after everything loads */

setTimeout(
    applySectionVisibility,
    100
);
