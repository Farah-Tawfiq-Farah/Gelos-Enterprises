// Select Items
// Navbar Items
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

// Body items
const image = document.querySelector("#slide-image");
const h2 = document.querySelector("#slide-title");
const p = document.querySelector("#slide-body");

// Show and hide the menu on mobile
hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Close the hamburger menu when any of the links are pressed
navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// Load the image, title, and the text of the slide
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const pages = [
{
    ID : "slide-1",
    imageSrc : "./img/city1.jpg",
    imageAlt : "City at night image",
    title : "Improving operations through Gelos products & services",
    body: "Gelos is a global agency that delivers high-quality products to clients seeking to achieve organisational success through digital transformation. Over the past ten years, we have served our clients to achieve digital transformation by focusing on customer-centricity and data-driven insights; combining these methodologies with artificial intelligence and machine learning enables digital transformations to be set into motion. We understand the digital ecosystem while identifying operational and technological gaps within the business."
},
{
    ID : "slide-2",
    imageSrc : "./img/city2.jpg",
    imageAlt : "City at night image",
    title : "Solving business problems",
    body : "At Gelos, we provide cutting-edge technologies, helping our customers improve how they interact with digital solutions and seek new ways to change how they do business. We provide many services that allow you to take advantage of new technology and innovation to help solve your business problems."
}
];

const currentPage = pages.find(function(p) { return p.ID === title });
document.title = currentPage.title;
image.src = currentPage.imageSrc;
image.alt = currentPage.imageAlt;
h2.innerText = currentPage.title;
p.innerText = currentPage.body;
