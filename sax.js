const sax = document.querySelector(".sax");
const frontKeys = document.querySelector(".front-keys");
const palmKeys = document.querySelector(".palm-keys");
const sideKeys = document.querySelector(".side-keys");
const patchKeys = document.querySelector(".patch-keys");
const chromaticScale = document.querySelector(".chromatic-scale");

//import all audio files
const LowBb = "alto_sax_sounds/Low-Bb.mp3";
const LowB = "alto_sax_sounds/Low-B.mp3";
const lowC = "alto_sax_sounds/Low-C.mp3";
const lowCsharp = "alto_sax_sounds/Low-Db.mp3";
const lowD = "alto_sax_sounds/Low-D.mp3";
const lowDsharp = "alto_sax_sounds/Low-Eb.mp3";
const lowE = "alto_sax_sounds/Low-E.mp3";
const lowF = "alto_sax_sounds/Low-F.mp3";
const middleFsharp = "alto_sax_sounds/Low-Gb.mp3";
const middleG = "alto_sax_sounds/Middle-G.mp3";
const middleGsharp = "alto_sax_sounds/Middle-Ab.mp3";
const middleA = "alto_sax_sounds/Middle-A.mp3";
const middleAsharp = "alto_sax_sounds/Middle-Bb.mp3";
const middleB = "alto_sax_sounds/Middle-B.mp3";
const middleC = "alto_sax_sounds/Middle-C.mp3";
const middleCsharp = "alto_sax_sounds/Middle-Db.mp3";
const middleD = "alto_sax_sounds/Middle-D.mp3";
const middleDsharp = "alto_sax_sounds/Middle-Eb.mp3";
const middleE = "alto_sax_sounds/Middle-E.mp3";
const middleF = "alto_sax_sounds/Middle-F.mp3";
const highFsharp = "alto_sax_sounds/High-Gb.mp3";
const highG = "alto_sax_sounds/High-G.mp3";
const highGsharp = "alto_sax_sounds/High-Ab.mp3";
const highA = "alto_sax_sounds/High-A.mp3";
const highAsharp = "alto_sax_sounds/High-Bb.mp3";
const highB = "alto_sax_sounds/High-B.mp3";
const highC = "alto_sax_sounds/High-C.mp3";
const highCsharp = "alto_sax_sounds/High-Db.mp3";
const highD = "alto_sax_sounds/High-D.mp3";
const highDsharp = "alto_sax_sounds/High-Eb.mp3";
const highE = "alto_sax_sounds/High-E.mp3";
const highF = "alto_sax_sounds/High-F.mp3";

const frontKeyNotesArray = ["B", "A", "G", "F", "E", "D"];

const allNotesInChromaticScale = [
  "Low Bb",
  "Low B",
  "Low C",
  "Low C#",
  "Low D",
  "Low D#",
  "Low E",
  "Low F",
  "Low F#",
  "Middle G",
  "Middle G#",
  "Middle A",
  "Middle A#",
  "Middle B",
  "Middle C",
  "Middle C#",
  "Middle D",
  "Middle D#",
  "Middle E",
  "Middle F",
  "Middle F#",
  "High G",
  "High G#",
  "High A",
  "High A#",
  "High B",
  "High C",
  "High C#",
  "High D",
  "High D#",
  "High E",
  "High F",
  "High F#",
];

const keyPress = (key) => {
  key.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
  key.style.background = "grey";

  setTimeout(() => {
    key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
    key.style.background = "linear-gradient(to bottom, #FFFFFF, #E0E0E0)";
  }, "4000");
};

const EbKeyPress = (key) => {
  key.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
  key.style.background = "grey";
  setTimeout(() => {
    key.style.boxShadow = "0px -2px 3px rgba(0, 0, 0, 0.2)";
  }, "4000");
};

//create front key notes
document.addEventListener("DOMContentLoaded", () => {
  const createSaxKey = () => {
    const key = document.createElement("button");
    sax.appendChild(key);
    key.className = "frontKeyClass";
    return key;
  };

  const createLowEb = () => {
    // Create Eb container to hold the circle
    const EbContainer = document.createElement("div");
    EbContainer.className = "Ebcontainer";
    sax.appendChild(EbContainer);
    // Create Eb key
    const ebKey = document.createElement("button");
    EbContainer.appendChild(ebKey);
    ebKey.className = "ebClass";
    return ebKey;
  };

  const createLowC = () => {
    // Create C container to hold the circle
    const cContainer = document.createElement("div");
    cContainer.className = "cContainerClass";
    sax.appendChild(cContainer);
    //create C key
    const Ckey = document.createElement("button");
    cContainer.appendChild(Ckey);
    Ckey.className = "cKeyClass";
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

  const notesArray = frontKeyNotesArray.map((note, idx) => {
    const key = createSaxKey();
    if (note === "G") {
      key.style.marginBottom = "20px";
    }
    return key;
  });

  const Eb = createLowEb();
  const C = createLowC();

  //create buttons for chr scale
  allNotesInChromaticScale.map((button, idx) => {
    const newButton = document.createElement("button");
    newButton.style.padding = "10px";
    newButton.innerText = button;
    chromaticScale.appendChild(newButton);
    newButton.className = "chromatic-scale-button";
    newButton.addEventListener("click", () => {
      if (button === "Low Bb") {
        playSound(LowBb);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
          keyPress(C);
          keyPress(createdPatchKeysArray[3]);
        }
      } else if (button === "Low B") {
        playSound(LowB);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
          keyPress(C);
          keyPress(createdPatchKeysArray[1]);
        }
      } else if (button === "Low C") {
        playSound(lowC);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
          keyPress(C);
        }
      } else if (button === "Low C#") {
        playSound(lowCsharp);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
          keyPress(C);
          keyPress(createdPatchKeysArray[2]);
        }
      } else if (button === "Low D") {
        playSound(lowD);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "Low D#") {
        playSound(lowDsharp);
        for (let i = 0; i < 6; i++) {
          keyPress(notesArray[i]);
          EbKeyPress(Eb);
        }
      } else if (button === "E") {
        playSound(lowE);
        for (let i = 0; i < 5; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "F") {
        playSound(lowF);
        for (let i = 0; i < 4; i++) {
          keyPress(notesArray[i]);
        }
      } else if (button === "Middle F#") {
        playSound(middleFsharp);
        for (let i = 0; i < 4; i++) {
          keyPress(notesArray[i]);
        }
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
  palmKey.className = "palm-key-class";
  return palmKey;
};

palmKeyArray.forEach((key, idx) => createPalmKeys());

const sideKeyArray = ["High F", "Alternate C", "Side Bb"];

const createSideKeys = () => {
  const sideKey = document.createElement("div");
  sideKeys.appendChild(sideKey);
  sideKey.className = "side-key-class";
};

sideKeyArray.forEach((key, idx) => createSideKeys());

const patchKeyArray = ["G#", "B", "C#", "Bb"];
const createdPatchKeysArray = [];

const createPatchKeys = () => {
  const patchKey = document.createElement("div");
  patchKeys.appendChild(patchKey);
  patchKey.className = "patch-key-class";
  createdPatchKeysArray.push(patchKey);
};

patchKeyArray.forEach((key, idx) => createPatchKeys());
