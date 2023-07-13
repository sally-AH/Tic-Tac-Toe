var winPatterns = [
    // h
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //v
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //d
    [0,4,8],
    [2,4,6]
];
let usedCells = [];
let boxes = Array.from(document.getElementsByClassName('box'));
let resetBtn1 = document.getElementById('restartBtn1');
let resetBtn2 = document.getElementById('restartBtn2');
let turn = 1;
let currentTurn = document.getElementById("current-turn");
let player1Score = document.getElementById("player1");
let player2Score = document.getElementById("player2");
let draw = document.getElementById("draw");
let winner = false;
let drawScore = 0;
let winnerMessage = document.getElementById("winner");
let overlay = document.getElementById("overlay");
let closeOverlay = document.getElementsByClassName("colse");
var div = document.getElementById("strike");


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
        winPatterns.some(pattern => {
            if(pattern.every (index => player.moves.includes(index))){
                winner = true;
                player.score++;
                show_score();
                showDiv(pattern);
                setTimeout(show_message,1000,player)
            }
        })
    }
    if (!winner && usedCells.length == 9) {
        drawScore++;
        console.log("draw score "+drawScore);
        draw.innerHTML = drawScore;
        overlay.style.display = "flex";
        winnerMessage.innerHTML = "DRAW"
    }
}
function show_message(player){
    overlay.style.display = "flex";
    winnerMessage.innerHTML = "The winner is "+player.symbol;
}
function reset() {
    boxes.forEach(box => {
        box.innerHTML = '';
    });
    winner = false;
    usedCells = [];
    player1.moves = [];
    player2.moves = [];
    currentTurn.innerHTML = 'x';
    overlay.style.display = "none";
    div.style.display = "none";
    div.className = "";

}

function restart(){
    boxes.forEach(box => {
        box.innerHTML = '';
    });
    winner = false;
    usedCells = [];
    player1.moves = [];
    player2.moves = [];
    currentTurn.innerHTML = 'x';
    player1.score = 0
    player2.score = 0
    show_score();
    div.style.display = "none";
    div.className = "";
}

resetBtn1.addEventListener('click', restart);
resetBtn2.addEventListener('click', reset);
for(let i= 0;i<boxes.length ;i++){
    boxes[i].addEventListener('click', function (){
        if(isUsed(i)){
            alert("Use another cell")
        }else{
            if (!turn) {
                toggle_player(player1, i);
                turn = 1;
                check_winner(player1);
                currentTurn.innerHTML = player2.symbol;
            }else {
                toggle_player(player2, i);
                turn = 0;
                check_winner(player2);
                currentTurn.innerHTML = player1.symbol;

            }
        }
    })
}

function showDiv(pattern) {
    if (pattern.every((value, index) => value === [0, 1, 2][index])){
        div.classList.add("strike-row1");
    }
    else if (pattern.every((value, index) => value === [3, 4, 5][index])){
        div.classList.add("strike-row2");
    }
    else if (pattern.every((value, index) => value === [6, 7, 8][index])){
        div.classList.add("strike-row3");
    }
    else if (pattern.every((value, index) => value === [0, 3, 6][index])){
        div.classList.add("strike-col1");
    }
    else if (pattern.every((value, index) => value === [1, 4, 7][index])){
        div.classList.add("strike-col2");
    }
    else if (pattern.every((value, index) => value === [2, 5, 8][index])){
        div.classList.add("strike-col3");
    }
    else if (pattern.every((value, index) => value === [0, 4, 8][index])){
        div.classList.add("strike-diagonal1");
    }
    else if (pattern.every((value, index) => value === [2, 4, 6][index])){
        div.classList.add("strike-diagonal2");
    }
    div.style.display = "block";
}
  

