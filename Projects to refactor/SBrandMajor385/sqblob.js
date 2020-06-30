//The square blob!!
// this is an polygon object it has a body, and is a wrapper for the matter.js physics body
// THIS IS THE CHANGING SKETCH...
// sqblob.js

function Sqblobs(x,y,sides,r){
  this.col = color(random(0,255),random(0,255),random(0,255));
  let options={
    restitution:0.75,
    density:1
  }
  this.body = Bodies.polygon(x, y, sides, r,options);
  this.r = r;
  this.sides = sides;
  this.body.label = "sqblobs";

  World.add(world,this.body);

  // write a polygon function
      function polygon(x, y, sides, r) {
        var angle = TWO_PI / sides;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
          var sx = x + cos(a) * r;
          var sy = y + sin(a) * r;
          vertex(sx, sy);
        }
        endShape(CLOSE);
      }
      // write a function for dead sqblob
      Sqblobs.prototype.isDead = function(){
        var pos = this.body.position;
        return(pos.y >height +100);
      }
      Sqblobs.prototype.removeFromWorld = function() {
        World.remove(world, this.body);
      }

  //write a function to show it
    Sqblobs.prototype.show = function(){
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        ellipseMode(RADIUS); //as matter.js has reference point at CENTER
        stroke(255);
        fill(this.col);
        polygon(0,0,this.sides,this.r);
        pop();
    }
  }
