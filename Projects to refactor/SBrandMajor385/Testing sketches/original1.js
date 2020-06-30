// testing out the matter.js
// THIS IS THE ORIGINAL WORKING SKETCH
// worldSketch2.js

// module aliases... these are namespace in javascript that are specific to matter.js
// Render = Matter.Render, for now use the p5js rendering
let Engine = Matter.Engine,

    World = Matter.World,
    Bodies = Matter.Bodies;

    // create an letiable called engine
    // and in setup create this physics Engine
    //inside the engine is a World
    //inside the world is a lot of bodies,
    //these bodies interact with each other with constraints
let engine;
let world;
let gravity;
let boxes = []; //now with an array!! for more
// let box1; //create letiable box, in setup call the bodies function to create rectangle
let beats = [];

function setup() {
createCanvas(600,600);
engine = Engine.create();
world = engine.world;
gravity = engine.world.gravity.scale = 0.0001;
this.SFX = loadSound('Hits128/beat0.wav');

Engine.run(engine); //this starts the physics engine running!

}

function mouseDragged(){
  boxes.push(new Box(mouseX,mouseY,20,20));
  this.SFX.play();
}
function mousePressed(){
  boxes.push(new Box(mouseX,mouseY,20,20));
  this.SFX.play();
}

function draw() {
  background(122);
  for(i=0; i<boxes.length; i++){
    boxes[i].show();
  }

}
