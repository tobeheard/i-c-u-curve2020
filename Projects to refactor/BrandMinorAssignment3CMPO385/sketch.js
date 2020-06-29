// json minor 3 part II
// extending functionality
//load JSON FILES results[array], {object}"Name","about"
// I will  use the Name data for... set to ellipse object
// I will use the about data for ... set to ellipse object

// copy constructor class code from minor2

let bubbles = []; //empty array of bubbles


var data;
var bgCol;
var current = 0;
// var showherName;
var button1, button2, button3, button4;
var slider1, slider2, slider3;



function preload() {
  data = loadJSON('assets/ElectroAcousticWomen.json'); //load the json file into var data
}

function setup() {

  canvas = createCanvas(600, 400); //testsize

  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    bubbles[i] = new Bubble(x, y, r);
  }

  button1 = createButton("Performer");
  button1.position(random(20, 100), random(10, 100));
  button1.mousePressed(showName1);
  button2 = createButton("Composer");
  button2.position(random(100, 200), random(10, 100)); //these are buttons and sliders
  button2.mousePressed(showName2);
  button3 = createButton("Musician"); //DOM elements
  button3.position(random(200, 400), random(10, 100));
  button3.mousePressed(herAbout); //the mousePressed is a callback function
  slider1 = createSlider(100, 255, 170); //this callback event happens only once, but use slider callback event
  slider1.position(100, 350); //draw loops over it!
  slider1.input(changebgCol);

}

// make artist about data show on canvas
function herAbout() { //"Musician"
  for (var k = 0; k < data.results.length; k++) {
    var showherAbout = data.results[k].about;
    textSize(12);
    fill(255);
    text(showherAbout, random(0, 400), random(0, 400));

  }
}

// make artist names show on canvas
function showName1() { //"Performer"
  var j = int(random(0, 59)); //set j to random integer between 0-59 (array length 60)
  var herName = data.results[j].Name;
  textSize(12);
  fill(255);
  text(herName, random(0, 400), random(0, 400))

  // create sounds...sinewave
  sOsc = new p5.SinOsc();
  sOsc.freq(random(100, 2000));
  var aLevel = 1.0;
  var rLevel = 0;
  var aTime = 0.01
  var dTime = 0.2;
  var sTime = 20;
  var rTime = 1;
  env = new p5.Envelope();
  env.setADSR(aTime, dTime, sTime, rTime);
  env.setRange(aLevel, rLevel);
  env.play;
  sOsc.amp(0, 0.5);
  sOsc.freq(env);
  sOsc.start();
}
// make artist names show on canvas
function showName2() { //"Composer"
  var j = int(random(0, 59)); //set j to random integer between 0-59 (array length 60)
  var herName = data.results[j].Name;
  textSize(22);
  fill(255);
  text(herName, random(0, 400), random(0, 400))

  // createSounds saw wave
  saOsc = new p5.SawOsc();
  saOsc.freq(random(100, 1000));
  var aLevel = 0.5;
  var rLevel = 0;
  var aTime = 0.9
  var dTime = 0.2;
  var sTime = 1;
  var rTime = 0.00001;
  env = new p5.Envelope();
  env.setADSR(aTime, dTime, sTime, rTime);
  env.setRange(aLevel, rLevel);
  env.play;
  saOsc.amp(0, 0.3);
  saOsc.freq(env);
  saOsc.start();
}
// color change something...
function changebgCol() {
  background(0, slider1.value(), random(0, 15));
}

function draw() {
  // background(155); sort out the canvas colour!!!
  for (let b of bubbles) {
    b.move();
    b.show();
    b.edge();
    let overlapping = false;
    for (let other of bubbles) {
      if (b !== other && b.intersects(other)) {
        overlapping = true;
      }
    }
    if (overlapping) {
      b.changeColor(255);
    } else {
      b.changeColor(0);
    }
  }
}

class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
    this.xspeed = random(0, 4);
    this.yspeed = random(0, -0.6);
    this.hum = new p5.SinOsc(220);
    this.hum.amp(0.01);
    this.hum.start();
  }


intersects(other) {
  let d = dist(this.x, this.y, other.x, other.y);
  return (d < this.r + other.r);
  // if (d < this.r + other.r) {
  //   return true;
  // } else {
  //   return false;
  // }
}
changeColor(bright) {
  this.brightness = bright;
}

move() {
  this.x = this.x + this.xspeed; //random(-5,5);   //define the move functionallity
  this.y = this.y - random(-5, 5); //this.yspeed; //
}

show() { //define the show functionallity
  stroke(0);
  strokeWeight(2);
  fill(this.brightness, 125);
  // fill(random(0,155), random(0,155), 155);
  ellipse(this.x, this.y, this.r * 2);
}

edge() {
  if (this.x > 600 || this.x < 0) {
    this.xspeed = -this.xspeed;
    this.hum.freq(random(120, 880)); //changes tone when hits edge
  }
  if (this.y > 400 || this.y < 0) {
    this.yspeed = -this.yspeed;
    this.hum.freq(random(120, 220)); //changes tone when hits edge
  }
}
}
