// Dimensions of background matrix.
const n = 15
const m = 30

// Dimensions of rooms.
let roomSize

// Variables to store and determine render order of background map.
var roomOrderQueue
let currentRoom

// Initialization method for p5.js library.
function setup() {
  window.canvas = createCanvas(windowWidth - 18, windowHeight)
  window.canvas.position = (0, 0)
  window.canvas.style('z-index', 1)

  roomSize = min(width / m * .25, height / n * .25)

  background(0)

  roomOrderQueue = generateDungeon(n, m)
}

// Render loop for p5.js which runs endlessly.
function draw() {
  // Stores colors.
  let c

  // See if we have any more rooms to place.
  if (!roomOrderQueue.isEmpty) {
    // Get the next room in the queue.
    nextRoom = roomOrderQueue.dequeue()

    // If the current room is the same is the next one, a door wasn't placed,
    // so don't do anything. Also, make sure the origin exists.
    if (currentRoom && nextRoom != currentRoom) {
      // Make the current room inactive.
      c = color(255, 255, 255)
      fill(c)
      noStroke()
      square(
        (windowWidth / m) * currentRoom.coordinates[0],
        (windowHeight / n) * currentRoom.coordinates[1],
        roomSize
      )

      // Make the next room the active room.
      c = color(0, 0, 255)
      fill(c)
      noStroke()
      square(
        (windowWidth / m) * nextRoom.coordinates[0],
        (windowHeight / n) * nextRoom.coordinates[1],
        roomSize
      )
    }
    // If currentRoom is undefined, it means we have to place the origin.
    else {
      c = color(0, 0, 255)
      fill(c)
      noStroke()
      square(
        (windowWidth / m) * nextRoom.coordinates[0],
        (windowHeight / n) * nextRoom.coordinates[1],
        roomSize
      )
    }

    // Make the active room the current room.
    currentRoom = nextRoom
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 18, windowHeight);
  roomSize = min(width / m * .25, height / n * .25);
  background(0)
}
