const highscores = document.getElementById("highscores");
const clearScores = document.getElementById("clear");

const highlight = location.search.slice(1) === "gameFinished";

const usersHighScores = JSON.parse(localStorage.getItem("usersHighScores"));

function renderHighScores() {
  highscores.innerHTML = "";

  // sorts user's scores
  let sortedUserHighScores = [];

  let lastResult;
  if (highlight) {
    // the most recent result is assigned to last element in an array
    lastResult = usersHighScores.at(-1);
  }

  // return message if there is not even one score in storage
  if (usersHighScores === null) {
    const h3 = document.createElement("h3");
    h3.textContent = "No score saved yet!";
    highscores.appendChild(h3);
    return;
  } else if (usersHighScores.length > 1) {
    // sort by score if there is more than one input
    // prints only top 5 scores
    sortedUserHighScores = usersHighScores
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 5);
  } else {
    // first score is not sorted
    sortedUserHighScores = usersHighScores;
  }

  let highlighted = false;

  // creates list with the user initials and score
  sortedUserHighScores.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.id}:   ${user.finalScore}`;

    // highlight your/last score in the list
    if (highlight && !highlighted && user === lastResult) {
      highlighted = true;
      li.setAttribute("style", "background-color: #8ecae6; ");
    }

    highscores.appendChild(li);
  });

  // render your score below top 5
  if (!highlighted) {
    const p = document.createElement("p");
    p.textContent = `\n  Sorry! ${lastResult.id}:   ${lastResult.finalScore}`;
    p.setAttribute(
      "style",
      "color: #1d3557; border-top: 1px solid #1d3557; padding:4px"
    );
    highscores.appendChild(p);
  }
}

// clear all scores from the list
clearScores.addEventListener("click", function (event) {
  localStorage.removeItem("usersHighScores");
  highscores.innerHTML = "";
});

renderHighScores();
