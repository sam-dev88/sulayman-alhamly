/*-- ===== JS: Smooth Scroll for Hero Buttons ===== --*/
document.querySelectorAll('.hero .btn, .hero-btn .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const target = document.querySelector(targetId);
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ------------- Force Hero to Show on Load ------------- */
window.addEventListener("load", () => {
  const hero = document.querySelector('.hero.card.hidden');
  if (hero) hero.classList.add('show');
});

/* -------------- Smooth Popup Scroll -------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

/* ----------------- BURGER & MOBILE MENU ----------*/
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".nav-links");
const mobileLinks = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  burger.classList.toggle("toggle");
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    burger.classList.remove("toggle");
  });
});

/*--------- Smooth Scroll for Navbar Links -----*/
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const start = window.scrollY;
    const end = target.offsetTop;
    const duration = 1500;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
      window.scrollTo(0, start + (end - start) * ease);

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });
});

/* ----------------- CONTACT FORM ----------------- */
const scriptURL =
"https://script.google.com/macros/s/AKfycbwXHR-uxUvZ8KhpMlsKopcJf5kTozhLfj-QJO2d7007gfaMrsFRg2ZWCHap8oDxO7_oJg/exec";

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

  const msgVal = document.getElementById("message")?.value.toLowerCase() || '';
  if (spamWords.some((word) => msgVal.includes(word))) {
    e.preventDefault();
    alert("Message blocked.");
    return false;
  }
});
