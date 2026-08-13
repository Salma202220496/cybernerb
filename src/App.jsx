import { useState, useEffect } from "react";
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
const inboxEmails = [
  {
    id: 1,
    senderName: "IT Service Desk",
    sender: "support@university-helpdesk.com",
    subject: "URGENT: Verify Your University Account",
    preview: "We detected unusual activity on your account...",
    time: "10:42 AM",
    suspicious: true,
  },
  {
    id: 2,
    senderName: "Dr. Sarah Ahmed",
    sender: "s.ahmed@university.edu",
    subject: "Tomorrow's Lecture Materials",
    preview: "Hi everyone, I uploaded the lecture slides...",
    time: "9:18 AM",
    suspicious: false,
    hasSafeLink: true,
safeLinkText: "Open Lecture Materials",
  },
  {
    id: 3,
    senderName: "University Library",
    sender: "library@university.edu",
    subject: "Book Return Reminder",
    preview: "This is a reminder that your borrowed book...",
    time: "Yesterday",
    suspicious: false,
    hasAttachment: true,
attachmentText: "Open Return Notice",
  },
  {
    id: 4,
    senderName: "Student Finance",
    sender: "finance@university.edu",
    subject: "Tuition Payment Receipt",
    preview: "Your recent tuition payment has been received...",
    time: "Yesterday",
    suspicious: false,
    hasReceipt: true,
receiptText: "View Payment Receipt",
  },
];
function App() {
  const [page, setPage] = useState("home");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [attackActive, setAttackActive] = useState(false);
const [attackStep, setAttackStep] = useState(0);

  useEffect(() => {
  if (!attackActive) return;

  const timer1 = setTimeout(() => {
    setAttackStep(2);
  }, 2000);

  const timer2 = setTimeout(() => {
    setPage("compromised");
    setAttackActive(false);
    setAttackStep(0);
  }, 4000);

  return () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
  };
}, [attackActive]);
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [fakeEmail, setFakeEmail] = useState("");

  const [fakePassword, setFakePassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const [completedEmailIds, setCompletedEmailIds] = useState([]);

  const [answer, setAnswer] = useState(null);

  const [hintUsed, setHintUsed] = useState(false);

  const [currentHint, setCurrentHint] = useState("");

  const [mistakes, setMistakes] = useState([]);

  const scenario = scenarios[scenarioIndex];

  const startTraining = () => {
    setPage("inbox");
    setScenarioIndex(0);
    setAnswer(null);
    setHintUsed(false);
  };
const useHint = () => {
  if (hintUsed) return;

  if (score < 10) {
    setCurrentHint("You need at least 10 points to use a hint.");
    return;
  }

  setScore((currentScore) => currentScore - 10);
  setHintUsed(true);

  if (selectedEmail?.id === 1) {
    setCurrentHint(
      "Check the sender's domain carefully. Does university-helpdesk.com really belong to the university?"
    );
  } else if (selectedEmail?.id === 2) {
    setCurrentHint(
      "Check whether Dr. Sarah's email uses the official university.edu domain before opening the lecture materials."
    );
  } else if (selectedEmail?.id === 3) {
    setCurrentHint(
      "Check the Library sender domain and whether the return notice asks for passwords, payments, or sensitive information."
    );
  } else if (selectedEmail?.id === 4) {
    setCurrentHint(
      "Check whether Student Finance uses the official university.edu domain and whether the receipt asks you to enter banking details."
    );
  }
};


  const submitAnswer = (selectedAnswer) => {
    setAnswer(selectedAnswer);

    if (selectedAnswer === scenario.correctAnswer) {
      setScore((currentScore) => currentScore + 50);
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
    if (page === "inbox") {
  return (
    <div className="app">
      <nav className="navbar">
    <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
   {attackActive && attackStep === 1 && (
  <div className="attack-notification">
    🚨 New login detected from another location.
  </div>
)}

{attackActive && attackStep === 2 && (
  <div className="attack-notification">
    ⚠️ Your university account password was changed.
  </div>
)}
        <button
          className="back-button"
          onClick={goHome}
        >
          ← Dashboard
        </button>

        <div className="scenario-header">
          <span>📥</span>

          <div>
            <h1>Inbox ({inboxEmails.length})</h1>
            <p>Select an email to inspect</p>
          </div>
        </div>

        <div className="inbox-list">
          {inboxEmails.map((email) => (
            <button
              key={email.id}
              className="inbox-email"
             onClick={() => {
  setSelectedEmail(email);
  setHintUsed(false);
  setCurrentHint("");
  setPage("email");
}}
            >
              <div>
                <strong>{email.senderName}</strong>
                <p>{email.subject}</p>
                <small>{email.preview}</small>
              </div>

              <span>{email.time}</span>
            </button>
          ))}
        </div>
        <button
  className="next-button"
  onClick={() => setPage("final-results")}
>
  Finish Training →
</button>
      </main>
    </div>
  );
}
  
  if (page === "email" && selectedEmail) {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <button
          className="back-button"
          onClick={() => setPage("inbox")}
        >
          ← Inbox
        </button>

        <div className="email-view">
          <div className="email-view-header">
            <h1>{selectedEmail.subject}</h1>

            <div className="email-sender">
              <strong>{selectedEmail.senderName}</strong>
              <span>{selectedEmail.sender}</span>
              <small>{selectedEmail.time}</small>
            </div>
          </div>

          <div className="hint-section">
  <button
    className="hint-button"
    onClick={useHint}
    disabled={hintUsed}
  >
    💡 Hint - 10 Points
  </button>

  {currentHint && (
    <div className="hint-box">
      {currentHint}
    </div>
  )}
</div>
          
          <div className="email-message">
            {selectedEmail.suspicious ? (
              <>
                <p>Dear Student,</p>

                <p>
                  We detected unusual activity on your university
                  account.
                </p>

                <p>
                  To prevent your account from being suspended,
                  verify your identity immediately.
                </p>

                <button
                  className="phishing-link"
                  onClick={() => {
  setFakeEmail("");
  setFakePassword("");
  setLoginError("");
  setPage("fake-site");
}}
                >
                  Verify Your Account
                </button>

                <button
  className="report-button"
  onClick={() => {
  if (!completedEmailIds.includes(selectedEmail.id)) {
    setScore((currentScore) => currentScore + 50);

    setCompletedEmailIds((currentIds) => [
      ...currentIds,
      selectedEmail.id,
    ]);
  }

  setPage("safe-result");
}}
>
  🚩 Report Phishing
</button>
                <p className="email-signature">
                  Thank you,
                  <br />
                  IT Service Desk
                </p>
              </>
            ) : (
  <>
    <p>Hello,</p>

    <p>{selectedEmail.preview}</p>

    <p>
      
      {selectedEmail.hasSafeLink && (
  <button
    className="safe-link-button"
    onClick={() => setPage("lecture-materials")}
  >
    📚 {selectedEmail.safeLinkText}
  </button>
)}

    {selectedEmail.hasAttachment && (
  <button
    className="safe-link-button"
    onClick={() => setPage("library-notice")}
  >
    📎 {selectedEmail.attachmentText}
  </button>
)}

    {selectedEmail.hasReceipt && (
  <button
    className="safe-link-button"
    onClick={() => setPage("payment-receipt")}
  >
    💳 {selectedEmail.receiptText}
  </button>
)}
    </p>

    <button
      className="safe-action-button"
      onClick={() => {
  if (!completedEmailIds.includes(selectedEmail.id)) {
    setScore((currentScore) => currentScore + 50);
    setCompletedEmailIds((currentIds) => [
      ...currentIds,
      selectedEmail.id,
    ]);
  }

  setPage("safe-result");
}}
    >
      ✅ Mark as Safe
    </button>

    <button
      className="report-button"
      onClick={() => setPage("wrong-report-result")}
    >
      🚩 Report as Phishing
    </button>
  </>
)}
          </div>
        </div>
      </main>
    </div>
  );
}
  if (page === "safe-email-result") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <div className="compromised-card">

          <div className="compromised-icon">✅</div>

          <h1>Correct Decision!</h1>

          <p>
            You correctly identified this as a legitimate university email.
          </p>

          <div className="lesson-box">
            <h3>Why is this email safe?</h3>

            <p>
              The sender uses the official university.edu domain.
            </p>

            <p>
              The message does not ask for passwords or sensitive information.
            </p>

            <p>
              There are no suspicious links or urgent threats.
            </p>
          </div>

          <div className="points">
            +50 Points
          </div>

          <button
            className="next-button"
            onClick={() => setPage("inbox")}
          >
            Return to Inbox
          </button>

        </div>
      </main>
    </div>
  );
}


  if (page === "wrong-report-result") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <div className="compromised-card">

          <div className="compromised-icon">⚠️</div>

          <h1>Incorrect Report</h1>

          <p>
            This email was legitimate, but you reported it as phishing.
          </p>

          <div className="lesson-box">
            <h3>What should you check?</h3>

            <p>
              Look at the sender's domain before reporting the message.
            </p>

            <p>
              Official university emails use the university.edu domain.
            </p>

            <p>
              This message did not request passwords or sensitive information.
            </p>
          </div>

          <div className="points wrong-points">
            +0 Points
          </div>

          <button
            className="next-button"
            onClick={() => setPage("inbox")}
          >
            Return to Inbox
          </button>

        </div>
      </main>
    </div>
  );
}
  if (page === "safe-result") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <div className="compromised-card">

          <div className="compromised-icon">✅</div>

          <h1>Phishing Reported Successfully!</h1>

          <p>
            You identified the suspicious email and reported it
            before interacting with the malicious link.
          </p>

          <div className="lesson-box">
            <h3>Why was this the right decision?</h3>

            <p>
              The sender used a suspicious domain that did not match
              the official university domain.
            </p>

            <p>
              The email created urgency to pressure you into acting
              quickly.
            </p>
          </div>

          <div className="points">
            +50 Points
          </div>

          <button
            className="next-button"
            onClick={() => setPage("inbox")}
          >
            Return to Inbox
          </button>

        </div>
      </main>
    </div>
  );
}

if (page === "lecture-materials") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <button
          className="back-button"
          onClick={() => setPage("email")}
        >
          ← Back to Email
        </button>

        <div className="lesson-box">
          <h1>Lecture Materials</h1>


          <p>
            📄 Week 4 Lecture Slides.pdf
          </p>

          <p>
            📄 Cybersecurity Notes.pdf
          </p>

          <button
            className="safe-action-button"
            onClick={() => {
              if (!completedEmailIds.includes(selectedEmail.id)) {
                setScore((currentScore) => currentScore + 50);

                setCompletedEmailIds((currentIds) => [
                  ...currentIds,
                  selectedEmail.id,
                ]);
              }

              setPage("safe-email-result");
            }}
          >
            ✅ Continue Safely
          </button>
        </div>
      </main>
    </div>
  );
}

  if (page === "library-notice") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <button
          className="back-button"
          onClick={() => setPage("email")}
        >
          ← Back to Email
        </button>

        <div className="lesson-box">
          <h1>Library Return Notice</h1>

          <p>
            This notice was sent by the official University Library.
          </p>

          <p>
            📚 Book: Introduction to Cybersecurity
          </p>

          <p>
            📅 Return Date: August 20
          </p>

         

          <button
            className="safe-action-button"
            onClick={() => {
              if (!completedEmailIds.includes(selectedEmail.id)) {
                setScore((currentScore) => currentScore + 50);

                setCompletedEmailIds((currentIds) => [
                  ...currentIds,
                  selectedEmail.id,
                ]);
              }

              setPage("safe-email-result");
            }}
          >
            ✅ Confirm Safe Notice
          </button>
        </div>
      </main>
    </div>
  );
}

  if (page === "payment-receipt") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <button
          className="back-button"
          onClick={() => setPage("email")}
        >
          ← Back to Email
        </button>

        <div className="lesson-box">
          <h1>Tuition Payment Receipt</h1>

          <p>
            This receipt was sent by the official Student Finance office.
          </p>

          <p>
            💳 Payment Status: Received
          </p>

          <p>
            🧾 Receipt Number: UNI-2026-1042
          </p>

          <p>
            💰 Amount: AED 2,500
          </p>

          

          <button
            className="safe-action-button"
            onClick={() => {
              if (!completedEmailIds.includes(selectedEmail.id)) {
                setScore((currentScore) => currentScore + 50);

                setCompletedEmailIds((currentIds) => [
                  ...currentIds,
                  selectedEmail.id,
                ]);
              }

              setPage("safe-email-result");
            }}
          >
            ✅ Confirm Safe Receipt
          </button>
        </div>
      </main>
    </div>
  );
}

  if (page === "final-results") {
  const correctCount = completedEmailIds.length;

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>
        <div className="score-top">⭐ {score} Points</div>
      </nav>

      <main className="scenario-container">
        <div className="compromised-card">
          <div className="compromised-icon">🏁</div>

          <h1>Training Complete!</h1>

          <p>
            You completed the Email Phishing training.
          </p>

          <div className="lesson-box">
            <p>✅ Emails completed: {correctCount} / {inboxEmails.length}</p>

            <p>⭐ Final Score: {score} Points</p>

            <p>
              {score >= 150
                ? "Excellent work! You showed strong phishing awareness."
                : score >= 100
                ? "Good job! Keep practicing to improve your decisions."
                : "Keep practicing. Review sender domains, links, and suspicious requests carefully."}
            </p>
          </div>

          <button
            className="next-button"
            onClick={goHome}
          >
            Return to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

  if (page === "fake-site") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
        <button
          className="back-button"
          onClick={() => setPage("email")}
        >
          ← Back to Email
        </button>

        <div className="fake-site">
          <div className="fake-site-warning">
            ⚠ Simulation Website
          </div>

          <div className="fake-site-card">
            <div className="fake-site-logo">
              🎓
            </div>

            <h1>University Account Verification</h1>

            <p>
              Sign in to confirm your identity and prevent
              your account from being suspended.
            </p>

            <label>
              University Email
            </label>

           <input
  type="email"
  placeholder="student@university.edu"
  value={fakeEmail}
  onChange={(e) => setFakeEmail(e.target.value)}
/>

            <label>
              Password
            </label>

            <input
  type="password"
  placeholder="Enter your password"
  value={fakePassword}
  onChange={(e) => setFakePassword(e.target.value)}
/>

            {loginError && (
  <p className="login-error">
    {loginError}
  </p>
)}
            <button
              className="fake-login-button"
               onClick={() => {
  if (!fakeEmail.trim() || !fakePassword.trim()) {
    setLoginError("Please complete the email and password.");
    return;
  }

  setLoginError("");
  setAttackActive(true);
  setAttackStep(1);
  setPage("inbox");
}}
            >
              Verify Account
            </button>

            <small>
              secure-university-verification.com
            </small>
          </div>
        </div>
      </main>
    </div>
  );
}
  if (page === "compromised") {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🛡️ CyberNerb</div>

        <div className="score-top">
          ⭐ {score} Points
        </div>
      </nav>

      <main className="scenario-container">
   
        <div className="compromised-card">

          <div className="compromised-icon">🚨</div>

          <h1>Account Compromised!</h1>

          <p>
            You entered your university credentials into a
            phishing website.
          </p>

          <div className="lesson-box">
            <h3>What went wrong?</h3>

            <p>
              The email used urgency to pressure you into acting
              quickly.
            </p>

            <p>
              The sender's domain was not an official university
              domain.
            </p>

            <p>
              The verification website also used a suspicious URL.
            </p>
          </div>

          <div className="result-penalty">
            ❌ Phishing attack successful
          </div>

          <button
            className="next-button"
            onClick={() => setPage("inbox")}
          >
            Return to Inbox
          </button>

        </div>
      </main>
    </div>
  );
}
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
                      +50 Points
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