const { Factory, Stave, Renderer, Voice, StaveNote } = Vex.Flow;

const output = document.querySelector("output");

//creates and SV renderer and attaches it to output from our html file
// const vf = new Factory({
//   renderer: { elementId: "output", width: 700, height: 200 },
// });
// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);
renderer.resize(800, 200);
const context = renderer.getContext();
let X = 210;
const Y = 0;
const MEASURE_WIDTH = 200;
const FORMAT_WIDTH = 275;
const measures = [1, 2, 3, 4];

const measuresArray = [
  {
    measureNum: 2,
    notes: [
      new StaveNote({ keys: ["e/4"], duration: "q" }),
      new StaveNote({ keys: ["g/4"], duration: "q" }),
      new StaveNote({ keys: ["f/4"], duration: "q" }),
      new StaveNote({ keys: ["a/4"], duration: "q" }),
    ],
  },
  {
    measureNum: 3,
    notes: [
      new StaveNote({ keys: ["a/4"], duration: "q" }),
      new StaveNote({ keys: ["b/4"], duration: "q" }),
      new StaveNote({ keys: ["c/5"], duration: "q" }),
      new StaveNote({ keys: ["d/5"], duration: "q" }),
    ],
  },
];

//1st measure
const stave1 = new Stave(10, Y, MEASURE_WIDTH); //x, y, width
stave1.addClef("treble").addTimeSignature("4/4");
stave1.setContext(context).draw();

//create multiple measures
const newMeasure = measuresArray.map((measure, idx) => {
  const stave = new Stave(X, Y, MEASURE_WIDTH);
  stave.setContext(context).draw();
  X += 200;
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.addTickables(measure.notes);
  const formatter = new Vex.Flow.Formatter()
    .joinVoices([voice])
    .format([voice], 120);
  voice.draw(context, stave);
});

const notesStave1 = [
  new StaveNote({ keys: ["d/4"], duration: "q" }),
  new StaveNote({ keys: ["e/4"], duration: "q" }),
  new StaveNote({ keys: ["f/4"], duration: "q" }),
  new StaveNote({ keys: ["g/4"], duration: "q" }),
];

// Create a voice in 4/4 and add above notes
const voice1 = new Voice({ num_beats: 4, beat_value: 4 });
voice1.addTickables(notesStave1);

// Format and justify the notes to 200 pixels
const formatter1 = new Vex.Flow.Formatter()
  .joinVoices([voice1])
  .format([voice1], 120);
// Format and justify the notes to 200 pixels

// Render voice
voice1.draw(context, stave1);
