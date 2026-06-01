// INFOBOX
const infoBtn = document.getElementById("infoBtn");
const infoBox = document.getElementById("infoBox");

infoBtn.addEventListener("click", () => {
  infoBox.classList.toggle("active");
});

// 3D allowing the background to move along the cursor
const bg = document.querySelector(".background");

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    bg.style.transform = `translate(${-x}px, ${-y}px)`;
});


const firstSection = document.querySelector(".first-section");

window.addEventListener("scroll", () => {
    const fadeDistance = window.innerHeight;

    let opacity = 1 - (window.scrollY / fadeDistance);

    opacity = Math.max(0, Math.min(opacity, 1));

    firstSection.style.opacity = opacity;
});


const DailyVRChatBtn = document.getElementById("DailyVRChatBtn");
const DailyVRChat = document.getElementById("DailyVRChat");

DailyVRChatBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    DailyVRChat.classList.toggle("show");
});

DailyVRChat.addEventListener("click", (event) => {
    event.stopPropagation();
});

document.addEventListener("click", () => {
    DailyVRChat.classList.remove("show");
});

window.addEventListener("scroll", () => {
    if (DailyVRChat.classList.contains("show")) {
        DailyVRChat.classList.remove("show");
    }
});


const moreContent =
    document.querySelector(".second-section");

window.addEventListener("scroll", () => {

    const rect =
        moreContent.getBoundingClientRect();

    const windowHeight =
        window.innerHeight;

    const progress =
        1 - (rect.top / windowHeight);

    const opacity =
        Math.max(0, Math.min(progress, 1));

    moreContent.style.opacity = opacity;
});