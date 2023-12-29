// Selecting all elements with class "box" and storing them in the variable "boxes"
let boxes = document.querySelectorAll(".box");

// Selecting the elements with IDs "reset-btn", "new-btn", and classes "msg-container" and "msg"
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Initializing variables to keep track of the current player and the number of moves
let turnO = true; // Represents player O (true) or player X (false)
let count = 0;     // Tracks the number of moves made

// Array representing winning patterns in tic-tac-toe
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game state
const resetGame = () => {
  turnO = true;       // Resetting the player to O
  count = 0;          // Resetting the move count
  enableBoxes();      // Enabling all the boxes for a new game
  msgContainer.classList.add("hide"); // Hiding the message container
};

// Adding click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // If it's player O's turn
      box.innerText = "O"; // Set the box content to "O"
      turnO = false;       // Switch turns to player X
    } else {
      // If it's player X's turn
      box.innerText = "X"; // Set the box content to "X"
      turnO = true;        // Switch turns to player O
    }
    box.disabled = true;   // Disable the clicked box
    count++;              // Increment the move count

    let isWinner = checkWinner(); // Check if there's a winner after each move

    if (count === 9 && !isWinner) {
      // If all moves are made and there's no winner, it's a draw
      gameDraw();
    }
  });
});

// Function to handle a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`; // Set the message for a draw
  msgContainer.classList.remove("hide"); // Show the message container
  disableBoxes(); // Disable all boxes since the game is over
};

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; // Clear the content of each box
  }
};

// Function to display the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`; // Set the message for the winner
  msgContainer.classList.remove("hide"); // Show the message container
  disableBoxes(); // Disable all boxes since the game is over
};

// Function to check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      // If the three positions in the pattern are not empty
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // If all three positions have the same value, there's a winner
        showWinner(pos1Val); // Display the winner
        return true; // Return true to indicate a winner
      }
    }
  }
};

// Adding click event listeners to the "New Game" and "Reset" buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
