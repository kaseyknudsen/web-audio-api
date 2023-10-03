const sax = document.querySelector(".sax");
const frontKeys = document.querySelector(".front-keys");
const palmKeys = document.querySelector(".palm-keys");
const sideKeys = document.querySelector(".side-keys");
const patchKeys = document.querySelector(".patch-keys");
const chromaticScale = document.querySelector(".chromatic-scale");

//import all audio files


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

  const notesArray = frontKeyNotesArray.map((note, idx) => {
    const key = createSaxKey();
    if (note === "B") {
      key.style.marginBottom = "25px";
    }
    if (note === "A") {
      key.style.marginTop = "40px";
    }
    if (note === "G") {
      key.style.marginBottom = "20px";
    }
    return key;
  });

  const Eb = createLowEb();
  const C = createLowC();
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
