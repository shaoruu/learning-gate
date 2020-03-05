let perceptron
let visualizer

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
  canvas.parent('my-cvs')

  perceptron = new Perceptron(samples, targets, 0.2, 0.001, 2000)
  visualizer = new Visualizer(samples, targets, perceptron)
  visualizer.forceLine()
}

function draw() {
  background('#393e46')

  visualizer.drawLine()
  visualizer.drawSamples()
}

function windowResized() {
  resizeCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION)
}

function mouseClicked() {
  addMouseSample()
}

function mouseDragged() {
  addMouseSample()
}

const addMouseSample = () =>
  visualizer.addSample([
    (mouseX / CANVAS_DIMENSION) * 3 - 1,
    -(mouseY / CANVAS_DIMENSION) * 3 + 2
  ])

setInterval(() => {
  perceptron.step()
  visualizer.calculateLine()
}, 500)
