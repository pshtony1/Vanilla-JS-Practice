const btn = document.querySelector(".btn");
const myWindow = document.querySelector(".window");

function closeWindow() {
  myWindow.classList.add("active");
}

function init() {
  btn.addEventListener("click", closeWindow);
}

window.onload = () => {
  init();
};
