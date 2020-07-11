function saveCurrentBird() {
    if (birds.length > 0) {
        let brain = birds[0].brain;

        localStorage.setItem("saveNetwork", JSON.stringify(brain));
        text.style.color = "green";
        text.innerHTML = "Successfully saved your <b>Current Bird.</b>";
    } else {
        text.style.color = "red";
        text.innerHTML = "<b>[ERROR]</b> All Birds are dead now.";
    }
}

function saveBestBird_pre() {
    if (bestNetwork_pre) {
        localStorage.setItem("saveNetwork", JSON.stringify(bestNetwork_pre));
        text.style.color = "green";
        text.innerHTML = "Successfully saved your <b>Best Bird</b> in previous generation.";
    } else {
        text.style.color = "red";
        text.innerHTML = "<b>[ERROR]</b> You don't have the Best Bird now.";
    }
}

function saveBestBird_glob() {
    if (bestNetwork_glob) {
        localStorage.setItem("saveNetwork", JSON.stringify(bestNetwork_glob));
        text.style.color = "green";
        text.innerHTML = "Successfully saved your <b>Best Bird</b> in all generation.";
    } else {
        text.style.color = "red";
        text.innerHTML = "<b>[ERROR]</b> You don't have the Best Bird now.";
    }
}

function handleSave(e) {
    if (hide) clearTimeout(hide);

    let buttonName = e.path[0].className;

    if (buttonName === "saveCur") {
        saveCurrentBird();
    } else if (buttonName === "saveBest_pre") {
        saveBestBird_pre();
    } else if (buttonName === "saveBest_global") {
        saveBestBird_glob();
    }

    text.style.opacity = 1;
    hide = setTimeout(() => (text.style.opacity = 0), 4000);
}

const saveCur = document.querySelector(".saveCur");
const saveBest_pre = document.querySelector(".saveBest_pre");
const saveBest_glob = document.querySelector(".saveBest_global");
const text = document.querySelector(".saved");
let hide = null;

saveCur.addEventListener("click", handleSave);
saveBest_pre.addEventListener("click", handleSave);
saveBest_glob.addEventListener("click", handleSave);
