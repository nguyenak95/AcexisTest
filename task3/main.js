let canvas, ctx;
let modeAB = true;
function changeMode(){
    modeAB = !modeAB;
}
window.onload = function() {
	//mode A and B game
	document.getElementById("modeA").addEventListener("click",changeMode);
	document.getElementById("modeB").addEventListener("click",changeMode);
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	document.addEventListener("keydown", keyDownEvent);

	// snake move 1grid per second
	setInterval(draw, 500);
};

// grid
let gridSize = (tileSize = 20); // 20 x 20 = 400
let nextX = (nextY = 0);

// snake
let defaultTailSize = 3;
let tailSize = defaultTailSize;
let snakeTrail = [];
let snakeX = (snakeY = 10);

// food
let foodX = (foodY = 15);

// draw
function draw() {
	// move snake in next pos
	snakeX += nextX;
	snakeY += nextY;

	// snake over wall
	if (!modeAB) {
		//modeB enable snake will apear next wall
		if (snakeX < 0) {
			snakeX = gridSize - 1;
		}
		if (snakeX > gridSize - 1) {
			snakeX = 0;
		}

		if (snakeY < 0) {
			snakeY = gridSize - 1;
		}
		if (snakeY > gridSize - 1) {
			snakeY = 0;
		}
	} else { // modeA enable will endgame
		if (
			snakeX < 0 ||
			snakeX > gridSize - 1 ||
			snakeY < 0 ||
			snakeY > gridSize - 1
		) {
            endgame();
		}
	}

	//snake bite food?
	if (snakeX == foodX && snakeY == foodY) {
		tailSize++;

		foodX = Math.floor(Math.random() * gridSize + 1);
		foodY = Math.floor(Math.random() * gridSize + 1);
	}

	//paint background
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// paint snake
	ctx.fillStyle = "green";
	for (let i = 0; i < snakeTrail.length; i++) {
		ctx.fillRect(
			snakeTrail[i].x * tileSize,
			snakeTrail[i].y * tileSize,
			tileSize,
			tileSize
		);

		//snake bites it's tail
		if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY && !modeAB) {
			tailSize = defaultTailSize;
        }
	}

	// paint food
	ctx.fillStyle = "red";
	ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

	//push to array everytime snake move, remove if new position is not food
	snakeTrail.push({ x: snakeX, y: snakeY });
	while (snakeTrail.length > tailSize) {
		snakeTrail.shift();
	}
}

// input
function keyDownEvent(e) {
	switch (e.keyCode) {
		case 37:
			nextX = -1;
			nextY = 0;
			break;
		case 38:
			nextX = 0;
			nextY = -1;
			break;
		case 39:
			nextX = 1;
			nextY = 0;
			break;
		case 40:
			nextX = 0;
			nextY = 1;
			break;
	}
}
function endgame(){
    alert("Game Over, please refresh page");
}