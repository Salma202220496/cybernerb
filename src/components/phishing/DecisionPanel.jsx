import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

import "./DecisionPanel.css";

function DecisionPanel({
  onDecision,
  disabled,
}) {
  return (
    <section className="decision-panel">

      <div className="decision-heading">

        <span className="decision-label">
          MAKE YOUR DECISION
        </span>

        <h2>What would you do?</h2>

        <p>
          Based on your investigation, decide how you
          would handle this email in a real situation.
        </p>

      </div>

      <div className="decision-options">

        <button
          className="decision-button report"
          onClick={() => onDecision("phishing")}
          disabled={disabled}
        >
          <div className="decision-button-icon">
            <ShieldAlert size={22} />
          </div>

          <div className="decision-button-content">
            <strong>Report as Phishing</strong>

            <span>
              This email looks suspicious.
            </span>
          </div>

          <ArrowRight size={17} />
        </button>

        <button
          className="decision-button safe"
          onClick={() => onDecision("safe")}
          disabled={disabled}
        >
          <div className="decision-button-icon">
            <ShieldCheck size={22} />
          </div>

          <div className="decision-button-content">
            <strong>Trust & Open</strong>

            <span>
              The email appears legitimate.
            </span>
          </div>

          <ArrowRight size={17} />
        </button>

      </div>

    </section>
  );
}

export default DecisionPanel;