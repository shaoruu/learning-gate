const errorDOM = document.getElementById('error')
const epochDOM = document.getElementById('epoch')

const w0DOM = document.getElementById('w0')
const w1DOM = document.getElementById('w1')
const w2DOM = document.getElementById('w2')

const randomizeDOM = document.getElementById('randomize')
randomizeDOM.addEventListener(
  'click',
  () => {
    perceptron.randomizeWeights()
    visualizer.forceLine()
  },
  false
)
