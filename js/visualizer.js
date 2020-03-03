class Visualizer {
  constructor(samples, targets, perceptron) {
    this.samples = samples
    this.targets = targets
    this.perceptron = perceptron

    console.log(createVector(1, 2))

    this.point1 = createVector(0, 0)
    this.point2 = createVector(0, 0)

    this.nextPoint1 = createVector(0, 0)
    this.nextPoint2 = createVector(0, 0)
  }

  drawSamples = () => {
    this.samples.forEach(([first, second], i) => {
      const width = CANVAS_DIMENSION / 3
      const x = first * width + width
      const y = CANVAS_DIMENSION - width - second * width

      let color
      const yHat = this.perceptron.test([first, second])
      if (yHat) color = 'yellow'
      else color = 'red'

      push()
      fill(color)
      circle(x, y, 20)
      // textAlign(CENTER, CENTER)
      // text(`${first}:${second}:${this.targets[i]}`, x, y)
      pop()
    })
  }

  drawLine = () => {
    const amount = 0.1

    const v1 = p5.Vector.lerp(this.point1, this.nextPoint1, amount)
    const v2 = p5.Vector.lerp(this.point2, this.nextPoint2, amount)

    push()
    stroke('#bbe1fa')
    // line(inc + (w0 / w1) * inc, inc, inc, inc - (w0 / w2) * inc)
    line(v1.x, v1.y, v2.x, v2.y)
    pop()

    this.point1 = v1
    this.point2 = v2
  }

  calculateLine = () => {
    const inc = CANVAS_DIMENSION
    const width = CANVAS_DIMENSION / 3

    const w0 = this.perceptron.w0
    const w1 = this.perceptron.w1
    const w2 = this.perceptron.w2

    const left = -1
    const right = 2

    this.nextPoint1 = createVector(
      0,
      inc - (width * (-w0 - left * w2)) / w1 - width
    )
    this.nextPoint2 = createVector(
      inc,
      inc - (width * (-w0 - right * w2)) / w1 - width
    )
  }

  forceLine = () => {
    this.calculateLine()
    this.point1 = this.nextPoint1
    this.point2 = this.nextPoint2
  }
}
