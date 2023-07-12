// let playerText = document.getElementById('playerText')
// let restartBtn = document.getElementById('restartBtn')
// let boxes = Array.from(document.getElementsByClassName('box'))

// let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

// const O_TEXT = "O"
// const X_TEXT = "X"
// let currentPlayer = X_TEXT
// let spaces = Array(9).fill(null)

// const startGame = () => {
//     boxes.forEach(box => box.addEventListener('click', boxClicked))
// }

// function boxClicked(e) {
//     const id = e.target.id

//     if(!spaces[id]){
//         spaces[id] = currentPlayer
//         e.target.innerText = currentPlayer

//         if(playerHasWon() !==false){
//             playerText.innerHTML = `${currentPlayer} has won!`
//             let winning_blocks = playerHasWon()

//             winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
//             return
//         }

//         currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
//     }
// }

// const winningCombos = [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]
// ]

// function playerHasWon() {
//     for (const condition of winningCombos) {
//         let [a, b, c] = condition

//         if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
//             return [a,b,c]
//         }
//     }
//     return false
// }

// restartBtn.addEventListener('click', restart)

// function restart() {
//     spaces.fill(null)

//     boxes.forEach( box => {
//         box.innerText = ''
//         box.style.backgroundColor=''
//     })

//     playerText.innerHTML = 'Tic Tac Toe'

//     currentPlayer = X_TEXT
// }

// startGame()

var winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let usedCells = [];
let boxes = Array.from(document.getElementsByClassName('box'));
let resetBtn = document.getElementById('restartBtn');
var turn = 1;
let currentTurn = document.getElementById("current-turn");
let player1Score = document.getElementById("player1");
let player2Score = document.getElementById("player2");
let draw = document.getElementById("draw");
let winner = false;
let drawScore = 0;
let winnerMessage = document.het
let player1 = {
    symbol: 'X', moves: [], score: 0
}
let player2 = {
    symbol: 'O', moves: [], score: 0
}
// ------------------------------------------------------
function toggle_player(player, i){
    boxes[i].innerHTML = player.symbol;
    player.moves.push(i);
    usedCells.push(i);
}

function isUsed(i) {
    if (usedCells.includes(i)) {
        return true;
    }
    return false;
}

function show_score (){
    player1Score.innerHTML = player1.score;
    player2Score.innerHTML = player2.score
}

function check_winner(player) {
    if (!winner) {
        winPatterns.forEach(pattern => {
            if(pattern.every((element, index) => element === player.moves[index])){
                alert("you won");
                winner = true
                player.score++;
                show_score();
                reset();
            }
        })
    }
    if (!winner && usedCells.length==9) {
        drawScore++;
        draw.innerHTML = drawScore;
        reset();
    }

}

function reset() {
    boxes.forEach(box => {
        box.innerHTML = '';
    })
    usedCells = [];
    player1.moves = [];
    player2.moves = [];
    currentTurn.innerHTML = 'x';
}

resetBtn.addEventListener('click', reset)

for(let i= 0;i<boxes.length ;i++){
    boxes[i].addEventListener('click', function (){
        if(isUsed(i)){
            alert("Use another cell")
        }else{
            if (!turn) {
                toggle_player(player1, i);
                check_winner(player1);
                currentTurn.innerHTML = player2.symbol;
                turn = 1;
            }else {
                toggle_player(player2, i);
                check_winner(player2);
                currentTurn.innerHTML = player1.symbol;
                turn = 0;
            }
        }
    })
}


