// Dimensions of background matrix.
const N = 15
const M = 30

// Stores what has already been drawn so that the map isn't lost on resize.
const drawnRenderables = []

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
  roomSize = min(width / M * .25, height / N * .25)

  // p5.js method to color background.
  background(0)

  // Generate dungeon and retrieve render order of rooms and paths.
  drawOrderQueue = generateDungeon(N, M)
}

// Render loop for p5.js which runs endlessly.
function draw() {
  // Stores colors.
  let c

  // Remove duplicate values in drawnRenderables.
  let uniqueDrawnRenderables = [...new Set(drawnRenderables)];

  // Redraw everything that has already been drawn in case we resized.
  for (let i = 0; i < uniqueDrawnRenderables.length; i++) {
    // Handle renderables of type 'Room'.
    if (uniqueDrawnRenderables[i].constructor.name == "Room") {
      c = color(255, 255, 255)

      // Handle origin.
      if (drawOrderQueue.isEmpty && i == 0)
        c = color(0, 0, 255)

      // Draw room.
      fill(c)
      noStroke()
      square(
        (windowWidth / M) * uniqueDrawnRenderables[i].coordinates[0],
        (windowHeight / N) * uniqueDrawnRenderables[i].coordinates[1],
        roomSize
      )
    }
    // Handle connecting lines.
    else {

    }
  }

  // Check if there are any undrawn renderables left to draw.
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
          (windowWidth / M) * previousRoom.coordinates[0],
          (windowHeight / N) * previousRoom.coordinates[1],
          roomSize
        )

        // Make the next room the active room.
        c = color(0, 0, 255)
        fill(c)
        noStroke()
        square(
          (windowWidth / M) * nextRenderable.coordinates[0],
          (windowHeight / N) * nextRenderable.coordinates[1],
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
          (windowWidth / M) * previousRoom.coordinates[0]
        ) + roomSize/2
        let y1 = (
          (windowHeight / N) * previousRoom.coordinates[1]
        ) + roomSize/2

        // Get endpoint of the connecting line based on door's direction.
        if (direction == 0) {
          x2 = x1
          y2 = (windowHeight / N) * (previousRoom.coordinates[1] - 1)
        }
        else if (direction == 1) {
          x2 = (windowWidth / M) * (previousRoom.coordinates[0] + 1)
          y2 = y1
        }
        else if (direction == 2) {
          x2 = x1
          y2 = (windowHeight / N) * (previousRoom.coordinates[1] + 1)
        }
        else {
          x2 = (windowWidth / M) * (previousRoom.coordinates[0] - 1)
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
        (windowWidth / M) * nextRenderable.coordinates[0],
        (windowHeight / N) * nextRenderable.coordinates[1],
        roomSize
      )

      // For visually setting active rooms.
      previousRoom = nextRenderable
    }

    // Add this renderable to the array of what has already been drawn.
    drawnRenderables.push(nextRenderable)

    // Make the renderable we just manipulated the previous renderable.
    previousRenderable = nextRenderable
  }
}

function windowResized() {
  // Adjust sizes of elements which are being displayed.
  resizeCanvas(windowWidth - 18, windowHeight);
  roomSize = min(width / M * .25, height / N * .25)
  background(0)
}
