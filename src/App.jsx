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
    const score = passed ? (hint ? 90 : 100) : 35;

    setScores(oldScores => [...oldScores, score]);
    setFeedback({ passed, score });

    if (passed) {
      setCompletedLevels(oldLevels => ({
        ...oldLevels,
        [selectedLevel]: true,
      }));
    }
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
                <button className="cq-primary" onClick={startScenario}>
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
                {feedback.passed ? " NEXT " : "RETRY "} ↻
              </button>
            </div>
          )}
        </section>

        <footer className="cq-footer">
        
          <span>© CyberNerb SYSTEMS</span>
        </footer>
      </main>
    </div>
  );
}
