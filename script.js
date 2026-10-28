document.addEventListener("DOMContentLoaded", () => {
  // Tiny floating hearts on the welcome page
  document.querySelectorAll(".button-primary").forEach(button => {
    button.addEventListener("mouseenter", () => {
      if (Math.random() > 0.45) spawnHeart(button.getBoundingClientRect());
    });
  });

  const heartButtons = [...document.querySelectorAll(".collect-heart")];
  const scoreLabel = document.getElementById("scoreLabel");
  const progressFill = document.getElementById("progressFill");
  const gameMessage = document.getElementById("gameMessage");
  const reveal = document.getElementById("reveal");
  let score = 0;

  heartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("collected")) return;
      button.classList.add("collected");
      button.textContent = "♥";
      score++;
      if (scoreLabel) scoreLabel.textContent = `HEARTS ${score} / 3`;
      if (progressFill) progressFill.style.width = `${(score / 3) * 100}%`;
      popHearts(button.getBoundingClientRect());
      if (score < 3) {
        if (gameMessage) gameMessage.textContent = ["One heart collected! Keep going, birthday girl. ♡", "Two! Your surprise is almost unlocked. ✦"][score - 1];
      } else {
        if (gameMessage) gameMessage.textContent = "All hearts collected. You unlocked the birthday magic! ♡";
        if (reveal) {
          reveal.classList.remove("hidden");
          reveal.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });

  const openGift = document.getElementById("openGift");
  const birthdayGift = document.getElementById("birthdayGift");
  if (openGift && birthdayGift) {
    openGift.addEventListener("click", () => {
      birthdayGift.classList.remove("hidden");
      confetti();
      birthdayGift.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const celebrateAgain = document.getElementById("celebrateAgain");
  if (celebrateAgain) celebrateAgain.addEventListener("click", confetti);
});

function spawnHeart(rect) {
  const el = document.createElement("span");
  el.className = "floating-heart";
  el.textContent = Math.random() > .5 ? "♡" : "✦";
  el.style.left = `${rect.left + rect.width / 2 + (Math.random() * 50 - 25)}px`;
  el.style.top = `${rect.top + window.scrollY}px`;
  el.style.fontSize = `${14 + Math.random() * 13}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1700);
}
function popHearts(rect) {
  for (let i = 0; i < 5; i++) {
    const el = document.createElement("span");
    el.className = "floating-heart";
    el.textContent = ["♡", "♥", "✦", "✧"][Math.floor(Math.random() * 4)];
    el.style.left = `${rect.left + rect.width / 2 + (Math.random() * 90 - 45)}px`;
    el.style.top = `${rect.top + window.scrollY + (Math.random() * 30 - 15)}px`;
    el.style.fontSize = `${17 + Math.random() * 14}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1700);
  }
}
function confetti() {
  const symbols = ["♡", "✦", "▪", "♥"];
  for (let i = 0; i < 75; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * .8}s`;
    piece.style.fontSize = `${10 + Math.random() * 12}px`;
    piece.style.color = ["#d97da4", "#c9a15d", "#292329", "#e8a6bd"][Math.floor(Math.random() * 4)];
    piece.style.background = "transparent";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3600);
  }
}
