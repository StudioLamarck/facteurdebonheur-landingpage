// Comportements de la page d'accueil (repris de HomeHero.tsx et OccasionsTrack.tsx).
(function () {
  "use strict";

  // --- Exemples de cartes : avance seul toutes les 4,5 s, un choix manuel relance le minuteur. ---
  var INTERVAL_MS = 4500;
  var SLIDE_ON = ["opacity-100"];
  var SLIDE_OFF = ["pointer-events-none", "translate-y-3.5", "scale-[0.97]", "opacity-0"];
  var DOT_ON = ["w-[22px]", "bg-brand"];
  var DOT_OFF = ["w-2", "bg-[#e3ddd9]"];

  var slides = Array.prototype.slice.call(document.querySelectorAll("[data-slide]"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("[data-dot]"));
  var chips = Array.prototype.slice.call(document.querySelectorAll("[data-chip]"));
  var caption = document.querySelector("[data-caption]");
  var captions = dots.map(function (dot) {
    return dot.getAttribute("aria-label").replace(/^Exemple \d+ : /, "");
  });

  function swap(el, on, add, remove) {
    add.forEach(function (c) { el.classList.toggle(c, on); });
    remove.forEach(function (c) { el.classList.toggle(c, !on); });
  }

  var index = 0;
  function show(i) {
    index = i;
    slides.forEach(function (slide, n) {
      swap(slide, n === i, SLIDE_ON, SLIDE_OFF);
      slide.setAttribute("aria-hidden", String(n !== i));
    });
    dots.forEach(function (dot, n) {
      swap(dot, n === i, DOT_ON, DOT_OFF);
      dot.setAttribute("aria-current", String(n === i));
    });
    chips.forEach(function (chip, n) {
      chip.setAttribute("aria-pressed", String(n === i));
    });
    if (caption) caption.textContent = captions[i];
  }

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer = null;
  function restart() {
    if (timer) window.clearInterval(timer);
    if (reduced || slides.length < 2) return;
    timer = window.setInterval(function () {
      show((index + 1) % slides.length);
    }, INTERVAL_MS);
  }

  function bind(buttons) {
    buttons.forEach(function (button, n) {
      button.addEventListener("click", function () {
        show(n);
        restart();
      });
    });
  }
  bind(dots);
  bind(chips);
  restart();

  // --- Occasions : flèches précédent / suivant (desktop). ---
  var track = document.querySelector("[data-track]");
  Array.prototype.forEach.call(document.querySelectorAll("[data-scroll]"), function (button) {
    button.addEventListener("click", function () {
      if (track) track.scrollBy({ left: Number(button.getAttribute("data-scroll")) * 400, behavior: "smooth" });
    });
  });
})();
