
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import "./dashboard.css";

const levels = [
  {
    id: "beginner",
    number: "01",
    name: "Beginner",
    code: "LVL_01",
    description: "Recognize cyber threats",
    progress: 70,
    accent: "green",
  },
  {
    id: "intermediate",
    number: "02",
    name: "Intermediate",
    code: "LVL_02",
    description: "Investigate and respond",
    progress: 0,
    accent: "yellow",
  },
  {
    id: "advanced",
    number: "03",
    name: "Advanced",
    code: "LVL_03",
    description: "Lead a cyber investigation",
    progress: 0,
    accent: "red",
  },
];

function Dashboard({ onEnterLevel }) {
  const [selectedLevel, setSelectedLevel] = useState("beginner");

  const activeLevel = useMemo(
    () =>
      levels.find((level) => level.id === selectedLevel) ??
      levels[0],
    [selectedLevel]
  );

  // Only the Dashboard can request entry to Beginner Missions.
  const handleEnterBeginner = () => {
    if (selectedLevel !== "beginner") {
      return;
    }

    if (typeof onEnterLevel === "function") {
      onEnterLevel("beginner");
    }
  };

  return (
    <div className="dashboard-page cq-dashboard">
      <section className="cq-dashboard-hero">
        <div className="cq-hero-copy">
          <div className="cq-eyebrow">
            <ShieldCheck size={15} />
            CyberNerb // Awareness training
          </div>

          <h1>
            Train your instincts.
            <span>Break the attack chain.</span>
          </h1>

          <p>
            Realistic simulations. Adaptive difficulty.
          </p>

          <div className="cq-hero-meta">
            <span>
              <Zap size={14} />
              Scenario engine
            </span>

            <span>
              <Radar size={14} />
              Performance coach
            </span>

            <span>
              <Target size={14} />
              Zero trust by design
            </span>
          </div>
        </div>

        <div className="cq-system-card">
          <span className="cq-system-dot" />
          <span>System online</span>
          <strong>01</strong>
          <small>active node</small>
        </div>
      </section>

      <section className="cq-telemetry">
        <div className="cq-section-heading">
          <div>
            <span className="cq-eyebrow">
              Player telemetry
            </span>
            <h2>Readiness monitor</h2>
          </div>

          <span className="cq-recording">
            <span /> Rec
          </span>
        </div>

        <div className="cq-telemetry-stats">
          <div>
            <small>Average score</small>
            <strong>
              78<i>/100</i>
            </strong>
          </div>

          <div>
            <small>Runs logged</small>
            <strong>08</strong>
          </div>

          <div>
            <small>Current node</small>
            <strong className="is-cyan">
              {activeLevel.name}
            </strong>
          </div>
        </div>

        <div className="cq-readiness">
          <div>
            <span>Threat readiness</span>
            <strong>78%</strong>
          </div>

          <div className="cq-readiness-track">
            <span />
          </div>
        </div>
      </section>

      <div className="cq-content-heading">
        <div>
          <span className="cq-eyebrow">
            01 // Training node
          </span>
          <h2>Choose your access level</h2>
        </div>

        <code>
          Active // {activeLevel.name.toUpperCase()}
        </code>
      </div>

      <section className="cq-level-grid">
        {levels.map((level) => {
          const isSelected =
            level.id === selectedLevel;

          const isUnlocked =
            level.id === "beginner";

          return (
            <article
              className={`cq-level-card cq-level-${level.accent} ${
                isSelected ? "is-selected" : ""
              } ${!isUnlocked ? "is-locked" : ""}`}
              key={level.id}
            >
              <button
                className="cq-level-select"
                type="button"
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedLevel(level.id);
                  }
                }}
                disabled={!isUnlocked}
                aria-pressed={isSelected}
              >
                <span className="cq-level-index">
                  {level.number}
                </span>

                <span className="cq-level-title">
                  <strong>{level.name}</strong>
                  <small>{level.code}</small>
                </span>

                {isUnlocked ? (
                  <Check
                    size={17}
                    className="cq-level-check"
                  />
                ) : (
                  <LockKeyhole
                    size={17}
                    className="cq-level-lock"
                  />
                )}
              </button>

              <p>{level.description}</p>

              <div className="cq-level-progress-label">
                <span>Progress</span>
                <span>
                  {isUnlocked
                    ? `${level.progress}%`
                    : "Locked"}
                </span>
              </div>

              <div className="cq-level-progress">
                <span
                  style={{
                    width: `${
                      isUnlocked
                        ? level.progress
                        : 0
                    }%`,
                  }}
                />
              </div>

              {isUnlocked && isSelected ? (
                <button
                  className="cq-enter-button"
                  type="button"
                  onClick={handleEnterBeginner}
                >
                  Enter beginner
                  <ArrowRight size={15} />
                </button>
              ) : (
                <span className="cq-level-note">
                  {isUnlocked
                    ? "Select node to continue"
                    : "Complete previous level"}
                </span>
              )}
            </article>
          );
        })}
      </section>

      <footer className="cq-dashboard-footer">
        <span>
          <Sparkles size={14} />
          CyberNerb systems
        </span>

        <span>Adaptive training engine</span>
      </footer>
    </div>
  );
}

export default Dashboard;
