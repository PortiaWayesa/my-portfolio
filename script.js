// TYPING ANIMATION
const roles = [
  "Software Developer",
  "Web Developer",
  "Aspiring Software Engineer",
 
];

let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
    if (charIndex < roles[roleIndex].length) {
        typingElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

// Start typing when page loads
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
   hamburger.classList.toggle("open");
});


window.addEventListener("scroll", revealOnScroll);
// PROJECT REVEAL WITH STAGGER
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    } else {
      element.classList.remove("active"); // ← THIS makes it repeat
    }
  });
}

window.addEventListener("scroll", revealOnScroll);