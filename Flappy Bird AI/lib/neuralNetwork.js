let relu = (x) => (x >= 0 ? x : 0);
let sigmoid = (x) => 1 / (1 + Math.exp(-x));

// Using Central Limit Theorem
function randomGaussian(avg = 0, dev = 1, reflect = false, loops = 3) {
    let sum = 0;

    if (!reflect) {
        for (let i = 0; i < loops; i++) {
            sum += Math.random() * dev + avg;
        }
    } else {
        for (let i = 0; i < loops; i++) {
            sum += Math.random() * dev * 2 + (avg - dev);
        }
    }

    return sum / loops;
}

class NeuralNetwork {
    constructor(a, hiddenSize, outputSize) {
        if (a instanceof NeuralNetwork || a instanceof Object) {
            this.inputSize = a.inputSize;
            this.hiddenSize = a.hiddenSize;
            this.outputSize = a.outputSize;

            this.W1 = a.W1.copy();
            this.W2 = a.W2.copy();
            this.B1 = a.B1.copy();
            this.B2 = a.B2.copy();
        } else {
            this.inputSize = a;
            this.hiddenSize = hiddenSize;
            this.outputSize = outputSize;

            this.createParameters();
            this.randomizeWeights(-1, 1);
        }
    }

    copy() {
        return new NeuralNetwork(this);
    }

    createParameters() {
        this.W1 = new Matrix(this.inputSize, this.hiddenSize);
        this.B1 = new Matrix(1, this.hiddenSize);
        this.W2 = new Matrix(this.hiddenSize, this.outputSize);
        this.B2 = new Matrix(1, this.outputSize);
    }

    randomizeWeights(from, to) {
        this.W1.randomize(from, to);
        this.W2.randomize(from, to);
    }

    softmax(mat) {
        let sum = 0;
        let max = mat.max();

        for (let i = 0; i < mat.cols; i++) {
            for (let j = 0; j < mat.rows; j++) {
                sum += Math.exp(mat.data[i][j] - max);
            }
        }

        for (let i = 0; i < mat.cols; i++) {
            for (let j = 0; j < mat.rows; j++) {
                mat.data[i][j] = Math.exp(mat.data[i][j] - max) / sum;
            }
        }

        return mat;
    }

    networking(input) {
        // Hidden Layer
        let H = input.mul(this.W1);
        H = H.add(this.B1);
        H = H.map(relu);

        // Output Layer
        let O = H.mul(this.W2);
        // console.log("W cols, rows: ", this.W2.cols, this.W2.rows);
        // console.log("B cols, rows: ", this.B2.cols, this.B2.rows);

        O = O.add(this.B2);
        O = this.softmax(O);

        return O;
    }

    mutate(prob) {
        function mutate(data) {
            if (Math.random() < prob) {
                // + -0.1 ~ 0.1 random value of Gaussian
                return data + randomGaussian(0, 0.1, true);
            } else {
                return data;
            }
        }

        this.W1.map(mutate);
        this.B1.map(mutate);
        this.W2.map(mutate);
        this.B2.map(mutate);
    }
}
