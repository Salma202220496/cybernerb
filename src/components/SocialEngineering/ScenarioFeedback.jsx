
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export default function ScenarioFeedback({
  selected,
  scenario,
  score,
  onTryAgain,
  onNext,
  isLastScenario = false,
}) {
  if (!selected) return null;

  const title = selected.safe
    ? "Excellent Security Decision!"
    : scenario.id === "genuine-loyalty-reward"
      ? "This Offer Was Legitimate"
      : "Social Engineering Detected";

  return (
    <div className={`se-feedback ${selected.safe ? "safe" : "risky"}`}>
      <div className="se-feedback-title">
        {selected.safe ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
        <h2>{title}</h2>
      </div>

      <p>{selected.feedback}</p>

      <div className="se-lesson">
        <strong>What you learned</strong>
        <p>{scenario.lesson}</p>
      </div>

      <div className="se-score">
        <span>SCENARIO SCORE</span>
        <strong>{score}/100</strong>
      </div>

      <div className="se-actions">
        <button
          type="button"
          className="se-button-secondary"
          onClick={onTryAgain}
        >
          <RotateCcw size={16} />
          Try Again
        </button>

        <button
          type="button"
          className="se-button-primary"
          onClick={onNext}
        >
          {isLastScenario ? "View Final Results" : "Next Scenario"}
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
