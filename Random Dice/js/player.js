const rollBtn = document.querySelector(".roll-dice");
const btn_container = document.querySelector(".btn-container");
const dices = document.querySelectorAll(".dice-hand > .dice");
const dice_text = document.querySelectorAll(".dice-hand > .dice > .dice-text");
const dice_bg = document.querySelectorAll(".dice-hand > .dice > .dice-background");
const slots = document.querySelectorAll(".slot");
const hand = document.querySelector(".dice-hand");
const left_count = document.querySelector(".left-count");

let rollLeft = 3;
let randomCount = 0;
let randoms = [];
let playerHand = [];
let playerSlot = [];

function getTargets(e) {
  if (e.target.classList.contains("dice")) return [e.target, e.target.children[0]];
  else return [e.target.parentNode, e.target];
}

function getEmptySlot() {
  for (let i = 0; i < slots.length; i++) {
    if (slots[i].classList.contains("empty")) return slots[i];
  }

  return null;
}

function indexOf_in_playerHand(something) {
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i]["obj"] == something) return i;
  }

  return -1;
}

function indexOf_in_playerSlot(something) {
  for (let i = 0; i < playerSlot.length; i++) {
    if (playerSlot[i]["obj"] == something) return i;
  }

  return -1;
}

function handManager(e) {
  if (randomCount != 0) return;

  let handToSlot = true;
  if (e.target.classList.contains("onSlot") || e.target.parentNode.classList.contains("onSlot")) handToSlot = false;

  const targets = getTargets(e);
  const toMove = targets[0];
  const toMove_text = targets[1];

  if (handToSlot) {
    const emptySlot = getEmptySlot();

    if (!emptySlot) return;

    emptySlot.classList.remove("empty");
    emptySlot.classList.add("full");
    toMove.classList.add("onSlot");

    const dice = playerHand.splice(indexOf_in_playerHand(toMove_text), 1)[0];
    playerSlot.push(dice);

    hand.removeChild(toMove);
    emptySlot.appendChild(toMove);
  } else {
    toMove.parentNode.classList.remove("full");
    toMove.parentNode.classList.add("empty");
    toMove.classList.remove("onSlot");

    const dice = playerSlot.splice(indexOf_in_playerSlot(toMove_text), 1)[0];
    playerHand.push(dice);

    toMove.parentNode.removeChild(toMove);
    hand.appendChild(toMove);
  }
}

function changeDice() {
  // Check End
  if (randomCount >= playerHand.length) {
    randomCount = 0;
    rollBtn.className = "fas fa-dice-six roll-dice no-active";
    btn_container.classList.toggle("active");
    return;
  }

  // Change Dice
  playerHand[randomCount]["obj"].className = `fas fa-dice-${randoms[randomCount]} dice-text`;
  playerHand[randomCount]["obj"].classList.add("no-changing");
  playerHand[randomCount]["bg"].classList.toggle("changing");
  randomCount++;

  // Recursive
  setTimeout(changeDice, 1500 / playerHand.length);
}

function numToString(num) {
  switch (num) {
    case 1:
      return "one";

    case 2:
      return "two";

    case 3:
      return "three";

    case 4:
      return "four";

    case 5:
      return "five";

    case 6:
      return "six";

    default:
      break;
  }
}

function rollManager() {
  // 0. Exceptions
  if (randomCount != 0) return;
  if (rollBtn.classList.contains("active")) return;
  if (!rollLeft) return;
  if (playerHand.length == 0) return;

  // 0.5. Initalize
  randoms = [];
  rollBtn.className = "fas fa-dice-six roll-dice active";
  for (let i = 0; i < playerHand.length; i++) {
    playerHand[i]["obj"].classList.remove("no-changing");
    playerHand[i]["obj"].classList.add("changing");
    playerHand[i]["bg"].classList.toggle("changing");
  }

  btn_container.classList.toggle("active");

  rollLeft--;
  left_count.innerText = `${rollLeft} left`;

  // 1. Create Random Numbers (1 ~ 6)
  for (let i = 0; i < playerHand.length; i++) {
    randoms.push(Math.floor(Math.random() * 6 + 1));
  }

  // 2. Change numbers to string (like 1 -> one)
  for (let i = 0; i < randoms.length; i++) {
    randoms[i] = numToString(randoms[i]);
  }

  // 3. Animation & change
  setTimeout(changeDice, 300);
}
