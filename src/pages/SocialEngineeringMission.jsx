
import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  Gift,
  Trophy,
  RotateCcw,
  CheckCircle2,
  Eye,
} from "lucide-react";

import SocialEngineeringScenario from "../components/SocialEngineering/SocialEngineeringScenario";
import { socialEngineeringScenarios } from "../components/SocialEngineering/socialEngineeringData";

import "./SocialEngineeringMission.css";

export default function SocialEngineeringMission({
  onExitMission,
  onMissionComplete,
}) {
  const [step, setStep] = useState(0);
  const [choiceId, setChoiceId] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scenario = socialEngineeringScenarios[step];

  const selected = scenario.choices.find(
    (choice) => choice.id === choiceId
  );

  const currentScore = selected
    ? Math.max(
        0,
        (selected.safe ? 100 : 30) - (hintUsed ? 10 : 0)
      )
    : 0;

  const resetCurrent = () => {
    setChoiceId(null);
    setHintUsed(false);
  };

  const nextScenario = () => {
    if (!selected) return;

    const updatedAnswers = [
      ...answers,
      {
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        choice: selected.id,
        safe: selected.safe,
        score: currentScore,
        hintUsed,
      },
    ];

    setAnswers(updatedAnswers);

    if (step < socialEngineeringScenarios.length - 1) {
      setStep((previous) => previous + 1);
      resetCurrent();
    } else {
      setFinished(true);
    }
  };

  const totalScore = answers.reduce(
    (sum, answer) => sum + answer.score,
    0
  );

  const finishMission = () => {
    if (submitted) return;

    setSubmitted(true);

    const result = {
      missionId: "social-engineering",
      completed: true,
      score: totalScore,
      maxScore: 200,
      scenariosCompleted: answers.length,
      decisions: answers,
    };

    if (onMissionComplete) {
      onMissionComplete(result);
    } else {
      onExitMission?.();
    }
  };

  const restartMission = () => {
    setStep(0);
    setAnswers([]);
    setFinished(false);
    setSubmitted(false);
    resetCurrent();
  };

  if (finished) {
    return (
      <main className="se-mission">
        <section className="se-summary">
          <div className="se-summary-icon">
            <Trophy size={42} />
          </div>

          <p className="se-eyebrow">
            MISSION COMPLETED
          </p>

          <h1>Social Engineering Defender</h1>

          <p>
            You completed both behavioral targeting
            scenarios. Review your decisions below.
          </p>

          <div className="se-total-score">
            {totalScore}
            <span> / 200 points</span>
          </div>

          <div className="se-summary-results">
            {answers.map((answer) => (
              <div
                className="se-summary-row"
                key={answer.scenarioId}
              >
                <div>
                  <strong>{answer.scenarioTitle}</strong>
                  <small>
                    {answer.safe
                      ? "Safe decision"
                      : "Risky decision"}
                  </small>
                </div>

                <strong>{answer.score}/100</strong>
              </div>
            ))}
          </div>

          <div className="se-actions">
            <button
              type="button"
              className="se-button-secondary"
              onClick={restartMission}
            >
              <RotateCcw size={17} />
              Replay Mission
            </button>

            <button
              type="button"
              className="se-button-primary"
              onClick={finishMission}
              disabled={submitted}
            >
              <CheckCircle2 size={17} />
              Finish Mission
            </button>
          </div>
        </section>
      </main>
    );
  }

  const ScenarioIcon = step === 0 ? ShoppingBag : Gift;

  return (
    <main className="se-mission">
      <header className="se-header">
        <button
          type="button"
          className="se-back"
          onClick={() => onExitMission?.()}
        >
          <ArrowLeft size={18} />
          Back to Missions
        </button>

        <div className="se-header-label">
          <ShieldCheck size={18} />
          CYBERNERB TRAINING
        </div>
      </header>

      <section className="se-hero">
        <div className="se-eyebrow">
          BEGINNER · SOCIAL ENGINEERING
        </div>

        <div className="se-progress">
          {socialEngineeringScenarios.map((item, index) => (
            <div
              key={item.id}
              className={`se-progress-step ${
                index <= step ? "active" : ""
              }`}
            />
          ))}
        </div>

        <div className="se-hero-title">
          <div className="se-hero-icon">
            <ScenarioIcon size={26} />
          </div>

          <div>
            <span>
              SCENARIO {step + 1} OF{" "}
              {socialEngineeringScenarios.length}
            </span>

            <h1>{scenario.title}</h1>
          </div>
        </div>

        <p>{scenario.subtitle}</p>

        <span className="se-category">
          <Eye size={15} />
          {scenario.category}
        </span>
      </section>

      <SocialEngineeringScenario
        scenario={scenario}
        choiceId={choiceId}
        hintUsed={hintUsed}
        score={currentScore}
        onDecide={setChoiceId}
        onRevealHint={() => setHintUsed(true)}
        onTryAgain={resetCurrent}
        onNext={nextScenario}
        isLastScenario={
          step === socialEngineeringScenarios.length - 1
        }
      />
    </main>
  );
}
