let squareSize = 400;
let gridSize = 20;
let cellState = [];
let selectedColor = "red";
let isErasing = false;

function setup() {
  createCanvas(1600, 800);

  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < gridSize * gridSize; j++) {
      row.push(null);
    }
    cellState.push(row);
  }

  background(255);

  drawCanvasBackground();

  noLoop();
}

function draw() {
  drawGrids();
}

function preload() {
  img = loadImage("src/werk.png");
}

function drawCanvasBackground() {
  stroke(0);
  strokeWeight(2);
  let number = 1;

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      let x = col * squareSize;
      let y = row * squareSize;

      noFill();
      rect(x, y, squareSize, squareSize);

      fill(0);
      textSize(32);
      text(number, x + 10, y + 40);

      number++;
    }
  }
}

function changeColor() {
  let foo = prompt("Enter a color (e.g., red, blue, #FF0000)");
  selectedColor = foo || selectedColor;
  window.alert(`Selected color: ${selectedColor}`);
}

function toggleErase() {
  isErasing = !isErasing;
  window.alert(`Erase mode: ${isErasing ? "ON" : "OFF"}`);
}

function drawGrids() {
  for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
    let xOffset = (squareIndex % 4) * squareSize;
    let yOffset = Math.floor(squareIndex / 4) * squareSize;

    let cellSize = squareSize / gridSize;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        let x = xOffset + col * cellSize;
        let y = yOffset + row * cellSize;
        let cellIndex = row * gridSize + col;

        if (cellState[squareIndex][cellIndex]) {
          fill(cellState[squareIndex][cellIndex]);
        } else {
          fill(255);
        }

        stroke(200);
        rect(x, y, cellSize, cellSize);
      }
    }
  }
}

function mousePressed() {
  handleCellInteraction();
}

function mouseDragged() {
  handleCellInteraction();
}

image(img, 0, 200, 400, 200);

function handleCellInteraction() {
  for (let squareIndex = 0; squareIndex < 8; squareIndex++) {
    let xOffset = (squareIndex % 4) * squareSize;
    let yOffset = Math.floor(squareIndex / 4) * squareSize;

    let cellSize = squareSize / gridSize;

    if (
      mouseX > xOffset &&
      mouseX < xOffset + squareSize &&
      mouseY > yOffset &&
      mouseY < yOffset + squareSize
    ) {
      let col = Math.floor((mouseX - xOffset) / cellSize);
      let row = Math.floor((mouseY - yOffset) / cellSize);
      let cellIndex = row * gridSize + col;

      if (isErasing) {
        cellState[squareIndex][cellIndex] = null;
      } else {
        cellState[squareIndex][cellIndex] = selectedColor;
      }

      redraw();
    }
  }
}
