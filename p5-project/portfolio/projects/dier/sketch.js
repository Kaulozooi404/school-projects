function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  rect(125, 250, 25, 125)
  rect(250, 250, 25, 125)
  fill(0)
  rect(125, 350, 25, 25)
  rect(250, 350, 25, 25)
  fill(255, 192, 200)
  ellipse(200, 200, 250, 200);
  ellipse(200, 200, 250, 200);
  circle(200, 200, 125);
  fill(255);
  circle(175, 170, 25);
  fill(0);
  circle(175, 170, 10);
  fill(255);
  circle(225, 170, 25);
  fill(0);
  circle(225, 170, 10);
  fill(0);
  circle(190, 210, 10);
  circle(210, 210, 10);
  noFill();
  arc(200, 225, 50, 50, PI * .25, PI * .75);
}