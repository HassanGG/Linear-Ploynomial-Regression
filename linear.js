tf.scalar(3.14).print();

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    background(255, 0, 200);


}

function draw() {
    background(220);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}