// Select Items
// Navbar Items
var skipToMainLink = $(".skip");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
var navigationLinks = $(".nav-link");

// Carousel Items
var carousel = document.querySelector('.carousel .list');
var items = document.querySelectorAll('.carousel .list .carousel-item');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var indicators = document.querySelectorAll('.carousel .indicators li');
const readMoreButton = document.querySelector("#carousel-read-more");
const knowMoreButton = document.querySelector("#know-more");

var lengthItems = items.length;
var active = 0;
var interval;

var touchstartX = 0;
var touchendX = 0;

// Accordion Items
const accordionItemHeader = document.querySelectorAll(".accordion-item-header");
var accordionLink = $("#accordion-link");

// Contact Us Items
const ContactUsReadMoreButton = document.querySelector("#contact-us-read-more");

// Footer Button
var toTopButton = $("#to-top");

// Navbar codes 
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

// Scroll function
function scrollToElement(target) {
    $('html, body').animate({
        scrollTop: $(target).offset().top - 100
    }, 1750);
}

// NavBar Items Scroll to code (jQuery)
navigationLinks.click(function(){
    scrollToElement($(this).attr("href"));
});

// // Skip to main scroll code
skipToMainLink.click(function(){
    scrollToElement($(this).attr("href"));
});
// End of Navbar codes 

// Carousel Code
// Function to initialize the carousel
function reloadCarousel() {
    // Hide all items
    items.forEach(carouselItem => {
        carouselItem.style.display = 'none';
    });

    // Show the active item
    items[active].style.display = 'block';

    // Update active indicators
    document.querySelector('.carousel .indicators li.active').classList.remove('active');
    indicators[active].classList.add('active');
}

// Function to change slide
function changeSlide() {
    active = (active + 1) % lengthItems;
    reloadCarousel();
}

// Initialize the carousel
reloadCarousel();

// Set interval for automatic slide change
interval = setInterval(changeSlide, 8000); // Change slide every 8 seconds

// Event listener for next button
next.onclick = function(){
    changeSlide();
}

// Event listener for previous button
prev.onclick = function(){
    active = (active - 1 + lengthItems) % lengthItems;
    reloadCarousel();
}

// Event listener for indicator navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        active = index;
        reloadCarousel();
    });
});

// Function to handle window resize
window.onresize = reloadCarousel;

// Function to make the carousel buttons direct the user to a different page
function goToSlidePage(event) {
    const title = event.currentTarget.dataset.title;
    window.location.href = "slide-page.html?title=" + title;
}

readMoreButton.addEventListener("click", goToSlidePage, false);
knowMoreButton.addEventListener("click", goToSlidePage, false);

// Touch event listeners for swipe gesture
carousel.addEventListener('touchstart', function(event) {
    if(event.target.tagName !== "BUTTON"){
        touchstartX = event.changedTouches[0].screenX;
    }
}, false);

carousel.addEventListener('touchend', function(event) {
    if(event.target.tagName !== "BUTTON"){
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    }
}, false);

function handleSwipe() {
    // Always move to the next slide on swipe
    changeSlide();
}
// End of Carousel Code

// Accordion Code
// Loop through each accordion item header
accordionItemHeader.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {
        accordionItemHeader.classList.toggle("active");
        // Select the next sibling element, which is the accordion item body
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if(accordionItemHeader.classList.contains("active")) {
            // Expand the accordion item body to its full height
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        }
        // Collapse the accordion item body by setting its max height to 0
        else {
            accordionItemBody.style.maxHeight = 0;
        }
    });
});

// Contact us link in the first accordion
accordionLink.click(function(){
    scrollToElement($(this).attr("href"));
});
// End of Acordion Code

// Contact Us Code
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var phoneError = document.getElementById("phone-error");
    var emailError = document.getElementById("email-error");
    var nameError = document.getElementById("name-error");
    var submitButton = document.getElementById("submit");

    //name validation
    var namePattern = /^[a-zA-Z .]+$/;
    if (!namePattern.test(name)) {
        nameError.textContent = "This field allows only letters, spaces, and dots for upper and lower case letters";
        return false;
    } else {
        nameError.textContent = "";
    }

    //Email validation
    var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = email.toLowerCase();
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address";
        return false;
    } else {
        emailError.textContent = "";
    }

    // Phone validation
    if (!/^\d+$/.test(phone)) {
        phoneError.textContent = "Phone number should contain only numbers";
        return false;
    }
    if (!/^\d{10}$/.test(phone)) {
        phoneError.textContent = "Phone number should contain 10 digits";
        return false;
    } else {
        phoneError.textContent = "";
    }

    // Disable submit button and change its content
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "green";
    submitButton.textContent = "Form submitted successfully";

    // After 3 seconds, revert button to initial state
    setTimeout(function() {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "";
        submitButton.textContent = "Submit";
    }, 3000);
    return true;
}

// Handle the form subbmission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Reset the form if it is valid
    if(validateForm()) {
        document.getElementById("contact-form").reset();
    }
});

// Make the read more button go to slide-page code
ContactUsReadMoreButton.addEventListener("click", goToSlidePage, false);
// End of Contact Us Code

// Footer Code
// Footer Button to scroll to top code (jQuery)
toTopButton.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, 1750);
});
// End of Footer Code

// Code to show the heading when pressing the links in the slide page Nav
$(document).ready(function() {
    // Check if window.location.hash exists
    if(window.location.hash) {
        // Scroll up by 100 pixels        
        const currentScroll = $(window).scrollTop();
        const section = $(window.location.hash);
        const sectionOffset = section.offset().top;
        if(currentScroll === sectionOffset){
            $('html, body').animate({
                scrollTop: '-=100px'
            }, 1000);
        }
    }
});


// Another code for scrolling
// ******** NavBar Items Scroll to code ********
// navLink.forEach(function(link){
//     link.addEventListener("click", function(event){
//         var targetId = this.getAttribute("href").substring(1);
//         var targetElement = document.getElementById(targetId);
//         if (targetElement) {
//             event.preventDefault();
//             var offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
//             window.scrollTo({
//                 top: offsetTop - 100,
//                 behavior: "smooth"
//             });
//         }
//     });
// });

// ******** Footer Button to scroll to top code ********
// var toTopButton= document.getElementById("to-top");
// toTopButton.addEventListener("click", function(event) {
//     var targetId = this.getAttribute("data-target");
//     var targetElement = document.getElementById(targetId);
//     if (targetElement) {
//         event.preventDefault();
//         var offsetTop = targetElement.getBoundingClientRect().top;
//         window.scrollTo({
//             top: offsetTop - 100,
//             behavior: "smooth"
//         });
//     }
// });
