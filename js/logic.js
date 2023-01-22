const startScreenDiv = document.getElementById("start-screen");
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesList = document.getElementById("choices-list");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const userID = document.getElementById("initials");
const signUpButton = document.getElementById("submit");
var msgDiv = document.querySelector("#msg");

// total number of questions
const questionsNumber = 3;
// question count starts from 0
let currentQuestion = 0;
let questionAnswered = false;
let score = 0;

// renders the first question
function startQuiz() {
  startScreenDiv.classList.add("hide");
  questionsDiv.classList.remove("hide");
}

function resultQuiz() {
  questionsDiv.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = score;
  finalScore.classList.add("final-score");
}

// clears current state before renders next question
function clearCurrentQuestion() {
  questionTitle.textContent = "";
  questionTitle.classList.remove("responded");
  choicesList.innerHTML = "";
}

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

//checks the answer
function choiceCheck(btn) {
  btn.addEventListener("click", function (e) {
    // prevents change of an answer
    if (questionAnswered) {
      return;
    }

    questionAnswered = true;
    e.preventDefault();

    let message;
    if (btn.textContent === questions[currentQuestion].correctChoice) {
      message = "Correct!";
      btn.setAttribute("style", "background-color: #219ebc; color: white;");
      // adds points to score
      score = score + 1;
      // console.log(score);
    } else {
      message = "Wrong!";
      btn.setAttribute("style", "background-color: #ee442f; color: white;");
    }

    // change the style of the question - greyed out
    questionTitle.classList.add("responded");

    // add rescponce to answer - correct/ wrong
    const feedback = document.createElement("h3");
    feedback.textContent = message;
    choicesList.appendChild(feedback);
    feedback.classList.add("feedback");

    // go to next question button
    let nextButton = document.createElement("button");
    nextButton.textContent = "NEXT QUESTION";
    choicesList.appendChild(nextButton);
    nextButton.setAttribute(
      "style",
      "background-color: #1d3557; color: white;"
    );
    nextButton.addEventListener("click", nextQuestion);

    // shows result button
    if (currentQuestion === questionsNumber - 1) {
      choicesList.removeChild(nextButton);
      let showResult = document.createElement("button");
      showResult.textContent = "VIEW RESULTS";
      choicesList.appendChild(showResult);
      showResult.setAttribute(
        "style",
        "background-color: #1d3557; color: white;"
      );
      showResult.addEventListener("click", resultQuiz);
    }

    console.log(score);
    return score;
  });
}

function nextQuestion() {
  clearCurrentQuestion();
  currentQuestion = currentQuestion + 1;
  quizGame();
  questionAnswered = false;
}

// renders question and choices
function quizGame() {
  questionTitle.textContent = questions[currentQuestion].question;

  for (let j = 0; j < questions[currentQuestion].choices.length; j++) {
    let choiceButton = "";

    choiceButton = document.createElement("button");
    choiceButton.innerHTML = questions[currentQuestion].choices[j];
    choicesList.appendChild(choiceButton);

    choiceCheck(choiceButton);
  }
}

startButton.addEventListener("click", startQuiz);

quizGame();

signUpButton.addEventListener("click", function (event) {
  event.preventDefault();

  // create user object from submission
  const user = {
    id: userID.value.trim(),
    finalScore: score,
  };

  // validate the fields
  if (user.id === "") {
    displayMessage("error", "User initials cannot be blank");
  } else if (user.id.length > 3) {
    displayMessage("error", "Max 3 letters");
  } else {
    displayMessage("success", "Registered successfully");

    // set new submission
    console.log(user);
    localStorage.setItem("user", user);

    // get most recent submission
    // var lastUser = localStorage.getItem("user");
    // userFirstNameSpan.textContent = lastUser.firstName;
    // userLastNameSpan.textContent = lastUser.lastName;
    // userEmailSpan.textContent = lastUser.email;
    // userPasswordSpan.textContent = lastUser.password;
  }
});
