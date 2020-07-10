class Bird {
    x = 100;
    y = canvas.height / 2;
    size = 15;

    velocity = 3;
    gravity = 0.4;
    upForce = -10;

    color = {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    };

    stroke = true;

    score = 0;
    fitness = 0;

    constructor(brain) {
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
        } else if (brain == "player") {
            this.brain = null;
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
            this.brain.W1.randomize(-1, 1);
            this.brain.W2.randomize(-1, 1);
            this.brain.B1.randomize(-1, 1);
            this.brain.B1.randomize(-1, 1);
        }
    }

    draw() {
        // Stroke
        if (this.stroke) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }

        // Body
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.physics();
        this.score++;
        this.outScreen();
        if (this.brain != null) this.thinking();
    }

    randomizeHeight() {
        this.y = Math.random() * (canvas.height - 100) + 50;
    }

    randomizeColor() {
        this.color.r = Math.floor(Math.random() * 255);
        this.color.g = Math.floor(Math.random() * 255);
        this.color.b = Math.floor(Math.random() * 255);
        this.color.a = Math.random() * 0.5 + 0.5;
    }

    physics() {
        this.velocity += this.gravity;
        this.velocity *= 0.98;

        this.y += this.velocity;
    }

    outScreen() {
        if (this.y > canvas.height || this.y < 0) {
            return true;
        }
    }

    think_jump() {
        this.velocity += this.upForce;
    }

    jump(e) {
        if (e.keyCode == 38) {
            if (isBattle) birds[0].velocity += birds[0].upForce;
        }
    }

    getClosetPipe() {
        let closet = null;
        let dist = Infinity;

        for (let i = 0; i < pipes.length; i++) {
            let _ = pipes[i].x + pipes[i].w - this.x;
            if (_ < dist && _ > 0) {
                closet = pipes[i];
                dist = _;
            }
        }

        return [closet, dist];
    }

    thinking() {
        /*
        < input Data >
        1. current velocity of bird
        2. current y pos of bird
        3. distance between bird and the closet Pipe (in front of Bird)
        4. y pos of the closet top Pipe (in front of Bird)
        5. y pos of the closet bottom Pipe (in front of Bird)
        
        ++ normalize all this datas
        */
        let inputData = new Matrix(1, 5);
        let [closetPipe, closetDist] = this.getClosetPipe();

        inputData.data[0][0] = this.velocity / Math.abs(this.upForce);
        inputData.data[0][1] = this.y / canvas.height;
        inputData.data[0][2] = closetDist / canvas.width;
        inputData.data[0][3] = closetPipe.top / canvas.height;
        inputData.data[0][4] = closetPipe.bottom / canvas.height;

        let result = this.brain.networking(inputData);

        if (result.data[0][0] > result.data[0][1]) {
            this.think_jump();
        }
    }
}
