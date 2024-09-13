// HTML Elements
const progressBar = document.querySelector("#progress-bar");
const promptDisplay = document.querySelector("#prompt-display");
const typeInput = document.querySelector("#type-input");

// Global Variables
const prompt = "Tyler is the best software developer to ever live I think he is spectacular dapper young man";
const words = [];
let currentWordIndex = 0;
let greenCharacters = "";
let redCharacters = "";
let finishedWords = "";
let points = 0;

// Event Listeners
typeInput.addEventListener("keydown", () => { // Runs each time the user enters a new value into the input field
    checkIfCorrect(typeInput.value);
});
typeInput.addEventListener("keyup", () => {
    checkIfCorrect(typeInput.value);
});

// Functions
promptDisplay.innerHTML = prompt;
gameStart();

function gameStart() {
    separateWords();
}
function gameEnd() {
    typeInput.value = "";
    progressBar.style.backgroundColor = "green";
    console.log("You win!");
}
function checkIfCorrect(userInput) {
    greenCharacters = finishedWords; // Sets the words that will be highlighted green to the words that have already been finished
    redCharacters = ""; // Incorrect characters are reset each time the function runs

    let incorrectBool = false; // Flag that will be enabled each time an incorrect input is entered which will render subsequent characters incorrect

    if (currentWordIndex + 1 === words.length && userInput === words[currentWordIndex]) { // Checks if the player has correctly type the last word
        finishedWords += userInput;
        greenCharacters = finishedWords;
        handleChange("correct");
        updateProgress(userInput);
        gameEnd();
        return;
    }

    if (userInput === words[currentWordIndex] + " ") { // Checks if the user has finished a word
        typeInput.value = "";
        finishedWords += userInput; // The user's input is added to the list of completed words
        greenCharacters = finishedWords; // The letters to be highlighted green are updated to the completed words
        currentWordIndex++;
        handleChange("correct");
        updateProgress(userInput);
        return;
    }

    if (userInput.length === 0) {
        handleChange();
    }

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === words[currentWordIndex][i] && !incorrectBool && userInput <= words[currentWordIndex]) {
            greenCharacters += userInput[i];
            handleChange("correct");
        }

        else {
            if (i > words[currentWordIndex].length || userInput.length > words[currentWordIndex]) {
                return;
            }
            incorrectBool = true;
            redCharacters += prompt[(greenCharacters.length) + redCharacters.length];
            handleChange("incorrect");
        }
    }
}
function handleChange(result) {
    let remainingCharacters = "";

    for (let i = greenCharacters.length + redCharacters.length; i < prompt.length; i++) {
        remainingCharacters += prompt[i];
    }

    if (result === "correct") {
        promptDisplay.innerHTML = `<span class="correct">${greenCharacters}</span>${remainingCharacters}`;
    }
    else {
        promptDisplay.innerHTML = `<span class="correct">${greenCharacters}</span><span class="incorrect">${redCharacters}</span>${remainingCharacters}`;
    }
}

function separateWords() {
    let wordToProcess = "";
    for (let i = 0; i < prompt.length; i++) {
        if (prompt[i] !== " ") {
            wordToProcess += prompt[i];
        }
        else {
            words.push(wordToProcess);
            wordToProcess = "";
        }
    }
    words.push(wordToProcess);
}

// Updates the progress bar
function updateProgress(userInput) {
    points += userInput.length;
    console.log(`${(points / prompt.length) * 100}%`);
    progressBar.style.width = `${(points / prompt.length) * 100}%`;
}