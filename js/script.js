/* =========================================
   PULSEFIT LANDING PAGE
   JavaScript
========================================= */


/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );


    if (isOpen) {

        menuToggle.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

    } else {

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

});


/* Close mobile menu after clicking a link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


/* =========================================
   2. SMOOTH SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   3. SCROLL-TRIGGERED ANIMATIONS
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observerOptions = {
    threshold: 0.15
};


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   4. CONTACT FORM VALIDATION
========================================= */

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const messageInput =
    document.getElementById("message");

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const messageError =
    document.getElementById("messageError");

const successMessage =
    document.getElementById("successMessage");


function showError(input, errorElement, message) {

    input.parentElement.classList.add("error");

    errorElement.textContent = message;

}


function clearError(input, errorElement) {

    input.parentElement.classList.remove("error");

    errorElement.textContent = "";

}


function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    let isValid = true;


    /* Reset previous messages */

    clearError(nameInput, nameError);

    clearError(emailInput, emailError);

    clearError(messageInput, messageError);

    successMessage.classList.remove("show");


    /* Name validation */

    if (nameInput.value.trim() === "") {

        showError(
            nameInput,
            nameError,
            "Please enter your name."
        );

        isValid = false;

    } else if (nameInput.value.trim().length < 2) {

        showError(
            nameInput,
            nameError,
            "Name must contain at least 2 characters."
        );

        isValid = false;

    }


    /* Email validation */

    if (emailInput.value.trim() === "") {

        showError(
            emailInput,
            emailError,
            "Please enter your email."
        );

        isValid = false;

    } else if (!validateEmail(emailInput.value.trim())) {

        showError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );

        isValid = false;

    }


    /* Message validation */

    if (messageInput.value.trim() === "") {

        showError(
            messageInput,
            messageError,
            "Please enter a message."
        );

        isValid = false;

    } else if (messageInput.value.trim().length < 10) {

        showError(
            messageInput,
            messageError,
            "Message must contain at least 10 characters."
        );

        isValid = false;

    }


    /* Successful submission */

    if (isValid) {

        successMessage.classList.add("show");

        contactForm.reset();

    }

});


/* =========================================
   5. REAL-TIME FORM ERROR CLEARING
========================================= */

nameInput.addEventListener("input", () => {

    if (nameInput.value.trim() !== "") {

        clearError(nameInput, nameError);

    }

});


emailInput.addEventListener("input", () => {

    if (
        emailInput.value.trim() !== "" &&
        validateEmail(emailInput.value.trim())
    ) {

        clearError(emailInput, emailError);

    }

});


messageInput.addEventListener("input", () => {

    if (messageInput.value.trim().length >= 10) {

        clearError(messageInput, messageError);

    }

});


/* =========================================
   6. EXTRA INTERACTION
   PRICING TOGGLE
========================================= */

const pricingToggle =
    document.getElementById("pricingToggle");

const prices =
    document.querySelectorAll(".price");


const monthlyPrices = [
    39,
    59,
    89
];


const yearlyPrices = [
    31,
    47,
    71
];


pricingToggle.addEventListener("click", () => {

    const isYearly =
        pricingToggle.classList.toggle("active");


    pricingToggle.setAttribute(
        "aria-pressed",
        isYearly
    );


    prices.forEach((priceElement, index) => {

        const price =
            isYearly
                ? yearlyPrices[index]
                : monthlyPrices[index];


        priceElement.innerHTML =
            `<span>$</span>${price}<small>/month</small>`;

    });

});