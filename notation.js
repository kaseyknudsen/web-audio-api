const { Factory, Stave, Renderer, Voice, StaveNote, Barline, Accidental } =
  Vex.Flow;

const sax = document.querySelector(".sax");
const frontKeys = document.querySelector(".front-keys");
const palmKeys = document.querySelector(".palm-keys");
const sideKeys = document.querySelector(".side-keys");
const patchKeys = document.querySelector(".patch-keys");
const octaveKey = document.querySelector(".octave-key");
const highFsharpKey = document.querySelector(".high-Fsharp-key");
const alternateFsharpKey = document.querySelector(".alternate-Fsharp-key");
const highGKey = document.querySelector(".high-G-key");
const bissKey = document.querySelector(".biss-key");
const chromaticScale = document.querySelector(".chromatic-scale");
const root = document.querySelector(".root");
const output = document.querySelector("output");
const div = document.getElementById("output");

//create saxophone

const keyPress = (key) => {
  key.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
  key.style.background = "grey";

  setTimeout(() => {
    key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
    key.style.background = "linear-gradient(to bottom, #FFFFFF, #E0E0E0)";
  }, "2000");
};

const EbKeyPress = (key) => {
  key.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
  key.style.background = "grey";
  setTimeout(() => {
    key.style.boxShadow = "0px -2px 3px rgba(0, 0, 0, 0.2)";
  }, "4000");
};

document.addEventListener("DOMContentLoaded", () => {
  const createSaxKey = () => {
    const key = document.createElement("button");
    sax.appendChild(key);
    key.className = "frontKeyClass";
    return key;
  };

  const createLowEbAndC = (containerClassName, keyClassName) => {
    const container = document.createElement("div");
    container.className = containerClassName;
    sax.appendChild(container);
    const key = document.createElement("button");
    container.appendChild(key);
    key.className = keyClassName;
    return key;
  };

  const frontKeyNotesArray = ["B", "A", "G", "F", "E", "D"].map((note, idx) => {
    const key = createSaxKey();
    if (note === "B") {
      key.style.marginBottom = "25px";
    } else if (note === "A") {
      key.style.marginTop = "40px";
    } else if (note === "G") {
      key.style.marginBottom = "20px";
    }
    return key;
  });

  const Eb = createLowEbAndC("ebContainerClass", "ebKeyClass");
  const C = createLowEbAndC("cContainerClass", "cKeyClass");

  const palmKeysArray = ["High D", "High E", "High F"].map((key, idx) => {
    const palmKey = document.createElement("div");
    palmKeys.appendChild(palmKey);
    palmKey.className = "palm-key-class";
    return palmKey;
  });

  const sideKeysArray = ["High F", "Alternate C", "Side Bb"].map((key, idx) => {
    const sideKey = document.createElement("div");
    sideKeys.appendChild(sideKey);
    sideKey.className = "side-key-class";
    return sideKey;
  });

  const patchKeysArray = ["G#", "Low B", "Low C#", "Low Bb"].map((key, idx) => {
    const patchKey = document.createElement("div");
    patchKeys.appendChild(patchKey);
    patchKey.className = "patch-key-class";
    return patchKey;
  });

  const createNewNote = (key, duration, accidental) => {
    const note = new StaveNote({ keys: [key], duration: duration });
    if (accidental) note.addModifier(new Accidental(accidental));
    return note;
  };

  const createMeasureAndAddNotes = (
    X = 10,
    Y = 0,
    staveWidth = 600,
    numBeats = 8,
    beatValue = 4,
    notesArray
  ) => {
    //create chromatic scale measure

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(900, 200);
    const context = renderer.getContext();
    const stave = new Stave(X, Y, staveWidth);
    if (notesArray.path === "alto_sax_sounds/Low-Bb.mp3") {
      stave.addClef("treble");
    }
    stave.setContext(context).draw();
    const voice = new Voice({ num_beats: numBeats, beat_value: beatValue });
    let allNotes = notesArray.flatMap((note, idx) => {
      const flattenAllNotes = note.noteName1();

      return flattenAllNotes;
    });
    voice.addTickables(allNotes);
    const formatter = new Vex.Flow.Formatter()
      .joinVoices([voice])
      .format([voice], staveWidth);
    voice.draw(context, stave);

    stave.setEndBarType(Barline.type.SINGLE);
    stave.draw();
    // if (notesArray === notes4) {
    //   stave.setEndBarType(Barline.type.END);
    //   stave.draw();
    // }
    return allNotes;
  };

  const notes = [
    {
      noteName: "Bb",
      noteName1: () => [createNewNote("a#/3", "q", "#")],
      noteName2: () => [createNewNote("bb/3", "q", "b")],
      path: "alto_sax_sounds/Low-Bb.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key, idx) => keyPress(key)),
          keyPress(C),
          keyPress(patchKeysArray[3]);
      },
    },
    {
      noteName: "B/Cb",
      noteName1: () => [createNewNote("b/3", "q")],
      noteName2: () => [createNewNote("cb/3", "q", "b")],
      path: "alto_sax_sounds/Low-B.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key, idx) => keyPress(key)),
          keyPress(C),
          keyPress(patchKeysArray[1]);
      },
    },
    {
      noteName: "C/B#",
      noteName1: () => [createNewNote("c/4", "q")],
      noteName2: () => [createNewNote("b#/4", "q", "#")],
      path: "alto_sax_sounds/Low-C.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key, idx) => keyPress(key)), keyPress(C);
      },
    },
    {
      noteName: "C#/Db",
      noteName1: () => [createNewNote("c#/4", "q", "#")],
      noteName2: () => [createNewNote("db/4", "q", "b")],
      path: "alto_sax_sounds/Low-Db.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key, idx) => keyPress(key)),
          keyPress(C),
          keyPress(patchKeysArray[2]);
      },
    },
    {
      noteName: "low D",
      noteName1: () => [createNewNote("d/4", "q")],
      path: "alto_sax_sounds/Low-D.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key, idx) => keyPress(key));
      },
    },
    {
      noteName: "D#/Eb",
      noteName1: () => [createNewNote("d#/4", "q", "#")],
      noteName2: () => [createNewNote("eb/4", "q", "b")],
      path: "alto_sax_sounds/Low-Eb.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key, idx) => keyPress(key));
        keyPress(Eb);
      },
    },
    {
      noteName: "E/Fb",
      noteName1: () => [createNewNote("e/4", "q")],
      noteName2: () => [createNewNote("fb/4", "q", "b")],
      path: "alto_sax_sounds/Low-E.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 1; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
      },
    },
    {
      noteName: "F/E#",
      noteName1: () => [createNewNote("f/4", "q")],
      noteName2: () => [createNewNote("e#/4", "q", "#")],
      path: "alto_sax_sounds/Low-F.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 2; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
      },
    },
    {
      noteName: "F#/Gb",
      noteName1: () => [createNewNote("f#/4", "q", "#")],
      noteName2: () => [createNewNote("gb/4", "q", "b")],
      path: "alto_sax_sounds/Low-Gb.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 3; i++) {
          keyPress(frontKeyNotesArray[i]);
          keyPress(frontKeyNotesArray[4]);
        }
      },
    },
    {
      noteName: "G",
      noteName1: () => [createNewNote("g/4", "q")],
      path: "alto_sax_sounds/Middle-G.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 3; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
      },
    },
    {
      noteName: "G#/Ab",
      noteName1: () => [createNewNote("g#/4", "q", "#")],
      noteName2: () => [createNewNote("ab/4", "q", "b")],
      path: "alto_sax_sounds/Middle-Ab.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 3; i++) {
          keyPress(frontKeyNotesArray[i]);
          keyPress(patchKeysArray[0]);
        }
      },
    },
    {
      noteName: "A",
      noteName1: () => [createNewNote("a/4", "q")],
      path: "alto_sax_sounds/Middle-A.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 4; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
      },
    },
    {
      noteName: "A#/Bb",
      noteName1: () => [createNewNote("a#/4", "q", "#")],
      noteName2: () => [createNewNote("bb/4", "q", "b")],
      path: "alto_sax_sounds/Middle-Bb.mp3",
      keyPressFunction: () => {
        keyPress(frontKeyNotesArray[0]);
        keyPress(bissKey);
      },
    },
    {
      noteName: "B/Cb",
      noteName1: () => [createNewNote("b/4", "q")],
      noteName2: () => [createNewNote("cb/4", "q", "b")],
      path: "alto_sax_sounds/Middle-B.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 5; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
      },
    },
    {
      noteName: "C/B#",
      noteName1: () => [createNewNote("c/5", "q")],
      noteName2: () => [createNewNote("b#/5", "q", "#")],
      path: "alto_sax_sounds/Middle-C.mp3",
      keyPressFunction: () => {
        keyPress(frontKeyNotesArray[1]);
      },
    },
    {
      noteName: "C#/Db",
      noteName1: () => [createNewNote("c#/5", "q", "#")],
      noteName2: () => [createNewNote("db/5", "q", "b")],
      path: "alto_sax_sounds/Middle-Db.mp3",
      keyPressFunction: () => null,
    },

    {
      noteName: "D",
      noteName1: () => [createNewNote("d/5", "q")],
      path: "alto_sax_sounds/Middle-D.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key, idx) => keyPress(key)),
          keyPress(octaveKey);
      },
    },
    {
      noteName: "D#/Eb",
      noteName1: () => [createNewNote("d#/5", "q", "#")],
      noteName2: () => [createNewNote("eb/5", "q", "b")],
      path: "alto_sax_sounds/Middle-Eb.mp3",
      keyPressFunction: () => {
        frontKeyNotesArray.forEach((key) => keyPress(key));
        keyPress(octaveKey);
        keyPress(Eb);
      },
    },
    {
      noteName: "E/Fb",
      noteName1: () => [createNewNote("e/5", "q")],
      noteName2: () => [createNewNote("fb/5", "q", "b")],
      path: "alto_sax_sounds/Middle-E.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 1; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
        keyPress(octaveKey);
      },
    },
    {
      noteName: "F/E#",
      noteName1: () => [createNewNote("f/5", "q")],
      noteName2: () => [createNewNote("e#/5", "q", "#")],
      path: "alto_sax_sounds/Middle-F.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 2; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
        keyPress(octaveKey);
      },
    },
    {
      noteName: "F#/Gb",
      noteName1: () => [createNewNote("f#/5", "q", "#")],
      noteName2: () => [createNewNote("gb/5", "q", "b")],
      path: "alto_sax_sounds/Middle-Gb.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 3; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
        keyPress(frontKeyNotesArray[4]);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "G",
      noteName1: () => [createNewNote("g/5", "q")],
      path: "alto_sax_sounds/High-G.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 3; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
        keyPress(octaveKey);
      },
    },
    {
      noteName: "G#/Ab",
      noteName1: () => [createNewNote("g#/5", "q", "#")],
      noteName2: () => [createNewNote("ab/5", "q", "b")],
      path: "alto_sax_sounds/High-Ab.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 3; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
        keyPress(patchKeysArray[0]);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "A",
      noteName1: () => [createNewNote("a/5", "q")],
      path: "alto_sax_sounds/High-A.mp3",
      keyPressFunction: () => {
        for (let i = 0; i < frontKeyNotesArray.length - 4; i++) {
          keyPress(frontKeyNotesArray[i]);
        }
        keyPress(octaveKey);
      },
    },
    {
      noteName: "A#/Bb",
      noteName1: () => [createNewNote("a#/5", "q", "#")],
      noteName2: () => [createNewNote("bb/5", "q", "b")],
      path: "alto_sax_sounds/High-Bb.mp3",
      keyPressFunction: () => {
        keyPress(frontKeyNotesArray[0]);
        keyPress(bissKey);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "B/Cb",
      noteName1: () => [createNewNote("b/5", "q")],
      noteName2: () => [createNewNote("cb/5", "q", "b")],
      path: "alto_sax_sounds/High-B.mp3",
      keyPressFunction: () => {
        keyPress(frontKeyNotesArray[0]);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "C",
      noteName1: () => [createNewNote("c/6", "q")],
      noteName2: () => [createNewNote("b#/6", "q", "#")],
      path: "alto_sax_sounds/High-C.mp3",
      keyPressFunction: () => {
        keyPress(frontKeyNotesArray[1]);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "C#/Db",
      noteName1: () => [createNewNote("c#/6", "q", "#")],
      noteName2: () => [createNewNote("db/6", "q", "b")],
      path: "alto_sax_sounds/High-Db.mp3",
      keyPressFunction: () => {
        keyPress(octaveKey);
      },
    },
    {
      noteName: "D",
      noteName1: () => [createNewNote("d/6", "q")],
      path: "alto_sax_sounds/High-D.mp3",
      keyPressFunction: () => {
        keyPress(palmKeysArray[1]);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "D#/Eb",
      noteName1: () => [createNewNote("d#/6", "q", "#")],
      noteName2: () => [createNewNote("eb/6", "q", "b")],
      path: "alto_sax_sounds/High-Eb.mp3",
      keyPressFunction: () => {
        keyPress(palmKeysArray[1]);
        keyPress(palmKeysArray[2]);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "E/Fb",
      noteName1: () => [createNewNote("e/6", "q")],
      noteName2: () => [createNewNote("fb/6", "q", "b")],
      path: "alto_sax_sounds/High-E.mp3",
      keyPressFunction: () => {
        keyPress(palmKeysArray[1]);
        keyPress(palmKeysArray[2]);
        keyPress(sideKeysArray[2]);
        keyPress(octaveKey);
      },
    },
    {
      noteName: "F/E#",
      noteName1: () => [createNewNote("f/6", "q")],
      noteName2: () => [createNewNote("e#/6", "q", "#")],
      path: "alto_sax_sounds/High-F.mp3",
      keyPressFunction: () => {
        palmKeysArray.forEach((key, idx) => keyPress(key));
        keyPress(sideKeysArray[2]);
        keyPress(octaveKey);
      },
    },
  ];

  const X = 10;
  const Y = 0;
  const staveWidth = 600;
  const numBeats = 8;
  const beatValue = 4;
  const numMeasures = 4;

  let startingIndex = 0;

  const renderMeasuresToScreen = (numMeasures, index) => {
    for (let i = 0; i < numMeasures; i++) {
      createMeasureAndAddNotes(
        X,
        Y,
        staveWidth,
        numBeats,
        beatValue,
        notes.slice(index, (index += 8))
      );
    }
  };

  renderMeasuresToScreen(numMeasures, startingIndex);

  const audioContext = new AudioContext();

  const playSound = (url) => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      //decodeAudioData asynchronously decodes audio file data from an arrayBuffer that is loaded from fetch. It's then resampled to AudioContext's sampling rate
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

  const allSVGgs = document.querySelectorAll("svg g.vf-notehead");
  const attachNoteClickListener = () => {
    allSVGgs.forEach((g, idx) => {
      const note = notes[idx];
      if (note) {
        g.addEventListener("click", () => {
          playSound(note.path);
          note.keyPressFunction();
          console.log(note);
        });
      }
    });
  };

  attachNoteClickListener();
});
