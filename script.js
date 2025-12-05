const words = [
  { de: "flasche", en: "bottle" },
  { de: "kerze",   en: "candle" },
  { de: "kissen",  en: "pillow" },
  { de: "licht",   en: "light" },
  { de: "baum",    en: "tree" }
];

let index = 0;

// Erstes Wort anzeigen
document.getElementById("prompt").textContent = `${words[index].de}:`;

function check() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  const correct = words[index].en.toLowerCase();

  if (input === correct) {
    document.getElementById("message").textContent = "✅ Richtig!";
    index++;
    document.getElementById("answer").value = "";

    // Wenn alle Wörter fertig sind → keinen Auto-Redirect mehr
    if (index >= words.length) {
      document.getElementById("prompt").textContent = "Alle Wörter geschafft! 🎉";
      const btn = document.getElementById("continueBtn");
      if (btn) btn.style.display = "inline-block";
      return;
    }

    // Nächstes Wort anzeigen
    document.getElementById("prompt").textContent = `${words[index].de}:`;
  } else {
    document.getElementById("message").textContent = "❌ Falsch, nochmal!";
  }
}

function continueToSlideshow() {
  window.location.href = "slideshow.html";
}
