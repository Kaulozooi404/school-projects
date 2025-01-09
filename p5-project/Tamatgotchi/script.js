let gameStats = {
  hunger: 0,
  sleep: 0,
  thirst: 0,
  coins: 100,
};

let gameState = false;
let spaceshipPosition = 0;
const spaceshipSpeed = 10;
const bulletSpeed = 15;
const stars = [];
const bullets = [];

function calculateWidth(statValue) {
  const minWidth = 20;
  const maxWidth = 90;
  return (statValue / 100) * (maxWidth - minWidth) + minWidth;
}

function updateStats(item) {
    if (item === "burger") { 
        gameStats.hunger += 10; // Increase hunger when burger is used
    } else if (item === "water") { 
        gameStats.thirst += 10; // Increase thirst when water is used
    } else if (item === "slaappillen") {
        gameStats.sleep = Math.min(gameStats.sleep + 10, 100); // Increase sleep, max 100
        console.log("Sleep increased by 10!");
    }

    console.log(`Hunger: ${gameStats.hunger} | Thirst: ${gameStats.thirst}`);

    // Update displayed stats
    document.querySelector(".stats-hunger").innerText = `Hunger: ${gameStats.hunger}%`;
    document.querySelector(".stats-thirst").innerText = `Thirst: ${gameStats.thirst}%`;
    document.querySelector(".stats-sleep").innerText = `Sleep: ${gameStats.sleep}%`;
    document.querySelector(".stats-coins").innerText = `Coins: ${gameStats.coins}`;
    
    // Update stat bar widths
    document.querySelector(".stats-hunger").style.width = `${calculateWidth(gameStats.hunger)}%`;
    document.querySelector(".stats-thirst").style.width = `${calculateWidth(gameStats.thirst)}%`;
    document.querySelector(".stats-sleep").style.width = `${calculateWidth(gameStats.sleep)}%`;
}


document.addEventListener("DOMContentLoaded", function () {
  updateStats();
});

function initializeGame() {
  gameState = true;
  const spaceship = document.createElement("img");
  const screenContainer =
    document.getElementsByClassName("screen-container")[0];
  spaceship.src = "/src/game-sprites/spaceship.png";
  spaceship.classList.add("spaceship");
  screenContainer.append(spaceship);

  document.addEventListener("keydown", moveSpaceship);
  document.addEventListener("keydown", shootBullet);

  setInterval(spawnStar, 2000);
  setInterval(updateGameObjects, 50);

  if (gameState) {
    $(".game-title").remove();
  }
}

function moveSpaceship(event) {
  const spaceship = document.querySelector(".spaceship");
  if (event.key === "a" || event.key === "A") {
    if (spaceshipPosition > -210) spaceshipPosition -= spaceshipSpeed;
  } else if (event.key === "d" || event.key === "D") {
    if (spaceshipPosition < 210) spaceshipPosition += spaceshipSpeed;
  }
  spaceship.style.transform = `translateX(${spaceshipPosition}px)`;
}

function spawnStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = "0px";
  document.querySelector(".screen-container").append(star);
  stars.push(star);
}

function shootBullet(event) {
  if (event.key === " ") {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = `${spaceshipPosition + 250}px`;
    bullet.style.bottom = "100px";
    document.querySelector(".screen-container").append(bullet);
    bullets.push(bullet);
  }
}

function updateGameObjects() {
  bullets.forEach((bullet, index) => {
    bullet.style.bottom = `${parseInt(bullet.style.bottom) + bulletSpeed}px`;
    if (parseInt(bullet.style.bottom) > 700) {
      bullet.remove();
      bullets.splice(index, 1);
    }
  });

  stars.forEach((star, starIndex) => {
    star.style.top = `${parseInt(star.style.top) + 5}px`;
    if (parseInt(star.style.top) > 700) {
      star.remove();
      stars.splice(starIndex, 1);
    }

    bullets.forEach((bullet, bulletIndex) => {
      if (checkCollision(bullet, star)) {
        bullet.remove();
        star.remove();
        bullets.splice(bulletIndex, 1);
        stars.splice(starIndex, 1);

        gameStats.coins += 1;
        updateStats();
      }
    });
  });
}

function checkCollision(bullet, star) {
  const bulletRect = bullet.getBoundingClientRect();
  const starRect = star.getBoundingClientRect();
  return !(
    bulletRect.top > starRect.bottom ||
    bulletRect.bottom < starRect.top ||
    bulletRect.left > starRect.right ||
    bulletRect.right < starRect.left
  );
}
