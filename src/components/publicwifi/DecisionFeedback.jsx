import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export function DecisionFeedback({ result, score, network, onTryAgain }) {
  const success = result === "success";
  return (
    <section className={`feedback-panel ${success ? "success" : "danger"}`}>
      <div className="feedback-icon">
        {success ? <CheckCircle2 size={25} /> : <AlertTriangle size={25} />}
      </div>
      <div className="feedback-copy">
        <p className="section-overline">SCENARIO FEEDBACK</p>
        <h3>
          {success
            ? "Good call. You protected the device."
            : "Trap triggered. The network was not verified."}
        </h3>
        <p>
          {success
            ? "You chose a path that avoids an unverified public SSID. The safest habit is to verify the name from a trusted source—or use mobile data."
            : `${network.name} was open and unverified. A strong signal can be created by an attacker; it is not a trust signal.`}
        </p>
      </div>
      <div className="feedback-score">
        <span>FINAL SCORE</span>
        <strong>
          {score}
          <small>/100</small>
        </strong>
        <div className="feedback-badge">
          <ShieldCheck size={13} /> {success ? "SAFE HABIT" : "LESSON LEARNED"}
        </div>
      </div>
      <button type="button" className="retry-button" onClick={onTryAgain}>
        <RotateCcw size={15} /> Try again
      </button>
    </section>
  );
}

/*import {
  ShieldCheck,
  TriangleAlert,
  Search,
  Lightbulb,
} from "lucide-react";

function DecisionFeedback({
  decision,
  selectedNetwork,
  inspectedClues,
  hintsUsed,
  onContinue,
}) {
  const connectedToSuspiciousNetwork =
    decision === "connect-selected" &&
    selectedNetwork?.suspicious;

  const connectedToSafeNetwork =
    decision === "connect-selected" &&
    selectedNetwork &&
    !selectedNetwork.suspicious;

  const safeAlternative =
    decision === "verified-network" ||
    decision === "mobile-data" ||
    decision === "ask-staff";

  const safe =
    connectedToSafeNetwork || safeAlternative;

  return (
    <section className="wifi-feedback">
      <div
        className={`wifi-feedback-icon ${
          safe
            ? "wifi-feedback-safe"
            : "wifi-feedback-danger"
        }`}
      >
        {safe ? (
          <ShieldCheck size={35} />
        ) : (
          <TriangleAlert size={35} />
        )}
      </div>

      <span className="wifi-eyebrow">
        DECISION CONSEQUENCE
      </span>

      <h1>
        {connectedToSuspiciousNetwork
          ? "You Connected to a Potential Wi-Fi Trap"
          : safe
          ? "Safer Decision"
          : "Review Your Decision"}
      </h1>

      {connectedToSuspiciousNetwork ? (
        <p>
          The selected network showed warning signs,
          including an open connection and a suspicious
          login domain. A malicious hotspot could expose
          sensitive network activity.
        </p>
      ) : (
        <p>
          You reduced your exposure by choosing a safer
          connection strategy or a network with fewer
          warning signs.
        </p>
      )}

      <div className="wifi-feedback-stats">
        <div>
          <Search size={18} />
          <strong>{inspectedClues.length}</strong>
          <span>Clues Inspected</span>
        </div>

        <div>
          <Lightbulb size={18} />
          <strong>{hintsUsed}</strong>
          <span>Hints Used</span>
        </div>
      </div>

      <button
        className="wifi-continue-button"
        onClick={onContinue}
      >
        Complete Mission
      </button>
    </section>
  );
}

export default DecisionFeedback;*/