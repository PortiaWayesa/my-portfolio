// TYPING ANIMATION
const roles = [
  "Software Developer",
  "Web Developer",
  "Junior Software Engineer",
  "Data Engineer",
 
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

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

});


window.addEventListener("scroll", revealOnScroll);
// PROJECT REVEAL WITH STAGGER
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 200;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    } else {
      element.classList.remove("active"); // ← THIS makes it repeat
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Animate stat counters on scroll
const statNums = document.querySelectorAll('.stat-num');

const animateCounter = (el) => {
  const raw = el.getAttribute('data-target');

  // Handle "27hrs 45 mins" specially
  if (raw.includes('hrs')) {
    const hoursMatch = raw.match(/(\d+)hrs/);
    const minsMatch = raw.match(/(\d+)\s*mins/);
    const targetHrs = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const targetMins = minsMatch ? parseInt(minsMatch[1]) : 0;
    const totalSteps = targetHrs * 60 + targetMins; // count in minutes
    let current = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / totalSteps), 16);

    const timer = setInterval(() => {
      current++;
      const hrs = Math.floor(current / 60);
      const mins = current % 60;
      el.textContent = `${hrs}hrs ${mins} mins`;
      if (current >= totalSteps) {
        el.textContent = raw; // restore exact original text
        clearInterval(timer);
      }
    }, stepTime);
    return;
  }

  // Standard number counter
  const target = parseInt(raw);
  if (isNaN(target)) return;
  let current = 0;
  const duration = 1200;
  const stepTime = Math.max(Math.floor(duration / target), 30);

  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, stepTime);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNums.forEach(el => animateCounter(el));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);