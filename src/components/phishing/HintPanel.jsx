import {
  Lightbulb,
  Coins,
  Lock,
  CheckCircle2,
} from "lucide-react";

import "./HintPanel.css";

function HintPanel({
  credits,
  usedHints,
  onUseHint,
}) {
  const hints = [
    {
      id: "sender",
      title: "Check the sender",
      description:
        "Look carefully at the actual email address, not only the display name.",
      cost: 50,
    },
    {
      id: "link",
      title: "Inspect the link",
      description:
        "Check where the verification button would actually take you.",
      cost: 75,
    },
    {
      id: "urgency",
      title: "Look for pressure",
      description:
        "Be careful when a message creates fear or demands immediate action.",
      cost: 50,
    },
  ];

  return (
    <section className="hint-panel">
      <div className="hint-panel-header">
        <div className="hint-title-area">
          <div className="hint-main-icon">
            <Lightbulb size={18} />
          </div>

          <div>
            <span>OPTIONAL ASSISTANCE</span>
            <h3>Need a hint?</h3>
            <p>
              Use credits to reveal useful investigation guidance.
            </p>
          </div>
        </div>

        <div className="hint-credit-balance">
          <Coins size={15} />
          <strong>{credits}</strong>
          <span>credits</span>
        </div>
      </div>

      <div className="hint-list">
        {hints.map((hint) => {
          const isUsed = usedHints.includes(hint.id);
          const insufficientCredits =
            credits < hint.cost;

          return (
            <div
              key={hint.id}
              className={`hint-item ${
                isUsed ? "hint-used" : ""
              }`}
            >
              <div className="hint-item-icon">
                {isUsed ? (
                  <CheckCircle2 size={16} />
                ) : insufficientCredits ? (
                  <Lock size={16} />
                ) : (
                  <Lightbulb size={16} />
                )}
              </div>

              <div className="hint-item-content">
                <strong>{hint.title}</strong>

                <p>
                  {isUsed
                    ? hint.description
                    : "Reveal this clue for your investigation."}
                </p>
              </div>

              <button
                className="hint-use-button"
                onClick={() => onUseHint(hint)}
                disabled={
                  isUsed || insufficientCredits
                }
              >
                {isUsed
                  ? "Used"
                  : insufficientCredits
                  ? "Not enough"
                  : `${hint.cost} credits`}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HintPanel;