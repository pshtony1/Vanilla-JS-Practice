function saveIt(bird, globalBest) {
    bestNetwork_pre = bird.brain;

    if (globalBest) {
        bestNetwork_glob = bird.brain;
    }
}

function getBestBird() {
    let max = -1;
    let bird = null;

    for (let i = 0; i < deadBirds.length; i++) {
        if (max < deadBirds[i].score) {
            max = deadBirds[i].score;
            bird = deadBirds[i];
        }
    }

    return bird;
}

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
    child.brain.mutate(0.1);

    return child;
}

function calculateFitness() {
    let sum = 0;
    for (let bird of deadBirds) {
        sum += bird.score;
    }

    for (let bird of deadBirds) {
        bird.fitness = bird.score / sum;
    }
}

function nextGeneration(globalBest, network = null) {
    if (!network) {
        let parent = getBestBird();
        saveIt(parent, globalBest);
        calculateFitness();

        for (let i = 0; i < birdNum; i++) {
            birds.push(getChild());
        }

        deadBirds = [];
    } else {
        for (let i = 0; i < birdNum; i++) {
            let child = new Bird(network);
            child.brain.mutate(0.1);

            birds.push(child);
        }
    }

    for (let i = 0; i < birds.length; i++) {
        birds[i].randomizeHeight();
        birds[i].randomizeColor();
    }
}
