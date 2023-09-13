const root = document.querySelector("#root");

const audioContext = new AudioContext();
console.log(audioContext.sampleRate); //44,100 //double the range of human hearing
const sampleRate = audioContext.sampleRate;
//create buffer takes 3 arguments
/* 1. num of channels...1 is mono, 2 is stereo, 5 is surround sound
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

/* connect this audio node to another audio node, including the destination node, which represents the speakers on user's computer*/
//we need a gain node to control the volume
const primaryGainControl = audioContext.createGain();
//0.05 decreases the volume because it's less than 1
primaryGainControl.gain.setValueAtTime(0.05, 0);

primaryGainControl.connect(audioContext.destination);
const snareFilter = audioContext.createBiquadFilter();
snareFilter.type = "highpass";
//frequency that cuts off the noise
snareFilter.frequency.value = 1500;
snareFilter.connect(primaryGainControl);

const createButton = (text, source) => {
  const button = document.createElement("button");
  root.appendChild(button);
  const buttonText = document.createTextNode(text);
  button.appendChild(buttonText);
  button.className = "buttonClass";
  button.addEventListener("click", (filter) => {
    /* we need to create a buffer source, which is an audio node that takes our buffer and handles playing it for us*/
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    whiteNoiseSource.connect(source);
    whiteNoiseSource.start();
  });
  return button;
};

const whiteNoiseButton = createButton("White Noise", primaryGainControl);
const snareButton = createButton("Snare Button", snareFilter);

