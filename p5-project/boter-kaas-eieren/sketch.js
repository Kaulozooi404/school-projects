function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(220);
  fill('black')
  // Verticale lijnen
  rect(400, 210, 10, 590)
  rect(600, 210, 10, 590)
  // Horizontale lijnen 
  rect(210, 400, 590, 10)
  rect(210, 600, 590, 10)
  // Grid Elements
  fill('red')
  rect(210, 210, 190) // 1.1
  rect(410, 210, 190) // 1.2
  rect(610, 210, 190) // 1.3
  rect(210, 410, 190) // 2.1
  rect(410, 410, 190) // 2.2
  rect(610, 410, 190) // 2.3
  rect(210, 610, 190) // 3.1
  rect(410, 610, 190) // 3.2
  rect(610, 610, 190) // 3.3

  
}


