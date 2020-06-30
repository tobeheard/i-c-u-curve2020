function Particle(x, y) {
	this.x = x;
	this.y = y;
	this.r = random(4, 12); // map to API location cases

	this.update = function () {
		this.x += random(-10, 10);
		this.y += random(-10, 10);

		this.x = constrain(this.x, 0, width); //so the particle
		this.y = constrain(this.y, 0, height); //does not leave the window
	};

	this.show = function () {
		noStroke();
		// fill(255, 150); //this is the single pixel
		// ellipse(this.x, this.y, 24, 24); // version
		let px = floor(this.x / vScale); //this now gets 
		let py = floor(this.y / vScale); //the x & y color values
		let col = video.get(px, py); //floor gets rid of decimal
		// console.log(col);
		fill(col[0], col[1], col[2], random(0, 255));
		ellipse(this.x, this.y, this.r, this.r); //now the radius is random size
	};
}