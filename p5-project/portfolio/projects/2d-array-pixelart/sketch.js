let selectedColor = "white";
let colors = [];
let gridColors = [];
let gridHeight = 480;
let paletteHeight = 80;
let spacing = 10;

function preload() {
  colors = loadJSON("colors.json").colors;
  console.log(colors); // Check if colors are loaded correctly
}

function setup() {
  createCanvas(640, gridHeight + paletteHeight + spacing);
  initGridColors(10, 10);
}

function draw() {
  background(220);
  drawGrid(10, 10);
  drawPalette();
}

function initGridColors(rows, cols) {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push("white");
    }
    gridColors.push(row);
  }
}

function drawGrid(rows, cols) {
  let cellWidth = width / cols;
  let cellHeight = gridHeight / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * cellWidth;
      let y = i * cellHeight;

      stroke(1);
      fill(gridColors[i][j]);
      rect(x, y, cellWidth, cellHeight);
    }
  }
}

function drawPalette() {
  let paletteX = 0;
  let paletteY = gridHeight + spacing;
  let colorWidth = width / colors.length;

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    stroke(0);
    rect(paletteX + i * colorWidth, paletteY, colorWidth, paletteHeight);
  }
}

function mousePressed() {
  let cols = 10;
  let rows = 10;
  let cellWidth = width / cols;
  let cellHeight = gridHeight / rows;

  if (mouseY < gridHeight) {
    let col = Math.floor(mouseX / cellWidth);
    let row = Math.floor(mouseY / cellHeight);

    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      cellClicked(row, col);
    }
  } else {
    let paletteY = gridHeight + spacing;
    let colorWidth = width / colors.length;
    let colorIndex = Math.floor(mouseX / colorWidth);

    if (mouseY >= paletteY && mouseY <= paletteY + paletteHeight) {
      if (colorIndex >= 0 && colorIndex < colors.length) {
        selectedColor = colors[colorIndex];
        console.log(`Color selected: ${selectedColor}`);
      }
    }
  }
}

function cellClicked(row, col) {
  gridColors[row][col] = selectedColor;
  console.log(
    `Cell clicked: Row ${row}, Column ${col}, Filled with ${selectedColor}`
  );
}
