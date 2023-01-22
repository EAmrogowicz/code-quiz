const highscores = document.getElementById("highscores");
const clearScores = document.getElementById("clear");

const usersHighScores = JSON.parse(localStorage.getItem("usersHighScores"));

function renderHighScores() {
  highscores.innerHTML = "";

  // sorts user's scores
  let sortedUserHighScores = [];
  if (usersHighScores.length > 1) {
    // sort by score if thre is more than one input
    sortedUserHighScores = usersHighScores.sort(
      (a, b) => b.finalScore - a.finalScore
    );
  } else {
    sortedUserHighScores = usersHighScores;
  }

  // creates list with the user initilaas and score
  sortedUserHighScores.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.id}:   ${user.finalScore}`;

    highscores.appendChild(li);
  });
}

// clear all scores from the list
clearScores.addEventListener("click", function (event) {
  localStorage.removeItem("usersHighScores");
  highscores.innerHTML = "";
});

renderHighScores();
