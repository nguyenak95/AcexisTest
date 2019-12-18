// X first, O second
// column, row
let n = prompt("Nhap so hang va cot (<15)");
let m = prompt("Nhap so o lien tiep de chien thang (<7)");

//Set up game html
let game = document.getElementById("game-board");
let game_html = "";
for (let row = 0; row < n; row++) {
	for (let col = 0; col < n; col++) {
		game_html += `<div class="sqr" data-row="${row}" data-column="${col}"></div>`;
	}
}
game.innerHTML = game_html;

//create css after create html
let link = document.createElement("link");
link.href = "style.css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

// condition to win
let Xwin = "X".repeat(m);
let Owin = "O".repeat(m);

// add style and event
let square = Array.from(document.querySelectorAll(".sqr"));
square.forEach(sqr => {
	sqr.addEventListener("click", playCheck);
	sqr.style.width = `${550 / n}px`;
	sqr.style.height = `${550 / n}px`;
	sqr.style.fontSize = `${550 / n}px`;
});

//reset button
let resetBtn = document.getElementById("game-reset");
resetBtn.addEventListener("click", reset);
let Board = createBoard(n);

//create Board array
function createBoard(n) {
	let array = [];
	let row = "1".repeat(n).split("");
	for (let i = 1; i <= n; i++) {
		array.push([...row]);
	}
	return array;
}
// create a variable to check X or O is playing;
let cross = true;

// Winner check
function winnerCheck(player, row, col, Board) {
	if (checkRow(row) || checkCol(col) || checkCross(row,col)) {
        alert(`Player ${player ? "X" : "O"} win`);
        square.forEach((sqr)=>{
            sqr.removeEventListener("click",playCheck);
        })
	}
}

function playCheck(e) {
	let x = parseInt(e.target.dataset.row);
	let y = parseInt(e.target.dataset.column);
	if (Board[x][y] == "1") {
		this.innerHTML = cross ? "X" : "O";
		this.style.color = cross ? "blue" : "red";
        Board[x][y] = this.innerHTML;
        console.log(Board);
		winnerCheck(cross, x, y, Board);
		checkTie();
		//change player
		cross = !cross;
	} else return;
}

function reset() {
	square.forEach(sqr => (sqr.innerHTML = ""));
	Board = createBoard(n);
}

function checkRow(row) {
	let checked = Board[row].join("");
	if (checked.includes(Xwin) || checked.includes(Owin)) return true;
	return false;
}

function checkCol(col) {
	// map every row to row[col]
	let checked = Board.map(row => row[col]).join("");
	if (checked.includes(Xwin) || checked.includes(Owin)) return true;
	return false;
}

function checkCross(row, col) {
    // get first cross line of this point
	let c_line1 = [Board[row][col]];
	let i = 1;
	while (row - i >= 0 && col - i >= 0) {
		c_line1.unshift(Board[row - i][col - i]);
		i++;
	}
	i = 1;
	while (row + i < Board.length && col + i < Board.length) {
		c_line1.push(Board[row + i][col + i]);
		i++;
	}
	c_line1 = c_line1.join("");
	console.log(c_line1);
	if (c_line1.includes(Xwin) || c_line1.includes(Owin)) return true;



    //get second cross line of this point
	let c_line2 = [Board[row][col]];
	i = 1;
	while (row - i >= 0 && col + i < Board.length) {
		c_line2.unshift(Board[row - i][col + i]);
		i++;
	}
	i = 1;
	while (row + i < Board.length && col - i >= 0) {
		c_line2.push(Board[row + i][col - i]);
		i++;
	}
	c_line2 = c_line2.join("");

	if (c_line2.includes(Xwin) || c_line2.includes(Owin)) return true;
}

function checkTie() {
	if (
		!Board.map(row => row.join(""))
			.join("")
			.includes("1")
	) {
		alert("Hoa!!");
	}
}
