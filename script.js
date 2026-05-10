// script.js
// Nepal Quiz - Complete JavaScript File

// Quiz questions about Nepal
const questions = [
  {
    text: "What is the capital city of Nepal?",
    answers: ["Pokhara", "Kathmandu", "Lalitpur", "Bhaktapur"],
    correct: 1
  },
  {
    text: "Which is the highest mountain peak located in Nepal?",
    answers: ["K2", "Kangchenjunga", "Mount Everest (Sagarmatha)", "Lhotse"],
    correct: 2
  },
  {
    text: "What is the national animal of Nepal?",
    answers: ["Bengal Tiger", "One-horned Rhinoceros", "Snow Leopard", "Cow"],
    correct: 3
  },
  {
    text: "Which festival is known as the 'Festival of Lights' in Nepal?",
    answers: ["Dashain", "Holi", "Tihar (Deepawali)", "Teej"],
    correct: 2
  },
  {
    text: "What is the national flower of Nepal?",
    answers: ["Lotus", "Rhododendron (Laligurans)", "Marigold", "Sunflower"],
    correct: 1
  }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answer-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const progressBar = document.getElementById('progress');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessageDiv = document.getElementById('result-message');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = questions.length;
let userAnswers = new Array(totalQuestions).fill(null);
let answered = false;
let canProceed = true;

// Set total questions display
totalQuestionsSpan.textContent = totalQuestions;
maxScoreSpan.textContent = totalQuestions;

// Helper: Show specific screen
function showScreen(screenId) {
  startScreen.classList.remove('active');
  quizScreen.classList.remove('active');
  resultScreen.classList.remove('active');
  
  if (screenId === 'start') startScreen.classList.add('active');
  if (screenId === 'quiz') quizScreen.classList.add('active');
  if (screenId === 'result') resultScreen.classList.add('active');
}

// Update progress bar
function updateProgressBar() {
  const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// Load current question
function loadQuestion() {
  answered = false;
  canProceed = true;
  
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.text;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  
  // Clear and rebuild answer buttons
  answerContainer.innerHTML = '';
  
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('answer-btn');
    button.dataset.index = index;
    
    // If already answered this question
    if (userAnswers[currentQuestionIndex] !== null) {
      button.disabled = true;
      if (userAnswers[currentQuestionIndex] === index) {
        if (index === question.correct) {
          button.classList.add('correct');
        } else {
          button.classList.add('wrong');
        }
      } else if (index === question.correct) {
        button.classList.add('correct');
      }
    }
    
    button.addEventListener('click', () => handleAnswer(index, button));
    answerContainer.appendChild(button);
  });
  
  updateProgressBar();
}

// Handle answer selection
function handleAnswer(selectedIndex, buttonElement) {
  if (answered || userAnswers[currentQuestionIndex] !== null || !canProceed) return;
  
  const question = questions[currentQuestionIndex];
  const isCorrect = (selectedIndex === question.correct);
  
  answered = true;
  canProceed = false;
  userAnswers[currentQuestionIndex] = selectedIndex;
  
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  
  // Highlight all answers
  const allButtons = document.querySelectorAll('.answer-btn');
  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === question.correct) {
      btn.classList.add('correct');
    }
    if (idx === selectedIndex && idx !== question.correct) {
      btn.classList.add('wrong');
    }
  });
  
  // Move to next question or finish
  setTimeout(() => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResults();
    }
  }, 800);
}

// Show final results
function showResults() {
  finalScoreSpan.textContent = score;
  
  const percentage = (score / totalQuestions) * 100;
  let message = '';
  
  if (percentage === 100) {
    message = '🎉 Perfect! You are a Nepal expert! 🎉';
  } else if (percentage >= 80) {
    message = '🌟 Excellent! You know Nepal very well! 🌟';
  } else if (percentage >= 60) {
    message = '👍 Good job! Learn more about beautiful Nepal! 👍';
  } else if (percentage >= 40) {
    message = '📚 Nice try! Nepal has so much to discover! 📚';
  } else {
    message = '💪 Keep learning about amazing Nepal! Try again! 💪';
  }
  
  resultMessageDiv.textContent = message;
  showScreen('result');
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(totalQuestions).fill(null);
  answered = false;
  canProceed = true;
  
  scoreSpan.textContent = '0';
  progressBar.style.width = '0%';
  
  loadQuestion();
  showScreen('quiz');
}

// Start quiz from beginning
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(totalQuestions).fill(null);
  answered = false;
  canProceed = true;
  scoreSpan.textContent = '0';
  progressBar.style.width = '0%';
  
  loadQuestion();
  showScreen('quiz');
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
