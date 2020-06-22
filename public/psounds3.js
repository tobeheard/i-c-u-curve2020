// psounds2.3
// must have same tone version on server npm... as scriptTag
// The filter and effect nodes which we will modulate
let phaser, feed, ping, filter, synth0, synth1, synth2, noiseSynth, synth3, pattern0, pattern1, pattern2, pattern3, pattern4;


//Effects first
phaser = new Tone.Phaser({
  "frequency": 15,
  "octaves": 5,
  "baseFrequency": 100
}).toMaster();

feed = new Tone.FeedbackDelay(0.4, 0.85).toMaster();

ping = new Tone.PingPongDelay("4n", 0.2).toMaster();

filter = new Tone.Filter().toMaster();
filter.type = 'lowpass';
// Effects end

synth0 = new Tone.Synth({
  "oscillator": {
    "type": "sine",
    "count": 3,
    "spread": 30
  },
  "envelope": {
    "attack": 0.001,
    "decay": 0.1,
    "sustain": 0.5,
    "release": 0.1,
    "attackCurve": "exponential"
  }
}).connect(filter).toMaster();
pattern0 = new Tone.Pattern(function (time, note) {
  synth0.triggerAttackRelease(note, "2n");
}, ["E1", "C1", "A1"], "randomWalk")

synth1 = new Tone.PolySynth(6, Tone.Synth, {
  volume: -10,
  oscillator: {
    type: "sine"
  }
}).connect(feed).toMaster();
pattern1 = new Tone.Pattern(function (time, note) {
  synth1.triggerAttackRelease(note, "2n");
}, ["E3", "C1"], "randomWalk");

synth2 = new Tone.FMSynth().connect(ping).toMaster();
pattern2 = new Tone.Pattern(function (time, note) {
  synth2.volume.value = -10;
  synth2.triggerAttackRelease(note, "6n");
}, ["C2", "D2", "E2", "A2", "G2"], "upDown");


synth3 = new Tone.MembraneSynth({
  volume: -10,
  pitchDecay: 0.05,
  octaves: 10,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.01,
    decay: 0.4,
    sustain: 0.01,
    release: 1.4,
    attackCurve: "exponential"
  }
}).connect(ping).connect(phaser).toMaster();

pattern3 = new Tone.Pattern(function (time, note) {
  synth3.triggerAttackRelease(note, "2n");
}, ["E3", "C1", "F2"], "randomWalk");

noiseSynth = new Tone.NoiseSynth({
  noise: {
    volume: -15,
    type: "brown"
  },
  envelope: {
    attack: 0.5,
    decay: 0.1,
    sustain: 0
  }
}).connect(feed).toMaster();
pattern4 = new Tone.Pattern(function (time, note) {
  noiseSynth.triggerAttackRelease(note, "2n");
}, ["E4", "C2", "A1"], "randomWalk")



// pattern1.loop = "8n";
// pattern2.interval = "16n";



Tone.Transport.start();
pattern4.start(0)
pattern1.start(8); //synth 1
pattern2.start(24);
pattern3.start(32).iterations = 6; //pluckdrops
pattern0.start(56); //subline
pattern3.stop(72);
pattern1.stop(80);
pattern3.start(86);
pattern2.stop(124);
pattern1.start(128);
pattern3.start(132);
pattern0.start(156);
pattern2.start(184);
pattern2.stop(224);
pattern3.stop(239);
pattern1.stop(248);
pattern0.start(256);
pattern1.start(288);
pattern2.start(324);
pattern3.start(432);
pattern3.stop(572);
pattern4.start(686);
pattern0.stop(715);
Tone.Transport.stop(720); //=12minutes