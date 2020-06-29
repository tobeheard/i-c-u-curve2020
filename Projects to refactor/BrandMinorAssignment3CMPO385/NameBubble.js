

class NameBubble {
  constructor(x,y,r,n,col) {
    this.x;
    this.y;
    this.r;
    this.n;
    this.col;
    this.xspeed;
    this.yspeed;

    this.sOsc = new p5.SinOsc();
    this.sOsc.freq(random(100,2000));
    var aLevel = 1.0;  //these variables can change using text data numbers
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
}
