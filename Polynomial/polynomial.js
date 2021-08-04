const a = tf.variable(tf.scalar(getRandom(-1, 1), dtype=tf.float32));
const b = tf.variable(tf.scalar(getRandom(-1, 1), dtype=tf.float32));
const c = tf.variable(tf.scalar(getRandom(-1, 1), dtype=tf.float32));
let inputs = [];
let trueValues = [];
const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);

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
        return x.square().mul(a).add(x.mul(b)).add(c);
    });
}


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
        pushCurve(getScalarValue(a), getScalarValue(b), getScalarValue(c));
        a.print();
    });
}
