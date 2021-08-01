const points = [];
const fit = { x1: 0, y1: 0, x2: 1, y2: 0 };
const diameter = 8;

// adds a point on the screen
function pushPoint(X, Y) {
    points.push({ x: X, y: Y });
    console.log(tf.memory());
}

// draws all the points
function drawPoints() {
    strokeWeight(0);
    fill(211, 223, 242);
    for (let i = 0; i < points.length; i++) {
        // multiply by width/height because it is normalized
        let x = points[i].x * width;
        let y = points[i].y * height;
        circle(x, y, diameter);
    }
}

function setup() {
    // Create the canvas to fill the whole screen
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background(27, 31, 38);
}

// draws everything
function draw() {
    background(27, 31, 38);
    drawPoints();
    drawFit();
    if(points.length > 0) {
        runNetwork();
    }
}

// changes the canvas size on window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// places dot where mouse clicked
function mouseClicked() {
    // normalize point
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 0, 1);
    pushPoint(x, y);
}

// takes in numbers between 1 and 0 and plots it on canvas
function pushFit(m, b) {
    fit.y1 = (m * fit.x1) + b;
    fit.y2 = (m * fit.x2) + b;
}

function drawFit() {
    stroke(235, 61, 52);
    strokeWeight(3);
    // height - x because y = 0, is at the top instead of bottom.
    let x1 = fit.x1 * width;
    // let y1 = height - (fit.y1 * height);
    let y1 = (fit.y1 * height);
    let x2 = fit.x2 * width;
    let y2 = (fit.y2 * height);
    // let y2 = height - (fit.y2 * height);
    line(x1, y1, x2, y2);
}