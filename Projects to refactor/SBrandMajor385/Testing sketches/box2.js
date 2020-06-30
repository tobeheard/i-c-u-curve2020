// this is a box object it has a body, the rect and is a wrapper for the matter.js
// THIS IS THE ORIGINAL WORKING SKETCH
// box2.js

function Box(x,y,w,h){
  this.body = Bodies.rectangle(x, y, w, h);
  this.w = w;
  this.h = h;
  this.lifespan=10*60;
  this.alpha=255;

  World.add(world,this.body);

//write a function to show it
  this.show = function(){
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      translate(pos.x,pos.y);
      fill(255,this.alpha);
      rect(0,0,this.w,this.h);
      pop();
  }
}
