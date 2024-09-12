let gridCells = [];
let cell; 
let currentPlayer = 'X';

function setup() {
  createCanvas(1000, 1000);
  initializeGrid(); // Set up the grid cells
}

function draw() {
  background(220); 

  // Draw the grid lines
  fill('black');
  rect(400, 210, 10, 590); // Vertical line 1
  rect(600, 210, 10, 590); // Vertical line 2
  rect(210, 400, 590, 10); // Horizontal line 1
  rect(210, 600, 590, 10); // Horizontal line 2

  // Draw each grid cell
  for (let cell of gridCells) {
    fill('white')
    rect(cell.x, cell.y, cell.width, cell.height);
    if (cell.symbol) { 
      textSize(64);
      fill('black'); 
      textAlign(CENTER, CENTER);
      text(cell.symbol, cell.x + cell.width / 2, cell.y + cell.height / 2);
    }
  }
  fill('black')
  textSize(100)
}

function mousePressed() {
  // Loop through grid cells to find which one was clicked
  for (let cell of gridCells) {
    if (mouseX > cell.x && mouseX < cell.x + cell.width &&
        mouseY > cell.y && mouseY < cell.y + cell.height &&
        !cell.symbol) {
      cell.symbol = currentPlayer; 
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; 
      break; 
    }
  }
}

// Function to initialize the grid with cells
function initializeGrid() {
  let positions = [
    [210, 210], [410, 210], [610, 210],
    [210, 410], [410, 410], [610, 410],
    [210, 610], [410, 610], [610, 610]
  ];
  
  for (let pos of positions) {
    gridCells.push({
      x: pos[0],
      y: pos[1],
      width: 190,
      height: 190,
      symbol: null
    });
  }
}
