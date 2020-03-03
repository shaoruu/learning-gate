let perceptron
let visualizer

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
  canvas.parent('my-cvs')

  perceptron = new Perceptron(samples, targets, 0.3, 0.001, 2000)
  visualizer = new Visualizer(samples, targets, perceptron)
  visualizer.forceLine()
}

function draw() {
  // perceptron.step()
  background('#393e46')

  visualizer.drawSamples()
  visualizer.drawLine()
}

setInterval(() => {
  perceptron.step()
  visualizer.calculateLine()
}, 500)
