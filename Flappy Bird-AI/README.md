Flappy Bird AI with NeuroEvolution
================================
### Vanilla Javascript Project
<hr/>

### 0. Reference
Coding Train's NeuroEvolution Lecture

https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Yd3975YwxrR0x40XGJ_KGO
<hr/>

### 1. Introduction
![gen2](https://user-images.githubusercontent.com/67461578/87219150-e5216000-c393-11ea-92f0-04122f8795b2.gif)


This is my first AI project using <b>Vanilla Javascript.</b>

In the making process, I need my own <b>Matrix Calculator</b> and <b>NeuralNetwork Model</b>, so I made it from scratch (In 'lib' folder).

You can save trained model, and load saved model.

Also, you can play saved model and battle with it.

<hr/>

### 2. AI Architecture
#
#### 2 - 1. Network
![image](https://user-images.githubusercontent.com/67461578/87219532-fb7ceb00-c396-11ea-9254-eeeed89a7e59.png)

I designed my AI model has 3 layers.  
I give <b>5 input nodes</b>, <b>8 hidden nodes</b>, and <b>2 output nodes</b>.

Input datas are as follows.  
<b>`1. Current velocity of Bird.`</b>  
<b>`2. Current Y position of Bird.`</b>  
<b>`3. Distance between bird and the closest Pipe in front of Bird.`</b>  
<b>`4. Y position of the closest top Pipe in front of Bird.`</b>  
<b>`5. Y position of the closest bottom Pipe in front of Bird.`</b>

And I <b>normalized</b> all this datas.

```
inputData.data[0][0] = this.velocity / Math.abs(this.upForce);
inputData.data[0][1] = this.y / canvas.height;
inputData.data[0][2] = closetDist / canvas.width;
inputData.data[0][3] = closetPipe.top / canvas.height;
inputData.data[0][4] = closetPipe.bottom / canvas.height;
```

I used <b>*`Relu function`*</b> into activation function.

Also, I used <b>*`SoftMax function`*</b> in output layer instead of <b>*`Relu function`*</b>.

| ![image](https://user-images.githubusercontent.com/67461578/87220108-3b929c80-c39c-11ea-8bfb-e85db3c73707.png) |
| :--: |
| *Softmax function to prevent overflow* |

```
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
```


If the <b>first output value</b> is bigger than <b>second output value</b>,  
the Bird gets to <b>Jump</b>.  
```
if (result.data[0][0] > result.data[0][1]) {
  this.think_jump();
}
```

#
#### 2 - 2. Next Generation
If Brids all dead, calculate fitness using its score.  

<b>*Score*</b> is <b>how many frames</b> that each bird is alive.  
<b>*Fitness*</b> is the <b>ratio of each score</b> about average of all Birds' score.

```
function calculateFitness() {
    let sum = 0;
    for (let bird of deadBirds) {
        sum += bird.score;
    }

    for (let bird of deadBirds) {
        bird.fitness = bird.score / sum;
    }
}
```

This calculated fitness is the probability of being selected as a parent.
