// from start-screen to quiz-screen
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", fromStartToQuiz);

function fromStartToQuiz(ev) {
  const startScreen = document.getElementById("start-screen");
  startScreen.classList.remove("active");

  const quizScreen = document.getElementById("quiz-screen");
  quizScreen.classList.add("active");
}

// from end-screen to restartQuiz