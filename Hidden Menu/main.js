const btn = document.querySelector(".menu-btn-container");
const btn_text = document.querySelector(".menu-btn-container > i");
const menu = document.querySelector(".menu-container");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");

  if (btn.classList.contains("active")) {
    btn.className = "menu-btn-container";
    btn_text.className = "fas fa-bars menu-btn";
  } else {
    btn.className = "menu-btn-container active";
    btn_text.className = "fas fa-angle-right menu-btn";
  }
});
