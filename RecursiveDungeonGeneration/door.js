class Door {
  constructor(isOpen, direction, color) {
    this.isOpen = isOpen
    this.direction = direction
    this.color = color
    this.x1 = 0
    this.y1 = 0
    this.x2 = 0
    this.y2 = 0
  }

  canOpen(parentRoom, n, m) {
    let canOpen = true

    // Can't open an already open door.
    if (this.isOpen) {
      canOpen = false
    }
    // Check if we're at the end of the matrix.
    else {
      if (this.direction == 0) {
        if (parentRoom.coordinates[1] < 1) {
          canOpen = false
        }
      }
      else if (this.direction == 1) {
        if (parentRoom.coordinates[0] > m - 2) {
          canOpen = false
        }
      }
      else if (this.direction == 2) {
        if (parentRoom.coordinates[1] > n - 2) {
          canOpen = false
        }
      }
      else {
        if (parentRoom.coordinates[0] < 1) {
          canOpen = false
        }
      }
    }

    return canOpen
  }
}
