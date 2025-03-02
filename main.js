console.log("Running");
const canvas = document.getElementById("tennisCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let ball = { x: 300, y: 100, radius: 5, speedX: 4, speedY: 4 };
let player1 = { x: 50, y: 150, width: 10, height: 50, speed: 5 };
let player2 = { x: 540, y: 150, width: 10, height: 50, speed: 5 };

let scorePlayer1 = 0;
let scorePlayer2 = 0;

let keys = {}; // Para armazenar as teclas pressionadas

// Capturar teclas pressionadas
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

function drawBall() {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayers() {
  ctx.fillStyle = "white";
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function update() {
  movePlayers();

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Colisão com as bordas superior e inferior
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY *= -1;
  }

  ballCollisionWithPlayers();

  // Reset se a bola sair do campo
  if (ball.x < 0 || ball.x > canvas.width) {
    if (ball.x < 0) {
      console.log("Bola saiu pela esquerda! Ponto para Player 2.");
      scorePlayer2++;
      setScorePlayer2(scorePlayer2);
    }

    if (ball.x > canvas.width) {
      console.log("Bola saiu pela direita! Ponto para Player 1.");
      scorePlayer1++;
      setScorePlayer1(scorePlayer1);
    }

    ball.x = 300;
    ball.y = 100;
    ball.speedX = 2 * (Math.random() > 0.5 ? 1 : -1); // Sorteia a direção inicial
    ball.speedY = 2 * (Math.random() > 0.5 ? 1 : -1);
  }
}

function movePlayers() {
  // Movimentação Player 1 (W e S)
  if (keys["w"] && player1.y > 0) player1.y -= player1.speed;
  if (keys["s"] && player1.y + player1.height < canvas.height)
    player1.y += player1.speed;

  // Movimentação Player 2 (Setas ↑ e ↓)
  if (keys["ArrowUp"] && player2.y > 0) player2.y -= player2.speed;
  if (keys["ArrowDown"] && player2.y + player2.height < canvas.height)
    player2.y += player2.speed;
}

function ballCollisionWithPlayers() {
  // Colisão com Player 1
  if (
    ball.x - ball.radius < player1.x + player1.width &&
    ball.y > player1.y &&
    ball.y < player1.y + player1.height
  ) {
    ball.speedX *= -1;

    let relativeIntersectY =
      (ball.y - (player1.y + player1.height / 2)) / (player1.height / 2);

    ball.speedY = relativeIntersectY * 4.7;
  }

  // Colisão com Player 2
  if (
    ball.x + ball.radius > player2.x &&
    ball.y > player2.y &&
    ball.y < player2.y + player2.height
  ) {
    ball.speedX *= -2;

    let relativeIntersectY =
      (ball.y - (player2.y + player2.height / 2)) / (player2.height / 2);

    ball.speedY = relativeIntersectY * 4.7;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPlayers();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function setScorePlayer1(valueScore) {
  setTimeout(() => {
    document.getElementById("scorePlayer1").value = valueScore;
  }, 10);
}

function setScorePlayer2(valueScore) {
  setTimeout(() => {
    document.getElementById("scorePlayer2").value = valueScore;
  }, 10);
}

gameLoop();
