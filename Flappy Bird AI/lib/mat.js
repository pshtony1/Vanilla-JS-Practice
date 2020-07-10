class Matrix {
    constructor(obj_or_cols, rows) {
        if (obj_or_cols instanceof Object) {
            this.cols = obj_or_cols.cols;
            this.rows = obj_or_cols.rows;
            this.data = Array(this.cols)
                .fill()
                .map(() => Array(this.rows).fill(0));

            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    this.data[i][j] = obj_or_cols.data[i][j];
                }
            }
        } else {
            this.cols = obj_or_cols;
            this.rows = rows;
            this.data = Array(this.cols)
                .fill()
                .map(() => Array(this.rows).fill(0));
        }
    }

    copy() {
        let _ = new Matrix(this.cols, this.rows);

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                _.data[i][j] = this.data[i][j];
            }
        }

        return _;
    }

    randomize(from, to) {
        const dist = Math.abs(to - from);

        if (isNaN(dist)) console.log("please Write your randomize range !");
        else return this.map((e) => Math.random() * dist + from);
    }

    add(mat) {
        if (mat instanceof Matrix) {
            // if matrix sizes are same
            if (this.cols == mat.cols && this.rows == mat.rows) {
                return this.map((e, i, j) => e + mat.data[i][j]);
            } else {
                console.log("cols and rows not matched for adding: matrix.js");
                return;
            }
        } else {
            return this.map((e) => e + mat);
        }
    }

    mul(mat) {
        if (mat instanceof Matrix) {
            if (this.rows == mat.cols) {
                let newMat = new Matrix(this.cols, mat.rows);

                for (let i = 0; i < this.cols; i++) {
                    for (let j = 0; j < mat.rows; j++) {
                        let sum = 0;
                        for (let l = 0; l < mat.cols; l++) {
                            sum += this.data[i][l] * mat.data[l][j];
                        }
                        newMat.data[i][j] = sum;
                    }
                }

                return newMat;
            } else {
                console.log("cols and rows not matched for multyplying: matrix.js");
                return;
            }
        } else {
            return this.map((e) => e * mat);
        }
    }

    map(func) {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let from = this.data[i][j];
                this.data[i][j] = func(from, i, j);
            }
        }
        return this;
    }

    print() {
        console.table(this.data);
    }

    max() {
        let _ = [];

        for (let i = 0; i < this.cols; i++) {
            _.push(Math.max(...this.data[i]));
        }

        return Math.max(..._);
    }

    min() {
        let _ = [];

        for (let i = 0; i < this.cols; i++) {
            _.push(Math.min(...this.data[i]));
        }

        return Math.min(..._);
    }
}
