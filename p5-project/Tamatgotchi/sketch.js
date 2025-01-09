let pooSprite = [];
let moods = {
  veryHappy: 0,
  happy: 1,
  satisfied: 2,
  neutral: 3,
  disappointed: 4,
  sobbing: 5,
  mad: 6,
  angry: 7,
};


let currentSprite;
let shopOpen = false;
console.log(gameStats.coins);
let inventory = { burger: 0, water: 0, slaappillen: 0 };

function preload() {
  pooSprite[0] = loadImage("src/sprites/sprite - very happy.png");
  pooSprite[1] = loadImage("src/sprites/sprite - happy.png");
  pooSprite[2] = loadImage("src/sprites/sprite - sattisfied.png");
  pooSprite[3] = loadImage("src/sprites/sprite - neutral.png");
  pooSprite[4] = loadImage("src/sprites/sprite - dissapointed.png");
  pooSprite[5] = loadImage("src/sprites/sprite - sobbing.png");
  pooSprite[6] = loadImage("src/sprites/sprite - mad.png");
  pooSprite[7] = loadImage("src/sprites/sprite - angry.png");
}

function setup() {
  createCanvas(800, 800);
  currentSprite = moods.neutral;

  let shopBtn = createButton("SHOP");
  shopBtn.position(100, 100);
  shopBtn.mousePressed(toggleShop);
}

function draw() {
  background(220);
  updateSpriteBasedOnStats();

  let spriteWidth = pooSprite[currentSprite].width;
  let spriteHeight = pooSprite[currentSprite].height;
  let spriteX = width / 2 - spriteWidth / 2;
  let spriteY = height / 2 - spriteHeight / 2;
  image(pooSprite[currentSprite], spriteX, spriteY);

  fill(0);
  textSize(20);
  text(`Coins: ${gameStats.coins}`, 20, 50);

  if (shopOpen) {
      drawShop();
  }
}

function updateSpriteBasedOnStats() {
  // Define good stats thresholds
  const goodSleepThreshold = 60; // Example threshold for sleep
  const goodCoinsThreshold = 5;   // Example threshold for coins

  // Check for good stats
  if (gameStats.coins >= goodCoinsThreshold && gameStats.sleep >= goodSleepThreshold) {
      currentSprite = moods.veryHappy; // Set to very happy if both conditions are met
  } else if (gameStats.sleep < 10) {
      currentSprite = moods.angry;
  } else if (gameStats.sleep < 20) {
      currentSprite = moods.mad;
  } else if (gameStats.sleep < 30) {
      currentSprite = moods.sobbing;
  } else if (gameStats.sleep < 40) {
      currentSprite = moods.disappointed;
  } else if (gameStats.sleep < 50) {
      currentSprite = moods.neutral;
  } else if (gameStats.sleep < 60) {
      currentSprite = moods.satisfied;
  } else if (gameStats.sleep < 70) {
      currentSprite = moods.happy;
  } else {
      currentSprite = moods.veryHappy; // Default to very happy for good sleep
  }
}


function toggleShop() {
  shopOpen = !shopOpen;
}

function drawShop() {
  fill(0, 0, 0, 200);
  rect(100, 100, 600, 600, 10);

  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("Shop", width / 2, 150);

  fill(255);
  textSize(20);
  text(`Your Coins: ${gameStats.coins}`, width / 2, 190);


  drawShopItem("Burger", 1, 300, 250);
  drawShopItem("Water", 1, 300, 350);
  drawShopItem("Slaappillen", 2, 300, 450); // Add Slaappillen item

  fill(255, 0, 0);
  textSize(20);
  text("Close", 650, 180);
  if (
    mouseIsPressed &&
    mouseX > 620 &&
    mouseX < 680 &&
    mouseY > 160 &&
    mouseY < 200
  ) {
    toggleShop();
  }

  displayInventory();
}

function drawShopItem(itemName, itemPrice, x, y) {
  fill(255);
  rect(x - 80, y - 30, 300, 60, 10);

  fill(0);
  textSize(20);
  textAlign(LEFT);
  text(`${itemName} - ${itemPrice} Coin`, x, y);

  fill(0, 255, 0);
  rect(x + 150, y - 20, 60, 40, 5);
  fill(0);
  textSize(15);
  text("Buy", x + 180, y + 5);

  if (
    mouseIsPressed &&
    mouseX > x + 150 &&
    mouseX < x + 210 &&
    mouseY > y - 20 &&
    mouseY < y + 20
  ) {
    buyItem(itemName, itemPrice);
  }
}

function buyItem(itemName, price) {
  if (gameStats.coins >= price) {
    gameStats.coins -= price;
    inventory[itemName.toLowerCase()] += 1;
    console.log(`${itemName} purchased!`);
  } else {
    console.log("Not enough coins!");
  }
}

function displayInventory() {
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text(`Inventory:`, 150, 500);
  text(`Burger: ${inventory.burger}`, 150, 530);
  text(`Water: ${inventory.water}`, 150, 560);
  text(`Slaappillen: ${inventory.slaappillen}`, 150, 590); // Display Slaappillen inventory

  // Burger usage
  if (inventory.burger > 0) {
      fill(0, 255, 0);
      rect(300, 510, 60, 30, 5);
      fill(0);
      text("Use", 315, 530);
      if (mouseIsPressed && mouseX > 300 && mouseX < 360 && mouseY > 510 && mouseY < 540) {
          useItem("burger");
      }
  }

  // Water usage
  if (inventory.water > 0) {
      fill(0, 255, 0);
      rect(300, 540, 60, 30, 5);
      fill(0);
      text("Use", 315, 560);
      if (mouseIsPressed && mouseX > 300 && mouseX < 360 && mouseY > 540 && mouseY < 570) {
          useItem("water");
      }
  }

  // Slaappillen usage
  if (inventory.slaappillen > 0) {
      fill(0, 255, 0);
      rect(300, 570, 60, 30, 5);
      fill(0);
      text("Use", 315, 590);
      if (mouseIsPressed && mouseX > 300 && mouseX < 360 && mouseY > 570 && mouseY < 600) {
          useItem("slaappillen");
      }
  }
}



function useItem(item) {
  if (inventory[item] > 0) {
    inventory[item]--;
    alert(`${item} used!`);
    updateStats(item);
  }
}

