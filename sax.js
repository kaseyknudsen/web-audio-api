const sax = document.querySelector(".sax");
const palmKeys = document.querySelector(".palm-keys");
const sideKeys = document.querySelector(".side-keys");
const createAudio = () => {};

const middleC = "alto_sax_sounds/Middle-C.mp3";
const middleB = "alto_sax_sounds/Middle-B.mp3";
const middleA = "alto_sax_sounds/Middle-A.mp3";
const middleG = "alto_sax_sounds/Middle-G.mp3";
const lowF = "alto_sax_sounds/Low-F.mp3";
const lowE = "alto_sax_sounds/Low-E.mp3";
const lowD = "alto_sax_sounds/Low-D.mp3";
const lowC = "alto_sax_sounds/Low-C.mp3";

const notes = [
  { noteName: "B", noteAudio: middleB },
  { noteName: "A", noteAudio: middleA },
  { noteName: "G", noteAudio: middleG },
  { noteName: "F", noteAudio: lowF },
  { noteName: "E", noteAudio: lowE },
  { noteName: "D", noteAudio: lowD },
];

const noteButtons = ["C", "B", "A", "G", "F", "E", "D", "Low C"];

const keyPress = (key) => {
  key.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
  setTimeout(() => {
    key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
  }, "1000");
};

const EbKeyPress = (key) => {
  key.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
  setTimeout(() => {
    key.style.boxShadow = "0px -2px 3px rgba(0, 0, 0, 0.2)";
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

  const createLowEb = () => {
    // Create Eb container to hold the circle
    const EbContainer = document.createElement("div");
    EbContainer.style.width = "50px";
    EbContainer.style.height = "25px"; // Set height to half of the circle’s diameter to show only bottom half
    EbContainer.style.overflow = "hidden"; // Hide the overflow
    EbContainer.style.marginTop = "12px";
    EbContainer.style.marginLeft = "-2px";
    sax.appendChild(EbContainer);

    // Create Eb key
    const ebKey = document.createElement("button");
    EbContainer.appendChild(ebKey);
    ebKey.style.border = "2px solid gold";
    ebKey.style.width = "50px";
    ebKey.style.height = "50px"; // Circle’s diameter
    ebKey.style.borderRadius = "20px"; // Half of the circle’s diameter
    ebKey.style.backgroundColor = "White";
    ebKey.style.boxShadow = "0px -2px 3px rgba(0, 0, 0, 0.2)";
    ebKey.style.background = "linear-gradient(to top, #FFFFFF, #E0E0E0)";
    return ebKey;
  };

  const createLowC = () => {
    // Create C container to hold the circle
    const cContainer = document.createElement("div");
    cContainer.style.width = "50px";
    cContainer.style.height = "25px"; // Set height to half of the circle’s diameter to show only bottom half
    cContainer.style.overflow = "hidden"; // Hide the overflow
    cContainer.style.marginTop = "4px";
    cContainer.style.marginLeft = "-2px";

    sax.appendChild(cContainer);

    //create C key
    const Ckey = document.createElement("button");
    cContainer.appendChild(Ckey);
    Ckey.style.border = "2px solid gold";
    Ckey.style.width = "50px";
    Ckey.style.height = "50px"; // Circle’s diameter
    Ckey.style.borderRadius = "20px"; // Half of the circle’s diameter
    Ckey.style.marginTop = "-25px"; // Position circle inside container to show only the bottom half
    Ckey.style.backgroundColor = "White";
    Ckey.style.boxShadow = "0px 2px 3px rgba(0, 0, 0, 0.2)";
    Ckey.style.background = "linear-gradient(to bottom, #FFFFFF, #E0E0E0)";
    return Ckey;
  };

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

  const notesArray = notes.map((note, idx) => {
    const key = createSaxKey((keyName = note.noteName));
    if (note.noteName === "G") {
      key.style.marginBottom = "20px";
    }
    key.addEventListener("click", () => {
      playSound(note.noteAudio);
      keyPress(key);
    });
    return key;
  });
  console.log(notesArray);
  const Eb = createLowEb();
  const C = createLowC();
  Eb.addEventListener("click", () => {
    playSound("alto_sax_sounds/Low-Eb.mp3");
    EbKeyPress(Eb);
  });
  C.addEventListener("click", () => {
    playSound("alto_sax_sounds/Low-C.mp3");
    keyPress(C);
  });

  const buttons = document.querySelector(".notes");

  const buttonsArray = noteButtons.map((button, idx) => {
    const newButton = document.createElement("button");
    newButton.style.marginRight = "5px";
    newButton.style.marginBottom = "5px";
    newButton.style.padding = "10px";
    newButton.innerText = button;
    buttons.appendChild(newButton);
    newButton.addEventListener("click", () => {
      if (button === "C") {
        playSound(middleC);
        keyPress(notesArray[1]);
      } else if (button === "B") {
        playSound(middleB);
        keyPress(notesArray[0]);
      } else if (button === "A") {
        playSound(middleA);
        for (let i = 0; i < 2; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "G") {
        playSound(middleG);
        for (let i = 0; i < 3; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "F") {
        playSound(lowF);
        for (let i = 0; i < 4; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "E") {
        playSound(lowE);
        for (let i = 0; i < 5; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "D") {
        playSound(lowD);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "Low C") {
        playSound(lowC);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
        }
        keyPress(C);
      }
    });
    return newButton;
  });
});

const palmKeyArray = ["F", "E", "D"];

const createPalmKeys = () => {
  const palmKey = document.createElement("div");
  palmKeys.appendChild(palmKey);
  palmKey.style.width = "25px";
  palmKey.className = "palm-key-class";
  palmKey.style.height = "45px";
  palmKey.style.borderRadius = "50% 50% 50% 50%";
  palmKey.style.background = "linear-gradient(to bottom, #ffffff, #e0e0e0)";
  palmKey.style.border = "2px solid gold";
  palmKey.style.position = "absolute";

  return palmKey;
};

palmKeyArray.forEach((key, idx) => createPalmKeys());

const sideKeyArray = ["High F", "Alternate C", "Side Bb"];

const createSideKeys = () => {
  const sideKey = document.createElement("div");
  sideKeys.appendChild(sideKey);
  sideKey.style.width = "12px";
  sideKey.style.height = "40px";
  sideKey.className = "side-key-class";
  sideKey.style.borderRadius = "30% 30% 30% 30%";
  sideKey.style.background = "linear-gradient(to bottom, #ffffff, #e0e0e0)";
  sideKey.style.border = "2px solid gold";
  sideKey.style.position = "absolute";
};

sideKeyArray.forEach((key, idx) => createSideKeys())
