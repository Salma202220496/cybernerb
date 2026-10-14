
import {
  ShieldAlert,
  Lightbulb,
} from "lucide-react";

export default function DecisionPanel({
  scenario,
  choiceId,
  hintUsed,
  onDecide,
  onRevealHint,
}) {
  return (
    <div className="se-panel se-decision-panel">
      <div className="se-panel-heading">
        <ShieldAlert size={20} />
        Make Your Decision
      </div>

      <p className="se-question">
        What should you do in this situation?
      </p>

      <div className="se-choices">
        {scenario.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            disabled={choiceId !== null}
            onClick={() => onDecide(choice.id)}
            className={`se-choice ${
              choiceId === choice.id
                ? "selected"
                : ""
            }`}
          >
            <strong>{choice.title}</strong>
            <small>{choice.description}</small>
          </button>
        ))}
      </div>

      {!hintUsed && choiceId === null && (
        <button
          type="button"
          className="se-hint-button"
          onClick={onRevealHint}
        >
          <Lightbulb size={18} />
          Reveal Hint (-10 points)
        </button>
      )}

      {hintUsed && (
        <div className="se-hint">
          <Lightbulb size={17} />
          <p>{scenario.hint}</p>
        </div>
      )}
    </div>
  );
}
