// Dimensions of background matrix.
const n = 15
const m = 30

// Stores background map.
var dungeon

// Initialization method for p5.js library.
function setup() {
  window.canvas = createCanvas(windowWidth, windowHeight)
  canvas.position = (0, 0)
  window.canvas.style('z-index', 1)
  background(220)
  dungeon = generateDungeon(n, m)
}

// TODO: Maybe check out instance mode with p5 to determine  when you draw.
// Render loop for p5.js which runs endlessly.
function draw() {
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (dungeon[row][col] != undefined) {
        square((windowWidth/m)*col, (windowHeight/n)*row, 10)
      }
    }
  }
}
