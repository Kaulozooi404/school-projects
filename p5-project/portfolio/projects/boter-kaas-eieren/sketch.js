let playAgainButton;
let gridCells = [];
let currentPlayer = 'X'; // Initialize currentPlayer at the global level
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function setup() {
  createCanvas(1000, 1000);
  initializeGrid();
  
  playAgainButton = createButton('Play Again');
  playAgainButton.position(width / 2 - 50, 150); 
  playAgainButton.size(100, 50);
  playAgainButton.mousePressed(resetGame);
}

function draw() {
  background(220);

  fill('black');
  rect(400, 210, 10, 590);
  rect(600, 210, 10, 590);
  rect(210, 400, 590, 10);
  rect(210, 600, 590, 10);

  // Draw each cell in the grid and the symbols inside
  for (let cell of gridCells) {
    fill('white');
    rect(cell.x, cell.y, cell.width, cell.height);
    if (cell.symbol) {
      textSize(64);
      fill('black');
      textAlign(CENTER, CENTER);
      text(cell.symbol, cell.x + cell.width / 2, cell.y + cell.height / 2);
    }
  }
}

function mousePressed() {
  // Check for clicks within cells and set the current player's symbol
  for (let cell of gridCells) {
    if (mouseX > cell.x && mouseX < cell.x + cell.width &&
        mouseY > cell.y && mouseY < cell.y + cell.height &&
        !cell.symbol) {
      cell.symbol = currentPlayer;

      const winner = checkWinner();
      const isDraw = gridCells.every(cell => cell.symbol !== null);

      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

      // Delay the winner/draw alert so the symbol is drawn first
      setTimeout(() => {
        if (winner) {
          alert(`${winner} wins!`);
          noLoop(); // Stop the game
        } else if (isDraw) {
          alert("It's a draw!");
          noLoop();
        }
      }, 100);

      break;
    }
  }
}

function initializeGrid() {
  gridCells = [];
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

function checkWinner() {
  // Check all winning combinations
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gridCells[a].symbol && gridCells[a].symbol === gridCells[b].symbol && gridCells[a].symbol === gridCells[c].symbol) {
      return gridCells[a].symbol;
    }
  }
  return null;
}

function resetGame() {
  initializeGrid(); // Reset grid
  currentPlayer = 'X'; // Reset player
  loop(); // Restart game
}