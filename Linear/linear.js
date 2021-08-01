// data is contained within points[].
function getRandom(max, min) {
    return Math.random() * (max - min) + min;
}

// changes tensorflow scalar to javascript float 
function getScalarValue(tensor) {
    return parseFloat(tensor.dataSync());
}

// takes a value x and predicts its y value using m and b
function predict(x) {
    return tf.tidy(() => {
        return m.mul(x).add(b);
    });
}

const m = tf.variable(tf.scalar(getRandom(-1, 1), dtype=tf.float32));
const b = tf.variable(tf.scalar(getRandom(0, 1), dtype=tf.float32));
let inputs = [];
let trueValues = [];
const learningRate = 0.05;
const optimizer = tf.train.sgd(learningRate);

function loss(predictions, trueValues) {
    return tf.tidy(() => {
        const error = predictions.sub(trueValues).square().mean();
        return error;
    });
}

function train() {
    optimizer.minimize(() => {
        const prediction = predict(tf.tensor1d(inputs));
        let stepLoss = loss(prediction, tf.tensor1d(trueValues));
        return stepLoss;
    });
}

function getData() {
    inputs = [];
    trueValues = [];
    for(let i = 0; i < points.length; i++) {
        inputs.push(points[i].x);
        trueValues.push(points[i].y);
    }
}

function runNetwork() {
    tf.tidy(() => {
        getData();
        train();
        pushFit(getScalarValue(m), getScalarValue(b));
    });
}
