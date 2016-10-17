var canvas = $("#test")[0];
var renderer = new Vex.Flow.Renderer(canvas,
  Vex.Flow.Renderer.Backends.CANVAS);

var ctx = renderer.getContext();
var stave = new Vex.Flow.Stave(10, 0, 400);

// Add a treble clef
stave.addClef("treble");
stave.setContext(ctx).draw();

function newAnnotation(text) {
  return (
      new Vex.Flow.Annotation(text)).
      setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.BOTTOM);
  }

var notes = [
  new Vex.Flow.StaveNote({ keys: ["eb/5"], duration: "8" })
    .addAccidental(0, new Vex.Flow.Accidental("b"))
    .addAnnotation(0, newAnnotation("Al")),
  new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "8" })
    .addAnnotation(0, newAnnotation("-ex"))
];

var notes2 = [
new Vex.Flow.StaveNote({ keys: ["eb/5"], duration: "8" })
  .addAccidental(0, new Vex.Flow.Accidental("b"))
  .addAnnotation(0, newAnnotation("-and")),
new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "8" })
  .addAnnotation(0, newAnnotation("-er"))];

var notes3 = [
new Vex.Flow.StaveNote({ keys: ["eb/5"], duration: "8" })
  .addAccidental(0, new Vex.Flow.Accidental("b"))
  .addAnnotation(0, newAnnotation("Ham")),
new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "8" })
  .addAnnotation(0, newAnnotation("-il"))];

var notes4 = [
new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "q" })
  .addAnnotation(0, newAnnotation("-ton"))
];

var beam = new Vex.Flow.Beam(notes);
var beam2 = new Vex.Flow.Beam(notes2);
var beam3 = new Vex.Flow.Beam(notes3);

var all_notes = notes.concat(notes2).concat(notes3).concat(notes4);

// Helper function to justify and draw a 4/4 voice
Vex.Flow.Formatter.FormatAndDraw(ctx, stave, all_notes);

// Render beams
beam.setContext(ctx).draw();
beam2.setContext(ctx).draw();
beam3.setContext(ctx).draw();
