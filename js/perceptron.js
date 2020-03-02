class Perceptron {
  constructor(samples, target, learningRate, maxError, epochs) {
    // Example samples:
    // [[0, 0], [0, 1]]

    // Example target:
    // [0, 0]

    this.samples = samples
    this.target = target
    this.learningRate = learningRate
    this.maxError = maxError
    this.epochs = epochs

    this.epochCount = 0

    this.initializeWeights()
  }

  initializeWeights = () => {
    this.weights = [random(5), random(5)]
    this.weights = this.weights.map(w => w - 2.5)
    this.threshold = random(5)
    this.threshold -= 2.5
  }

  step = () => {
    if (this.finished) return

    if (this.epochCount === this.epochs) {
      this.finished = true
      return
    }

    let totalError = 0

    // LOOPING THROUGH EPOCHS
    for (let j = 0; j < this.samples.length; j++) {
      const sample = this.samples[j]
      const target = this.target[j]

      const output =
        this.weights.map((w, ii) => w * sample[ii]).reduce((a, b) => a + b, 0) - this.threshold
      const error = target - output

      for (let k = 0; k < this.weights.length; k++) {
        const input = sample[k]

        // deltaW = lr * error * input
        const deltaW = this.learningRate * error * input
        this.weights[k] += deltaW

        totalError += error
      }

      const deltaThreshold = this.learningRate * error * -1
      this.threshold += deltaThreshold
    }

    // DRAW
    if (totalError < this.maxError) {
      console.log(`Finished learning after ${this.epochCount} epochs.`)
      this.finished = true
      return
    }

    this.epochCount++
    console.log(`Epoch ${this.epochCount}: ${totalError}`)
  }
}
