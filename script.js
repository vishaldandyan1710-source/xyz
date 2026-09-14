document.addEventListener("DOMContentLoaded", function(){

/* =========================
   MOBILE MENU
========================= */

const menuButton =
document.querySelector(".menu-button");

const menuPanel =
document.querySelector(".menu-panel");

const menuClose =
document.querySelector(".menu-close");


if(menuButton && menuPanel){

menuButton.addEventListener("click", function(){

menuPanel.classList.add("open");

document.body.style.overflow = "hidden";

});

}


if(menuClose && menuPanel){

menuClose.addEventListener("click", function(){

menuPanel.classList.remove("open");

document.body.style.overflow = "";

});

}


document.querySelectorAll(".menu-inner a")
.forEach(function(link){

link.addEventListener("click", function(){

menuPanel.classList.remove("open");

document.body.style.overflow = "";

});

});


/* =========================
   SCROLL REVEALS
========================= */

const revealElements =
document.querySelectorAll(".reveal");


const observer =
new IntersectionObserver(

function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

entry.target.classList.add("visible");

observer.unobserve(entry.target);

}

});

},

{
threshold:0.12,
rootMargin:"0px 0px -40px 0px"
}

);


revealElements.forEach(function(element){

observer.observe(element);

});


/* =========================
   STAGGER GALLERY IMAGES
========================= */

const galleryItems =
document.querySelectorAll(
".gallery-grid .gallery-card"
);


const galleryObserver =
new IntersectionObserver(

function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

const item = entry.target;

const delay =
parseInt(item.dataset.delay || "0");

setTimeout(function(){

item.classList.add("visible");

}, delay);

galleryObserver.unobserve(item);

}

});

},

{
threshold:0.12
}

);


galleryItems.forEach(function(item,index){

item.dataset.delay = index * 180;

galleryObserver.observe(item);

});


/* =========================
   GALLERY HOME STAGGER
========================= */

const homeImages =
document.querySelectorAll(
".gallery-stack .gallery-image"
);


const homeGalleryObserver =
new IntersectionObserver(

function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

const item = entry.target;

const index =
Array.from(homeImages).indexOf(item);

setTimeout(function(){

item.classList.add("visible");

}, index * 250);

homeGalleryObserver.unobserve(item);

}

});

},

{
threshold:0.1
}

);


homeImages.forEach(function(item){

homeGalleryObserver.observe(item);

});


/* =========================
   NUMBER COUNTERS
========================= */

const counters =
document.querySelectorAll(
"[data-number]"
);


const counterObserver =
new IntersectionObserver(

function(entries){

entries.forEach(function(entry){

if(!entry.isIntersecting) return;


const element =
entry.target;

const target =
parseInt(element.dataset.number);

let current = 0;

const duration = 1400;

const start =
performance.now();


function update(time){

const progress =
Math.min(
(time - start) / duration,
1
);


const eased =
1 - Math.pow(1-progress,3);


current =
Math.floor(target * eased);


if(target === 20){

element.textContent =
current + "k";

}

else if(target === 4){

element.textContent =
current + "m";

}

else{

element.textContent =
current + "+";

}


if(progress < 1){

requestAnimationFrame(update);

}

}


requestAnimationFrame(update);

counterObserver.unobserve(element);

});

},

{
threshold:0.5
}

);


counters.forEach(function(counter){

counterObserver.observe(counter);

});


/* =========================
   FORM
========================= */

const form =
document.getElementById(
"enquiryForm"
);


if(form){

form.addEventListener(
"submit",
function(event){

event.preventDefault();


const name =
form.querySelector(
'[name="name"]'
).value;


alert(
"Thank you " +
name +
"! Your enquiry has been received. Amoura will contact you shortly."
);


form.reset();

});

}


/* =========================
   PARALLAX HERO
========================= */

const heroImage =
document.querySelector(
".hero-photo img"
);


window.addEventListener(
"scroll",
function(){

if(!heroImage) return;


const scroll =
window.scrollY;


if(scroll < 800){

heroImage.style.transform =
"translateY(" +
(scroll * 0.08) +
"px) scale(1.03)";

}

}

);


/* =========================
   HEADER SHADOW
========================= */

const header =
document.querySelector(
".site-header"
);


window.addEventListener(
"scroll",
function(){

if(!header) return;


if(window.scrollY > 20){

header.style.boxShadow =
"0 5px 25px rgba(30,45,35,.06)";

}

else{

header.style.boxShadow =
"none";

}

});

});
