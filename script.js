const turkey =
  document.getElementById("turkey");

const obstacle =
  document.getElementById("obstacle");

const airObstacle =
  document.getElementById("airObstacle");

const corn =
  document.getElementById("corn");

const scoreDisplay =
  document.getElementById("score");

const cornDisplay =
  document.getElementById("corn-score");

const message =
  document.getElementById("message");

const gameContainer =
  document.querySelector(".game-container");

let gameStarted = false;
let gameOver = false;

let score = 0;
let cornScore = 0;

let speed = 5;

let obstacleX;
let airObstacleX;
let cornX;

const firstGap = 500;
const normalGap = 180;

function jump() {

  if (
    turkey.classList.contains("jump")
  ) {
    return;
  }

  turkey.classList.add("jump");

  setTimeout(() => {
    turkey.classList.remove("jump");
  }, 700);
}

function startGame() {

  if (gameStarted) return;

  gameStarted = true;

  message.style.display = "none";

  obstacleX =
    gameContainer.offsetWidth +
    firstGap;

  airObstacleX =
    gameContainer.offsetWidth +
    1500;

  cornX =
    gameContainer.offsetWidth +
    700;

  requestAnimationFrame(gameLoop);
}

function resetGame() {

  score = 0;
  cornScore = 0;

  speed = 5;

  gameStarted = false;
  gameOver = false;

  scoreDisplay.textContent =
    "Score: 0";

  cornDisplay.textContent =
    "Corn: 0 🌽";

  message.innerHTML =
    "Click or Tap to Start";

  message.style.display = "block";

  obstacleX =
    gameContainer.offsetWidth +
    firstGap;

  airObstacleX =
    gameContainer.offsetWidth +
    1500;

  cornX =
    gameContainer.offsetWidth +
    700;
}

function endGame() {

  gameOver = true;

  message.innerHTML =
    "GAME OVER<br>Click To Restart";

  message.style.display = "block";
}

function gameLoop() {

  if (gameOver) return;

  obstacleX -= speed;
  airObstacleX -= speed;
  cornX -= speed;

  obstacle.style.left =
    obstacleX + "px";

  airObstacle.style.left =
    airObstacleX + "px";

  corn.style.left =
    cornX + "px";

  if (obstacleX < -100) {

    obstacleX =
      gameContainer.offsetWidth +
      normalGap;

    score++;

    scoreDisplay.textContent =
      `Score: ${score}`;

    if (score % 5 === 0) {
      speed += 0.25;
    }
  }

  if (airObstacleX < -100) {

    const safeDistance =
      1200 + Math.random() * 600;

    airObstacleX =
      Math.max(
        obstacleX,
        cornX
      ) + safeDistance;
  }

  if (cornX < -100) {

    cornX =
      gameContainer.offsetWidth +
      600 +
      Math.random() * 400;
  }

  const turkeyRect =
    turkey.getBoundingClientRect();

  const obstacleRect =
    obstacle.getBoundingClientRect();

  const airRect =
    airObstacle.getBoundingClientRect();

  const cornRect =
    corn.getBoundingClientRect();

  const pumpkinHit =
    turkeyRect.left + 30 <
      obstacleRect.right &&
    turkeyRect.right - 30 >
      obstacleRect.left &&
    turkeyRect.bottom - 40 >
      obstacleRect.top;

  if (pumpkinHit) {

    endGame();
    return;
  }

  const crowHit =
    turkeyRect.left <
      airRect.right &&
    turkeyRect.right >
      airRect.left &&
    turkeyRect.top <
      airRect.bottom &&
    turkeyRect.bottom >
      airRect.top;

  if (crowHit) {

    endGame();
    return;
  }

  const cornHit =
    turkeyRect.left <
      cornRect.right &&
    turkeyRect.right >
      cornRect.left &&
    turkeyRect.top <
      cornRect.bottom &&
    turkeyRect.bottom >
      cornRect.top;

  if (cornHit) {

    cornScore++;

    cornDisplay.textContent =
      `Corn: ${cornScore} 🌽`;

    cornX =
      gameContainer.offsetWidth +
      500 +
      Math.random() * 300;
  }

  requestAnimationFrame(
    gameLoop
  );
}

function handleInput() {

  if (!gameStarted) {

    startGame();
    return;
  }

  if (gameOver) {

    resetGame();
    return;
  }

  jump();
}

document.addEventListener(
  "click",
  handleInput
);

document.addEventListener(
  "touchstart",
  handleInput
);

setInterval(() => {

  gameContainer.classList.toggle(
    "night"
  );

  gameContainer.classList.toggle(
    "day"
  );

}, 12000);