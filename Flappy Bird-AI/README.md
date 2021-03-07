Flappy Bird AI with NeuroEvolution
================================
### Vanilla Javascript Project
<hr/>

### 1. Introduction
[Project Link](https://pshtony1.github.io/Vanilla-Javascript/Flappy%20Bird-AI)

![gen2](https://user-images.githubusercontent.com/67461578/87219150-e5216000-c393-11ea-92f0-04122f8795b2.gif)

This is my first AI project using <b>Vanilla Javascript.</b>

In the making process, I need my own <b>Matrix Calculator</b> and <b>NeuralNetwork Model</b>, so I made it from scratch (In 'lib' folder).

You can save trained model, and load saved model.

Also, you can play saved model and battle with it.

This model saved into `local storage`. So the data is saved even if you turn off the browser.

<hr/>

### 2. AI Architecture
#
#### 2 - 1. Neural Network Model
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
function softmax(matrix) {
  let sum = 0;
  let max = matrix.max();

  for (let i = 0; i < matrix.cols; i++) {
    for (let j = 0; j < matrix.rows; j++) {
      sum += Math.exp(matrix.data[i][j] - max);
    }
  }

  for (let i = 0; i < matrix.cols; i++) {
    for (let j = 0; j < matrix.rows; j++) {
      matrix.data[i][j] = Math.exp(matrix.data[i][j] - max) / sum;
    }
  }

  return matrix;
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

Then, <b>make a child</b> using parent's network.  
And <b>mutate</b> all the parameters of child's network(`Weights`, `Biases`)

```
function getChild() {
    let std = Math.random();
    let sum = 0;
    let parent = null;

    for (let i = 0; i < deadBirds.length; i++) {
        sum += deadBirds[i].fitness;
        if (sum > std) {
            parent = deadBirds[i];
            break;
        }
    }

    let child = new Bird(parent.brain);
    child.brain.mutate(0.1);  // change parameter with 10% probability

    return child;
}
```
```
mutate(prob) {
  function mutate(data) {
    if (Math.random() < prob) {
    // + -0.1 ~ 0.1 random value of Gaussian
    return data + randomGaussian(0, 0.1, true);
    } else {
    return data;
  }
}

  // Apply the mutate function to all data
  this.W1.map(mutate);
  this.B1.map(mutate);
  this.W2.map(mutate);
  this.B2.map(mutate);
}
```

#### + Gaussian Random Function
Javascript does not support *`Gaussian Random Function`*.  
So I made it the function using <b>`Central Limit Theorem`</b>.  

<b>`Central Limit Theorem`</b>: https://en.wikipedia.org/wiki/Central_limit_theorem

```
function randomGaussian(avg = 0, dev = 1, loops = 3) {
    let sum = 0;
    for (let i = 0; i < loops; i++) {
        sum += Math.random() * dev + avg;
    }

    return sum / loops;
}
```

| ![1loop1](https://user-images.githubusercontent.com/67461578/87220978-8c59c380-c3a3-11ea-995e-51e865ea87f2.png) | ![1loop2](https://user-images.githubusercontent.com/67461578/87220988-a5fb0b00-c3a3-11ea-8f46-01079c693283.png) | ![1loop3](https://user-images.githubusercontent.com/67461578/87221002-b3b09080-c3a3-11ea-8683-f9422c51016f.png) | ![1loop4](https://user-images.githubusercontent.com/67461578/87221004-b4492700-c3a3-11ea-9be8-36e0b15c07f8.png) |
| :--: | :--: | :--: | :--: |
| *loops = 1* | *loops = 2* | *loops = 3* | *loops = 4* |

And I made some changes based on this code to have negative range.

```
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
```
<hr/>

### 3. Training & Load & Battle
#### 3 - 1. Training from Scratch
##### In first generation
![train1](https://user-images.githubusercontent.com/67461578/87221564-e8264b80-c3a7-11ea-8fa3-39f083eed179.gif)

#
##### After 60 Generations
![train2](https://user-images.githubusercontent.com/67461578/87221794-c4640500-c3a9-11ea-8310-c9e893548ed6.gif)

#
##### After 72 Generations
![trainnn](https://user-images.githubusercontent.com/67461578/87225488-5e3aaa80-c3c8-11ea-8a72-4e9e6fd1256a.gif)

#
##### Save Parameters of Current Model in Local Storage
![save](https://user-images.githubusercontent.com/67461578/87221894-8b786000-c3aa-11ea-88ce-44c7faf03220.gif)

#
#### 3 - 2. Load saved Parameters
##### Load to Play saved Bird
![playsave](https://user-images.githubusercontent.com/67461578/87225582-2da74080-c3c9-11ea-8a89-f6dedfab8041.gif)

#
##### Load to Train saved Bird
![trainsave](https://user-images.githubusercontent.com/67461578/87225650-a0182080-c3c9-11ea-8952-71f6546269e7.gif)

#
#### 3 - 3. Battle with saved Bird
![Honeycam 2020-07-11 23-00-44](https://user-images.githubusercontent.com/67461578/87225804-74e20100-c3ca-11ea-80bf-1ec24444054e.gif)

Jump Key: `Up Arrow` (Default)
