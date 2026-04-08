// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => io.observe(el));

// Today's date in header
const todayText = document.getElementById("todayText");
if (todayText) {
  const d = new Date();
  todayText.textContent = d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Tiny sparkle button (confetti-ish without a library)
const toast = document.getElementById("toast");
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function spawnSparkles(count = 18) {
  const root = document.body;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.setAttribute("aria-hidden", "true");
    s.style.position = "fixed";
    s.style.left = `${Math.random() * 100}vw`;
    s.style.top = `${-10 - Math.random() * 20}px`;
    s.style.fontSize = `${12 + Math.random() * 14}px`;
    s.style.zIndex = "9999";
    s.style.pointerEvents = "none";
    s.style.opacity = "0.95";
    s.textContent = Math.random() > 0.5 ? "✦" : "✿";

    const drift = (Math.random() * 2 - 1) * 80;
    const fall = 110 + Math.random() * 120;
    const dur = 1200 + Math.random() * 800;

    s.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 0.95 },
        { transform: `translate(${drift}px, ${fall}vh) rotate(${180 + Math.random() * 220}deg)`, opacity: 0 },
      ],
      { duration: dur, easing: "cubic-bezier(.2,.8,.2,1)" }
    );

    root.appendChild(s);
    window.setTimeout(() => s.remove(), dur + 50);
  }
}

document.getElementById("confettiBtn")?.addEventListener("click", () => {
  spawnSparkles(22);
  showToast("sparkles delivered ✨");
});

// Little bounce on ailments
document.querySelectorAll(".ailment").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.remove("pop");
    // restart animation
    void btn.offsetWidth;
    btn.classList.add("pop");
    showToast("wee! hope you feel better 🩹");
  });
});
