let perceptron
let visualizer

let myShader
let shaderTexture

function preload() {
  myShader = loadShader('shaders/test.vert', 'shaders/test.frag')
}

function setup() {
  const canvas = createCanvas(CANVAS_DIMENSION, CANVAS_DIMENSION, WEBGL)
  canvas.parent('my-cvs')

  shaderTexture = createGraphics(CANVAS_DIMENSION, CANVAS_DIMENSION, WEBGL)

  perceptron = new Perceptron(samples, targets, 0.2, 0.001, 2000)
  visualizer = new Visualizer(samples, targets, perceptron)
  visualizer.forceLine()
}

function draw() {
  // perceptron.step()
  shaderTexture.shader(myShader)
  shaderTexture.rect(0, 0, width, height)

  background('#393e46')

  visualizer.drawLine()
  visualizer.drawSamples()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
shaderTexture = createGraphics(710, 400, WEBGL)

setInterval(() => {
  perceptron.step()
  visualizer.calculateLine()
}, 500)
