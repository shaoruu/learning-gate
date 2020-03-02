class Visualizer {
  constructor(samples, perceptron) {
    this.samples = samples
    this.perceptron = perceptron
  }

  drawSamples = () => {
    this.drawLine()

    this.samples.forEach(([first, second]) => {
      const width = CANVAS_DIMENSION / 3
      const x = first * width + width
      const y = CANVAS_DIMENSION - width - second * width

      push()
      fill('#29a19c')
      // circle(x, y, 20)
      textAlign(CENTER, CENTER)
      text(`${first}:${second}`, x, y)
      pop()
    })
  }

  drawLine = () => {
    const weights = this.perceptron.weights
    const threshold = this.perceptron.threshold

    const w1 = weights[0]
    const w2 = weights[1]

    const x1 = -10
    const x2 = CANVAS_DIMENSION + 10

    const y1 = CANVAS_DIMENSION - (threshold - x1 * w2) / w1
    const y2 = CANVAS_DIMENSION - (threshold - x2 * w1) / w2

    push()
    stroke('#bbe1fa')
    line(x1, y1, x2, y2)
    pop()
  }
}
