const rightDetector = document.querySelector(".right-detector");
const bottomDetector = document.querySelector(".bottom-detector");
const backgroundContainer = document.querySelector(".main-container");
const detailContainer = document.querySelector(".detail-container");
const playerContainer = document.querySelector(".player-container");

const rightOver = () => {
  if (backgroundContainer.classList.contains("active-bottom")) {
    backgroundContainer.classList.remove("active-bottom");
  }

  detailContainer.style.display = "flex";
  backgroundContainer.classList.add("active-right");
};

const rightLeave = () => {
  detailContainer.style.display = "none";
  backgroundContainer.classList.remove("active-right");
};

const bottomOver = () => {
  if (backgroundContainer.classList.contains("active-right")) {
    backgroundContainer.classList.remove("active-right");
  }

  playerContainer.style.display = "flex";
  backgroundContainer.classList.add("active-bottom");
};

const bottomLeave = () => {
  playerContainer.style.display = "none";
  backgroundContainer.classList.remove("active-bottom");
};

rightDetector.addEventListener("mouseover", rightOver);
detailContainer.addEventListener("mouseleave", rightLeave);
bottomDetector.addEventListener("mouseover", bottomOver);
playerContainer.addEventListener("mouseleave", bottomLeave);
