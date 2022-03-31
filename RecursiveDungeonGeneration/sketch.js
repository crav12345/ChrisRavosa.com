// Dimensions of background matrix.
const n = 15
const m = 30
const roomSize = 10
const connectionSize = 5

// Variables to store and determine render order of background map.
var currLocationQueue
let currLocation
let previousLocation

// Variables to store movement of connection lines.
let xMod = 0
let yMod = 0

// Determines whether to draw a connection or draw a room.
var drawRoom = true

// Initialization method for p5.js library.
function setup() {
  window.canvas = createCanvas(windowWidth, windowHeight)
  canvas.position = (0, 0)
  window.canvas.style('z-index', 1)
  background(220)

  currLocationQueue = generateDungeon(n, m)

  currLocation = currLocationQueue.dequeue()

  let c = color(0, 0, 255)
  fill(c)
  square((windowWidth / m) * currLocation.coordinates[0],(windowHeight / n) * currLocation.coordinates[1], roomSize)
}

// Render loop for p5.js which runs endlessly.
function draw() {
  let c

  if (!currLocationQueue.isEmpty) {
    nextLocation = currLocationQueue.dequeue()

    if (nextLocation != currLocation) {
      c = color(255, 255, 255)
      fill(c)
      square((windowWidth / m) * currLocation.coordinates[0], (windowHeight / n) * currLocation.coordinates[1], roomSize)

      c = color(0, 0, 255)
      fill(c)
      square((windowWidth / m) * nextLocation.coordinates[0], (windowHeight / n) * nextLocation.coordinates[1], roomSize)
    }

    currLocation = nextLocation
  }
}
