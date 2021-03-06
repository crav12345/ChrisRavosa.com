// Allow rooms to be assigned colors for drawing in sketch.js.
const WHITE = [255, 255, 255]
const BLUE = [110, 181, 255]
const GREEN = [191, 252, 198]
const PURPLE = [178, 141, 255]
const YELLOW = [231, 255, 172]

// For randomly selecting colors.
const colors = [WHITE] // , BLUE, GREEN, PURPLE, YELLOW]

// Queue to determine the draw order of the rooms in the dungeon.
// Can have directional queues to make this animation cooler.
var drawOrderQueue = new Queue()

/**
 * Creates a matrix of Room objects of height 'n' and length 'm'. The matrix
 * represents the map of a dungeon.
 *
 * @param {number} n - the height of the map
 * @param {number} m - the length of the map
 */
function generateDungeon(n, m) {
  // Prevent page from refreshing.
  event.preventDefault()

  // Safety check to make sure n and m are non-zero.
  if (n < 1) {
    n = 1
  }
  if (m < 1) {
    m = 1
  }

  // Create worldMap matrix. Arrays in JS are dynamic, so setting length with n
  // and m is not best practice.
  let worldMap = new Array()
  for (let i = 0; i < n; i++) {
    worldMap[i] = new Array()
    for (let j = 0; j < m; j++) {
      worldMap[i][j] = undefined
    }
  }

  // Set our origin.
  let origin = new Room(
    [
      new Door(false, 0, randomColor()),
      new Door(false, 1, randomColor()),
      new Door(false, 2, randomColor()),
      new Door(false, 3, randomColor())
    ],
    [Math.floor(m/2), Math.floor(n/2)],
    true,
    randomColor()
  )
  worldMap[origin.coordinates[1]][origin.coordinates[0]] = origin

  // Recursively map paths out of the origin.
  pathify(origin, worldMap, n, m)

  // Send our new render queue back.
  return drawOrderQueue
}

/**
 * Recursively snakes paths out of the walls of a room object.
 *
 * @param {Room} currentRoom - room having paths added to it
 * @param {Array} worldMap - matrix representing the dungeon
 */
 function pathify(currentRoom, worldMap, n, m) {
   // Iterate through every door in the room.
   for (let i = 0; i < currentRoom.doors.length; i++) {
     // So we know where we are in recursion for rendering.
     drawOrderQueue.enqueue(currentRoom)

     // Check if this door can be opened.
     if (currentRoom.doors[i].canOpen(currentRoom, n, m)) {
       // Flip a coin to see whether to open a door.
       if (Math.floor(Math.random() * 2) == 1) {
         // Open the door.
         currentRoom.doors[i].isOpen = true

         // Add the path to the drawOrderQueue.
         drawOrderQueue.enqueue(currentRoom.doors[i])

         // Locate the next position and prepare to open a door there.
         if (i == 0) {
           var xNext = currentRoom.coordinates[0]
           var yNext = currentRoom.coordinates[1] - 1
           var newDoors = [false, false, true, false]
         } else if (i == 1) {
           var xNext = currentRoom.coordinates[0] + 1
           var yNext = currentRoom.coordinates[1]
           var newDoors = [false, false, false, true]
         } else if (i == 2) {
           var xNext = currentRoom.coordinates[0]
           var yNext = currentRoom.coordinates[1] + 1
           var newDoors = [true, false, false, false]
         }
         else {
           var xNext = currentRoom.coordinates[0] - 1
           var yNext = currentRoom.coordinates[1]
           var newDoors = [false, true, false, false]
         }

         // If there is NOT already a room in the adjacent spot, place one now.
         let nextPosition = worldMap[yNext][xNext]
         if (nextPosition == undefined) {
           let newRoom = new Room(
             [
               new Door(newDoors[0], 0, randomColor()),
               new Door(newDoors[1], 1, randomColor()),
               new Door(newDoors[2], 2, randomColor()),
               new Door(newDoors[3], 3, randomColor())
             ],
             [xNext, yNext],
             true,
             randomColor()
           )
           worldMap[yNext][xNext] = newRoom

           // Recursive pathify call on newly placed room.
           pathify(newRoom, worldMap, n, m)
         }
       }
     }
   }

   // So we know where we are in recursion for rendering.
   drawOrderQueue.enqueue(currentRoom)
 }

 function randomColor() {
   let color = colors[Math.floor(Math.random()*colors.length)];
   return color
 }
