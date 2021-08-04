const points = [];
const fit = { x1: 0, y1: 0, x2: 1, y2: 0 };
let curveP = [];
const pointDiameter = 8;
const introLocation = {x: 0.4, y: 0.5};
const introSize = 33;

// adds a point on the screen
function pushPoint(X, Y) {
    points.push({ x: X, y: Y });
}

// draws all the points
function drawPoints() {
    strokeWeight(0);
    fill(211, 223, 242);
    for (let i = 0; i < points.length; i++) {
        // multiply by width/height because it is normalized
        let x = points[i].x * width;
        let y = points[i].y * height;
        circle(x, y, pointDiameter);
    }
}

function setup() {
    // Create the canvas to fill the whole screen
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background(27, 31, 38);
    // pushCurve(1, 2, -1, 0);
}

// draws everything
function draw() {
    background(27, 31, 38);
    drawPoints();
    if(points.length > 0) {
        runNetwork();
        drawCurve();
    } else {
        drawIntro();
    }
    
}

function drawIntro() {
    textSize(introSize);
    let x = introLocation.x * width;
    let y = introLocation.y * height;
    fill(235, 161, 52);
    text("Click anywhere to start.", x, y);

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

function pushCurve(a, b, c) {
    let xs = [];
    let ys = [];
    curveP = [];
    for(let x = 0; x < 1; x+=0.025) {
        xs.push(x);
        ys.push((a * Math.pow(x, 2)) + (b * x) + c);
    }

    for(let i = 0; i < xs.length; i++) {
        curveP.push({x: xs[i], y: ys[i]});
    }

}

function drawCurve() {
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(3);

    for(let i = 0; i < curveP.length; i++) {
        vertex(curveP[i].x * width, curveP[i].y * height);
    }

    endShape();
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