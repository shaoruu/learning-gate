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
    const width = CANVAS_DIMENSION / 3

    this.samples.forEach(([first, second], i) => {
      const x = first * width + width - CANVAS_DIMENSION / 2
      const y = CANVAS_DIMENSION - width - second * width - CANVAS_DIMENSION / 2

      let color
      const yHat = this.perceptron.test([first, second])
      if (yHat) color = 'yellow'
      else color = 'red'

      push()
      fill(color)
      circle(x, y, width * 0.1)
      // textAlign(CENTER, CENTER)
      // text(`${first}:${second}:${this.targets[i]}`, x, y)
      pop()
    })
  }

  drawBackground = () => {
    const width = CANVAS_DIMENSION / 3

    for (let i = -1; i <= 2; i += 0.1) {
      for (let j = -1; j <= 2; j += 0.1) {
        let color
        const yHat = this.perceptron.test([i, j])
        if (yHat) color = 'yellow'
        else color = 'red'

        const x = i * width + width + 0.05 * width
        const y = CANVAS_DIMENSION - j * width - width - 0.05 * width

        push()
        rectMode(CENTER)
        noStroke()
        fill(color)
        square(x, y, width * 0.1)
        pop()
      }
    }
  }

  drawLine = () => {
    const amount = 0.1

    const v1 = p5.Vector.lerp(this.point1, this.nextPoint1, amount)
    const v2 = p5.Vector.lerp(this.point2, this.nextPoint2, amount)

    // const slope = (v2.x - v1.x) / (v2.y - v1.y)
    // const perpendicular = -1 / slope

    // const deltaV1X = -v1.x
    // const deltaV1Y = deltaV1X * slope
    // const deltaV2X = CANVAS_DIMENSION - v2.x
    // const deltaV2Y = deltaV2X * slope

    // v1.x += deltaV1X
    // v1.y += deltaV1Y
    // v2.x += deltaV2X
    // v2.y += deltaV2Y

    // const extrude = CANVAS_DIMENSION

    // const v3 = v1.copy()
    // v3.x += extrude
    // v3.y += extrude * perpendicular

    // const v4 = v2.copy()
    // v4.x += extrude
    // v4.y += extrude * perpendicular

    push()
    stroke('#bbe1fa')
    strokeWeight(20)
    // fill('#bbe1fa')
    // line(inc + (w0 / w1) * inc, inc, inc, inc - (w0 / w2) * inc)
    // beginShape()
    // vertex(v1.x, v1.y)
    // vertex(v2.x, v2.y)
    // vertex(v4.x, v4.y)
    // vertex(v3.x, v3.y)
    // endShape(CLOSE)
    line(
      v1.x - CANVAS_DIMENSION / 2,
      v1.y - CANVAS_DIMENSION / 2,
      v2.x - CANVAS_DIMENSION / 2,
      v2.y - CANVAS_DIMENSION / 2
    )
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
