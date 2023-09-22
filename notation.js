const { Factory, Stave, Renderer, Voice, StaveNote } = Vex.Flow;

const output = document.querySelector("output");

//creates and SV renderer and attaches it to output from our html file
// const vf = new Factory({
//   renderer: { elementId: "output", width: 700, height: 200 },
// });
// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);
renderer.resize(700, 200);
const context = renderer.getContext();
const X = 10;
const Y = 0;
const MEASURE_WIDTH = 300;
const FORMAT_WIDTH = 275;

const stave1 = new Stave(X, Y, MEASURE_WIDTH); //x, y, width
stave1.addClef("treble").addTimeSignature("4/4");
stave1.setContext(context).draw();

const stave2 = new Stave(MEASURE_WIDTH + X, Y, MEASURE_WIDTH); // Starts where the first stave ends
stave2.setContext(context).draw();

const notesStave1 = [
  new StaveNote({ keys: ["d/4"], duration: "q" }),
  new StaveNote({ keys: ["e/4"], duration: "q" }),
  new StaveNote({ keys: ["f/4"], duration: "q" }),
  new StaveNote({ keys: ["g/4"], duration: "q" }),
];

// Create a voice in 4/4 and add above notes
const voice = new Voice({ num_beats: 4, beat_value: 4 });
voice.addTickables(notesStave1);

// Format and justify the notes to 300 pixels
const formatter = new Vex.Flow.Formatter()
  .joinVoices([voice])
  .format([voice], FORMAT_WIDTH);

// Render voice
voice.draw(context, stave1);
