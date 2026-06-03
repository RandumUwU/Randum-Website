
// 3D BACKGROUND THAT MOVES ALONG THE MOUSE CURSOR
const bg = document.querySelector(".background");

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    bg.style.transform = `translate(${-x}px, ${-y}px)`;
});

// #region IF USER MOVES VOLUME SLIDER, THE NUMBER CHANGES
const volumeText = document.getElementById("volumeText");

volumeSlider.addEventListener("input", () => {
    const percent = Math.round(volumeSlider.value * 100);

    volumeText.textContent = `VOL: ${percent}%`;

    bgm.volume = Number(volumeSlider.value);
});
// #endregion

// RESPONSIBLE FOR FADING IN THE "INFO BOX PANEL" AT BOTTOM RIGHT
const infoBtn = document.getElementById("infoBtn");
const infoBox = document.getElementById("infoBox");

infoBtn.addEventListener("click", () => {
  infoBox.classList.toggle("active");
});

// FIRST SECTION OF THE WEBSITE THE USER SEES WHEN OPENING THE WEBSITE
const firstSection = document.querySelector(".first-section");

window.addEventListener("scroll", () => {
    const fadeDistance = window.innerHeight;

    let opacity = 1 - (window.scrollY / fadeDistance);

    opacity = Math.max(0, Math.min(opacity, 1));

    firstSection.style.opacity = opacity;
});

// #region ALLOWS THE DVRC PANEL TO SLIDE IN AND CLOSE WHEN CLICKED ON EITHER THE BUTTON OR ANYWHERE EXCEPT THE "PANEL"
const DailyVRChatBtn = document.getElementById("DailyVRChatBtn");
const DailyVRChat = document.getElementById("DailyVRChat");

DailyVRChatBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    DailyVRChat.classList.toggle("show");
});

DailyVRChat.addEventListener("click", (event) => {
    event.stopPropagation();
});

volumeSlider.addEventListener("click", (event) => {
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
// #endregion

// #region USERS ARE ABLE TO SCROLL DOWN TO THE SECOND SECTION OF THE WEBSITE (MORE CONTENT SOON...)
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
//# endregion