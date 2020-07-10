// Vanilla JS
const bgColor = document.querySelectorAll(".color");
const button = document.querySelector("button");
const copied = document.querySelector(".copied");

let level = 0; // = opacity
let inTimer = null;
let fadefade = null;
let outTimer = null;

function fadeIn(element) {
    element.style.display = "block";

    // Initalize
    clearInterval(inTimer);
    clearTimeout(fadefade);
    clearInterval(outTimer);
    inTimer = null;
    fadefade = null;
    outTimer = null;

    level = 0;

    inTimer = setInterval(function () {
        level = fadeInAction(element);
    }, 1);
}

function fadeInAction(element) {
    level += 0.01;
    if (level > 0.7) {
        clearInterval(inTimer);
        inTimer = null;

        fadefade = setTimeout(fadeOut, 2000, element);
        level = 0.7;
    }

    changeOpacity(element);

    return level;
}

function fadeOut(element) {
    fadefade = null;
    outTimer = setInterval(function () {
        level = fadeOutAction(element);
    }, 1);
}

function fadeOutAction(element) {
    level -= 0.01;
    if (level < 0) {
        clearInterval(outTimer);
        outTimer = null;
        level = 0;
    }

    changeOpacity(element);

    return level;
}

function changeOpacity(element) {
    element.style.opacity = level;
}

function handleCopy(e) {
    const copyElement = e.path[0].children[0];
    const tmp = document.createElement("input");

    document.body.appendChild(tmp);
    tmp.value = copyElement.innerText;
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);

    fadeIn(copied);
}

function handleRefresh() {
    init();
}

function setRandColor() {
    let color = Math.floor(Math.random() * 256).toString(16);

    if (parseInt(color, 16) < 16) {
        color = "0" + color;
    }

    return color.toUpperCase();
}

function applyColor(hexColor, element) {
    const colorText = element.children[0];

    element.style.backgroundColor = hexColor;
    colorText.innerText = hexColor;
}

function createHex(element) {
    let hexColor = "#";

    for (let i = 0; i < 3; i++) {
        hexColor += setRandColor();
    }

    applyColor(hexColor, element);
}

function init() {
    bgColor.forEach((colorString) => createHex(colorString));
}

init();
button.addEventListener("click", handleRefresh);
for (let i = 0; i < bgColor.length; i++) {
    bgColor[i].addEventListener("click", handleCopy);
}

// JQuery
// // set random color when refresh.
// $(".refresh")
//     .click(function () {
//         $(".color").each(function () {
//             let color = ("#" + Math.random().toString(16).substr(2, 6)).toUpperCase();
//             $(this).css("background-color", color);
//             $(this).children(".color-hex").text(color);
//         });
//     })
//     .trigger("click");

// // copy hex color to clipboard.
// $(".color").click(function () {
//     let input = $("<input>");
//     let color = $(this).children(".color-hex").text();

//     $("body").append(input);
//     input.val(color).select(); // select color text.
//     document.execCommand("copy"); // copy selected color text.
//     input.remove();

//     $(".copied").fadeIn().delay(2000).fadeOut();
// });

function sdsdsd() {}
