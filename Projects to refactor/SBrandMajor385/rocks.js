// this is an ellipse object it has a body, and is a wrapper for the matter.js body
// THIS IS THE CHANGING SKETCH...
// rocks.js

function Rocks(x,y,r){
  this.col = color(random(0,255),random(0,255),random(0,255));
  let options={
    restitution:0.75
  }
  this.body = Bodies.circle(x, y, r,options);
  this.r = r;
  this.body.label = "rocks";

  World.add(world,this.body);

  // write a function for dead Rocks
  Rocks.prototype.isDead = function(){
    var pos = this.body.position;
    return(pos.y >height +100);
  }
  Rocks.prototype.removeFromWorld = function() {
    World.remove(world, this.body);
  }

//write a function to show it
  Rocks.prototype.show = function(){
      let pos = this.body.position;
      let angle = this.body.angle;
      push();
      translate(pos.x,pos.y);
      rotate(angle);
      ellipseMode(RADIUS); //as matter.js has reference point at CENTER
      stroke(255);
      fill(this.col);
      ellipse(0,0,this.r);
      pop();
  }
  // sending data to socket.io via a message for colab...??
  // need name for message 'string'
  // need the data for the message, this is an object
   // let data = {
   //   x:mouseX,
   //   y:mouseY
   // }
   // socket.emit('rocks', data);
   // console.log('sending' + mouseX, mouseY);
// the above code is yet to be realised...collaboration functionality 

}
