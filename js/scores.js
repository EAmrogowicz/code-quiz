const highscores = document.getElementById("highscores");
const clearScores = document.getElementById("clear");

// let scores = [];
const usersHighScores = JSON.parse(localStorage.getItem("usersHighScores"));

// sort by score

function renderHighScores() {
  highscores.innerHTML = "";

  let sortedUserHighScores = [];

  if (usersHighScores.length > 1) {
    sortedUserHighScores = usersHighScores.sort(
      (a, b) => b.finalScore - a.finalScore
    );
  } else {
    sortedUserHighScores = usersHighScores;
  }

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
