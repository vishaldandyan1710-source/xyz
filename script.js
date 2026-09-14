const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
if (nav) {
nav.classList.toggle("scrolled", window.scrollY > 40);
}
});

if (menu && navLinks) {
menu.addEventListener("click", () => {
navLinks.classList.toggle("open");
});
}

document.querySelectorAll(".nav-links a").forEach(link => {
link.addEventListener("click", () => {
if (navLinks) {
navLinks.classList.remove("open");
}
});
});

const observer = new IntersectionObserver(
entries => {
entries.forEach(entry => {
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

document.querySelectorAll(".reveal").forEach(element => {
observer.observe(element);
});

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
enquiryForm.addEventListener("submit", function(event) {
event.preventDefault();

const name = document.getElementById("name")?.value || "";
const phone = document.getElementById("phone")?.value || "";
const service = document.getElementById("service")?.value || "";
const message = document.getElementById("message")?.value || "";

const whatsappMessage =
  "Hello Amoura,%0A%0A" +
  "Name: " + encodeURIComponent(name) + "%0A" +
  "Phone: " + encodeURIComponent(phone) + "%0A" +
  "Service: " + encodeURIComponent(service) + "%0A" +
  "Message: " + encodeURIComponent(message);

window.open(
  "https://wa.me/919999999999?text=" + whatsappMessage,
  "_blank"
);

});
}
