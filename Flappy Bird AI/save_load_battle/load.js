function saveGeneration() {
    for (let i = 0; i < birds.length; i++) {
        saveBirds.push(birds[i]);
    }

    for (let i = 0; i < deadBirds.length; i++) {
        saveDeadBirds.push(deadBirds[i]);
    }

    saveGen = curGen;
    saveBestScore = bestScore;
}

function loadBirds() {
    curGen = saveGen;
    bestScore = saveBestScore;
    birds = [];
    deadBirds = [];

    for (let i = 0; i < saveBirds.length; i++) {
        birds.push(saveBirds[i]);
    }

    for (let i = 0; i < saveDeadBirds.length; i++) {
        deadBirds.push(saveDeadBirds[i]);
    }

    saveGen = 1;
    saveBestScore = 0;
}

let saveBirds = [];
let saveDeadBirds = [];
let saveGen = 1;
let saveBestScore = 0;
let isPlayingLoadTrain = false;

function loadToTrain(network) {
    if (network) {
        isPlayingLoad = false;
        isPlayingLoadTrain = true;
        isBattle = false;

        saveBirds = [];
        saveDeadBirds = [];

        saveGeneration();

        birds = [];
        pipes = [];
        deadBirds = [];
        counter = 0;
        curGen = 1;
        bestScore = 0;

        nextGeneration(null, network);

        text.style.color = "green";
        text.innerHTML = "Loaded Successfully";
    } else {
        text.style.color = "red";
        text.innerHTML = "<b>[ERROR]</b> There are no saved Bird.";
    }
}

function loadToPlay(network) {
    if (network) {
        isPlayingLoad = true;
        isPlayingLoadTrain = false;
        isBattle = false;

        saveBirds = [];
        saveDeadBirds = [];

        saveGeneration();

        pipes = [];
        birds = [];
        deadBirds = [];
        counter = 0;
        birds.push(new Bird(network));

        text.style.color = "green";
        text.innerHTML = "Loaded Successfully";
    } else {
        text.style.color = "red";
        text.innerHTML = "<b>[ERROR]</b> There are no saved Bird.";
    }
}

function backToTrain() {
    if (isPlayingLoad || isPlayingLoadTrain || isBattle) {
        isPlayingLoad = false;
        isPlayingLoadTrain = false;
        isBattle = false;

        loadBirds();

        counter = 0;
        pipes = [];
        saveBirds = [];
        saveDeadBirds = [];

        text.style.color = "green";
        text.innerHTML = "Go back Successfully";
    } else {
        text.style.color = "red";
        text.innerHTML = "<b>[ERROR]</b> You are not playing saved Bird now.";
    }
}

function clearData() {
    localStorage.removeItem("saveNetwork");
    text.style.color = "green";
    text.innerHTML = "Cleared Bird Data Successfully";
}

function parseObj(obj) {
    // 1. Matrix
    obj.W1 = new Matrix(obj.W1).copy();
    obj.W2 = new Matrix(obj.W2).copy();
    obj.B1 = new Matrix(obj.B1).copy();
    obj.B2 = new Matrix(obj.B2).copy();

    // 2. network
    obj = new NeuralNetwork(obj).copy();

    return obj;
}

function handleLoad(e) {
    if (hide) clearTimeout(hide);

    let buttonName = e.path[0].className;
    let loadNet = JSON.parse(localStorage.getItem("saveNetwork"));
    if (loadNet) loadNet = parseObj(loadNet);

    if (buttonName === "load_train") {
        loadToTrain(loadNet);
    } else if (buttonName === "load_play") {
        loadToPlay(loadNet);
    } else if (buttonName === "back") {
        backToTrain();
    } else if (buttonName === "clear") {
        clearData();
    }

    text.style.opacity = 1;
    hide = setTimeout(() => (text.style.opacity = 0), 4000);
}

const loadTrain = document.querySelector(".load_train");
const loadPlay = document.querySelector(".load_play");
const back = document.querySelector(".back");
const clear = document.querySelector(".clear");

loadTrain.addEventListener("click", handleLoad);
loadPlay.addEventListener("click", handleLoad);
back.addEventListener("click", handleLoad);
clear.addEventListener("click", handleLoad);
