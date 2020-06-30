// testing out the matter.js
// THIS IS THE CHANGING SKETCH...
// now testing the mouse and constraints
// worldSketchMouse.js

// module aliases... these are namespace in javascript that are specific to matter.js
// Render = Matter.Render, for now use the p5js rendering
let Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Constraint = Matter.Constraint,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;


// create an ? called engine
// and in setup create this physics Engine
//inside the engine is a World
//inside the world is a lot of bodies,
//these bodies interact with each other with constraints

let socket;
let engine;
let world;
let gravity;
let circles = []; //now with an array!! for more rocks
let boundaries = []; //walls
let polygons = []; //bats
let polygons2 = []; //sine
let polygons3 = []; //triangle
let polygons4 = []; //square
let mConstraint;


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
  var canvas = createCanvas(windowWidth, windowHeight);
  textFont('Mrotis');

  // socket = io.connect('http://localhost:3000');
  // socket.on('rocks', newDrawing);
  // the above code is yet to be realised...collaboration functionality

  engine = Engine.create();
  world = engine.world;
  gravity = engine.world.gravity.scale = 0.000002; //change gravity to more floating world 0.000002 is floaty!
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  distort = new p5.Distortion();
  // Engine.run(engine); //this starts the physics engine running!
  //BUT update physics engine in draw  to stop frameRate glitches

  // load soundfiles into beats[]
  for (j = 0; j < totalBeats; j++) {
    beatsSound('Hits128/beat' + j + '.wav')
  }

  // when rocks collide with each other
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

  // when rocks collide with walls
  function collisionEffect(event) { //then collision function recieves event argument
    let pairs = event.pairs;
    for (i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA === 'wall' && labelB === 'rocks') {
        // console.log(labelA, labelB);
        let SFX = random(beats);
        SFX.disconnect();
        delay.process(SFX, 0.12, 0.7, 2300);
        SFX.play();
      }
    }
  }
  Events.on(engine, 'collisionStart', collisionEffect); //matter.js collisionStart event to Engine
  // function called collision(a callback!)

  // when sblobs collide with sblobs
  function collisionEffect2(event) { //then collision function recieves event argument
    let pairs = event.pairs;
    for (i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA === 'sblobs' && labelB === 'sblobs') {
        // console.log(labelA, labelB);
        let env = new p5.Envelope();
        env.setADSR(0.001, 0.3, 1, 0.9);
        env.setRange(1.0, 0)
        let sblobSound = new p5.SinOsc(random(150, 1200));

        sblobSound.start();
        sblobSound.amp(env);
        env.play();
        // sblobSound.disconnect();
        // distort.process(0.25,'none');
        // distort.play();
      }
    }
  }
  Events.on(engine, 'collisionStart', collisionEffect2); //matter.js collisionStart event to Engine
  // function called collision(a callback!)

  // when tblobs collide with tblobs
  function collisionEffect3(event) { //then collision function recieves event argument
    let pairs = event.pairs;
    for (i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA === 'tblobs' && labelB === 'tblobs') {
        // console.log(labelA, labelB);
        let env = new p5.Envelope();
        env.setADSR(0.001, 0.3, 0.8, 0.5);
        env.setRange(1.0, 0)
        let tblobSound = new p5.TriOsc(random(150, 1200));

        tblobSound.start();
        tblobSound.amp(env);
        env.play();
      }
    }
  }
  Events.on(engine, 'collisionStart', collisionEffect3); //matter.js collisionStart event to Engine
  // function called collision(a callback!)

  // when tblobs collide with sqblobs
  function collisionEffect4(event) { //then collision function recieves event argument
    let pairs = event.pairs;
    for (i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;
      if (labelA === 'sqblobs' && labelB === 'sqblobs') {
        // console.log(labelA, labelB);
        let env = new p5.Envelope();
        env.setADSR(0.001, 0.3, 1, 0.9);
        env.setRange(1.0, 0)
        let tblobSound = new p5.SqrOsc(random(150, 1200));
        tblobSound.start();
        tblobSound.amp(env);
        env.play();
      }
    }
  }
  Events.on(engine, 'collisionStart', collisionEffect4); //matter.js collisionStart event to Engine
  // function called collision(a callback!)

  // create Bats
  let b1 = new Bats(200, 100, 4, 20);
  polygons.push(b1);
  let b2 = new Bats(250, 100, 4, 16);
  polygons.push(b2);

  let options2 = {
    bodyA: b1.body,
    bodyB: b2.body,
    length: 70,
    stiffness: 0.4
  }
  let constraint = Constraint.create(options2);
  World.add(world, constraint);

  // create static boundaries
  boundaries.push(new Boundary(170, 75, 150, 20, 0.3));
  boundaries.push(new Boundary(250, 300, 200, 20, -0.3));
  boundaries.push(new Boundary(350, 150, 100, 20, -0.6));
  boundaries.push(new Boundary(20, 200, 200, 20, 1.55));
  boundaries.push(new Boundary(width / 2, height, width, 10, 0));

  //MouseConstraints
  let canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  let options = {
    mouse: canvasmouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}




function keyTyped() { //to add Rocks
  if (key === 'b') {
    circles.push(new Rocks(mouseX, mouseY, random(5, 20)));
  } else //to add sblob
    if (key === 's') {
      polygons2.push(new Sblobs(mouseX, mouseY, 7, random(5, 20)));
      let env = new p5.Envelope();
      env.setADSR(0.001, 0.3, 0.2, 0.5);
      env.setRange(1.0, 0)
      let sblobSound = new p5.SinOsc(random(150, 1200));
      sblobSound.start();
      sblobSound.amp(env);
      env.play();
    }
  else //to add tblob
    if (key === 't') {
      polygons3.push(new Tblobs(mouseX, mouseY, 3, random(5, 20)));
      let env = new p5.Envelope();
      env.setADSR(0.001, 0.3, 0.2, 0.5);
      env.setRange(1.0, 0)
      let tblobSound = new p5.TriOsc(random(150, 1200));
      tblobSound.start();
      tblobSound.amp(env);
      env.play();
    }
  else //to add sqblob
    if (key === 'q') {
      polygons4.push(new Sqblobs(mouseX, mouseY, 4, random(5, 20)));
      let env = new p5.Envelope();
      env.setADSR(0.001, 0.3, 0.2, 0.5);
      env.setRange(1.0, 0)
      let sqblobSound = new p5.SqrOsc(random(150, 1200));
      sqblobSound.start();
      sqblobSound.amp(env);
      env.play();
    }
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
      console.log('dead fish beat!');
    }
  }
  for (i = 0; i < boundaries.length; i++) {
    boundaries[i].show();

  }
  for (i = 0; i < polygons.length; i++) {
    polygons[i].show();
  }
  for (i = 0; i < polygons2.length; i++) {
    polygons2[i].show();
    if (polygons2[i].isDead()) {
      polygons2[i].removeFromWorld();
      polygons2.splice(i, 1); //remove from array when off screen
      i--;
      console.log('dead fish sine!');
    }
  }
  for (i = 0; i < polygons3.length; i++) {
    polygons3[i].show();
    if (polygons3[i].isDead()) {
      polygons3[i].removeFromWorld();
      polygons3.splice(i, 1); //remove from array when off screen
      i--;
      console.log('dead fish triangle!');
    }
  }
  for (i = 0; i < polygons4.length; i++) {
    polygons4[i].show();
    if (polygons4[i].isDead()) {
      polygons4[i].removeFromWorld();
      polygons4.splice(i, 1); //remove from array when off screen
      i--;
      console.log('dead fish square!');
    }
  }
  fill(0);
  textSize(10);
  text('type keys', width - 210, 25);
  text('q square.', width - 110, 25);
  text('b beat.', width - 110, 45);
  text('t triangle.', width - 110, 65);
  text('s sine.', width - 110, 85);
  text('drag them!', 25, height - 25);
  text('try collisions!', width - 200, height - 25);
  textSize(12);
  text('SoundCanvas - play!', 10, 25);
}