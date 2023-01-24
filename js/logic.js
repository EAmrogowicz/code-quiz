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
// default state for the question
let questionAnswered = false;
//
let score = 0;

// sets the time
let secondsLeft = 100;

let timerInterval;

// timer count down
function startCountdown() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = secondsLeft;
    //changes the color if 10s remained
    if (secondsLeft < 11) {
      time.setAttribute("style", "color: #ee442f");
    }
    if (secondsLeft === 0) {
      // stops execution of action at set interval
      clearInterval(timerInterval);
      // calls function with result
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
  time.textContent = "100";
  startCountdown();
}

//
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

// supportive messages to initials submission
// executes in signupButton function
function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

// feedback - sounds effects for correct answer
function soundPlayCorrect() {
  const audioCorrect = new Audio("./sfx/correct.wav");
  audioCorrect.play();
}

// feedback - sounds effects for incorrect answer
function soundPlayIncorrect() {
  const audioIncorrect = new Audio("./sfx/incorrect.wav");
  audioIncorrect.play();
}

// ensures that next question is printed
function nextQuestion() {
  clearCurrentQuestion();
  currentQuestion = currentQuestion + 1;
  quizGame();
  // re-set state for the question
  questionAnswered = false;
}

// validates the answer
function choiceCheck(btn) {
  btn.addEventListener("click", function (e) {
    // prevents change do different answer
    if (questionAnswered) {
      return;
    }
    // change state for the question after click
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
      // stops timer if the player run out of the time
      // goes to result page
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        resultQuiz();
        finalmsg.textContent = "Sorry, you run out of time!";
      }
    }

    // change the style of the question answered - greyed out
    questionTitle.classList.add("responded");

    // add response to answer - correct/ wrong
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

    // view result button at the last question
    if (currentQuestion === questionsNumber - 1) {
      // stops timer
      clearInterval(timerInterval);
      // creates 'view results' button instead 'next question'
      choicesList.removeChild(nextButton);
      let viewResult = document.createElement("button");
      viewResult.textContent = "VIEW RESULTS";
      choicesList.appendChild(viewResult);
      viewResult.setAttribute(
        "style",
        "background-color: #1d3557; color: white;"
      );
      // adds event listener to button
      viewResult.addEventListener("click", resultQuiz);
    }

    // export score
    return score;
  });
}

// main function that renders question and choices
function quizGame() {
  // prints the question
  questionTitle.textContent = questions[currentQuestion].question;
  // prints the button corresponding to each choice
  for (let j = 0; j < questions[currentQuestion].choices.length; j++) {
    let choiceButton = "";
    choiceButton = document.createElement("button");
    choiceButton.innerHTML = questions[currentQuestion].choices[j];
    choicesList.appendChild(choiceButton);
    // check the answer - event listener
    choiceCheck(choiceButton);
  }
}

// START
startButton.addEventListener("click", startQuiz);

// RUN GAME
quizGame();

// submit user id and score to local storage
signUpButton.addEventListener("click", function (e) {
  e.preventDefault();
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
    // copy new submission to local storage
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
