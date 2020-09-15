const rollBtn = document.querySelector(".roll-dice");
const dices = document.querySelectorAll(".dice-text");
const dice_bg = document.querySelectorAll(".dice-background");
const btn_container = document.querySelector(".btn-container");
let count = 0;
let randoms = [];

btn_container.addEventListener("click", rollManager);

function changeDice() {
  // Check End
  if (count >= dices.length) {
    count = 0;
    rollBtn.className = "fas fa-dice-six roll-dice no-active";
    btn_container.classList.toggle("active");
    return;
  }

  // Change Dice
  dices[count].className = `fas fa-dice-${randoms[count]} dice-text`;
  dices[count].classList.toggle("no-changing");
  dice_bg[count].classList.toggle("changing");
  count++;

  // Recursive
  setTimeout(changeDice, 1500 / dices.length);
}

function rollManager() {
  // 0. Exceptions
  if (count != 0) return;

  if (rollBtn.classList.contains("no-active")) {
    rollBtn.className = "fas fa-dice-six roll-dice active";
  } 
  
//   else {
//     rollBtn.className = "fas fa-dice-six roll-dice no-active";
//   }

  // 0.5. Initalize
  randoms = [];
  for (let i = 0; i < dices.length; i++) {
    dices[i].classList.remove("no-changing");
    dices[i].classList.toggle("changing");
    dice_bg[i].classList.toggle("changing");
  }
  btn_container.classList.toggle("active");

  // 1. Create Random Numbers (1 ~ 6)
  for (let i = 0; i < dices.length; i++) {
    randoms.push(Math.floor(Math.random() * 6 + 1));
  }

  // 2. Change numbers to string (like 1 -> one)
  for (let i = 0; i < randoms.length; i++) {
    switch (randoms[i]) {
      case 1:
        randoms[i] = "one";
        break;

      case 2:
        randoms[i] = "two";
        break;

      case 3:
        randoms[i] = "three";
        break;

      case 4:
        randoms[i] = "four";
        break;

      case 5:
        randoms[i] = "five";
        break;

      case 6:
        randoms[i] = "six";
        break;

      default:
        break;
    }
  }

  // 3. Animation & change
  setTimeout(changeDice, 200);
}

function init() {
  rollManager();
}

init();
