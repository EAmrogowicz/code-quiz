const highscores = document.getElementById("highscores");

// let scores = [];
const usersHighScores = JSON.parse(localStorage.getItem("usersHighScores"));

// sort by score

const sortedUserHighScores = usersHighScores.sort(
  (a, b) => b.finalScore - a.finalScore
);

console.log(sortedUserHighScores);

function renderHighScores() {
  highscores.innerHTML = "";

  sortedUserHighScores.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.id}:   ${user.finalScore}`;

    highscores.appendChild(li);
  });
}

renderHighScores();
