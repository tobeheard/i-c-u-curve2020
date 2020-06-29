//load JSON FILES results[array], {object}"Name","about"
// I will  use the Name data for...
// I will use the about data for ...


var data;
var bgCol;
var current = 0;
// var showherName;
var button1, button2, button3, button4;
var slider1, slider2, slider3;




function preload() {
  data = loadJSON('../assets/ElectroAcousticWomen.json'); //load the json file into var data
}

function setup() {

  canvas = createCanvas(600, 400);
  background(0, 255, 100);

  // var herName = random.data.length; //random index generator

  bgCol = color(random(0, 255), random(0, 255), random(0, 255));
  button1 = createButton("Performer");
  button1.position(random(20, 100), random(10, 100));
  button1.mousePressed(showName1);
  button2 = createButton("Composer");
  button2.position(random(100, 200), random(10, 100)); //these are buttons and sliders
  button2.mousePressed(showName2);
  button3 = createButton("Musician"); //DOM elements
  button3.position(random(200, 400), random(10, 100));
  button3.mousePressed(herAbout); //the mousePressed is a callback function
  slider1 = createSlider(1, 255, 100); //this callback event happens only once...
  slider1.position(10, 350); //draw loops over it!

}

// make artist about data show on canvas
function herAbout() {
  for (var i = 0; i < data.results.length; i++) {
    var showherAbout = data.results[i].about;
    textSize(2);
    fill(0);
    text(showherAbout, random(0, 400), random(0, 400));
  }
}

// color change something...
function changebgCol() {
  bgCol = color(random(0, 255), random(0, 255), random(0, 255));
}

// make artist names show on canvas
function showName1() {
  var j =int(random(0,59)); //set j to random integer between 0-59 (array length 60)
  var herName =data.results[j].Name;
  textSize(12);
  fill(0);
  text (herName, random(0, 400), random(0, 400))

  // create sounds...
    sOsc = new p5.SinOsc();
    sOsc.freq(random(100,2000));  //(map(100,1200,random(0,59),random(0,59))));???

    var aLevel = 1.0;
    var rLevel = 0;
    var aTime = 0.01
    var dTime = 0.2;
    var sTime = 20;
    var rTime = 1;
      env = new p5.Env();
    env.setADSR(aTime, dTime, sTime, rTime);
    env.setRange(aLevel, rLevel);
    env.play;
    sOsc.amp(0,0.5);
    sOsc.freq(env);
    sOsc.start();


}
// make artist names show on canvas modulator sound
function showName2() {
  var j =int(random(0,59)); //set j to random integer between 0-59 (array length 60)
  var herName =data.results[j].Name;
  textSize(22);
  fill(0);
  text (herName, random(0, 400), random(0, 400))

  // create sounds...

var osc1; //  heard
var osc2; //  modulator

// var analyzer; // visualize  waveform

// starting at
var osc1Start = map(j,0,59,100,2500);

// min/max ranges for modulator
var modMaxFreq = 112;
var modMinFreq = 0;
var modMaxDepth = 150;
var modMinDepth = -150;

osc1 = new p5.SinOsc();
osc1.amp(0); // set amplitude
osc1.freq(osc1Start); // set frequency
osc1.start(); // start oscillating

// try changing the type to 'square', 'sine' or 'triangle'
osc2 = new p5.SawOsc();
osc2.start();

// add the modulator's output to modulate the carrier's frequency
osc2.disconnect();
osc1.freq( osc2 );

// create an FFT to analyze the audio
analyzer = new p5.FFT();


// map mouseY to modulator freq between a maximum and minimum frequency
for (var i = 0; i < data.results.length; i++) {
  var showherAbout = data.results[i].about;
var modFreq = map(i, 0, 59, modMinFreq, modMaxFreq);
osc2.freq(modFreq);

// change the amplitude of the modulator
// negative amp reverses the sawtooth waveform, and sounds percussive
//
var modDepth = map(i, 0, 59, modMinDepth, modMaxDepth);
osc2.amp(modDepth);
}
// analyze the waveform
// waveform = analyzer.waveform();

// draw the shape of the waveform
// stroke(255);
// strokeWeight(10);
// beginShape();
// for (var i = 0; i < waveform.length; i++){
//   var x = map(i, 0, waveform.length, 0, width);
//   var y = map(waveform[i], -1, 1, -height/2, height/2);
//   vertex(x, y + height/2);
// }
// endShape();

}

function draw() {
  // background(255);
  fill(200);
  ellipse(200, 200, slider1.value(), slider1.value() / 2);
}
