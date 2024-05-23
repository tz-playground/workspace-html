// Constants
const GRID_SIZE = 1024;
const UNIT_SIZE = 5;
const SNAKE_START_LENGTH = 2;
const SNAKE_START_X = GRID_SIZE / 2;  
const SNAKE_START_Y = GRID_SIZE / 2;
const APPLE_START_X = Math.floor(Math.random() * GRID_SIZE);
const APPLE_START_Y = Math.floor(Math.random() * GRID_SIZE);
const MOVE_INTERVAL = 100; // ms

// Game state
let snake = [{x: SNAKE_START_X, y: SNAKE_START_Y}];  
let direction = 'right';
let apple = {x: APPLE_START_X, y: APPLE_START_Y};
let score = 0;
let gameLoop = null;

// DOM elements  
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// Event listeners
document.addEventListener('keydown', handleKeyDown);

// Start game
startGame();

function startGame() {
    // Reset game state
    snake = [{x: SNAKE_START_X, y: SNAKE_START_Y}];
    direction = 'right';
    apple = {x: APPLE_START_X, y: APPLE_START_Y};
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;

    // Start game loop
    gameLoop = setInterval(update, MOVE_INTERVAL);
}

function update() {
    // Move snake
    const head = {x: snake[0].x, y: snake[0].y};
    if (direction === 'right') head.x += UNIT_SIZE;
    if (direction === 'left') head.x -= UNIT_SIZE;
    if (direction === 'down') head.y += UNIT_SIZE;
    if (direction === 'up') head.y -= UNIT_SIZE;
    snake.unshift(head); 
    snake.pop();

    // Check for collision with apple
    if (head.x === apple.x && head.y === apple.y) {
        // Eat apple
        snake.push({x: head.x, y: head.y});
        score++;
        scoreDisplay.textContent = `Score: ${score}`;

        // Generate new apple location
        apple.x = Math.floor(Math.random() * GRID_SIZE);
        apple.y = Math.floor(Math.random() * GRID_SIZE);
    }

    // Check for game over conditions
    if (isGameOver()) {
        clearInterval(gameLoop);
        alert('Game Over!');
    }

    // Render
    render();
}

function isGameOver() {
    const head = snake[0];

    // Check for wall collisions  
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
    }

    // Check for snake colliding with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function render() {
    // Clear canvas  
    ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);

    // Draw snake
    ctx.fillStyle = 'green';
    for (const segment of snake) {
        ctx.fillRect(segment.x, segment.y, UNIT_SIZE, UNIT_SIZE);
    }

    // Draw apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, UNIT_SIZE, UNIT_SIZE);
}

function handleKeyDown(e) {
    if (e.key === 'w' && direction !== 'down') {
        direction = 'up';  
    } else if (e.key === 's' && direction !== 'up') {
        direction = 'down';
    } else if (e.key === 'a' && direction !== 'right') {
        direction = 'left';
    } else if (e.key === 'd' && direction !== 'left') {
        direction = 'right';
    }
}