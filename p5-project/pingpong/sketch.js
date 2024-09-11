let obj = { 
  color: 'white',
  width: 15,
  height: 60,
  player1: { 
    x: 100,
    y: 350
  }, 
  player2: { 
    x: 1600,
    y: 350
  },
  ball:  {
    x: 500,
    y: 500
  }
}

function setup() {
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background('#212121');
  // Player 1
  rect(obj.player1.x, obj.player1.y, obj.width, obj.height)
  rect(obj.player2.x, obj.player2.y, obj.width, obj.height)

}

// function keyPressed() {
//   if (key === 'a') {
//     alert('test')
//   } else if (key === 'b') {
//     value = 0;
//   }
//   // return false;
// }


