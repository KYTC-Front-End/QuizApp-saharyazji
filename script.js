document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionNumber = document.getElementById("question-number");
  const questionText = document.getElementById("question");
  const choicesList = document.getElementById("choices");
  const scoreText = document.getElementById("score");
  const leaderboardList = document.getElementById("leaderboard");
  const quizContainer = document.getElementById("quiz-container");


  let currentQuestionIndex = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Madrid", "Berlin"],
      answer: 0
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Mercury"],
      answer: 1
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Madrid", "Berlin"],
      answer: 0
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Mercury"],
      answer: 1
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Madrid", "Berlin"],
      answer: 0
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Mercury"],
      answer: 1
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Madrid", "Berlin"],
      answer: 0
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Mercury"],
      answer: 1
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Madrid", "Berlin"],
      answer: 0
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Mercury"],
      answer: 1
    },
  ];

  function startQuiz() {
    startBtn.classList.add("hide");
    leaderboardList.classList.add("hide");
    quizContainer.classList.remove("hide");
    showQuestion();
  }


  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionNumber.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    questionText.textContent = currentQuestion.question;

    choicesList.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(index));
      choicesList.appendChild(li);
    });

    nextBtn.classList.add("hide");
  }

  function selectAnswer(choiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choiceIndex === currentQuestion.answer) {
      score++;
    }

    Array.from(choicesList.children).forEach(li => {
      li.classList.add("disabled");
      if (li.textContent === currentQuestion.choices[currentQuestion.answer]) {
        li.classList.add("correct");
      } else if (li.textContent === currentQuestion.choices[choiceIndex]) {
        li.classList.add("incorrect");
      }
    });

    nextBtn.classList.remove("hide");
  }

  function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;

    const playerName = prompt("Enter your name:");
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score: score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    showLeaderboard();
  }

  function showLeaderboard() {
    leaderboardList.innerHTML = "";
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard
      .sort((a, b) => b.score - a.score)
      .forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} - ${player.score}`;
        leaderboardList.appendChild(li);
      });

    leaderboardList.classList.remove("hide");
  }

  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", showNextQuestion);
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hide");
    startQuiz();
  });
});
