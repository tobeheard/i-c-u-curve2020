// painting with particle pixels
let video;
let vScale = 16;
let particles = []; //empty array to hold particles
let sourceText = "I C U...curve2020";

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(15);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width / vScale, height / vScale);
	video.hide();
	for (let i = 0; i < 50; i++) { //using for loop fill the array
		particles[i] = new Particle(random(width), noise(height));
	}
	background(51);
	fill(255, 255, 255, 75);
	textSize(32);
	textAlign(CENTER, CENTER);

	text(sourceText, width / 2, height / 2);


}

function draw() {
	// background(51);
	video.loadPixels();
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].show();
	}

}