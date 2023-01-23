const highscores = document.getElementById("highscores");
const clearScores = document.getElementById("clear");

const highlight = location.search.slice(1) === "gameFinished";

const usersHighScores = JSON.parse(localStorage.getItem("usersHighScores"));

function renderHighScores() {
  highscores.innerHTML = "";

  // sorts user's scores
  let sortedUserHighScores = [];

  if (usersHighScores === null) {
    //text
  }

  let lastResult;
  if (highlight) {
    //last result isd assigned to last element in an array
    lastResult = usersHighScores.at(-1);
  }

  if (usersHighScores.length > 1) {
    // sort by score if thre is more than one input
    sortedUserHighScores = usersHighScores
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 5);
  } else {
    sortedUserHighScores = usersHighScores;
  }

  let highlighted = false;

  // creates list with the user initilaas and score
  sortedUserHighScores.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.id}:   ${user.finalScore}`;

    if (highlight && !highlighted && user === lastResult) {
      highlighted = true;
      li.setAttribute("style", "background-color: #1d3557; color: white;");
    }

    highscores.appendChild(li);
  });
  if (!highlighted) {
    const li = document.createElement("li");
    li.textContent = `${lastResult.id}:   ${lastResult.finalScore}`;
    li.setAttribute("style", "background-color: #ee442f; color: white;");
    highscores.appendChild(li);
  }
}

// clear all scores from the list
clearScores.addEventListener("click", function (event) {
  localStorage.removeItem("usersHighScores");
  highscores.innerHTML = "";
});

renderHighScores();
