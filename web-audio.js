const root = document.querySelector("#root");
// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d")
//always start with audio context object
const audioContext = new AudioContext();
console.log(audioContext.sampleRate); //44,100 //double the range of human hearing
const sampleRate = audioContext.sampleRate;
//create buffer takes 3 arguments
/* 1. num of channels...1 is mono, 2 is stereo, 6 is surround sound
2. number of samples in the buffer...multiply sample rate by num of seconds in sample
3. sample rate*/
//this gives us a mono buffer that gives us 1 second of audio data
const buffer = audioContext.createBuffer(1, sampleRate * 1, sampleRate);

/* read data that's in buffer, use getChannelData */
const channelData = buffer.getChannelData(0);
console.log(channelData); //returns Float32Array where each item is a num representing the level of that sample
console.log(channelData.length); //44,100 (1 second of audio)

/* we can mutate the channel data directly to create a signal
If we assign a random value to our signal between -1 and 1, we get white noise
*/
for (let i = 0; i < buffer.length; i++) {
  channelData[i] = Math.random() * 2 - 1;
}

//create VOLUME
/* connect this audio node to another audio node, including the destination node, which represents the speakers on user's computer*/
//we need a gain node to control the volume
const primaryGainControl = audioContext.createGain();
//0.05 decreases the volume because it's less than 1
primaryGainControl.gain.setValueAtTime(0.05, 0);

//create FILTERS

//snare drum
primaryGainControl.connect(audioContext.destination);
const snareFilter = audioContext.createBiquadFilter();
snareFilter.type = "highpass";
//frequency that cuts off the noise
snareFilter.frequency.value = 1500;

//kick drum
const kickDrum = document.createElement("button");
root.appendChild(kickDrum);
kickDrum.className = "buttonClass";
kickDrum.innerText = "Kick Drum";
kickDrum.addEventListener("click", () => {
  const kickOscillator = audioContext.createOscillator();
  //261.6 hz is middle C
  //   kickOscillator.frequency.setValueAtTime(261.6, 0);
  kickOscillator.frequency.setValueAtTime(150, audioContext.currentTime);
  //change the frequency exponentially over time from 150 down to .001
  kickOscillator.frequency.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.5
  );
  //we need to fix the pop at the end of the 1 second by giving the oscillator it's own gain node that fades out the volume with the pitch
  const kickGain = audioContext.createGain();
  kickGain.gain.setValueAtTime(1, audioContext.currentTime);
  kickGain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.5
  );
  kickOscillator.connect(kickGain);
  kickGain.connect(primaryGainControl);
  kickOscillator.start();
  kickOscillator.stop(audioContext.currentTime + 1);
});

//create BUTTONS
const createButton = (text, filter) => {
  const button = document.createElement("button");

  root.appendChild(button);
  const buttonText = document.createTextNode(text);
  button.appendChild(buttonText);
  button.className = "buttonClass";
  button.addEventListener("click", () => {
    /* we need to create a buffer source, which is an audio node that takes our buffer and handles playing it for us*/
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(primaryGainControl);
    source.start();
  });
  return button;
};

const whiteNoiseButton = createButton("White Noise", primaryGainControl);
const snareButton = createButton("Snare Button", snareFilter);

//new Snare Drum
const newSnareFilter = audioContext.createBiquadFilter();
newSnareFilter.type = "highpass";
newSnareFilter.frequency.value = 1500;
newSnareFilter.connect(primaryGainControl);
const newSnareButton = document.createElement("button");

newSnareButton.className = "buttonClass";
newSnareButton.innerText = "New Snare Button"

newSnareButton.addEventListener("click", () => {
  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = buffer;
  const whiteNoiseGain = audioContext.createGain();
  whiteNoiseGain.gain.setValueAtTime(1, audioContext.currentTime);
  whiteNoiseGain.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.2
  );
  whiteNoiseSource.connect(whiteNoiseGain);
  whiteNoiseGain.connect(newSnareFilter);
  whiteNoiseSource.start();
  whiteNoiseSource.stop(audioContext.currentTime + 0.2);
});
root.appendChild(newSnareButton);


//chromatic scale
const notes = [
  { name: "C", frequency: 261.63 },
  { name: "C#", frequency: 277.18 },
  { name: "D", frequency: 293.66 },
  { name: "D#", frequency: 311.13 },
  { name: "E", frequency: 329.63 },
  { name: "F", frequency: 349.23 },
  { name: "F#", frequency: 369.99 },
  { name: "G", frequency: 392.0 },
  { name: "G#", frequency: 415.3 },
  { name: "A", frequency: 440.0 },
  { name: "A#", frequency: 466.16 },
  { name: "B", frequency: 493.88 },
  { name: "C", frequency: 523.25 },
];

const createNotes = notes.map((note, key) => {
  const button = document.createElement("button");
  root.appendChild(button);
  button.className = "chromaticScaleClass";
  button.innerText = note.name;
  button.addEventListener("click", () => {
    const noteOscillator = audioContext.createOscillator();
    //sine is the waveform
    noteOscillator.type = "sine";
    noteOscillator.frequency.setValueAtTime(
      note.frequency,
      audioContext.currentTime
    );
    noteOscillator.connect(primaryGainControl);

    //an envelope defines how sound changes over time
    //ADSR: attack time, decay time, sustain level, release time
    const attackTime = 0.2;
    const decayTime = 0.3;
    const sustainLevel = 0.7;
    const releaseTime = 0.2;

    const now = audioContext.currentTime;
    const noteGain = audioContext.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(1, now + attackTime); //attack
    noteGain.gain.linearRampToValueAtTime(
      sustainLevel,
      now + attackTime + decayTime
    ); //decay to sustain level
    noteGain.gain.setValueAtTime(sustainLevel, now + attackTime, +decayTime);
    noteGain.gain.linearRampToValueAtTime(
      0,
      now + attackTime + decayTime + sustainLevel + releaseTime
    );

    noteOscillator.connect(noteGain);
    noteGain.connect(primaryGainControl);
    noteOscillator.start();
    noteOscillator.stop(
      now + attackTime + decayTime + sustainLevel + releaseTime
    );
  });

  return button;
});

// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 75);

