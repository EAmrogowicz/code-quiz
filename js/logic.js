const startScreenDiv = document.getElementById("start-screen");
const startButton = document.getElementById("start");
const questionsDiv = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesList = document.getElementById("choices-list");
const endScreen = document.getElementById("end-screen");
const finalmsg = document.getElementById("final-msg");
const finalScore = document.getElementById("final-score");
const userID = document.getElementById("initials");
const signUpButton = document.getElementById("submit");
const msgDiv = document.querySelector("#msg");
const time = document.getElementById("time");

// total number of questions
const questionsNumber = questions.length;
// question count starts from 0
let currentQuestion = 0;
let questionAnswered = false;
let score = 0;

let secondsLeft = 60;
// let gameFinished = false;

let timerInterval;

function startCountdown() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = secondsLeft;

    if (secondsLeft < 11) {
      time.setAttribute("style", "color: #ee442f");
    }

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      resultQuiz();
      finalmsg.textContent = "Sorry, you run out of time!";
    }
  }, 1000);
}

// renders the first question
function startQuiz() {
  startScreenDiv.classList.add("hide");
  questionsDiv.classList.remove("hide");

  // start count down
  time.textContent = "30";
  startCountdown();
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

function soundPlayCorrect() {
  const audioCorrect = new Audio("./sfx/correct.wav");
  audioCorrect.play();
}

function soundPlayIncorrect() {
  const audioIncorrect = new Audio("./sfx/incorrect.wav");
  audioIncorrect.play();
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
      soundPlayCorrect();
      btn.setAttribute("style", "background-color: #219ebc; color: white;");
      // adds points to score
      score = score + 1;
    } else {
      message = "Wrong!";
      soundPlayIncorrect();
      btn.setAttribute("style", "background-color: #ee442f; color: white;");
      //reduce time by 10s
      secondsLeft = secondsLeft - 10;
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

    // view result button
    if (currentQuestion === questionsNumber - 1) {
      clearInterval(timerInterval);

      choicesList.removeChild(nextButton);
      let viewResult = document.createElement("button");
      viewResult.textContent = "VIEW RESULTS";
      choicesList.appendChild(viewResult);
      viewResult.setAttribute(
        "style",
        "background-color: #1d3557; color: white;"
      );

      //* ***************************** */
      // ADD TIME STOP HERR!

      viewResult.addEventListener("click", resultQuiz);
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

// submit user id and score to local storage
signUpButton.addEventListener("click", function (event) {
  event.preventDefault();

  // creates array in local storage to save users scores
  const usersHighScores = JSON.parse(localStorage.getItem("usersHighScores"));

  // creates user object from submission
  const user = {
    id: userID.value,
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

    if (usersHighScores === null) {
      localStorage.setItem("usersHighScores", JSON.stringify([user]));
    } else {
      usersHighScores.push(user);
      localStorage.setItem("usersHighScores", JSON.stringify(usersHighScores));
    }

    //open highscores page
    window.open("highscores.html?gameFinished", "_self");
  }
});
