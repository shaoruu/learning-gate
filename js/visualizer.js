class Visualizer {
  constructor(samples) {
    this.samples = samples
  }

  drawSamples = () => {
    this.calculateLine()

    this.samples.forEach(([first, second]) => {
      const width = CANVAS_DIMENSION / 3
      const x = first * width + width
      const y = CANVAS_DIMENSION - width - second * width

      push()
      fill('#29a19c')
      circle(x, y, 20)
      pop()
    })
  }

  calculateLine = () => {}
}
