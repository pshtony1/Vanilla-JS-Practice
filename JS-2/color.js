// Vanilla JS
// const bgColor = document.querySelectorAll(".color");
// const button = document.querySelector("button");

// function refresh() {
//     history.go(0);
// }

// function setRandColor() {
//     let color = Math.floor(Math.random() * 256).toString(16);

//     if (parseInt(color, 16) < 16) {
//         color = "0" + color;
//     }

//     return color.toUpperCase();
// }

// function applyColor(hexColor, element) {
//     const colorText = element.children[0];

//     element.style.backgroundColor = hexColor;
//     colorText.innerText = hexColor;
// }

// function createHex(element) {
//     let hexColor = "#";

//     for (let i = 0; i < 3; i++) {
//         hexColor += setRandColor();
//     }

//     applyColor(hexColor, element);
// }

// function init() {
//     bgColor.forEach((colorString) => createHex(colorString));
// }

// init();

// set random color when refresh.
$(".refresh")
    .click(function () {
        $(".color").each(function () {
            let color = ("#" + Math.random().toString(16).substr(2, 6)).toUpperCase();
            $(this).css("background-color", color);
            $(this).children(".color-hex").text(color);
        });
    })
    .trigger("click");

// copy hex color to clipboard.
$(".color").click(function () {
    let input = $("<input>");
    let color = $(this).children(".color-hex").text();

    $("body").append(input);
    input.val(color).select(); // select color text.
    document.execCommand("copy"); // copy selected color text.
    input.remove();

    $(".copied").fadeIn().delay(2000).fadeOut();
});
