// MINECRAFT CLICK NOISE
const image = document.getElementById("introImage");
const sound = document.getElementById("clickSound");
const counterEl = document.getElementById("clickCount");


// Load saved value (or 0 if none)
let clicks = Number(localStorage.getItem("imageClicks") || 0);
counterEl.textContent = `Clicks: ${clicks}`;

image.addEventListener("click", () => {
  sound.currentTime = 0.47; // start here
  sound.play();

  clicks += 1;
  counterEl.textContent = `Clicks: ${clicks}`;
  localStorage.setItem("imageClicks", clicks);
});

// INFOBOX
const infoBtn = document.getElementById("infoBtn");
const infoBox = document.getElementById("infoBox");

infoBtn.addEventListener("click", () => {
  infoBox.classList.toggle("active");
});

// THIS IS FOR THE GAME-LIKE MENU SYSTEM
// const introImage = document.getElementById("introImage");
// const menu = document.getElementById("menuOptions");

// introImage.addEventListener("click", () => {
//     menu.classList.toggle("hidden");
// });



// 3D allowing the background to move along the cursor
const bg = document.querySelector(".background");

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    bg.style.transform = `translate(${-x}px, ${-y}px)`;
});