const sax = document.querySelector(".sax");

const createAudio = () => {};

const notes = [
  { noteName: "B", noteAudio: "alto_sax_sounds/Middle-B.mp3" },
  { noteName: "A", noteAudio: "alto_sax_sounds/Middle-A.mp3" },
  { noteName: "G", noteAudio: "alto_sax_sounds/Middle-G.mp3" },
  { noteName: "F", noteAudio: "alto_sax_sounds/Low-F.mp3" },
  { noteName: "E", noteAudio: "alto_sax_sounds/Low-E.mp3" },
  { noteName: "D", noteAudio: "alto_sax_sounds/Low-D.mp3" },
];


const keyPress = (key) => {
  key.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
  setTimeout(() => {
    key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
  }, "1000");
};

//create audio
document.addEventListener("DOMContentLoaded", () => {
  const createSaxKey = () => {
    const key = document.createElement("button");
    sax.appendChild(key);
    key.style.border = "2px solid gold";
    key.style.padding = "20px";
    key.style.borderRadius = "50%";
    // key.innerText = keyName ? keyName : "";
    key.style.backgroundColor = "White";
    key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
    key.style.background = "linear-gradient(to bottom, #FFFFFF, #E0E0E0)";
    key.className = "saxKeyClass";
    return key;
  };

  const createLowCandEb = () => {
    const key = document.createElement("button")
    sax.appendChild(key)
    key.style.border = "2px solid gold";
    key.style.padding = "20px";
    key.style.width = "50px"
    key.style.height = "25px"
  
  }
  const audioContext = new AudioContext();

  const playSound = (url) => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      //decodeAudioData asynchronously decodes audio file data from an arrayBuffer that is loaded from fetch. It's then resampled to AudioContext's sampling rate
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const sourceNode = audioContext.createBufferSource();
        console.log(sourceNode);
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(audioContext.destination);
        sourceNode.start();
      })
      .catch((err) => {
        console.error("Error with decoding audio data", err);
      });
  };

  notes.map((note, idx) => {
    const key = createSaxKey((keyName = note.noteName));
    if (note.noteName === "G") {
      key.style.marginBottom = "20px";
    }
    key.addEventListener("click", () => {
      playSound(note.noteAudio);
      keyPress(key);
    });
  });
  createLowCandEb()
});
