const startScreenDiv = document.getElementById("start-screen");
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesList = document.getElementById("choices-list");

function startQuiz() {
  startScreenDiv.classList.add("hide");
  questionsDiv.classList.add("start");
  questionsDiv.classList.remove("hide");
}

function game() {
  questionTitle.textContent = questions[0].question;

  choicesList.innerHTML = "";
  questions[0].choices.forEach(function (choice) {
    let choiceButton = document.createElement("button");
    choiceButton.innerHTML = choice;

    choicesList.appendChild(choiceButton);
  });
}

startButton.addEventListener("click", startQuiz, {
  passive: true,
  once: true,
});

game();
