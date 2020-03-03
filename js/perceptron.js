class Perceptron {
  constructor(samples, targets, eta, maxError, epochs) {
    // Example samples:
    // [[0, 0], [0, 1]]

    // Example targets:
    // [0, 0]

    this.samples = samples
    this.targets = targets
    this.eta = eta
    this.maxError = maxError
    this.epochs = epochs

    this.epochCount = 0

    this.initializeWeights()
  }

  crossEntropy = (yHat, y) => {
    if (y === 1) return -Math.log(yHat)
    return -Math.log(1 - yHat)
  }

  sigmoid = z => 1 / (1 + Math.pow(Math.E, -z))

  derivativeCrossEntropy = (yHat, y) => {
    if (y === 1) return -1 / yHat
    return 1 / (1 - yHat)
  }

  derivativeSigmoid = x => x * (1 - x)

  initializeWeights = () => {
    this.w0 = random(0.02)
    this.w1 = random(0.02)
    this.w2 = random(0.02)

    this.w0 -= 0.01
    this.w1 -= 0.01
    this.w2 -= 0.01
  }

  step = () => {
    this.epochCount++

    if (this.finished) return
    if (this.epochCount > this.epochs) {
      this.finished = true
      console.log('Ran out of epochs')
      return
    }

    const e = []

    for (let j = 0; j < this.samples.length; j++) {
      const sample = this.samples[j]
      const target = this.targets[j]
      const Z = this.w1 * sample[0] + this.w2 * sample[1] + this.w0

      const yHat = this.sigmoid(Z)
      e.push(this.crossEntropy(yHat, target))

      const dEdW1 =
        this.derivativeCrossEntropy(yHat, target) *
        this.derivativeSigmoid(yHat) *
        sample[0]
      const dEdW2 =
        this.derivativeCrossEntropy(yHat, target) *
        this.derivativeSigmoid(yHat) *
        sample[1]
      const dEdW0 =
        this.derivativeCrossEntropy(yHat, target) * this.derivativeSigmoid(yHat)

      this.w0 = this.w0 - this.eta * dEdW0
      this.w1 = this.w1 - this.eta * dEdW1
      this.w2 = this.w2 - this.eta * dEdW2
    }

    const avgError = e.reduce((a, b) => a + b, 0) / this.samples.length

    if (avgError < this.maxError) {
      this.finished = true
      console.log(`Finished learning with average error: ${avgError}`)
    } else {
      console.log(`Epoch #${this.epochCount}: ${avgError}`)
    }

    // const dummyCheck = this.samples.filter((sample, i) => {
    //   return this.test(sample) !== this.targets[i]
    // })
    // if (dummyCheck.length === 0) {
    //   this.finished = true
    // }
  }

  test = sample => {
    const Z = this.w1 * sample[0] + this.w2 * sample[1] + this.w0
    const yHat = this.sigmoid(Z)
    return Math.round(yHat)
  }
}
