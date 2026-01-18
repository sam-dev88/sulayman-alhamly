const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

document.querySelectorAll(".nav-links a, .nav-cta").forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "auto" });
    }
  });
});
/*--------------------Calendly Popup-----------------*/
document.querySelectorAll(".open-calendly").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // prevents default button behavior
    Calendly.initPopupWidget({
      url: "https://calendly.com/samiraramo815/30min",
    });
    return false; // ensures popup works on live site
  });
});

const form = document.getElementById("guestForm");
const successMsg = document.getElementById("formSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec", {
    method: "POST",
    body: new FormData(form),
  })
    .then(() => {
      successMsg.style.display = "block";
      form.reset();
    })
    .catch(() => {
      alert("Submission failed. Please try again.");
    });
});

const slider = document.getElementById("testimonialSlider");
const slides = document.querySelectorAll(".testimonial-card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let slideWidth = slides[0].clientWidth;
let isDragging = false;
let startX = 0;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

let offset = -slideWidth;
slider.style.transform = `translateX(${offset}px)`;

function updateSlider() {
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(${-(
    (currentIndex + 1) *
    slideWidth
  )}px)`;
}

slider.addEventListener("transitionend", () => {
  if (currentIndex === -1) {
    slider.style.transition = "none";
    currentIndex = slides.length - 1;
    slider.style.transform = `translateX(${-(
      (currentIndex + 1) *
      slideWidth
    )}px)`;
  }
  if (currentIndex === slides.length) {
    slider.style.transition = "none";
    currentIndex = 0;
    slider.style.transform = `translateX(${-(
      (currentIndex + 1) *
      slideWidth
    )}px)`;
  }
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  updateSlider();
  stopAutoplayTemporarily();
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  updateSlider();
  stopAutoplayTemporarily();
});

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  slider.style.transition = "none";
  stopAutoplayTemporarily();
});

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;
  slider.style.transform = `translateX(${
    -((currentIndex + 1) * slideWidth) + diff
  }px)`;
});

slider.addEventListener("touchend", (e) => {
  isDragging = false;
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) currentIndex--;
  else if (diff < -50) currentIndex++;
  updateSlider();
});

let autoplay = setInterval(() => {
  currentIndex++;
  updateSlider();
}, 4000);

function stopAutoplayTemporarily() {
  clearInterval(autoplay);
  setTimeout(() => {
    autoplay = setInterval(() => {
      currentIndex++;
      updateSlider();
    }, 4000);
  }, 5000);
}

slider.addEventListener("mouseenter", () => clearInterval(autoplay));

slider.addEventListener("mouseleave", () => {
  autoplay = setInterval(() => {
    currentIndex++;
    updateSlider();
  }, 4000);
});

window.addEventListener("resize", () => {
  slideWidth = slides[0].clientWidth;
  slider.style.transition = "none";
  slider.style.transform = `translateX(${-(
    (currentIndex + 1) *
    slideWidth
  )}px)`;
});
