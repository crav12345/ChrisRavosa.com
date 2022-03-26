function setup() {
  window.canvas = createCanvas(windowWidth - 18, windowHeight)
  canvas.position = (0, 0)
  window.canvas.style('z-index', 1)
  background(220)
}

function draw() {
  if (mouseIsPressed) {
    fill (0)
  } else {
    fill(255)
  }
  ellipse(mouseX, mouseY, 80, 80)
}
