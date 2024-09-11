let dayColor, nightColor, sunStartColor, sunEndColor
let transitionDuration = 20;
let t = 0;
let objectsX = { 
  cloud: { 
    objects: { 
      obj1: 400,
      obj2: 360,
      obj3: 440,
    },
    speed: 0.7
  },

  sun: { 
    objects: { 
      obj1: 100,
    },
    speed: 3.67,
  },

  car: { 
    objects: { 
      obj1: 1160,
      obj2: 1150,
      obj3: 1200,
      obj4: 1400,
      obj5: 1250,
      obj6: 1330
    },
    speed: 5,
  }
};

function setup() {
  createCanvas(2000, 1000);
   dayColor = color('#add8e6');
   nightColor = color('#2c3e50');
   sunStartColor = color('#a0a5ad');
   sunEndColor = color('#FFFF66');  
   incrementPerFrame = 1 / (60 * transitionDuration); // 60 Frames x 15s
   
   currentTime = lerpColor(dayColor, nightColor, t);
   alert('Zoom to %80')
}

function draw() {
  let cycleSpeed = TWO_PI / (60 * transitionDuration);  // TWO_PI is a predefined constant for full circle in radians.
  let currentTime = lerpColor(dayColor, nightColor, t);
  let sunXPos = objectsX.sun.objects.obj1; 
  let lerpFactor = map(sunXPos, 0, width, 0, 1); // Maps sun position from 0 (left) to 1 (right)
  let sunCurrentColor = lerpColor(sunEndColor, sunStartColor, lerpFactor); // Interpolate color

  t = (sin(frameCount * cycleSpeed) + 1) / 2; 
  background(currentTime);

  // Draw the sun
  noStroke();
  fill(sunCurrentColor);
  circle(objectsX.sun.objects.obj1, 100, 140);

  noStroke();
  // Animatie
  animateObjects();

  // Wolk
  fill('#FFFFF');
  circle(objectsX.cloud.objects.obj1, 250, 100);
  circle(objectsX.cloud.objects.obj2, 250, 75);
  circle(objectsX.cloud.objects.obj3, 250, 75);

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
  // Stoplicht
  fill(80);

  // Traffic light frame
  noStroke();
  fill(80);
  rect(1795, 600, 20, 400);

  fill(50); 
  rect(1765, 600, 80, 240);

  fill(currentLight === 0 ? 'red' : 'darkred');
  circle(1805, 640, 60);

  fill(currentLight === 1 ? 'orange' : '#663300');
  circle(1805, 715, 60);

  fill(currentLight === 2 ? 'green' : 'darkgreen');
  circle(1805, 790, 60);

  // Auto
  noStroke();
  fill('blue');
  rect(objectsX.car.objects.obj1, 820, 280, 90);
  fill(169, 169, 169);   
  stroke(50);          
  fill('blue');
  rect(objectsX.car.objects.obj2, 910, 300, 50);

  fill('black');
  circle(objectsX.car.objects.obj3, 975, 50);
  circle(objectsX.car.objects.obj4, 975, 50);

  fill('lightgray');
  rect(objectsX.car.objects.obj5, 850, 70, 45);
  rect(objectsX.car.objects.obj6, 850, 90, 45);
}


let currentLight = 2;

function animateObjects() {
  // Animatie wolken
  objectsX.cloud.objects.obj1 += objectsX.cloud.speed;
  objectsX.cloud.objects.obj2 += objectsX.cloud.speed;
  objectsX.cloud.objects.obj3 += objectsX.cloud.speed;

  // Reset wolk positie
  if (objectsX.cloud.objects.obj1 > width) {
    objectsX.cloud.objects.obj1 = -100;
  }
  if (objectsX.cloud.objects.obj2 > width) {
    objectsX.cloud.objects.obj2 = -100;
  }
  if (objectsX.cloud.objects.obj3 > width) {
    objectsX.cloud.objects.obj3 = -100;
  }

  // Animatie zon
  objectsX.sun.objects.obj1 += objectsX.sun.speed;

  // Reset zon positie
  if (objectsX.sun.objects.obj1 > width) {
    objectsX.sun.objects.obj1 = -100;
  }

  // Animatie auto 
  objectsX.car.objects.obj1 += objectsX.car.speed;
  objectsX.car.objects.obj2 += objectsX.car.speed;
  objectsX.car.objects.obj3 += objectsX.car.speed;
  objectsX.car.objects.obj4 += objectsX.car.speed;
  objectsX.car.objects.obj5 += objectsX.car.speed;
  objectsX.car.objects.obj6 += objectsX.car.speed;

  if(objectsX.car.objects.obj3 > 1100) { 
    if (currentLight === 0) {
      objectsX.car.speed = 0;
    } else if (currentLight === 1) {
      objectsX.car.speed = 1; 
    } else { //
      objectsX.car.speed = 3;
    }  
  } else { 
      objectsX.car.speed = 3;
  }

  // Reset auto positie
  if (objectsX.car.objects.obj1 > width) {
    objectsX.car.objects.obj1 = -100;
  };
  if (objectsX.car.objects.obj2 > width) {
    objectsX.car.objects.obj2 = -100;
  };
  if (objectsX.car.objects.obj3 > width) {
    objectsX.car.objects.obj3 = -100;
  };
  if (objectsX.car.objects.obj4 > width) {
    objectsX.car.objects.obj4 = -100;
  };
  if (objectsX.car.objects.obj5 > width) {
    objectsX.car.objects.obj5 = -100;
  };
  if (objectsX.car.objects.obj6 > width) {
    objectsX.car.objects.obj6 = -100;
  };
};

