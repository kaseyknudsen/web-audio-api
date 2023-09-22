const { Factory, Stave, Renderer, Voice, StaveNote, Barline, Accidental } =
  Vex.Flow;

const root = document.querySelector(".root");
const output = document.querySelector("output");

//creates and SV renderer and attaches it to output from our html file
// const vf = new Factory({
//   renderer: { elementId: "output", width: 700, height: 200 },
// });
// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.getElementById("output");
const newDiv = document.getElementById("chrScale");

const renderer = new Renderer(div, Renderer.Backends.SVG);
const renderer2 = new Renderer(newDiv, Renderer.Backends.SVG);
renderer.resize(900, 200);
renderer2.resize(2100, 200);
const context = renderer.getContext();
const context2 = renderer2.getContext();
let X = 210;
const Y = 0;
const MEASURE_WIDTH = 200;
const FORMAT_WIDTH = 275;

// const measuresArray = [
//   {
//     measureNum: 2,
//     notes: [
//       new StaveNote({ keys: ["e/4"], duration: "q" }),
//       new StaveNote({ keys: ["g/4"], duration: "q" }),
//       new StaveNote({ keys: ["f/4"], duration: "q" }),
//       new StaveNote({ keys: ["a/4"], duration: "q" }),
//     ],
//   },
//   {
//     measureNum: 3,
//     notes: [
//       new StaveNote({ keys: ["a/4"], duration: "q" }),
//       new StaveNote({ keys: ["b/4"], duration: "q" }),
//       new StaveNote({ keys: ["c/5"], duration: "q" }),
//       new StaveNote({ keys: ["d/5"], duration: "q" }),
//     ],
//   },
//   {
//     measureNum: 4,
//     notes: [
//       new StaveNote({ keys: ["a/4"], duration: "h" }),
//       new StaveNote({ keys: ["b/4"], duration: "h" }),
//     ],
//   },
// ];

const createNewNote = (key, duration, accidental) => {
  const note = new StaveNote({ keys: [key], duration: duration });
  if (accidental) note.addModifier(new Accidental(accidental));
  return note;
};

const chromaticScale = [
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

//create chromatic scale measure
const staveWidth = 1700;
const stave = new Stave(10, 0, staveWidth);
stave.addClef("treble");
stave.setContext(context2).draw();
const voice = new Voice({ num_beats: 32, beat_value: 4 });
let allNotes = chromaticScale.flatMap((note, idx) => note.notation());
console.log(allNotes);

voice.addTickables(allNotes);
const formatter = new Vex.Flow.Formatter()
  .joinVoices([voice])
  .format([voice], staveWidth); // format to the width of the stave

voice.draw(context2, stave);

stave.setEndBarType(Barline.type.SINGLE);
stave.draw();

//1st measure
// const stave1 = new Stave(10, Y, MEASURE_WIDTH); //x, y, width
// stave1.addClef("treble").addTimeSignature("4/4");
// stave1.setContext(context).draw();

// const notesStave1 = [
//   new StaveNote({ keys: ["d/4"], duration: "q" }),
//   new StaveNote({ keys: ["e/4"], duration: "q" }),
//   new StaveNote({ keys: ["f/4"], duration: "q" }),
//   new StaveNote({ keys: ["g/4"], duration: "q" }),
// ];

// // Create a voice in 4/4 and add above notes
// const voice1 = new Voice({ num_beats: 4, beat_value: 4 });
// voice1.addTickables(notesStave1);

// // Format and justify the notes to 200 pixels
// const formatter1 = new Vex.Flow.Formatter()
//   .joinVoices([voice1])
//   .format([voice1], 120);
// // Format and justify the notes to 200 pixels

// // Render voice
// voice1.draw(context, stave1);

// //create multiple measures
// const newMeasure = measuresArray.forEach((measure, idx) => {
//   const key = idx;
//   const stave = new Stave(X, Y, 200);
//   stave.setContext(context).draw();
//   X += 200;
//   const voice = new Voice({ num_beats: 4, beat_value: 4 });
//   voice.addTickables(measure.notes);
//   const formatter = new Vex.Flow.Formatter()
//     .joinVoices([voice])
//     .format([voice], 120);

//   voice.draw(context, stave);
//   if (key === measuresArray.length - 1) {
//     stave.setEndBarType(Barline.type.SINGLE);
//     stave.draw();
//   }
// });
