//This is a very clumsy code... seems I cannot make a few things happen the way
//I thought. Associate the different amplitude to idividual shape.
// click and drag shape around. Along with many other ambitious things!

var soundCirc;
var soundTri;

var button;
var ellipseX;
var backCol = 150;

var playbackrate = 0;
var buttonStateCirc = true;
var buttonStateTri = true;

function preload(){
  soundFormats('wav','mp3','ogg');

  //load our sounds
  soundCirc = loadSound('/assets/roland.mp3');
  soundTri = loadSound('/assets/typebell1.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backCol);


  button = createButton("Circle");
	button.position(width*0.05, 10);
	button.mousePressed(playStopCircle);

  button = createButton("Triangle");
	button.position(width*0.9, 10);
	button.mousePressed(playStopTriangle);

  checkbox = createCheckbox('Loop', false);
  checkbox.position(width/2,30);
  checkbox.changed(loopCheckbox);


  amplitude = new p5.Amplitude();


}

function draw() {


  stroke(0);
  //var r = 0;
  //var b = 255;
  var level = amplitude.getLevel();
  var barWidth = map(level,0,1,0,2000);
  //r = map(mouseY,600,0,0,255); //when mouse is up top red.
  //b = map(mouseY,600,0,255,0); //when mouse is bottom blue.
  //background(r,0,b);
  fill(200,200,200);
  ellipse(width*0.2,height*0.5,barWidth,60);
  triangle(width*0.7,height*0.4,width*0.8+barWidth,height*0.55,width*0.6-barWidth,height*0.55);


}

  function mousePressed(){
    background(150);
  }

function playStopCircle(){
  buttonStateCirc = !buttonStateCirc;

  if(buttonStateCirc == true){
    soundCirc.stop();
  }
  else{
    soundCirc.play();
  }
}
function playStopTriangle(){
  buttonStateTri = !buttonStateTri;

  if(buttonStateTri == true){
    soundTri.stop();
  }
  else{
    soundTri.play();
  }
}
function loopCheckbox() {
  if (this.checked()) {
    soundCirc.setLoop(true) || soundTri.setLoop(true);
  } else {
    soundCirc.setLoop(false) || soundTri.setLoop(false);
  }
}
