const btn_success = document.querySelector(".toast-btn-container.success");
const btn_fail = document.querySelector(".toast-btn-container.fail");
const toast_conatiner = document.querySelector("#toast-container");

let counter = 0;

btn_success.addEventListener("click", () => {
  counter++;

  const notification = document.createElement("div");
  notification.classList.add("toast");
  notification.classList.add("success");

  notification.innerText = `Toasted! Super Awesome! Count: ${counter}`;

  const firstChild = toast_conatiner.firstChild;
  toast_conatiner.insertBefore(notification, firstChild);

  setTimeout(() => {
    notification.remove();
  }, 3000);
});

btn_fail.addEventListener("click", () => {
  counter++;

  const notification = document.createElement("div");
  notification.classList.add("toast");
  notification.classList.add("fail");

  notification.innerText = `Toasted! Super Awesome! Count: ${counter}`;

  const firstChild = toast_conatiner.firstChild;
  toast_conatiner.insertBefore(notification, firstChild);

  setTimeout(() => {
    notification.remove();
  }, 3000);
});
