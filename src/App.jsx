import { useState } from "react";
import "./App.css";

const scenarios = [
  {
    id: 1,
    type: "Phishing Email",
    title: "Urgent University Account Verification",
    sender: "university-security@verify-account.com",
    subject: "URGENT: Your account will be suspended",
    message:
      "We detected unusual activity on your university account. You must verify your identity within 30 minutes to avoid account suspension.",
    link: "Verify Your Account",
    actions: [
      "Inspect the sender",
      "Click the link",
      "Reply to the email",
      "Report as phishing",
    ],
    correctAnswer: "Report as phishing",
    hint: "Look carefully at the sender's email address. Does the domain look like the official university domain?",
    explanation:
      "The sender uses a suspicious domain and creates urgency to make you act without thinking.",
  },

  {
    id: 2,
    type: "Phishing Email",
    title: "Your Student Scholarship Payment",
    sender: "scholarship-office@payment-alert.net",
    subject: "Action Required: Confirm your scholarship",
    message:
      "Your scholarship payment is currently on hold. Confirm your banking information immediately to receive your payment.",
    link: "Confirm Payment",
    actions: [
      "Check the sender",
      "Enter my banking information",
      "Reply with my details",
      "Report as suspicious",
    ],
    correctAnswer: "Report as suspicious",
    hint: "Ask yourself why a scholarship office would request sensitive banking information through an unexpected email.",
    explanation:
      "Unexpected requests for financial information are a common phishing warning sign.",
  },

  {
    id: 3,
    type: "Phishing Email",
    title: "Microsoft Account Security Alert",
    sender: "security@microsoft-login-support.net",
    subject: "Unusual sign-in detected",
    message:
      "Someone attempted to sign in to your account. If this was not you, verify your account immediately.",
    link: "Secure My Account",
    actions: [
      "Inspect the link",
      "Click the security link",
      "Ignore the email",
      "Report the email",
    ],
    correctAnswer: "Report the email",
    hint: "Check whether the website domain actually belongs to the organization mentioned in the email.",
    explanation:
      "Attackers often imitate well-known companies using look-alike domains.",
  },
];

function App() {
  const [page, setPage] = useState("home");

  const [scenarioIndex, setScenarioIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [answer, setAnswer] = useState(null);

  const [hintUsed, setHintUsed] = useState(false);

  const [mistakes, setMistakes] = useState([]);

  const scenario = scenarios[scenarioIndex];

  const startTraining = () => {
    setPage("training");
    setScenarioIndex(0);
    setAnswer(null);
    setHintUsed(false);
  };

  const useHint = () => {
    if (hintUsed) return;

    setHintUsed(true);

    setScore((currentScore) =>
      Math.max(0, currentScore - 10)
    );
  };

  const submitAnswer = (selectedAnswer) => {
    setAnswer(selectedAnswer);

    if (selectedAnswer === scenario.correctAnswer) {
      setScore((currentScore) => currentScore + 100);
    } else {
      setMistakes((currentMistakes) => [
        ...currentMistakes,
        {
          scenario: scenario.title,
          answer: selectedAnswer,
          correctAnswer: scenario.correctAnswer,
        },
      ]);
    }
  };

  const nextScenario = () => {
    const nextIndex =
      (scenarioIndex + 1) % scenarios.length;

    setScenarioIndex(nextIndex);
    setAnswer(null);
    setHintUsed(false);
  };

  const goHome = () => {
    setPage("home");
    setAnswer(null);
    setHintUsed(false);
  };

  // =========================
  // TRAINING PAGE
  // =========================

  if (page === "training") {
    return (
      <div className="app">

        {/* TOP BAR */}
        <nav className="navbar">

          <div className="logo">
            🛡️ CyberNerb
          </div>

          <div className="score-top">
            ⭐ {score} Points
          </div>

        </nav>

        <main className="scenario-container">

          <button
            className="back-button"
            onClick={goHome}
          >
            ← Dashboard
          </button>

          {/* SCENARIO HEADER */}

          <div className="scenario-header">

            <span>📧</span>

            <div>
              <h1>{scenario.type}</h1>

              <p>
                AI Training Scenario
              </p>
            </div>

          </div>

          {/* SCENARIO */}

          <div className="email-card">

            <div className="email-top">

              <div>
                <strong>From:</strong>{" "}
                {scenario.sender}
              </div>

              <div>
                <strong>Subject:</strong>{" "}
                {scenario.subject}
              </div>

            </div>

            <div className="email-body">

              <h3>
                {scenario.title}
              </h3>

              <p>
                Dear Student,
              </p>

              <p>
                {scenario.message}
              </p>

              <button className="fake-link">
                {scenario.link}
              </button>

              <p>
                Thank you,
                <br />
                Security Team
              </p>

            </div>

          </div>

          {/* QUESTION */}

          <div className="question-card">

            <h2>
              What would you do?
            </h2>

            <p>
              Analyze the situation carefully before
              making your decision.
            </p>

            {!answer && (
              <div className="actions">

                {scenario.actions.map(
                  (action, index) => (
                    <button
                      key={index}
                      className="action-button"
                      onClick={() =>
                        submitAnswer(action)
                      }
                    >
                      {action}
                    </button>
                  )
                )}

              </div>
            )}

            {/* HINT */}

            {!answer && (
              <div className="hint-section">

                {!hintUsed ? (
                  <>
                    <p>
                      💡 Need help?
                    </p>

                    <button
                      className="hint-button"
                      onClick={useHint}
                    >
                      Show Hint −10 Points
                    </button>
                  </>
                ) : (
                  <div className="hint-box">

                    💡 <strong>Hint:</strong>

                    <p>
                      {scenario.hint}
                    </p>

                  </div>
                )}

              </div>
            )}

            {/* FEEDBACK */}

            {answer && (
              <div className="feedback">

                {answer ===
                scenario.correctAnswer ? (
                  <>
                    <h2 className="correct">
                      ✅ Correct!
                    </h2>

                    <p>
                      Excellent decision. You
                      identified the security threat.
                    </p>

                    <div className="points">
                      +100 Points
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="wrong">
                      ❌ Not quite
                    </h2>

                    <p>
                      Your decision could expose you
                      to a cybersecurity attack.
                    </p>

                    <p>
                      <strong>
                        Why?
                      </strong>{" "}
                      {scenario.explanation}
                    </p>

                    <div className="points wrong-points">
                      +0 Points
                    </div>
                  </>
                )}

                <button
                  className="next-button"
                  onClick={nextScenario}
                >
                  Next Scenario →
                </button>

              </div>
            )}

          </div>

        </main>
      </div>
    );
  }

  // =========================
  // HOME
  // =========================

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          🛡️ CyberNerb
        </div>

        <div className="nav-text">
          AI Cybersecurity Training
        </div>

      </nav>

      <main className="home">

        <section className="hero">

          <div className="badge">
            🤖 AI-Powered Cybersecurity Training
          </div>

          <h1>
            Learn to Stay
            <span> Cyber Safe.</span>
          </h1>

          <p>
            Practice realistic cybersecurity
            scenarios and improve your skills
            through interactive training.
          </p>

        </section>

        <section className="training">

          <h2>
            Training Scenarios
          </h2>

          <div className="cards">

            <div className="card active">

              <div className="icon">
                📧
              </div>

              <h3>
                Phishing Emails
              </h3>

              <p>
                Identify suspicious senders,
                fake links, urgent requests,
                and phishing attempts.
              </p>

              <button
                onClick={startTraining}
              >
                Start AI Training →
              </button>

            </div>

            <div className="card">

              <div className="icon">
                🔐
              </div>

              <h3>
                Password Security
              </h3>

              <p>
                Learn how attackers target
                weak passwords.
              </p>

              <span>
                Coming Soon
              </span>

            </div>

            <div className="card">

              <div className="icon">
                🎭
              </div>

              <h3>
                Social Engineering
              </h3>

              <p>
                Practice realistic social
                engineering attacks.
              </p>

              <span>
                Coming Soon
              </span>

            </div>

          </div>

        </section>

        {/* PERFORMANCE */}

        <section className="progress">

          <div>
            <h3>
              Your Performance
            </h3>

            <p>
              Your performance will be used
              by AI to personalize future scenarios.
            </p>
          </div>

          <div className="score">

            <strong>
              {score}
            </strong>

            <small>
              Points
            </small>

          </div>

          <div className="score">

            <strong>
              {mistakes.length}
            </strong>

            <small>
              Mistakes
            </small>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;