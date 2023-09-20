const sax = document.querySelector(".sax");

const createAudio = () => {};

const notes = [
  { noteName: "C", noteAudio: "alto_sax_sounds/Middle-C.mp3" },
  { noteName: "D", noteAudio: "alto_sax_sounds/Middle-D.mp3" },
  { noteName: "E", noteAudio: "alto_sax_sounds/Middle-E.mp3" },
  { noteName: "F", noteAudio: "alto_sax_sounds/Middle-F.mp3" },
  { noteName: "High G", noteAudio: "alto_sax_sounds/High-G.mp3" },
  { noteName: "High A", noteAudio: "alto_sax_sounds/High-A.mp3" },
  { noteName: "High B", noteAudio: "alto_sax_sounds/High-B.mp3" },
  { noteName: "High C", noteAudio: "alto_sax_sounds/High-C.mp3" },
];

//create audio
document.addEventListener("DOMContentLoaded", () => {
  const createSaxKey = (keyName) => {
    const key = document.createElement("button");
    sax.appendChild(key);
    key.style.border = "2px solid gold";
    key.style.padding = "20px";
    key.style.borderRadius = "50%";
    key.innerText = keyName ? keyName : "";
    key.style.backgroundColor = "White";
    key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
    key.style.background = "linear-gradient(to bottom, #FFFFFF, #E0E0E0)";
    key.className = "saxKeyClass";
    return key;
  };
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
  const middleD = createSaxKey("D");
  middleC.addEventListener("click", () => {
    playSound("alto_sax_sounds/Middle-C.mp3");
  });

  notes.map((note, idx) => {
    const key = createSaxKey((keyName = note.noteName));
    key.addEventListener("click", () => {
      playSound(note.noteAudio);
    });
  });
});
