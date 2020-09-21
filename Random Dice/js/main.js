function copyArray(toCopy, toCopyBG) {
  let result = [];

  for (let i = 0; i < toCopy.length; i++) {
    let tmp = {};
    tmp["obj"] = toCopy[i];
    tmp["bg"] = toCopyBG[i];
    result.push(tmp);
  }

  return result;
}

function init() {
  playerHand = copyArray(dice_text, dice_bg);

  for (let i = 0; i < dices.length; i++) {
    dices[i].addEventListener("click", handManager);
  }

  btn_container.addEventListener("click", rollManager);

  rollManager();
}

init();
