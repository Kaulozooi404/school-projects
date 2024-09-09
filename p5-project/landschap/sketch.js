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
 stroke(100);          
 strokeWeight(2);      
 fill(169, 169, 169);   
 triangle(0, 1000, 300, 400, 600, 1000);

 stroke(100);          
 strokeWeight(2); 
 fill(189, 189, 189);   
 triangle(200, 1000, 500, 500, 800, 1000);

 // Bomen
 stroke(80);
 strokeWeight(2);
 //  Boom 1
 fill(101, 67, 33);
 rect(530, 800, 40, 1500);
 fill(34, 139, 34);
 stroke(30, 100, 30);
 strokeWeight(2);
 triangle(480, 800, 550, 600, 620, 800);
 // Boom 2
 fill(101, 67, 33);
 rect(830, 780, 40, 220);
 fill(34, 139, 34);
 triangle(780, 780, 850, 570, 920, 780);
//  Boom 3
 fill(101, 67, 33);
 rect(1550, 700, 40, 300);
 fill(34, 139, 34);
 triangle(1500, 700, 1570, 300, 1640, 700);
// Auto
noStroke()
fill('black')
circle(1400, 975, 50)
circle(1200, 975, 50)
fill('blue')
rect(1150, 910, 300, 50)
}