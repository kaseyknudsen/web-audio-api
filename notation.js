const { Factory, Stave, Renderer, Voice, StaveNote, Barline, Accidental } =
  Vex.Flow;

const sax = document.querySelector(".sax");
const frontKeys = document.querySelector(".front-keys");
const palmKeys = document.querySelector(".palm-keys");
const sideKeys = document.querySelector(".side-keys");
const patchKeys = document.querySelector(".patch-keys");
const chromaticScale = document.querySelector(".chromatic-scale");
const root = document.querySelector(".root");
const output = document.querySelector("output");
const div = document.getElementById("output");
const newDiv = document.getElementById("chrScale");

const createNewNote = (key, duration, accidental) => {
  const note = new StaveNote({ keys: [key], duration: duration });
  if (accidental) note.addModifier(new Accidental(accidental));
  return note;
};

const createMeasure = (X, Y, staveWidth, numBeats, beatValue, notesArray) => {
  //create chromatic scale measure
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(900, 200);
  const context = renderer.getContext();
  const stave = new Stave(X, Y, staveWidth);
  if (notesArray === notes1) stave.addClef("treble");
  stave.setContext(context).draw();
  const voice = new Voice({ num_beats: numBeats, beat_value: beatValue });
  let allNotes = notesArray.flatMap((note, idx) => note.notation());

  voice.addTickables(allNotes);
  const formatter = new Vex.Flow.Formatter()
    .joinVoices([voice])
    .format([voice], staveWidth);
  voice.draw(context, stave);

  stave.setEndBarType(Barline.type.SINGLE);
  stave.draw();
  if (notesArray === notes4) {
    stave.setEndBarType(Barline.type.END);
    stave.draw();
  }
  return allNotes;
};

const notes1 = [
  {
    noteName: "Low A#",
    notation: () => [createNewNote("a#/3", "q", "#")],
  },
  {
    noteName: "Low B",
    notation: () => [createNewNote("b/3", "q")],
  },
  {
    noteName: "Low C",
    notation: () => [createNewNote("c/4", "q")],
  },
  {
    noteName: "low C#",
    notation: () => [createNewNote("c#/4", "q", "#")],
  },
  {
    noteName: "low D",
    notation: () => [createNewNote("d/4", "q")],
  },
  {
    noteName: "low D#",
    notation: () => [createNewNote("d#/4", "q", "#")],
  },
  {
    noteName: "low E",
    notation: () => [createNewNote("e/4", "q")],
  },
  {
    noteName: "low F",
    notation: () => [createNewNote("f/4", "q")],
  },
];

const notes2 = [
  {
    noteName: "low F#",
    notation: () => [createNewNote("f#/4", "q", "#")],
  },
  {
    noteName: "middle G",
    notation: () => [createNewNote("g/4", "q")],
  },
  {
    noteName: "middle G#",
    notation: () => [createNewNote("g#/4", "q", "#")],
  },
  {
    noteName: "middle A",
    notation: () => [createNewNote("a/4", "q")],
  },
  {
    noteName: "middle Bb",
    notation: () => [createNewNote("a#/4", "q", "#")],
  },
  {
    noteName: "middle B",
    notation: () => [createNewNote("b/4", "q")],
  },
  {
    noteName: "middle C",
    notation: () => [createNewNote("c/5", "q")],
  },
  {
    noteName: "middle C#",
    notation: () => [createNewNote("c#/5", "q", "#")],
  },
];
const notes3 = [
  {
    noteName: "middle D",
    notation: () => [createNewNote("d/5", "q")],
  },
  {
    noteName: "middle D#",
    notation: () => [createNewNote("d#/5", "q", "#")],
  },
  {
    noteName: "middle E",
    notation: () => [createNewNote("e/5", "q")],
  },
  {
    noteName: "middle F",
    notation: () => [createNewNote("f/5", "q")],
  },
  {
    noteName: "middle F#",
    notation: () => [createNewNote("f#/5", "q", "#")],
  },
  {
    noteName: "high G",
    notation: () => [createNewNote("g/5", "q")],
  },
  {
    noteName: "high G#",
    notation: () => [createNewNote("g#/5", "q", "#")],
  },
  {
    noteName: "high A",
    notation: () => [createNewNote("a/5", "q")],
  },
];

const notes4 = [
  {
    noteName: "high A#",
    notation: () => [createNewNote("a#/5", "q", "#")],
  },
  {
    noteName: "high B",
    notation: () => [createNewNote("b/5", "q")],
  },
  {
    noteName: "high C",
    notation: () => [createNewNote("c/6", "q")],
  },
  {
    noteName: "high C#",
    notation: () => [createNewNote("c#/6", "q", "#")],
  },
  {
    noteName: "high D",
    notation: () => [createNewNote("d/6", "q")],
  },
  {
    noteName: "high D#",
    notation: () => [createNewNote("d#/6", "q", "#")],
  },
  {
    noteName: "high E",
    notation: () => [createNewNote("e/6", "q")],
  },
  {
    noteName: "high F",
    notation: () => [createNewNote("f/6", "q")],
  },
];

//X, Y, staveWidth, numBeats, beatValue, notesArray
createMeasure(10, 0, 600, 8, 4, notes1);
createMeasure(10, 0, 600, 8, 4, notes2);
createMeasure(10, 0, 600, 8, 4, notes3);
createMeasure(10, 0, 600, 8, 4, notes4);

// const svgElements = document.getElementsByTagName("svg")
// const gtags = document.getElementsByTagName("g")
// console.log(svgElements[0])
// console.log(gtags)

const allNotes = [
  { noteName: "Low Bb", path: "alto_sax_sounds/Low-Bb.mp3" },
  { noteName: "Low B", path: "alto_sax_sounds/Low-B.mp3" },
  { noteName: "Low C", path: "alto_sax_sounds/Low-C.mp3" },
  { noteName: "Low C#", path: "alto_sax_sounds/Low-Db.mp3" },
  { noteName: "Low D", path: "alto_sax_sounds/Low-D.mp3" },
  { noteName: "Low D#", path: "alto_sax_sounds/Low-Eb.mp3" },
  { noteName: "Low E", path: "alto_sax_sounds/Low-E.mp3" },
  { noteName: "Low F", path: "alto_sax_sounds/Low-F.mp3" },
  { noteName: "Low F#", path: "alto_sax_sounds/Low-Gb.mp3" },
  { noteName: "Middle G", path: "alto_sax_sounds/Middle-G.mp3" },
  { noteName: "Middle G#", path: "alto_sax_sounds/Middle-Ab.mp3" },
  { noteName: "Middle A", path: "alto_sax_sounds/Middle-A.mp3" },
  { noteName: "Middle A#", path: "alto_sax_sounds/Middle-Bb.mp3" },
  { noteName: "Middle B", path: "alto_sax_sounds/Middle-B.mp3" },
  { noteName: "Middle C", path: "alto_sax_sounds/Middle-C.mp3" },
  { noteName: "Middle C#", path: "alto_sax_sounds/Middle-Db.mp3" },
  { noteName: "Middle D", path: "alto_sax_sounds/Middle-D.mp3" },
  { noteName: "Middle D#", path: "alto_sax_sounds/Middle-Eb.mp3" },
  { noteName: "Middle E", path: "alto_sax_sounds/Middle-E.mp3" },
  { noteName: "Middle F", path: "alto_sax_sounds/Middle-F.mp3" },
  { noteName: "High F#", path: "alto_sax_sounds/High-Gb.mp3" },
  { noteName: "High G", path: "alto_sax_sounds/High-G.mp3" },
  { noteName: "High G#", path: "alto_sax_sounds/High-Ab.mp3" },
  { noteName: "High A", path: "alto_sax_sounds/High-A.mp3" },
  { noteName: "High A#", path: "alto_sax_sounds/High-A#.mp3" },
  { noteName: "High B", path: "alto_sax_sounds/High-B.mp3" },
  { noteName: "High C", path: "alto_sax_sounds/High-C.mp3" },
  { noteName: "High C#", path: "alto_sax_sounds/High-Db.mp3" },
  { noteName: "High D", path: "alto_sax_sounds/High-D.mp3" },
  { noteName: "High D#", path: "alto_sax_sounds/High-Eb.mp3" },
  { noteName: "High E", path: "alto_sax_sounds/High-E.mp3" },
  { noteName: "High F", path: "alto_sax_sounds/High-F.mp3" },
];

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

const attachNoteClickListener = () => {
  for (let g of document.querySelectorAll("svg g")) {
    g.addEventListener("click", () => {
      playSound(allNotes[0].path);
    });
  }
};

attachNoteClickListener();
