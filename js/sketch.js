const samples = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
]

const target = [0, 0, 0, 1]

let perceptron
let visualizer

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
  canvas.parent('my-cvs')

  perceptron = new Perceptron(samples, target, 0.01, 0.001, 500)
  visualizer = new Visualizer(samples)
}

function draw() {
  perceptron.step()
  background('#393e46')

  visualizer.drawSamples()
}
