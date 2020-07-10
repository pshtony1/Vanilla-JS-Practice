function settingEnemy() {
    birds[1].x -= 10;
    birds[1].color = { r: 255, g: 0, b: 0, a: 1 };
    birds[1].stroke = false;
    birds[1].randomizeHeight();
}

function createText() {
    ctx.font = "20px Comic Sans MS";
    if (birds.length == 2 && hover) {
        ctx.fillStyle = "white";
        ctx.fillText("Player", birds[0].x - 80, birds[0].y + 10);
        ctx.fillStyle = "#FF3300";
        ctx.fillText("AI", birds[1].x - 50, birds[1].y + 10);
    }
}

let hover = false;
let hoverTime = null;

function initalizeBattle(network) {
    if (network) {
        // if not click load button
        if (saveBirds.length == 0 && saveDeadBirds.length == 0) {
            saveGeneration();
        }

        isPlayingLoad = false;
        isPlayingLoadTrain = false;
        isBattle = true;
        hover = true;
        clearTimeout(hoverTime);
        hoverTime = setTimeout(() => (hover = false), 3000);

        birds = [];
        deadBirds = [];
        pipes = [];
        counter = 0;
        slider.value = 1;

        birds.push(new Bird("player"));
        birds.push(new Bird(network));

        settingEnemy();

        text.style.color = "green";
        text.innerHTML = "Loaded AI Successfully";
    } else {
        text.style.color = "red";
        text.innerHTML = "<b>[ERROR]</b> There are no saved Bird.";
    }
}

function battleHandler() {
    clearTimeout(hide);
    let loadNet = JSON.parse(localStorage.getItem("saveNetwork"));
    if (loadNet) loadNet = parseObj(loadNet);

    initalizeBattle(loadNet);

    text.style.opacity = 1;
    hide = setTimeout(() => (text.style.opacity = 0), 4000);
}

const battleBtn = document.querySelector(".battle_load");

battleBtn.addEventListener("click", battleHandler);
