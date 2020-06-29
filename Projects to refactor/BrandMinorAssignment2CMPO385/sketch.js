 //create the "idea" Object called bubble
 //try and catch the bubble...what happens??
 
let bubbles =[];

function preload(){
  sound1 = loadSound('gotMe.mp3');
}

function setup(){
  createCanvas(windowWidth, windowHeight); //this is whatever the devices window width and height are
  for (let i=0; i<14; i++){
    let x = width*0+50;
    let y = height-50;
    let rW = random(5,65);
    let rH = random(15,100);
    let r = random(0,255);
    let g = random(0,255);
    let b = random(0,255);
    let bub = new Bubble(x, y, rW,rH,r,g,b);   //this initialises the object called bubble (objects traditionally start with capital)
    bubbles.push(bub);
    background(0);
  }
}


function draw(){
  for (let i=0; i<bubbles.length; i++){
  bubbles[i].rollover(mouseX, mouseY);
  bubbles[i].move();        //call the move functionallity
  bubbles[i].show();        //call the show functionallity
  bubbles[i].edge();        //call the edge functionallity
  }
}
class Bubble {        //this is the "container" or "cookie cutter" for the bubble objects
  constructor(x,y,rW,rH,r,g,b) {     //it contains all the (properties) data and (funtions it can do) functionallity that makes the object what it is!
    this.x = x;       //the this.?? referes to the variable for THIS object
    this.y = y;
    this.rW = rW;
    this.rH = rH;
    this.col = r,g,b;
    this.xspeed = random(0,4);
    this.yspeed = random(0,-0.6);
    this.hum = new p5.SinOsc(220);
    this.hum.amp(0.01);
    this.hum.start();

    // this.r = random(0,155);
    // this.g = random(0,155);
    // this.b = random(100,155);
  }

  rollover(px,py){
    let d = dist(px,py,this.x,this.y);
    if (d <this.rW && d <this.rH){
      sound1.play(0.001,0.9, 0.2, 0);        //([startTime], [rate], [amp], [cueStart], [duration])
      console.log("YEAH!.GOT ME");
    }
  }

  move(){
    this.x = this.x + this.xspeed;   //define the move functionallity
    this.y = this.y - this.yspeed;
  }

  show(){                               //define the show functionallity
    stroke(255);
    //fill(this.col);
    fill(random(0,155), random(0,155), 155);
    ellipse(this.x, this.y, this.rW,this.rH);
  }

  edge(){
    if (this.x > width || this.x <0){
      this.xspeed = -this.xspeed;
      this.hum.freq(random(120,880));     //changes tone when hits edge


    }
    if (this.y > height || this.y<0){
      this.yspeed = -this.yspeed;
      this.hum.freq(random(120,220));     //changes tone when hits edge


    }
  }
}
