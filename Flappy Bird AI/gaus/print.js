function randomGaussian(avg = 0, dev = 1, loops = 3) {
    let sum = 0;
    for (let i = 0; i < loops; i++) {
        sum += Math.random() * dev + avg;
    }

    return sum / loops;
}
const canvas = document.querySelector("form");
const ctx = canvas.getContext("2d");
const _loops = 5000;
save1 = [];
save2 = [];

for (let i = 0; i < _loops; i++) {
    save1.push(randomGaussian());
    save2.push(randomGaussian());
}

save1.sort();
save2.reverse();

let h = canvas.height / save1.length;
for (let i = 0; i < save1.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.rect(canvas.width / 2, i * h, save1[i] * (canvas.width / 2), h);
    ctx.fill();
    ctx.closePath();
}

h = canvas.height / save2.length;
for (let i = 0; i < save2.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.rect(canvas.width / 2, i * h, -save1[i] * (canvas.width / 2), h);
    ctx.fill();
    ctx.closePath();
}
