// HTML Elements
const progressBar = document.querySelector("#progress-bar");
const promptDisplay = document.querySelector("#prompt-display");
const typeInput = document.querySelector("#type-input");

// Global Variables
const prompt = "Tyler is the best software developer to ever live I think he is spectacular dapper young man";
const words = [];
let currentWordIndex = 0;
let correctCharacters = "";
let incorrectCharacters = "";
let finishedWords = "";
let points = 0;

// Event Listeners
typeInput.addEventListener("keyup", checkIfCorrect);
// Functions
promptDisplay.innerHTML = prompt;
gameStart();

function gameStart() {
    separateWords();
}
function gameEnd() {
    promptDisplay.innerHTML = `<span class="correct">${prompt}</span>`;
    typeInput.value = "";
    progressBar.style.backgroundColor = "green";
    console.log("You win!");
}
function checkIfCorrect() {
    correctCharacters = finishedWords;
    incorrectCharacters = "";
    let incorrectBool = false;

    if (currentWordIndex + 1 === words.length && typeInput.value === words[currentWordIndex]) {
        correctCharacters = typeInput.value;
        updateProgress();
        return gameEnd();
    }

    else if (typeInput.value === words[currentWordIndex] + " ") {
        finishedWords += typeInput.value;
        correctCharacters = finishedWords;
        console.log({ finishedWords });
        currentWordIndex++;
        handleChange("correct");
        updateProgress();
        typeInput.value = "";
        console.log("Next word!");
        console.log(words[currentWordIndex]);
        return;
    }

    if (typeInput.value.length === 0) {
        handleChange();
    }

    for (let i = 0; i < typeInput.value.length; i++) {
        if (typeInput.value[i] === words[currentWordIndex][i] && !incorrectBool && typeInput.value <= words[currentWordIndex]) {
            correctCharacters += typeInput.value[i];
            handleChange("correct");
        }

        else {
            if (i > words[currentWordIndex].length || typeInput.value.length > words[currentWordIndex]) {
                return;
            }
            incorrectBool = true;
            incorrectCharacters += prompt[(correctCharacters.length) + incorrectCharacters.length];
            handleChange("incorrect");
        }
    }
}
function handleChange(result) {
    let remainingCharacters = "";

    for (let i = correctCharacters.length + incorrectCharacters.length; i < prompt.length; i++) {
        remainingCharacters += prompt[i];
    }

    if (result === "correct") {
        promptDisplay.innerHTML = `<span class="correct">${correctCharacters}</span>${remainingCharacters}`;
    }
    else {
        promptDisplay.innerHTML = `<span class="correct">${correctCharacters}</span><span class="incorrect">${incorrectCharacters}</span>${remainingCharacters}`;
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

function updateProgress() {
    points += typeInput.value.length;
    console.log(`${(points / prompt.length) * 100}%`);
    progressBar.style.width = `${(points / prompt.length) * 100}%`;
}