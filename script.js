let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let playerMarks = {'X': [], 'O': []};

const winSound = new Audio("C:/Users/harso/Downloads/marimba-bloop-2-188149.mp3");
const clickSound = new Audio("C:/Users/harso/Downloads/click-button-140881.mp3");

function displayBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = board[i];
        if (playerMarks[player].length > 2 && playerMarks[player][0] === i) {
            cell.classList.add('next-fade'); // Add next-fade class to highlight the next fading cell
        }
        cell.addEventListener('click', () => {
            if (board[i] === '' && !isGameOver()) {
                makeMove(i);
                displayBoard();
            }
        });
        boardElement.appendChild(cell);
    }
}

function makeMove(position) {
    board[position] = player;
    playerMarks[player].push(position);
    if (playerMarks[player].length > 3) {
        let oldestPosition = playerMarks[player].shift();
        board[oldestPosition] = '';
    }
    if (isWinner(player)) {
        showMessage(`Player ${player} wins!`);
        alert(`Player ${player} wins!`);
        winSound.play();
        return;
    }
    if (isBoardFull()) {
        showMessage("It's a tie!");
        return;
    }
    player = player === 'X' ? 'O' : 'X';
    showMessage(`Player ${player}'s turn`);
    clickSound.play();
}

function isGameOver() {
    return isWinner('X') || isWinner('O') || isBoardFull();
}

function isWinner(mark) {
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                           [0, 3, 6], [1, 4, 7], [2, 5, 8],
                           [0, 4, 8], [2, 4, 6]];
    return winConditions.some(condition => condition.every(index => board[index] === mark));
}

function isBoardFull() {
    return !board.includes('');
}

function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

function main() {
    displayBoard();
}

main();
