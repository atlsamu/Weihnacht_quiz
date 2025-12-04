const words = [
  { de: "flasche", en: "bottle" },
  { de: "kerze", en: "candle" },
  { de: "kissen", en: "pillow" },
  { de: "licht", en: "light" },
  { de: "baum", en: "tree" }
];
let index = 0;

document.getElementById("prompt").textContent =
  `${words[index].de}:`;

function check() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  const correct = words[index].en.toLowerCase();

  if (input === correct) {
    document.getElementById("message").textContent = "✅ Richtig!";
    index++;
    document.getElementById("answer").value = "";

    if (index >= words.length) {
      window.location.href = "slideshow.html";
      return;
    }

    document.getElementById("prompt").textContent =
      `${words[index].de}:`;
  } else {
    document.getElementById("message").textContent = "❌ Falsch, nochmal!";
  }
}