let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let messgae = document.querySelector(".msg");
let newmsg = document.querySelector("#message");
const startButton = document.getElementById("start-game");

let player1Name, player2Name;
let player1Symbol, player2Symbol;
let currentPlayer = true;
const winpatterns = [
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8],
];

const checkStartButtonStatus = () => {
    const player1NameInput = document.querySelector("#player1-name").value;
    const player2NameInput = document.querySelector("#player2-name").value;
    const player1SymbolInput = document.querySelector("#player1-symbol").value;
    
    if (player1NameInput && player2NameInput && player1SymbolInput) {
        startButton.disabled = false; // Enable the Start button if all fields are filled
    } else {
        startButton.disabled = true; // Keep the Start button disabled otherwise
    }
};

const startGame = () => {
    player1Name = document.querySelector("#player1-name").value || "Player 1";
    player2Name = document.querySelector("#player2-name").value || "Player 2";
    player1Symbol = document.querySelector("#player1-symbol").value;
    player2Symbol = player1Symbol === "X" ? "O" : "X"; // Automatically assign the other symbol to player 2
    // Hide the settings and show the game board
    enablebox();
    document.querySelector(".settings").style.display = "none";
    document.querySelector(".game-container").style.display = "block";
    resetGame();
};


const resetGame = () => {
    currentPlayer = true; // player 1 starts
    disablebox();
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.innerText = "";  // Clears the board
    });
    document.querySelector("#player1-name").value = "";
    document.querySelector("#player2-name").value = "";
    document.querySelector("#player1-symbol").value = "";
    
    // Disable the start button until the user selects values
    startButton.disabled = true;
};

const disablebox = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enablebox = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disablebox();
};


const showWinner = (symbol) => {
    let winnerName = symbol === player1Symbol ? player1Name : player2Name;
    msg.innerText = `Congratulations! Our Winner is ${winnerName} with symbol ${symbol}`;
    msgContainer.classList.remove("hide");
    disablebox(); // Disable the boxes after someone wins
};

const checkWinner = () => {
    for(let pattern of winpatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
        }

    }
}
};

// handle 

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Ignore if the box is already filled

        box.innerText = currentPlayer ? player1Symbol : player2Symbol;
        currentPlayer = !currentPlayer; // Switch turns
        checkWinner();
        checkDraw();
    });
});

const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // There are still empty spots
        }
    }
    showDraw(); // If no empty spots, it's a draw
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

// Set up new game
newGameBtn.addEventListener("click", () => {
    document.querySelector(".settings").style.display = "block";
    document.querySelector(".game-container").style.display = "none";
});

// Start the game when the "Start Game" button is clicked
document.querySelector("#start-game").addEventListener("click", startGame);

document.querySelector("#player1-name").addEventListener("input", checkStartButtonStatus);
document.querySelector("#player2-name").addEventListener("input", checkStartButtonStatus);
document.querySelector("#player1-symbol").addEventListener("change", checkStartButtonStatus);

checkStartButtonStatus();
disablebox();