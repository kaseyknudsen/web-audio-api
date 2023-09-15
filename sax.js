const sax = document.querySelector(".sax");

const createAudio = () => {};

const createSaxKey = (note) => {
  const key = document.createElement("button");
  sax.appendChild(key);
  key.style.border = "2px solid gold";
  key.style.padding = "20px";
  key.style.borderRadius = "50%";
  key.innerText = note ? note : "";
  key.style.backgroundColor = "White";
  key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
  key.style.background = "linear-gradient(to bottom, #FFFFFF, #E0E0E0)";
  key.className = "saxKeyClass";
  return key;
};

document.addEventListener("DOMContentLoaded", () => {
  const audioContext = new AudioContext();
  const playSound = (url) => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(audioContext.destination);
        sourceNode.start();
      })
      .catch((err) => {
        console.error("Error with decoding audio data", err);
      });
  };
  const middleC = createSaxKey("C");

  middleC.addEventListener("click", () => {
    playSound("alto_sax_sounds/Middle-C.mp3");
  });
});
