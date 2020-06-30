// testing out the matter.js
// THIS IS WORKING THURSDAY NIGHT!!
// THIS IS THE CHANGING SKETCH...
// worldSketch.js

// module aliases... these are namespace in javascript that are specific to matter.js
// Render = Matter.Render, for now use the p5js rendering
let Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events;
Bodies = Matter.Bodies;


// create an ? called engine
// and in setup create this physics Engine
//inside the engine is a World
//inside the world is a lot of bodies,
//these bodies interact with each other with constraints

let engine;
let world;
let gravity;
let circles = []; //now with an array!! for more
let boundaries = [];

// Loading soundfiles into an array
let beats = []; //array to hold differen beats
let totalBeats = 58; //number of files in beats folder
let loading = true;
let counter = 0;
//NOT USING PRELOAD... instead...create a function to call in setup.
// use a callback for when the function is finished.
// beatsSound wrapper function that loads the sounds(filename loop through) then push and counter create closure.
function beatsSound(filename) {
  loadSound(filename, soundLoaded);

  function soundLoaded(sound) {
    console.log(filename);
    beats.push(sound);
    counter++;
    if (counter === totalBeats) {
      loading = false;
    }
  }
}


function setup() {
  createCanvas(400, 400);

  engine = Engine.create();
  world = engine.world;
  gravity = engine.world.gravity.scale = 0.001;
  // Engine.run(engine); //this starts the physics engine running!
  //BUT update physics engine in draw  to stop frameRate glitches
  reverb = new p5.Reverb();
  delay = new p5.Delay();


  function collisionBeat(event) { //then collision function recieves event argument
    let pairs = event.pairs;
    for (i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA === 'rocks' && labelB === 'rocks') {
        // console.log(labelA, labelB);
        let SFX = random(beats); //SO THIS WORKS FOR NOW! SOUNDS MESSY
        SFX.setVolume(0.5);
        SFX.play();


      }
    }
  }
  Events.on(engine, 'collisionStart', collisionBeat); //matter.js collisionStart event to Engine
  // function called collision(a callback!)

  function collisionEffect(event) { //then collision function recieves event argument
    let pairs = event.pairs;
    for (i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA === 'wall' && labelB === 'rocks') {
        // console.log(labelA, labelB);
        let SFX = random(beats);
        SFX.disconnect();
        delay.process(SFX,0.12,0.7,2300);
        SFX.play();

      }
    }
  }

        Events.on(engine, 'collisionStart', collisionEffect); //matter.js collisionStart event to Engine
        // function called collision(a callback!)
        // create static boundaries
        boundaries.push(new Boundary(170, 75, 150, 20, 0.3));
        boundaries.push(new Boundary(250, 300, 200, 20, -0.3));
        boundaries.push(new Boundary(350, 150, 100, 20, -0.6));
        boundaries.push(new Boundary(20, 200, 200, 20, 1.55));

        // load soundfiles into beats[]
        for (j = 0; j < totalBeats; j++) {
          beatsSound('Hits128/beat' + j + '.wav')
        }
      }

      function mouseDragged() {
        circles.push(new Rocks(mouseX, mouseY, random(5, 20)));
      }

      function mousePressed() {
        circles.push(new Rocks(mouseX, mouseY, random(5, 20)));
        //play the sound effect when click
        // let SFX = random(beats);
        // SFX.setVolume(0.5);
        // SFX.play();
      }

      function draw() {
        background(122);
        Engine.update(engine); //update physics engine here to stop frameRate glitches
        // this is the loading animation
        if (loading) {
          //animation progess bar while loading
          stroke(255);
          noFill();
          rect(10, 10, 200, 20); //progress box
          noStroke();
          fill(255, 0, 0, 100);
          let w = 200 * counter / totalBeats;
          rect(11, 12, w, 18); // moving progress bar
        } else {
          background(0, 155, 255);
        }
        for (i = 0; i < circles.length; i++) {
          circles[i].show();
          if (circles[i].isDead()) {
            circles[i].removeFromWorld();
            circles.splice(i, 1); //remove from array when off screen
            i--;
          }
        }
        for (var i = 0; i < boundaries.length; i++) {
          boundaries[i].show();
        }
      }
