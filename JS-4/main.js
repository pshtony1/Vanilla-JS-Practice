function start() {
    createBirds();
}

function update() {
    if (!isPlayingLoad) {
        rate.innerText = `Train Rate: x${slider.value} (${frame * slider.value}fps)`;
        genElem.innerText = `Generation: ${curGen}`;
    } else {
        rate.innerText = `Play Rate: x${slider.value} (${frame * slider.value}fps)`;
        genElem.innerText = `Playing Saved Bird`;
    }

    if (isBattle) {
        rate.innerText = `Battle Speed: x${slider.value} (${frame * slider.value}fps)`;
        genElem.innerText = `Battle with Trained AI`;
        bestScoreElem.innerText = "";
    }

    for (let rate = 0; rate < slider.value; rate++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isBattle) createText();

        // when playing Load, bird deaths "or" when battle, someone deaths
        if ((!(isPlayingLoad && birds.length === 0) && !isBattle) || (!(isBattle && birds.length !== 2) && !isPlayingLoad) || (!isBattle && !isPlayingLoad)) {
            if (counter % 70 == 0) {
                createPipe();
            }
            counter++;
        }

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].draw();
            // when playing Load, bird deaths
            if (
                (!(isPlayingLoad && birds.length === 0) && !isBattle) ||
                (!(isBattle && birds.length !== 2) && !isPlayingLoad) ||
                (!isBattle && !isPlayingLoad)
            ) {
                pipes[i].update();
            }

            // when Bird(j) Collide with Pipe(i)
            for (let j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hitBird(birds[j])) {
                    cleanBird(j);
                }
            }
        }

        for (let i = birds.length - 1; i >= 0; i--) {
            birds[i].draw();
            if (!(isBattle && birds.length !== 2)) birds[i].update();

            if (birds[i].outScreen()) cleanBird(i);
        }

        if (!isBattle && birds.length === 0) {
            if (!isPlayingLoad) {
                // Change Generation
                curGen += 1;
                // genElem.innerText = `Generation: ${curGen}`;

                // Change Best Score
                if (bestScore < curScore) {
                    bestScore = curScore;
                    nextGeneration(true);
                } else {
                    nextGeneration(false);
                }

                counter = 0;
                pipes = [];
            } else {
                deadBirds[0].draw();

                // Score Text
                ctx.font = "20px Comic Sans MS";
                ctx.fillStyle = "#FFCC00";
                if (deadBirds[0].y > canvas.height / 2) {
                    ctx.fillText(`Score: ${curScore}`, deadBirds[0].x - 50, deadBirds[0].y - 25);
                } else {
                    ctx.fillText(`Score: ${curScore}`, deadBirds[0].x - 50, deadBirds[0].y + 30);
                }
            }
        }

        if (isBattle && deadBirds.length !== 0) {
            deadBirds[0].draw();

            ctx.font = "25px Comic Sans MS";
            ctx.fillStyle = "#FFCC00";

            // if dead bird was player
            if (!deadBirds[0].brain) {
                ctx.fillText("AI Wins!", canvas.width / 2 - 50, 37.5);
            } else {
                ctx.fillText("Player Wins!", canvas.width / 2 - 50, 37.5);
            }
        }

        if (birds.length > 0) curScore = birds[0].score;
        curScoreElem.innerText = `Score: ${curScore}`;

        if (!isPlayingLoad && !isBattle) bestScoreElem.innerText = `Best Score: ${bestScore}`;
        else bestScoreElem.innerText = "";
    }
}

function createPipe() {
    pipes.push(new Pipe());
}

function createBirds() {
    for (let i = 0; i < birdNum; i++) {
        birds.push(new Bird());
        birds[i].randomizeHeight();
        birds[i].randomizeColor();
    }
}

function cleanBird(whatBird) {
    deadBirds.push(birds.splice(whatBird, 1)[0]);
}

function deletePipe(idx) {
    pipes.splice(idx, 1);
}

// function nextGeneration() {
//     console.log("next ");
// }

const canvas = document.querySelector(".canvas");
const slider = document.querySelector(".slider");
const rate = document.querySelector(".rate");
const genElem = document.querySelector(".generation");
const curScoreElem = document.querySelector(".currentScore");
const bestScoreElem = document.querySelector(".bestScore");
const ctx = canvas.getContext("2d");
const frame = 60;
const interval = 1000 / frame;
let birdNum = 500;

let counter = 0;
let curGen = 1;
let curScore = 0;
let bestScore = 0;
let isPlayingLoad = false;
let isBattle = false;

let pipes = [];
let birds = [];
let deadBirds = [];

let bestNetwork_pre = null;
let bestNetwork_glob = null;

start();
setInterval(update, interval);

addEventListener("keydown", birds[0].jump);
