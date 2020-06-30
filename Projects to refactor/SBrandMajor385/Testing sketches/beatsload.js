// beatsload.js - load beats into box1...??
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
  // load soundfiles into beats[]
  for (j = 0; j < totalBeats; j++) {
    beatsSound('assets/Hits128/beat' + j + '.wav')
  }
}

  function draw() {
  // background(122);
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
}
