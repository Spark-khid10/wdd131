const questions = [
  {
    id: "experience",
    text: "How much coding experience do you have?",
    options: [
      { value: "none", label: "None at all" },
      { value: "some", label: "I've dabbled a little" },
      { value: "comfortable", label: "I'm comfortable with the basics" },
    ],
  },
  {
    id: "interest",
    text: "What sounds most interesting to build?",
    options: [
      { value: "visual", label: "Things people see and interact with" },
      { value: "logic", label: "Things that process data or automate tasks" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "time",
    text: "How much time can you realistically commit per week?",
    options: [
      { value: "low", label: "A few hours" },
      { value: "medium", label: "5–10 hours" },
      { value: "high", label: "10+ hours" },
    ],
  },
];

const paths = [
  {
    id: "absolute-beginner",
    title: "Start with HTML & CSS Fundamentals",
    description: "You're just getting going, and that's the right place to be. Spend your first few weeks on plain HTML and CSS before touching JavaScript at all — everything else builds on this.",
  },
  {
    id: "frontend-focus",
    title: "Lean into Frontend Development",
    description: "You already know some basics and want to build things people see and use. Move toward JavaScript next, then a frontend framework once you're comfortable with plain JS.",
  },
  {
    id: "logic-focus",
    title: "Explore Backend & Logic-Heavy Work",
    description: "You're drawn to data and automation more than visuals. After JavaScript basics, look into a backend language and how servers and databases actually work.",
  },
  {
    id: "fast-track",
    title: "Take the Fast Track",
    description: "You're comfortable with the basics and have real time to invest. Skip straight to building three small projects, then pick a specialization sooner rather than later.",
  },
  {
    id: "steady-roadmap",
    title: "Follow the Steady Roadmap",
    description: "A measured pace suits you best. Work through the full roadmap in order, without rushing — steady and consistent beats fast and burned out.",
  },
];

const quizApp = document.getElementById("quiz-app");
const STORAGE_KEY = "devpathQuizResult";

let currentStep = 0;
const answers = {};

// Picks a recommended path using conditional branching on the collected answers.
function recommendPath() {
  if (answers.experience === "none") {
    return paths.find((path) => path.id === "absolute-beginner");
  }
  if (answers.experience === "some" && answers.interest === "visual") {
    return paths.find((path) => path.id === "frontend-focus");
  }
  if (answers.experience === "some" && answers.interest === "logic") {
    return paths.find((path) => path.id === "logic-focus");
  }
  if (answers.experience === "comfortable" && answers.time === "high") {
    return paths.find((path) => path.id === "fast-track");
  }
  return paths.find((path) => path.id === "steady-roadmap");
}

// Saves the result to localStorage so a returning visitor sees it again.
function saveResult(path) {
  const record = { title: path.title, savedAt: new Date().toLocaleDateString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

// Renders one question, with its options as clickable buttons.
function renderQuestion() {
  const question = questions[currentStep];

  const optionsHTML = question.options
    .map(
      (option) => `
        <button type="button" class="quiz-option" data-value="${option.value}">
          ${option.label}
        </button>
      `
    )
    .join("");

  quizApp.innerHTML = `
    <p class="quiz-progress">Question ${currentStep + 1} of ${questions.length}</p>
    <div class="quiz-card">
      <h2>${question.text}</h2>
      <div class="quiz-options">${optionsHTML}</div>
    </div>
  `;

  quizApp.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => handleAnswer(question.id, button.dataset.value));
  });
}

// Records an answer, then either shows the next question or the final result.
function handleAnswer(questionId, value) {
  answers[questionId] = value;
  currentStep += 1;

  if (currentStep < questions.length) {
    renderQuestion();
  } else {
    const result = recommendPath();
    saveResult(result);
    renderResult(result);
  }
}

// Renders the final recommendation.
function renderResult(path) {
  quizApp.innerHTML = `
    <div class="quiz-card quiz-result">
      <p class="quiz-progress">Your recommendation</p>
      <h2>${path.title}</h2>
      <p>${path.description}</p>
      <button type="button" class="button" id="retake-quiz">Start Over</button>
    </div>
  `;

  document.getElementById("retake-quiz").addEventListener("click", startQuiz);
}

// Resets state and begins the quiz from question one.
function startQuiz() {
  currentStep = 0;
  for (const key in answers) delete answers[key];
  renderQuestion();
}

// On load, checks for a saved result and offers it before starting fresh.
function init() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const record = JSON.parse(saved);
    quizApp.innerHTML = `
      <div class="quiz-card quiz-welcome-back">
        <p class="quiz-progress">Welcome back</p>
        <p>Last time, on ${record.savedAt}, we recommended: <strong>${record.title}</strong></p>
        <button type="button" class="button" id="retake-quiz">Retake the Quiz</button>
      </div>
    `;
    document.getElementById("retake-quiz").addEventListener("click", startQuiz);
  } else {
    startQuiz();
  }
}

init();