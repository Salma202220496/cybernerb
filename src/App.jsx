import { useMemo, useState } from "react";
import "./App.css";

const LEVELS = [
  {
    id: "beginner",
    name: "Beginner",
    code: "LVL_01",
    icon: "🟢",
    description: "Recognize Cyber Threats",
    progress: 70,
    scenarios: [
      ["📧", "Phishing", "phishing", true],
      ["🎭", "Social Engineering", "social", false],
      ["🔐", "Account Security", "mfa", false],
    ],
  },
  {
    id: "intermediate",
    name: "Intermediate",
    code: "LVL_02",
    icon: "🟡",
    description: "Investigate & Respond",
    progress: 0,
    scenarios: [
      ["📱", "MFA Attacks", "mfa", false],
      ["💻", "Malware", "phishing", false],
      ["🌐", "Unsafe Wi-Fi", "social", false],
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    code: "LVL_03",
    icon: "🔴",
    description: "Cyber Investigation",
    progress: 0,
    scenarios: [
      ["🕵️", "Incident Investigation", "social", false],
      ["🦠", "Ransomware", "phishing", false],
      ["🎭", "Deepfake/Impersonation", "social", false],
    ],
  },
];

const SCENARIO_TYPES = [
  {
    id: "phishing",
    name: "Phishing",
    icon: "✉",
    description: "Emails, fake websites, and login traps.",
  },
  {
    id: "social",
    name: "Social Engineering",
    icon: "◉",
    description: "Calls, chats, and authority pressure.",
  },
  {
    id: "mfa",
    name: "Security / MFA",
    icon: "⌁",
    description: "OTP theft and prompt-bombing attacks.",
  },
];

const SCENARIOS = {
  phishing: {
    title: "Payroll access verification",
    briefing:
      "A message says your payroll account will be suspended unless you verify it immediately.",
    sender: "Payroll Desk <payr0ll-alert@secure-mail.example>",
    subject: "ACTION REQUIRED: profile expires today",
    body: "Your employee access is scheduled for suspension. Confirm your password at the secure review portal within 30 minutes.",
    hint: "Check the sender address, the urgent deadline, and the request for a password.",
    flags: ["urgent deadline", "lookalike domain", "credential request"],
    choices: [
      ["report", "Report and delete the message", true],
      ["open", "Open the verification portal", false],
      ["reply", "Reply with your password", false],
    ],
  },
  social: {
    title: "The urgent IT call",
    briefing:
      "A caller claims to be from IT and asks for your recovery code to stop an account lock.",
    conversation:
      "CALLER: I can see a lockout attack in progress. Read me the code you just received so I can protect the account.",
    hint: "Never share a recovery code with an unverified caller. Contact IT using an official number.",
    flags: ["authority pressure", "one-time code request", "unverified caller"],
    choices: [
      [
        "verify",
        "End the call and contact IT using the official directory",
        true,
      ],
      ["code", "Read the code to stop the attack", false],
      ["manager", "Give the caller your manager's name first", false],
    ],
  },
  mfa: {
    title: "The verification flood",
    briefing:
      "Your phone receives repeated sign-in prompts while a chat message asks you to approve one to make them stop.",
    conversation:
      "SECURITY CHAT: Approve one prompt to cancel the repeated alerts. It is a routine security reset.",
    hint: "Repeated prompts are a classic prompt-bombing signal. Deny them and report the incident.",
    flags: ["prompt bombing", "social pressure", "unverified support chat"],
    choices: [
      [
        "deny",
        "Deny the prompts, report the incident, and contact support",
        true,
      ],
      ["approve", "Approve one prompt to make the alerts stop", false],
      ["ignore", "Ignore the prompts and keep trying later", false],
    ],
  },
};

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
    preview: "This is a reminder that your borrowed book is due soon.",
    time: "8:35 AM",
    suspicious: false,
    hasAttachment: true,
    attachmentText: "View Return Notice",
  },
  {
    id: 4,
    senderName: "Student Finance",
    sender: "finance@university.edu",
    subject: "Tuition Payment Receipt",
    preview: "Your recent tuition payment has been processed successfully.",
    time: "7:50 AM",
    suspicious: false,
    hasReceipt: true,
    receiptText: "Open Payment Receipt",
  },
];

function createScenario(type, level, attempt) {
  return {
    ...SCENARIOS[type],
    id: `${type}-${level}-${attempt}`,
    type,
    level,
    attempt,
  };
}

function SectionTitle({ number, title, code }) {
  return (
    <div className="cq-section-title">
      <div>
        <div className="cq-eyebrow">{number} // TRAINING NODE</div>
        <h2>{title}</h2>
      </div>
      <code>{code}</code>
    </div>
  );
}

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [selectedType, setSelectedType] = useState("phishing");
  const [scenario, setScenario] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [points, setPoints] = useState(100);
  const [attemptCount, setAttemptCount] = useState(0);
  const [scores, setScores] = useState([]);
  const [completedLevels, setCompletedLevels] = useState({
    beginner: false,
    intermediate: false,
    advanced: false,
  });
  const [page, setPage] = useState("home");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [completedEmailIds, setCompletedEmailIds] = useState([]);
  const [emailHintUsed, setEmailHintUsed] = useState(false);
  const [emailHint, setEmailHint] = useState("");

  const unlockedLevels = useMemo(
    () => ({
      beginner: true,
      intermediate: completedLevels.beginner,
      advanced: completedLevels.intermediate,
    }),
    [completedLevels]
  );

  const averageScore = scores.length
    ? Math.round(
        scores.reduce((total, score) => total + score, 0) / scores.length
      )
    : 0;

  const currentLevel = completedLevels.advanced
    ? "advanced"
    : completedLevels.intermediate
      ? "advanced"
      : completedLevels.beginner
        ? "intermediate"
        : "beginner";

  function selectLevel(levelId) {
    if (!unlockedLevels[levelId]) return;

    setSelectedLevel(levelId);
    if (levelId === "beginner") {
      setPage("inbox");
    }
    setScenario(null);
    setSelectedAnswer("");
    setHint("");
    setFeedback(null);
  }

  function selectScenarioType(typeId) {
    setSelectedType(typeId);
    setScenario(null);
    setSelectedAnswer("");
    setHint("");
    setFeedback(null);
  }

  function startScenario() {
    const nextAttempt = attemptCount + 1;

    setAttemptCount(nextAttempt);
    setScenario(createScenario(selectedType, selectedLevel, nextAttempt));
    setSelectedAnswer("");
    setHint("");
    setFeedback(null);
  }

  function openInbox() {
    setPage("inbox");
    setScenario(null);
    setFeedback(null);
  }

  function openEmail(email) {
    setSelectedEmail(email);
    setEmailHintUsed(false);
    setEmailHint("");
    setPage("email");
  }

  function useEmailHint() {
    if (!selectedEmail || emailHintUsed) return;

    if (points < 10) {
      setEmailHint("You need at least 10 points to use a hint.");
      return;
    }

    setPoints(currentPoints => currentPoints - 10);
    setEmailHintUsed(true);

    const hints = {
      1: "Check the sender domain carefully. Does university-helpdesk.com really belong to the university?",
      2: "Check whether the lecturer uses the official university.edu domain before opening the materials.",
      3: "Check the Library sender domain before trusting the return notice.",
      4: "Check whether Student Finance uses the official university.edu domain.",
    };

    setEmailHint(hints[selectedEmail.id]);
  }

  function completeEmail(email, resultPage) {
    if (!completedEmailIds.includes(email.id)) {
      setPoints(currentPoints => currentPoints + 50);
      setCompletedEmailIds(currentIds => [...currentIds, email.id]);
    }

    setPage(resultPage);
  }

  function requestHint() {
    if (!scenario || hint) return;

    const hintCost = 10;
    setPoints(currentPoints => Math.max(0, currentPoints - hintCost));
    setHint(scenario.hint);
  }

  function submitAnswer() {
    if (!scenario || !selectedAnswer) return;

    const chosenOption = scenario.choices.find(
      ([choiceId]) => choiceId === selectedAnswer
    );
    const passed = Boolean(chosenOption?.[2]);
    const score = passed ? 100 : 35;

    setScores(oldScores => [...oldScores, score]);

    if (passed) {
      setPoints(currentPoints => currentPoints + 50);
    }

    setFeedback({ passed, score });

    if (passed) {
      setCompletedLevels(oldLevels => ({
        ...oldLevels,
        [selectedLevel]: true,
      }));
    }
  }

  if (page === "inbox") {
    return (
      <div className="cq-app">
        <header className="cq-header">
          <div className="cq-brand">
            <b>🛡️</b>
            <span>
              CyberNerb<small>CYBERSECURITY TRAINING</small>
            </span>
          </div>
          <div className="cq-player-status">
            <div>
              <small>POINTS</small>
              <strong className="points-value">⭐ {points}</strong>
            </div>
            <div className="system-status">
              <i /> SYSTEM ONLINE
            </div>
          </div>
        </header>
        <main className="cq-container cq-email-page">
          <button className="cq-back-button" onClick={() => setPage("home")}>
            ← Dashboard
          </button>
          <div className="cq-email-page-heading">
            <span>📥</span>
            <div>
              <h1>Inbox ({inboxEmails.length})</h1>
              <p>Select an email to inspect</p>
            </div>
          </div>
          <div className="cq-inbox-list">
            {inboxEmails.map(email => (
              <button
                className="cq-inbox-row"
                key={email.id}
                onClick={() => openEmail(email)}
              >
                <span className="cq-email-avatar">
                  {email.senderName.charAt(0)}
                </span>
                <span className="cq-inbox-copy">
                  <strong>{email.senderName}</strong>
                  <small>{email.sender}</small>
                  <b>{email.subject}</b>
                  <em>{email.preview}</em>
                </span>
                <span className="cq-inbox-time">
                  {email.time}
                  <br />
                  {completedEmailIds.includes(email.id) ? "✅" : "›"}
                </span>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (page === "email" && selectedEmail) {
    return (
      <div className="cq-app">
        <header className="cq-header">
          <div className="cq-brand">
            <b>🛡️</b>
            <span>
              CyberNerb<small>CYBERSECURITY TRAINING</small>
            </span>
          </div>
          <div className="cq-player-status">
            <div>
              <small>POINTS</small>
              <strong className="points-value">⭐ {points}</strong>
            </div>
            <div className="system-status">
              <i /> SYSTEM ONLINE
            </div>
          </div>
        </header>
        <main className="cq-container cq-email-page">
          <button className="cq-back-button" onClick={() => setPage("inbox")}>
            ← Inbox
          </button>
          <article className="cq-email-view">
            <div className="cq-email-view-header">
              <div className="cq-eyebrow">EMAIL INVESTIGATION // BEGINNER</div>
              <h1>{selectedEmail.subject}</h1>
              <div className="cq-email-sender">
                <strong>{selectedEmail.senderName}</strong>
                <span>{selectedEmail.sender}</span>
                <small>{selectedEmail.time}</small>
              </div>
            </div>
            <div className="cq-email-hint-section">
              <button
                className="cq-hint-button"
                disabled={emailHintUsed}
                onClick={useEmailHint}
              >
                {emailHintUsed ? "HINT USED -10 POINTS" : "💡 HINT -10 POINTS"}
              </button>
              {emailHint && (
                <div className="cq-cybernerb-message">
                  <strong>CyberNerb</strong>
                  <p>{emailHint}</p>
                </div>
              )}
            </div>
            <div className="cq-email-message">
              {selectedEmail.suspicious ? (
                <>
                  <p>Dear Student,</p>
                  <p>
                    We detected unusual activity on your university account.
                  </p>
                  <p>
                    To prevent your account from being suspended, verify your
                    identity immediately.
                  </p>
                  <button
                    className="cq-phishing-link"
                    onClick={() => setPage("fake-site")}
                  >
                    Verify Your Account
                  </button>
                  <button
                    className="cq-report-button"
                    onClick={() => completeEmail(selectedEmail, "safe-result")}
                  >
                    🚩 Report Phishing
                  </button>
                  <p className="cq-email-signature">
                    Thank you,
                    <br />
                    IT Service Desk
                  </p>
                </>
              ) : (
                <>
                  <p>Hello,</p>
                  <p>{selectedEmail.preview}</p>
                  {selectedEmail.hasSafeLink && (
                    <button
                      className="cq-safe-link-button"
                      onClick={() => setPage("lecture-materials")}
                    >
                      📚 {selectedEmail.safeLinkText}
                    </button>
                  )}
                  {selectedEmail.hasAttachment && (
                    <button
                      className="cq-safe-link-button"
                      onClick={() => setPage("library-notice")}
                    >
                      📎 {selectedEmail.attachmentText}
                    </button>
                  )}
                  {selectedEmail.hasReceipt && (
                    <button
                      className="cq-safe-link-button"
                      onClick={() => setPage("payment-receipt")}
                    >
                      💳 {selectedEmail.receiptText}
                    </button>
                  )}
                  <button
                    className="cq-safe-action-button"
                    onClick={() =>
                      completeEmail(selectedEmail, "safe-email-result")
                    }
                  >
                    ✅ Mark as Safe
                  </button>
                  <button
                    className="cq-report-button"
                    onClick={() => setPage("wrong-report-result")}
                  >
                    🚩 Report as Phishing
                  </button>
                </>
              )}
            </div>
          </article>
        </main>
      </div>
    );
  }

  if (
    [
      "safe-result",
      "safe-email-result",
      "wrong-report-result",
      "fake-site",
      "lecture-materials",
      "library-notice",
      "payment-receipt",
    ].includes(page)
  ) {
    const resultContent = {
      "safe-result": {
        icon: "✅",
        title: "Phishing reported successfully",
        text: "Excellent decision. You recognized the suspicious sender and stopped a credential-harvesting attempt.",
        tone: "success",
      },
      "safe-email-result": {
        icon: "✅",
        title: "Email marked as safe",
        text: "Good verification. The sender uses the official university domain and the message does not request sensitive information.",
        tone: "success",
      },
      "wrong-report-result": {
        icon: "⚠️",
        title: "That message was legitimate",
        text: "Reporting a safe message can interrupt useful communication. Check the sender domain, context, and request before deciding.",
        tone: "warning",
      },
      "fake-site": {
        icon: "🚨",
        title: "Credential trap detected",
        text: "This simulated page was designed to harvest your university password. Never enter credentials after following an urgent email link.",
        tone: "danger",
      },
      "lecture-materials": {
        icon: "📚",
        title: "Lecture materials opened",
        text: "The link points to the official university.edu domain and is safe to continue.",
        tone: "success",
      },
      "library-notice": {
        icon: "📎",
        title: "Library notice opened",
        text: "This attachment belongs to the trusted University Library message. Always confirm the sender before opening files.",
        tone: "success",
      },
      "payment-receipt": {
        icon: "💳",
        title: "Payment receipt opened",
        text: "The receipt is associated with the official Student Finance address. Continue to verify unexpected payment requests.",
        tone: "success",
      },
    }[page];

    return (
      <div className="cq-app">
        <header className="cq-header">
          <div className="cq-brand">
            <b>🛡️</b>
            <span>
              CyberNerb<small>CYBERSECURITY TRAINING</small>
            </span>
          </div>
          <div className="cq-player-status">
            <div>
              <small>POINTS</small>
              <strong className="points-value">⭐ {points}</strong>
            </div>
            <div className="system-status">
              <i /> SYSTEM ONLINE
            </div>
          </div>
        </header>
        <main className="cq-container cq-email-page">
          <div className={`cq-email-result-card ${resultContent.tone}`}>
            <div className="cq-result-icon">{resultContent.icon}</div>
            <div className="cq-eyebrow">CyberNerb // EMAIL COACH</div>
            <h1>{resultContent.title}</h1>
            <p>{resultContent.text}</p>
            <div className="cq-email-result-actions">
              <button className="cq-primary" onClick={() => setPage("inbox")}>
                ← Back to Inbox
              </button>
              <button
                className="cq-back-button"
                onClick={() => setPage("home")}
              >
                Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cq-app">
      <div className="cq-noise" />

      <header className="cq-header">
        <div className="cq-brand">
          <b>CQ</b>
          <span>
            CyberNerb
            <small>AWARENESS TRAINING</small>
          </span>
        </div>

        <div className="cq-player-status">
          <div>
            <small>PLAYER LEVEL</small>
            <strong>{selectedLevel.toUpperCase()}</strong>
          </div>
          <div>
            <small>POINTS</small>
            <strong className="points-value">{points}</strong>
          </div>
          <div className="system-status">
            <i /> SYSTEM ONLINE
          </div>
        </div>
      </header>

      <main className="cq-container">
        <section className="cq-hero">
          <div className="cq-eyebrow">/// THREAT AWARENESS PROTOCOL</div>
          <h1>
            Train your instincts.
            <br />
            <em>Break the attack chain.</em>
          </h1>
          <p>Realistic simulations. Adaptive difficulty. No safe mode.</p>
          <div className="cq-meta">
            <span>⚡ SCENARIO ENGINE</span>
            <span>◈ PERFORMANCE COACH</span>
            <span>◌ ZERO TRUST BY DESIGN</span>
          </div>
        </section>

        <section className="cq-telemetry">
          <div className="cq-telemetry-title">
            PLAYER TELEMETRY <span>● REC</span>
          </div>
          <div className="cq-stats">
            <div>
              <small>AVERAGE SCORE</small>
              <strong>
                {averageScore || "--"}
                <i>/100</i>
              </strong>
            </div>
            <div>
              <small>RUNS LOGGED</small>
              <strong>{String(attemptCount).padStart(2, "0")}</strong>
            </div>
            <div>
              <small>CURRENT NODE</small>
              <strong className="cyan">{currentLevel.toUpperCase()}</strong>
            </div>
          </div>
          <div className="cq-progress-line">
            <span>THREAT READINESS</span>
            <span>{averageScore}%</span>
          </div>
          <div className="cq-progress">
            <b style={{ width: `${averageScore}%` }} />
          </div>
        </section>

        <SectionTitle
          number="01"
          title="Choose your access level"
          code={`ACTIVE // ${selectedLevel.toUpperCase()}`}
        />

        <section className="cq-level-grid">
          {LEVELS.map(level => {
            const isUnlocked = unlockedLevels[level.id];
            const isCompleted = completedLevels[level.id];

            return (
              <article
                key={level.id}
                className={`cq-level-dashboard ${selectedLevel === level.id ? "selected" : ""} ${!isUnlocked ? "locked" : ""}`}
              >
                <button
                  className="cq-level-heading"
                  onClick={() => selectLevel(level.id)}
                  disabled={!isUnlocked}
                >
                  <div className="cq-level-name">
                    <span className="cq-level-icon">{level.icon}</span>
                    <span>{level.name.toUpperCase()}</span>
                  </div>
                  <span className="cq-level-lock">
                    {isUnlocked ? "" : "🔒"}
                    {isCompleted ? "✓" : ""}
                  </span>
                </button>

                <p className="cq-level-description">{level.description}</p>

                <div className="cq-scenario-list">
                  {level.scenarios.map(([icon, name, type, available]) => (
                    <button
                      key={name}
                      className={`cq-scenario-row ${available && isUnlocked ? "available" : "scenario-locked"}`}
                      disabled={!isUnlocked || !available}
                      onClick={() => {
                        setSelectedType(type);
                        setSelectedLevel(level.id);
                        setScenario(null);
                        setFeedback(null);
                        setHint("");
                      }}
                    >
                      <span>{icon}</span>
                      <strong>{name}</strong>
                      <span>{available && isUnlocked ? "✅" : "🔒"}</span>
                    </button>
                  ))}
                </div>

                <div className="cq-level-progress-label">
                  <span>Progress</span>
                  <span>
                    {isUnlocked
                      ? `${level.progress}%`
                      : "Complete previous level"}
                  </span>
                </div>
                <div className="cq-level-progress">
                  <b style={{ width: `${isUnlocked ? level.progress : 0}%` }} />
                </div>

                {level.id === "beginner" && isUnlocked ? (
                  <button
                    className="cq-continue-button"
                    onClick={startScenario}
                  >
                    Continue Beginner <span>→</span>
                  </button>
                ) : !isUnlocked ? (
                  <div className="cq-unlock-message">
                    Complete{" "}
                    {level.id === "intermediate" ? "Beginner" : "Intermediate"}{" "}
                    to unlock
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>

        <SectionTitle
          number="02"
          title={`${selectedLevel} scenarios`}
          code="SELECT ATTACK SURFACE"
        />

        <section className="cq-type-grid">
          {SCENARIO_TYPES.map(scenarioType => (
            <button
              key={scenarioType.id}
              className={`cq-type ${selectedType === scenarioType.id ? "active" : ""}`}
              onClick={() => selectScenarioType(scenarioType.id)}
            >
              <b>{scenarioType.icon}</b>
              <span>
                <strong>{scenarioType.name}</strong>
                <small>{scenarioType.description}</small>
              </span>
              <i>→</i>
            </button>
          ))}
        </section>

        <section className="cq-simulator">
          <div className="cq-sim-header">
            <div>
              <div className="cq-eyebrow">03 // LIVE SIMULATION</div>
              <h2>{scenario ? scenario.title : "Ready when you are."}</h2>
            </div>
            <span>{scenario ? "SCENARIO LOADED" : "AWAITING INPUT"}</span>
          </div>

          {!scenario ? (
            <div className="cq-launch">
              <div className="cq-launch-art">
                <b>+</b>
                <code>
                  SCENARIO_GENERATOR
                  <br />
                  <span>
                    TYPE: {selectedType.toUpperCase()}
                    <br />
                    LEVEL: {selectedLevel.toUpperCase()}
                    <br />
                    MODE: ADAPTIVE
                  </span>
                </code>
              </div>

              <div>
                <h3>Enter the simulation layer.</h3>
                <p>
                  Choose an attack surface above, then test your instincts in a
                  realistic training scenario.
                </p>
                <button className="cq-continue-button" onClick={openInbox}>
                  INITIALIZE SCENARIO →
                </button>
              </div>
            </div>
          ) : (
            <div className="cq-play">
              <div className="cq-scenario">
                <div className="cq-tag">
                  {selectedType.toUpperCase()} // {selectedLevel.toUpperCase()}
                </div>
                <p>{scenario.briefing}</p>

                {selectedType === "phishing" ? (
                  <div className="cq-mail">
                    <div className="cq-mail-top">
                      ✉ MAIL // INBOX <span>•••</span>
                    </div>
                    <div className="cq-mail-meta">
                      <small>FROM</small>
                      <b>{scenario.sender}</b>
                      <small>SUBJECT</small>
                      <b>{scenario.subject}</b>
                    </div>
                    <div className="cq-mail-body">{scenario.body}</div>
                    <div className="cq-login">
                      <strong>NORTHSTAR</strong>
                      <small>WORKSPACE</small>
                      <input placeholder="employee@northstar.example" />
                      <input placeholder="Password" type="password" />
                      <button>CONTINUE</button>
                    </div>
                  </div>
                ) : (
                  <div className="cq-dialogue">{scenario.conversation}</div>
                )}
              </div>

              <div className="cq-choices">
                <label>SELECT YOUR RESPONSE</label>
                {scenario.choices.map(([id, label], index) => (
                  <button
                    key={id}
                    className={selectedAnswer === id ? "chosen" : ""}
                    onClick={() => setSelectedAnswer(id)}
                  >
                    <b>{String.fromCharCode(65 + index)}</b>
                    {label}
                    {selectedAnswer === id && <span>✓</span>}
                  </button>
                ))}
                <button
                  className="cq-primary"
                  disabled={!selectedAnswer}
                  onClick={submitAnswer}
                >
                  SUBMIT RESPONSE →
                </button>
              </div>
            </div>
          )}

          {scenario && !feedback && (
            <div className="cq-hint-area">
              <button
                className="cq-hint-button"
                onClick={requestHint}
                disabled={Boolean(hint)}
              >
                {hint
                  ? "HINT USED -10 POINTS"
                  : "ASK CYBERNERB FOR A HINT (-10 POINTS)"}
              </button>
              {hint && (
                <div className="cq-cybernerb-message">
                  <strong>CyberNerb</strong>
                  <p>{hint}</p>
                </div>
              )}
            </div>
          )}

          {feedback && (
            <div
              className={`cq-result ${feedback.passed ? "success" : "fail"}`}
            >
              <div className="cq-cybernerb-label">
                CyberNerb // PERFORMANCE FEEDBACK
              </div>
              <strong>
                {feedback.passed ? "✓ SIGNAL VERIFIED" : "⚠ SIGNAL MISSED"}
              </strong>
              <h3>
                {feedback.passed
                  ? "Node cleared. The next level is unlocked."
                  : "Stay in this node and try a new scenario."}
              </h3>
              <p>
                {feedback.passed
                  ? `Good decision. Watch for ${scenario.flags.join(", ")}.`
                  : `Review the warning signs: ${scenario.flags.join(", ")}. Slow down and verify before you act.`}
              </p>
              <button onClick={startScenario}>
                {feedback.passed ? "RUN NEXT VARIANT" : "RETRY NODE"} ↻
              </button>
            </div>
          )}
        </section>

  

        <footer className="cq-footer">

          <span>
            © CyberNerb SYSTEMS
          </span>

          <span>
            ADAPTIVE TRAINING ENGINE 
          
          </span>

        </footer>

      </main>

    </div>
  );
}
