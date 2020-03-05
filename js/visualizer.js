class Visualizer {
  constructor(samples, targets, perceptron) {
    this.samples = [...samples]
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
      const x = first * width + width
      const y = CANVAS_DIMENSION - width - second * width

      let color
      const yHat = this.perceptron.test([first, second])
      if (yHat) color = '#facf5a'
      else color = '#f95959'

      push()
      noStroke()
      fill(color)
      circle(x, y, width * 0.1)
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

    push()
    stroke('#bbe1fa')
    strokeWeight(5)
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

  addSample = sample => {
    console.log(sample)
    this.samples.push(sample)
  }
}
