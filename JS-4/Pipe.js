class Pipe {
    x = canvas.width;
    w = 60;
    top = Math.random() * (canvas.height - 220) + 50;
    gap = 120;
    bottom = this.top + this.gap;
    speed = 5;
    highlight = "red";

    draw() {
        // UP PIPE
        ctx.fillStyle = "#00CC00";
        ctx.beginPath();
        ctx.rect(this.x, 0, this.w, this.top);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "#00FF00";
        ctx.beginPath();
        ctx.rect(this.x - 10, this.top - 40, this.w + 20, 40);
        ctx.fill();
        ctx.closePath();

        // DOWN PIPE
        ctx.fillStyle = "#00CC00";
        const downH = this.top + this.gap;
        ctx.beginPath();
        ctx.rect(this.x, downH, this.w, canvas.height - downH);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "#00FF00";
        ctx.beginPath();
        ctx.rect(this.x - 10, downH, this.w + 20, 40);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.move();
        if (this.outScreen()) deletePipe();
    }

    move() {
        this.x -= this.speed;
    }

    outScreen() {
        if (this.x + this.w < 0) {
            return true;
        }

        return false;
    }

    hitBird(bird) {
        if (bird.y > this.bottom || bird.y < this.top) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }

        return false;
    }
}
