// script.js

// Allgemeine Schneefall-Funktion (für #snow und #snow2)
function initSnow(containerId) {
  const snowContainer = document.getElementById(containerId);
  if (!snowContainer) return;

  function createSnow() {
    const flake = document.createElement("div");
    flake.classList.add("snowflake");

    const r = Math.random();
    if (r < 0.7) flake.style.fontSize = "6px";
    else if (r < 0.95) flake.style.fontSize = "10px";
    else flake.style.fontSize = "16px";

    flake.textContent = "❄";
    flake.style.left = Math.random() * 100 + "vw";
    const duration = 8 + Math.random() * 6;
    flake.style.animationDuration = duration + "s";

    snowContainer.appendChild(flake);

    setTimeout(() => flake.remove(), duration * 1000);
  }

  setTimeout(() => {
    setInterval(createSnow, 1000 + Math.random() * 2000);
  }, 2000);
}

// Quiz-Logik für index.html
function initQuiz() {
  const promptEl = document.getElementById("prompt");
  const answerEl = document.getElementById("answer");
  const messageEl = document.getElementById("message");
  const continueBtn = document.getElementById("continueBtn");

  if (!promptEl || !answerEl || !messageEl || !continueBtn) {
    // keine Quiz-Elemente vorhanden → auf dieser Seite kein Quiz
    return;
  }

  const words = [
    { de: "flasche", en: "bottle" },
    { de: "kerze",  en: "candle" },
    { de: "kissen", en: "pillow" },
    { de: "licht",  en: "light" },
    { de: "baum",   en: "tree" }
  ];

  let index = 0;
  promptEl.textContent = `${words[index].de}:`;

  function check() {
    const input = answerEl.value.trim().toLowerCase();
    const correct = words[index].en.toLowerCase();

    if (input === correct) {
      messageEl.textContent = "✅ Richtig!";
      index++;
      answerEl.value = "";

      if (index >= words.length) {
        promptEl.textContent = "Alle Wörter geschafft! 🎉";
        continueBtn.style.display = "inline-block";
        continueBtn.focus();
        return;
      }

      promptEl.textContent = `${words[index].de}:`;
    } else {
      messageEl.textContent = "❌ Falsch, nochmal!";
    }
  }

  function continueToSlideshow() {
    window.location.href = "slideshow.html";
  }

  // Funktionen global machen für onclick=""
  window.check = check;
  window.continueToSlideshow = continueToSlideshow;
}

// Slideshow-Logik für slideshow.html
function initSlideshow() {
  const frame = document.getElementById("frame");
  const slideEl = document.getElementById("slide1");
  const captionEl = document.getElementById("captionText");
  const dotsContainer = document.getElementById("dots");
  const playBtn = document.getElementById("playBtn");
  const music = document.getElementById("music");

  if (!frame || !slideEl || !captionEl || !dotsContainer || !playBtn) {
    // keine Slideshow-Elemente → nicht auf dieser Seite
    return;
  }

  const images = [
    "1.jpg","2.jpg","3.jpg","4.jpg","5.jpg",
    "6.jpg","7.jpg","8.jpg","9.jpg","10.jpg"
  ];

  let i = 0;
  let playing = true;

  // Punkte erstellen
  images.forEach((_, idx) => {
    const d = document.createElement("span");
    if (idx === 0) d.classList.add("active");
    dotsContainer.appendChild(d);
  });

  function setActiveDot() {
    const all = dotsContainer.querySelectorAll("span");
    all.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === i);
    });
  }

  function update() {
    slideEl.style.opacity = 0;
    slideEl.style.transform = "scale(1.04)";
    setTimeout(() => {
      slideEl.src = images[i];
      slideEl.style.opacity = 1;
      slideEl.style.transform = "scale(1)";
      captionEl.textContent = "Bild " + (i + 1) + " von " + images.length;
      setActiveDot();
    }, 280);
  }

  function next() {
    i = (i + 1) % images.length;
    update();
  }

  function prev() {
    i = (i - 1 + images.length) % images.length;
    update();
  }

  function playpause() {
    playing = !playing;
    playBtn.textContent = playing ? "⏸ Pause" : "▶ Play";
  }

  function playMusic() {
    if (!music) return;
    music.play().catch(() => {});
  }

  function pauseMusic() {
    if (!music) return;
    music.pause();
  }

  // Auto-Weiter
  setInterval(() => {
    if (playing) next();
  }, 3000);

  // Startzustand
  update();

  // Funktionen global für onclick am HTML
  window.next = next;
  window.prev = prev;
  window.playpause = playpause;
  window.playMusic = playMusic;
  window.pauseMusic = pauseMusic;
}

// Alles initialisieren, wenn DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
  initSnow("snow");
  initSnow("snow2");
  initQuiz();
  initSlideshow();
});
