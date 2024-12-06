const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");

// Configurações do labirinto
const mazeSize = 10; // 10x10 células
const cellSize = canvas.width / mazeSize;

// Posição inicial do jogador
let player = { x: 0, y: 0 };

// Desenhar o labirinto
const maze = [
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
];

// Função para desenhar o labirinto
function drawMaze() {
  for (let y = 0; y < mazeSize; y++) {
    for (let x = 0; x < mazeSize; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? "black" : "white";
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

// Desenhar o jogador
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(
    player.x * cellSize + cellSize / 2,
    player.y * cellSize + cellSize / 2,
    cellSize / 4,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

// Mover o jogador
function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  // Verificar colisão com paredes
  if (
    newX >= 0 &&
    newY >= 0 &&
    newX < mazeSize &&
    newY < mazeSize &&
    maze[newY][newX] === 0
  ) {
    player.x = newX;
    player.y = newY;
  }

  // Verificar vitória
  if (player.x === mazeSize - 1 && player.y === mazeSize - 1) {
    alert("Você venceu!");
    player = { x: 0, y: 0 }; // Reiniciar posição
  }

  render();
}

// Desenhar tudo
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
}

// Eventos de teclado
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
});

// Iniciar o jogo
render();
