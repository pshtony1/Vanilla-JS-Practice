const inputs = document.querySelectorAll(".textb input");
const btn = document.querySelector(".btn");
const showPW = document.querySelector(".show-password");
const saying = document.querySelector("h3");

function checkValue() {
    if (inputs[0].value !== "" && inputs[1].value !== "") {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function changeShowPW() {
    if (this.classList[2] == "fa-eye-slash") {
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");

        const fa_eye = document.querySelector(".fa-eye");
        fa_eye.style.color = "#bc252a";
        inputs[1].type = "text";
    } else {
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");

        const fa_eye_slash = document.querySelector(".fa-eye-slash");
        fa_eye_slash.style.color = "#9d9d9d";
        inputs[1].type = "password";
    }
}

function changeSaying(elem) {
    const curTime = new Date();

    if (curTime.getHours() >= 5 && curTime.getHours() <= 9) elem.innerText = "Good Morning!";
    else if (curTime.getHours() >= 10 && curTime.getHours() <= 11) elem.innerText = "Have a nice Day!";
    else if (curTime.getHours() >= 12 && curTime.getHours() <= 17) elem.innerText = "Good AfterNoon!";
    else if (curTime.getHours() >= 18 && curTime.getHours() <= 20) elem.innerText = "Good Evening!\nDid you have a nice Day?";
    else elem.innerText = "Good Night!";

    // let time = 24;
    // if (time >= 5 && time <= 9) elem.innerText = "Good Morning!";
    // else if (time >= 10 && time <= 11) elem.innerText = "Have a nice Day!";
    // else if (time >= 12 && time <= 17) elem.innerText = "Good AfterNoon!";
    // else if (time >= 18 && time <= 20) elem.innerText = "Good Evening!\nDid you have a nice Day?";
    // else elem.innerText = "Good Night!";
}

inputs[0].addEventListener("keyup", checkValue);
inputs[1].addEventListener("keyup", checkValue);

showPW.addEventListener("click", changeShowPW);
changeSaying(saying);
