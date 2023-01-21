const startScreenDiv = document.getElementById("start-screen");
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesList = document.getElementById("choices-list");

const questionsNumber = 2;
let currentQuestion = 0;
let questionAnswered = false;

function startQuiz() {
  startScreenDiv.classList.add("hide");
  questionsDiv.classList.remove("hide");
}

function clearCurrentQuestion() {
  questionTitle.textContent = "";
  choicesList.innerHTML = "";
}

function choiceCheck(btn) {
  btn.addEventListener("click", function (e) {
    if (questionAnswered) {
      return;
    }

    questionAnswered = true;

    e.preventDefault();

    questionTitle.classList.add("responded");

    let message;
    if (btn.textContent === questions[currentQuestion].correctChoice) {
      message = "Correct!";
    } else {
      message = "Wrong!";
    }

    const response = document.createElement("h3");
    response.textContent = message;
    choicesList.appendChild(response);

    let nextButton = document.createElement("button");
    nextButton.textContent = "NEXT QUESTION";
    choicesList.appendChild(nextButton);
    nextButton.addEventListener("click", nextQuestion);
  });
}

function renderQuestion() {
  questionTitle.textContent = questions[currentQuestion].question;

  for (let j = 0; j < questions[currentQuestion].choices.length; j++) {
    let choiceButton = "";

    choiceButton = document.createElement("button");
    choiceButton.innerHTML = questions[currentQuestion].choices[j];
    choicesList.appendChild(choiceButton);

    choiceCheck(choiceButton);
  }
}

function nextQuestion() {
  clearCurrentQuestion();
  currentQuestion = currentQuestion + 1;
  renderQuestion();
  questionAnswered = false;
}

startButton.addEventListener("click", startQuiz);

renderQuestion();
