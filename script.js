var startHighscore = document.getElementById("Highscore");
var scoreEl = document.getElementById("score");
var quizSection = document.getElementById("quiz");
var questionsEl = document.getElementById("question");
var timeTimer = document.getElementById("timer");
var startButton = document.getElementById("startBtn");
var gameEnd = document.getElementById("end");
var startSection = document.getElementById("start");

var highscoreBox = document.getElementById("highscore");
var highscorePage = document.getElementById("hsPage");
var nameInput = document.getElementById("name");
var highscoreNames = document.getElementById("hsname");
var highscoreValue = document.getElementById("hsvalue");

var endBtn = document.getElementById("endBtn");
var submitBtn = document.getElementById("submit");

var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQs = [
  {
    question: "Which Team Does Not Belong to AFC West?:",
    answerA: "A. Raiders",
    answerB: "B. Chargers",
    answerC: "C. Texans",
    answerD: "D. Chiefs",
    correctAnswer: "c",
  },
  {
    question: "Which Team Does Not Belong to AFC East?",
    answerA: "A. Titans",
    answerB: "B. Jets",
    answerC: "C. Patriots",
    answerD: "D. Bills",
    correctAnswer: "a",
  },
  {
    question: "Which Team Does Not Belong to AFC North?",
    answerA: "A. Ravens",
    answerB: "B. Patriots",
    answerC: "C. Steelers",
    answerD: "D. Bengals",
    correctAnswer: "b",
  },
  {
    question: "Which Team Does Not Belong to AFC South?",
    answerA: "A. Titans",
    answerB: "B. Colts",
    answerC: "C. Jaguars",
    answerD: "D. Dolphins",
    correctAnswer: "d",
  },
  {
    question: "Which Team Does Not Belong to NFC South?",
    answerA: "A. Packers",
    answerB: "B. Falcons",
    answerC: "C. Panthers",
    answerD: "D. Saints",
    correctAnswer: "a",
  },
  {
    question: "Which Team Does Not Belong to NFC East?",
    answerA: "A. Packers",
    answerB: "B. Eagles",
    answerC: "C. Giants",
    answerD: "D. Cowboys",
    correctAnswer: "a",
  },
  {
    question: "Which Team Does Not Belong to NFC West?",
    answerA: "A. Falcons",
    answerB: "B. Rams",
    answerC: "C. 49ers",
    answerD: "D. Seahawks",
    correctAnswer: "a",
  },
  {
    question: "Which Team Does Not Belong to NFC North?",
    answerA: "A. Raiders",
    answerB: "B. Vikings",
    answerC: "C. Lions",
    answerD: "D. Bears",
    correctAnswer: "a",
  },
];

var finalValue = quizQs.length;
var intialValue = 0;
var timeLeft = 80;
var timerInterval;
var score = 0;
var correct;
var removeTime;

// Generate Questions
function generateQ() {
  gameEnd.style.display = "none";
  if (intialValue === finalValue) {
    return scorePage();
  }
  var currentQuestion = quizQs[intialValue];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.answerA;
  buttonB.innerHTML = currentQuestion.answerB;
  buttonC.innerHTML = currentQuestion.answerC;
  buttonD.innerHTML = currentQuestion.answerD;
}

// Start to First Question
function startQuiz() {
  gameEnd.style.display = "none";
  startSection.style.display = "none";
  startHighscore.style.display = "none";
  quizSection.style.display = "block";
  generateQ();
  //timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timeTimer.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      scorePage();
    }
  }, 1000);
}
// Verify Answers
function Verify(answer) {
  removeTime = function () {
    timeLeft = timeLeft - 10;
    return timeLeft;
  };
  correct = quizQs[intialValue].correctAnswer;
  if (answer === correct && intialValue !== finalValue) {
    score++;
    intialValue++;
    generateQ();
  } else if (answer !== correct && intialValue !== finalValue) {
    intialValue++;
    generateQ();
    removeTime();
  } else {
    scorePage();
  }
}

// Quiz End Page
function scorePage() {
  quizSection.style.display = "none";
  gameEnd.style.display = "flex";
  clearInterval(timerInterval);
  nameInput.value = "";
  scoreEl.innerHTML = "You got " + score + " / " + quizQs.length + " correct.";
}

// Scores
submitBtn.addEventListener("click", function highscore() {
  if (nameInput.value === "") {
    alert("Please Enter Name");
    return false;
  } else {
    var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    var currentUser = nameInput.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    highscoreBox.style.display = "flex";
    highscorePage.style.display = "block";
    endBtn.style.display = "flex";
    gameEnd.style.display = "none";

    savedScores.push(currentHighscore);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    generateScore();
  }
});

function generateScore() {
  highscoreNames.innerHTML = "";
  highscoreValue.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedScores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var nameEntry = document.createElement("li");
    var scoreEntry = document.createElement("li");

    nameEntry.textContent = highscores[i].name;
    scoreEntry.textContent = highscores[i].score;

    highscoreNames.appendChild(nameEntry);
    highscoreValue.appendChild(scoreEntry);
  }
}

// HIGH SCORE PAGE
function Highscore() {
  startSection.style.display = "none";
  gameEnd.style.display = "none";
  highscoreBox.style.display = "flex";
  endBtn.style.display = "flex";
  highscorePage.style.display = "block";
  generateScore();
}

// clear scores
function clearScore() {
  window.localStorage.clear();
  highscoreNames.textContent = "";
  highscoreValue.textContent = "";
}

// replay
function rePlay() {
  startHighscore.style.display = "flex";
  highscoreBox.style.display = "none";
  gameEnd.style.display = "none";
  startSection.style.display = "flex";
  timeLeft = 80;
  score = 0;
  intialValue = 0;
}
// start quiz
startButton.addEventListener("click", startQuiz);
