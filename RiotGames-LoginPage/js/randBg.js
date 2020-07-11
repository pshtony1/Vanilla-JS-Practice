function setRandonNum() {
    let rand = null;
    if (!localStorage.getItem("backNum")) {
        rand = Math.floor(Math.random() * high_bgs.length);
    } else {
        while (1) {
            rand = Math.floor(Math.random() * high_bgs.length);

            if (parseInt(localStorage.getItem("backNum")) != rand) break;
        }
    }

    localStorage.setItem("backNum", rand);
    return rand;
}

function setBackground() {
    bgImg.src = "images/" + low_bgs[rand];

    img.onload = function () {
        bgImg.src = "images/" + high_bgs[rand];
    };

    img.src = "images/" + high_bgs[rand];
}

const low_bgs = ["low-bg1.jpg", "low-bg2.jpg", "low-bg3.jpg", "low-bg4.jpg"];
const high_bgs = ["high-bg1.jpg", "high-bg2.jpg", "high-bg3.jpg", "high-bg4.jpg"];

let img = new Image();
const bgImg = document.querySelector(".bgImg");
const rand = setRandonNum();

setBackground();
