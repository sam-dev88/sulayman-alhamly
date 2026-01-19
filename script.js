/* =====================================================
   NAVIGATION / BURGER MENU
===================================================== */
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

/* Close mobile menu when a nav link is clicked */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

/* Close menu when CTA or nav link is clicked */
document.querySelectorAll(".nav-links a, .nav-cta").forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* Smooth scroll to section on nav click */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "auto" });
    }
  });
});

/* =====================================================
   CALENDLY POPUP INTEGRATION
===================================================== */
document.querySelectorAll(".open-calendly").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // prevents default button behavior
    Calendly.initPopupWidget({
      url: "https://calendly.com/samiraramo815/30min",
    });
    return false; // ensures popup works on live site
  });
});

/* =====================================================
   CONTACT / GUEST FORM (GOOGLE SHEETS BACKEND)
===================================================== */


const scriptURL =
  "https://script.google.com/macros/s/AKfycbxdA6bSYEXA_P6u8RPA4c2hZvuPPf07vWrYyQrSLqv3lzCOj6BRJJKeaV_Z_zMdIKlQYQ/exec";

const form = document.getElementById("contactform");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.innerHTML = "Sending message...";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      msg.innerHTML = "✅ Message sent successfully!";
      form.reset();
      setTimeout(() => (msg.innerHTML = ""), 3000);
    })
    .catch((error) => {
      console.error("Form submit error:", error);
      msg.innerHTML = "❌ Failed to send message. Try again later.";
    });
});

/* ----------------- ANTI-SPAM ----------------- */
const formStartTime = Date.now();

document.querySelector("form").addEventListener("submit", function (e) {
  const honeypot = document.getElementById("company").value;
  const timeSpent = (Date.now() - formStartTime) / 1000;

  if (honeypot !== "" || timeSpent < 5) {
    e.preventDefault();
    return false;
  }

  const spamWords = [
    "telegram",
    "whatsapp",
    "million messages",
    "bulk",
    "automatically generated",
    "feedback form",
    "proposal",
    "send messages",
  ];

  const msgVal = document.getElementById("message").value.toLowerCase();
  if (spamWords.some((word) => msgVal.includes(word))) {
    e.preventDefault();
    alert("Message blocked.");
    return false;
  }
});


/* Slider navigation buttons */
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



/* =====================================================
   RESPONSIVE HANDLING
===================================================== */
window.addEventListener("resize", () => {
  slideWidth = slides[0].clientWidth;
  slider.style.transition = "none";
  slider.style.transform = `translateX(${-( (currentIndex + 1) * slideWidth )}px)`;
});
