const points = [];
const diameter = 8;

// adds a point on the screen
function pushPoint(X, Y) {
    points.push({ x: X, y: Y });
}

// draws all the points
function drawPoints() {
    fill(211, 223, 242);
    for (let i = 0; i < points.length; i++) {
        // multiply by width/height because it is normalized
        let x = points[i].x * width;
        let y = points[i].y * height;
        circle(points[i].x, points[i].y, diameter);
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
    
}

// changes the canvas size on window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// places dot where mouse clicked
function mouseClicked() {
    // normalize point
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    pushPoint(mouseX, mouseY);
}