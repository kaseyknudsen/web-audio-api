const { Factory, Stave, Renderer } = Vex.Flow;

const output = document.querySelector("output");

//creates and SV renderer and attaches it to output from our html file
const vf = new Factory({
  renderer: { elementId: "output", width: 700, height: 200 },
});

const WIDTH = 300;
const X = 10;

const scoreContext = vf.getContext();
const stave1 = new Stave(X, 0, WIDTH); //x, y, width
stave1.addClef("treble").addTimeSignature("4/4");
stave1.setContext(scoreContext).draw();

const stave2 = new Stave(WIDTH + X, 0, WIDTH); // Starts where the first stave ends
stave2.setContext(scoreContext).draw();

const notesStave1 = []
const notesStave2 = []