// Dimensions of background matrix.
const n = 15
const m = 30

// Stores background map.
var roomQueue

// Initialization method for p5.js library.
function setup() {
  window.canvas = createCanvas(windowWidth, windowHeight)
  canvas.position = (0, 0)
  window.canvas.style('z-index', 1)
  background(220)
  roomQueue = generateDungeon(n, m)
}

// TODO: Maybe check out instance mode with p5 to determine  when you draw.
// Render loop for p5.js which runs endlessly.
function draw() {
  let nextRoom
  if (!roomQueue.isEmpty) {
     nextRoom = roomQueue.dequeue()
  }
  square((windowWidth/m)*nextRoom.coordinates[0], (windowHeight/n)*nextRoom.coordinates[1], 10)
}
