const points = [];
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
    stroke(235, 61, 52);
    strokeWeight(3);

    for(let i = 0; i < curveP.length; i++) {
        vertex(curveP[i].x * width, curveP[i].y * height);
    }

    endShape();
}
