// from start-screen to quiz-screen
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", fromStartToQuiz);

function fromStartToQuiz(ev) {
  const startScreen = document.getElementById("start-screen");
  startScreen.classList.remove("active");

  const quizScreen = document.getElementById("quiz-screen");
  quizScreen.classList.add("active");

  startQuizMechanism();
}

// from end-screen to mainMenu
const mainMenuBtn = document.getElementById("back-to-main-menu");
mainMenuBtn.addEventListener("click", endToMainMenu);

function endToMainMenu(ev) {
  const endScreen = document.getElementById("end-screen");
  endScreen.classList.remove("active");

  const startScreen = document.getElementById("start-screen");
  startScreen.classList.add("active");
}

// from end-screen to quizScreen
const restartQuizBtn = document.getElementById("restart-btn");
restartQuizBtn.addEventListener("click", endToQuiz);

function endToQuiz(ev) {
  const endScreen = document.getElementById("end-screen");
  endScreen.classList.remove("active");

  const quizScreen = document.getElementById("quiz-screen");
  quizScreen.classList.add("active");

  startQuizMechanism();
}

// manipulating and adding question with each answer or int other word, DOM
const questionText = document.getElementById("question-text");
const questionIndex = document.querySelector(".question-index");
const totalNumQuestion = document.querySelector(".num-total-question");
const score = document.querySelector(".user-score");
const progressBar = document.querySelector(".progress");

let currQuestionIdx = 0;
// the question and each answer I get from codesistency
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// quiz info, i make it global variable so that we can acces from anywhere in this js
let userScore = 0;
const mxScore = 100; // this is adjustable by the creator
let scoreIncrement = mxScore / quizQuestions.length;

// bug handling when answer clicked more than 1 time
let isAnswered = false;

function startQuizMechanism() {

  // always restart quiz info when starting the quiz
  userScore = 0;
  scoreIncrement = 100 / quizQuestions.length;
  isAnswered = false;
  currQuestionIdx = 0;

  nextQuestion();
}

// make sure we split the mechanism so that this function only display question
function nextQuestion() {
  // quiz head DOM
  let currQuestion = quizQuestions[currQuestionIdx];
  questionIndex.textContent = currQuestionIdx + 1;
  totalNumQuestion.textContent = quizQuestions.length;
  score.textContent = userScore;
  questionText.textContent = currQuestion.question;

  // answer-container reset
  const answerContainer = document.querySelector(".answer-container");
  answerContainer.innerHTML = "";
  isAnswered = false;


  // answer DOM, damn this confuse me a lot 💀
  Array.from(currQuestion.answers).forEach((answer) => {
    // create single answerBtn
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer.text; // fill ansBtn text with answer.text

    // add some "flag" so we know which answer is correct and which is wrong. We can do it with class or dataset. I'll pick dataset
    answerBtn.dataset.correct = answer.correct;
    answerBtn.classList.add("answer-btn");

    // add Event Listener so it's clickable
    answerBtn.addEventListener("click", selectAnswer);

    // after that we add / append to the answer container
    const answerContainer = document.querySelector(".answer-container");
    answerContainer.appendChild(answerBtn);
  });

  // manipulating progress bar
  const progressPercent = (currQuestionIdx / quizQuestions.length) * 100;
  // manipulate the width style of progressBar
  progressBar.style.width = progressPercent + "%";
}

// select answer mechanism. After this we go to nextQuestion
function selectAnswer(ev) {
  // if the user accidentally click twice or more, we don't manipulate any score
  if(isAnswered) return;
  isAnswered = 1; // means the user click the answer

  const selectedBtn = ev.currentTarget; // select the selected btn
  const isCorrect = selectedBtn.dataset.correct === "true";
  // check if it's true or not

  // for every button in answer-container, we add classlist so that we can highlight if the selected button is true or not
  // notice we only want the selected button is highlighted and the true answer. So the other answer-btn is stay the same
  const answerContainer = document.querySelector(".answer-container");
  Array.from(answerContainer.children).forEach((button) => {
    // highlight true button by changing its style, but i will do it via class
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if(button === selectedBtn) {
      button.classList.add("incorrect");
    }
  });

  // add userScore if the answer is true
  if(isCorrect) {
    userScore += scoreIncrement;
    score.textContent = userScore;
  }

  // lastly, we want to go to next question with delay of 1s. This is because changing style of the highlighted answer button takes time
  setTimeout(() => {
    // we add question idx to go to the next question
    currQuestionIdx++;

    // check if there's remain other question, if not we go to showQuizResult and end-screen
    if(currQuestionIdx < quizQuestions.length) {
      nextQuestion();
    } else {
      // first activate end-screen and turn off quiz screen
      const quizScreen = document.getElementById("quiz-screen");
      const endScreen = document.getElementById("end-screen");
      quizScreen.classList.remove("active");
      endScreen.classList.add("active");
      showQuizResult();
    }
  }, 1000);
}

// this is showing quiz result mechanism
function showQuizResult() {

  // DOM
  const endScore = document.getElementById("user-score-end");
  const maxScoreDom = document.querySelector(".max-score");

  maxScoreDom.textContent = mxScore;
  endScore.textContent = userScore;

  // this is affirmation, adjustable by the creator
  const affirm = document.getElementById("affirmation");
  if(userScore < 20) {
    affirm.textContent = "Belajar lagi ya";
  } else if(userScore >= 20 && userScore < 50) {
    affirm.textContent = "Wih terus belajar ya, dikit lagi pro nih";
  } else if(userScore >= 50 && userScore < 80) {
    affirm.textContent = "Wih ada kemajuan, kiw2 semangat!";
  } else if(userScore >= 80) {
    affirm.textContent = "Bro lets gooo!";
  }

}