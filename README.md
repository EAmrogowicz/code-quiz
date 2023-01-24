# Module 6 Challenge Web APIs: Code Quiz

## Overview

A timed coding quiz with multiple-choice questions about JavaScript basics. The
app runs in the browser, and features dynamically updated HTML and CSS powered
by JavaScript code. It has a clean, polished, and responsive user interface.

RULES: You have 15s per question (10 in total). Every wrong answer deduces 10s
from your leftover time. You get 1 point for correct answer and the end you can
save your score to local storage. Have fun!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Credits](#credits)
- [License](#license)

## Installation

Add CSS right before closing `</head>` tag in html files:

```html
<link rel="stylesheet" href="./css/styles.css" />
```

Add JavaScript right before closing `</body>` tag in the html file.

For highscores.html use:

```html
<script src="./js/scores.js"></script>
```

For index.html (main page) use:

```html
<script src="./js/questions.js"></script>
<script src="./js/logic.js"></script>
```

## Usage

Output: https://eamrogowicz.github.io/code-quiz/

GitHub source files: https://github.com/EAmrogowicz/code-quiz.

The following image shows the application's appearance and functionality:
![Animation of code quiz. Presses button to start quiz. Clicks the button for the answer to each question, displays if answer was correct or incorrect. Quiz finishes and displays high scores. User adds their initials, then clears their initials and starts over.](./assets/js-code-quiz.gif)

## Requirements

- Start button - when clicked a timer starts and the first question appears:

  - Questions contain buttons for each answer

    - time - counts down
    - multiple-choice: 10 questions about JS

  - When answer is clicked, the next question appears

    - correct/wrong alert at the bottom of the screen
    - sound effects supporting the response

  - If the answer clicked was incorrect then 10s is subtracted from the clock

- The quiz ends when all questions are answered or the timer reaches 0, then the
  page:

  - displays score
  - gives the user the ability to save their initials and their score
  - saves the score to local server

- All high scores are displayed on the separate web page:
  - top 5 scores are printed
  - if last user score is lower than the top 5 saved scores, it displays the
    score temporarily below ranking
  - allows user to remove all scores and clear local storage

## Credits

N/A

## License

Please refer to the LICENSE in the repo.
