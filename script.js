/* ========== SMOOTH SCROLL (EXCLUDES CALENDLY BUTTONS) ========== */
document.querySelectorAll('.hero .btn:not(.open-calendly), .hero-btn .btn:not(.open-calendly)').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ========== FORCE HERO TO SHOW ON LOAD ========== */
window.addEventListener("load", () => {
  const hero = document.querySelector('.hero.card.hidden');
  if (hero) hero.classList.add('show');
});

/* ========== SCROLL ANIMATION (INTERSECTION OBSERVER) ========== */
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

/* ========== BURGER / MOBILE MENU ========== */
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

/* ========== SMOOTH SCROLL FOR NAV LINKS ========== */
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    const start = window.scrollY;
    const end = target.offsetTop;
    const duration = 1200;
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

/* ========== CONTACT FORM SUBMIT ========== */
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwXHR-uxUvZ8KhpMlsKopcJf5kTozhLfj-QJO2d7007gfaMrsFRg2ZWCHap8oDxO7_oJg/exec";

const form = document.getElementById("contactform");
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.innerHTML = "Sending message...";

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        msg.innerHTML = "✅ Message sent successfully!";
        form.reset();
        setTimeout(() => (msg.innerHTML = ""), 3000);
      })
      .catch(() => {
        msg.innerHTML = "❌ Failed to send message. Try again later.";
      });
  });
}

/* ========== ANTI-SPAM ========== */
const formStartTime = Date.now();

form?.addEventListener("submit", (e) => {
  const honeypot = document.getElementById("company")?.value;
  const timeSpent = (Date.now() - formStartTime) / 1000;

  if (honeypot || timeSpent < 5) {
    e.preventDefault();
    return false;
  }
});

/* ========== CALENDLY MODAL (FIXED & ISOLATED) ========== */
document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll(".open-calendly");
  const modal = document.getElementById("calendarModal");
  const closeBtn = document.querySelector(".close");

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // VERY IMPORTANT
      modal.style.display = "block";
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
