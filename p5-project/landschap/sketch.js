function setup() {
  createCanvas(2000, 1000);
}

function draw() {
  noStroke();
  // Lucht
  background('#add8e6');
  // Zon
  fill('#FFFF66')
  circle(1800, 100, 140);
  // Wolk
  fill('#FFFFF')
  circle(400, 250, 100)
  circle(360, 250, 75)
  circle(440, 250, 75)
  // Bergen 
  stroke('black')
  fill('gray')
  triangle(600, 1000, -400, 1000, 100, 75);
  triangle(900, 1000, -400, 1000, 300, 25);

}