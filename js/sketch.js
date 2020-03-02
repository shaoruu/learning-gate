let perceptron
let visualizer

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
  canvas.parent('my-cvs')

  perceptron = new Perceptron(samples, target, 0.01, 0.001, 500)
  visualizer = new Visualizer(samples, perceptron)
}

function draw() {
  perceptron.step()
  background('#393e46')

  visualizer.drawSamples()
}
