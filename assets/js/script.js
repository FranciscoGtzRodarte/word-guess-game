// Pseudo for Mini-Project
// Word Guess Game
// user types a key and i need to check if its part of a random Word
// if yes, display the char in the DOM
// if no, char is not displayed
// need to set up a timer and if the user guesses the entire word correctly in the time alloted i increase the score by 1 for wins, if the user guesses incorrectly increase the score for losses by 1
// what data do i need to track in the app?
// what data structures can i use?
// what do i attempt to accomplish first?
// how do i choose a random word? where are they stored?  array
// var words = ["Indiana Jones", "Jaws", "Shrek" ]   //how do i randomly choose a word
// how do i check if the character is part of the random word?
// how do i know what key the user pressed?  event listener - keydown

/////////////////////////////////////////////Variable declarations////////////////////////////////////////////////////////////////

var startEl = document.querySelector(".start-button");
var wordBlanks = document.querySelector(".word-blanks");
var wins = document.querySelector(".win");
var loses = document.querySelector(".lose");
var words = [
  "ELVIS",
  "TAR",
  "AVATAR",
  "BLONDE",
  "PINOCCHIO",
  "BABYLON",
  "BATMAN",
];
var underscores = [];
var timerEl = document.querySelector(".timer-count");
var resetEl = document.querySelector(".reset-button");
var winsCounter = 0;
var losesCounter = 0;
var timeLeft = 10;
var timeInterval;
var wordPosition;
var chosenWord;
var typeWord;
var wordCharactersArray;

///////////////////////////////////////////////////Functions////////////////////////////////////////////////////////////////////

//starts the timer with a value of 10, get a randon number as the position of the array words to select the chosen word
//also calls the function getUnderscores to display the amount of the chosen word characters as underscores in the game screen
function startGame() {
  clearInterval(timeInterval);
  countdown(10);
  wordPosition = getsRandomNumber();
  chosenWord = words[wordPosition];
  wordCharactersArray = chosenWord.split("");
  console.log(wordCharactersArray);
  wordBlanks.textContent = "";

  var underscoresDisplay = getUnderscores(wordCharactersArray);
  wordBlanks.textContent = underscoresDisplay.join(" ");
}

//checks if the key pressed is include in the chosen word and also calls the function checkWinWord with the typeWord and chosenWord as parameters
function keyPressed(event) {
  // Access value of pressed key with key property
  var key = event.key.toUpperCase();
  console.log(key);

  if (chosenWord.includes(key)) {
    //   console.log("Here is true");
    //   console.log(key);
    //   console.log(randomWordCharacters.length);
    //   console.log(randomWordCharacters[1]);

    for (var i = 0; i < wordCharactersArray.length; i++) {
      if (chosenWord[i] === key) {
        underscores[i] = key;
        console.log(underscores[i] === key);
        wordBlanks.textContent = underscores.join(" ");
        //console.log(underscores.join(""));
      }
    }
    typeWord = underscores.join("");
    console.log(typeWord);
    checkWinWord(typeWord, chosenWord);
  } else {
    console.log("Keep trying");
  }
}

//calculates a random number in the range of the words array length and retunrs the random number
function getsRandomNumber() {
  var wordPosition = Math.floor(Math.random() * words.length);
  console.log(words[wordPosition]);
  return wordPosition;
}

//creates an array of underscores as values with the same amount of the chosen word length and retunrs the array underscores
function getUnderscores(wordCharactersArray) {
  underscores = [];
  for (var i = 0; i < wordCharactersArray.length; i++) {
    console.log(wordCharactersArray[i]);
    underscores.push("_");
    console.log(underscores);
    //wordBlanks.textContent += underscores[i];
  }
  console.log(underscores);
  return underscores;
}

//starts the countdown and changes the timer every 1000ms
function countdown(timeLeft) {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

//checks if the user type word is equal to the chosen word
function checkWinWord(typeWord, chosenWord) {
  console.log(typeWord);
  console.log(chosenWord);
  if (typeWord === chosenWord) {
    console.log("You win");
    winsCounter++;
    wins.textContent = winsCounter;
    //console.log(winsCounter);
    wordCharactersArray = [];
    underscores = [];
    //console.log(wordCharactersArray);
    wordBlanks.textContent = " ";
    startGame();
  } else {
    console.log("Nope, still havent guess it");
  }
}
//displays message game over in the game screen, sets timer back to zero and adds one to the loser counter
function gameOver() {
  wordBlanks.textContent = "GAME OVER";
  timerEl.textContent = 0;
  losesCounter++;
  loses.textContent = losesCounter;
}

////////////////////////////////////////////////////Event listeners///////////////////////////////////////////////////////////////

//add an event listener to the button start, once clicked class the function start game and creates an event listener to the DOM for when the user presses a key
startEl.addEventListener("click", function () {
  startGame();
  document.addEventListener("keydown", keyPressed);
});

//add event listener to the reset button, once clicked sets counter to zero and displays their values, also reset the timer and display a message Click start to play again in the game screen
resetEl.addEventListener("click", function () {
  winsCounter = 0;
  losesCounter = 0;
  wins.textContent = winsCounter;
  loses.textContent = losesCounter;
  clearInterval(timeInterval);
  timerEl.textContent = 10;
  wordBlanks.textContent = "Click Start to play again";
});
