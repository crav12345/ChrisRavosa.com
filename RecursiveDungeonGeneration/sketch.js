// Dimensions of background matrix.
const n = 15
const m = 30

// Dimensions of rooms.
let roomSize

// Variables to store and determine render order of background map.
var drawOrderQueue
let previousRenderable
let previousRoom

// Initialization method for p5.js library.
function setup() {
  window.canvas = createCanvas(windowWidth - 18, windowHeight)
  window.canvas.position = (0, 0)
  window.canvas.style('z-index', 1)

  // Determine the render size of room squares based on viewport.
  roomSize = min(width / m * .25, height / n * .25)

  // p5.js method to color background.
  background(0)

  // Generate dungeon and retrieve render order of rooms and paths.
  drawOrderQueue = generateDungeon(n, m)
}

// Render loop for p5.js which runs endlessly.
function draw() {
  // Stores colors.
  let c

  if (!drawOrderQueue.isEmpty) {
    // Get the next room in the queue.
    let nextRenderable = drawOrderQueue.dequeue()

    // If previous renderable exists and the next renderable is different from
    // the previous renderable, we need to do some things.
    if (previousRenderable && nextRenderable != previousRenderable) {
      // Handle renderables of type 'Room'.
      if (nextRenderable.constructor.name == "Room") {
        // Make the current room inactive.
        c = color(255, 255, 255)
        fill(c)
        noStroke()
        square(
          (windowWidth / m) * previousRoom.coordinates[0],
          (windowHeight / n) * previousRoom.coordinates[1],
          roomSize
        )

        // Make the next room the active room.
        c = color(0, 0, 255)
        fill(c)
        noStroke()
        square(
          (windowWidth / m) * nextRenderable.coordinates[0],
          (windowHeight / n) * nextRenderable.coordinates[1],
          roomSize
        )

        // For visually setting active rooms.
        previousRoom = nextRenderable
      }
      // Handle renderables of type 'Door'.
      else {
        let direction = nextRenderable.direction
        let x2
        let y2

        // Start point of the new connecting line.
        let x1 = (
          (windowWidth / m) * previousRoom.coordinates[0]
        ) + roomSize/2
        let y1 = (
          (windowHeight / n) * previousRoom.coordinates[1]
        ) + roomSize/2

        // Get endpoint of the connecting line based on door's direction.
        if (direction == 0) {
          x2 = x1
          y2 = (windowHeight / n) * (previousRoom.coordinates[1] - 1)
        }
        else if (direction == 1) {
          x2 = (windowWidth / m) * (previousRoom.coordinates[0] + 1)
          y2 = y1
        }
        else if (direction == 2) {
          x2 = x1
          y2 = (windowHeight / n) * (previousRoom.coordinates[1] + 1)
        }
        else {
          x2 = (windowWidth / m) * (previousRoom.coordinates[0] - 1)
          y2 = y1
        }

        // Draw the connecting line.
        stroke(255, 255, 255)
        line(x1, y1, x2, y2, 0, 0)
      }
    }
    // If previous renderable doesn't exist, it means we must place the origin.
    else {
      c = color(0, 0, 255)
      fill(c)
      noStroke()
      square(
        (windowWidth / m) * nextRenderable.coordinates[0],
        (windowHeight / n) * nextRenderable.coordinates[1],
        roomSize
      )

      // For visually setting active rooms.
      previousRoom = nextRenderable
    }

    // Make the renderable we just manipulated the previous renderable.
    previousRenderable = nextRenderable
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 18, windowHeight);
  roomSize = min(width / m * .25, height / n * .25);
  background(0)
}
