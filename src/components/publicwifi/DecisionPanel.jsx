import { ShieldCheck, Smartphone, Wifi } from "lucide-react";

const choices = [
  {
    key: "verified",
    title: "Use the verified airport Wi‑Fi",
    subtitle: "Check the terminal sign first",
    tone: "safe-choice",
  },
  {
    key: "mobile",
    title: "Use mobile data instead",
    subtitle: "No public network required",
    tone: "safe-choice",
  },
  {
    key: "connect",
    title: "Connect to selected network",
    subtitle: "Join the network currently under inspection",
    tone: "risky-choice",
  },
];

export function DecisionPanel({ disabled, onDecide, selectedNetwork }) {
  return (
    <section className="decision-panel panel-surface">
      <div className="panel-header">
        <div className="panel-title-icon decision-icon">
          <ShieldCheck size={18} />
        </div>
        <div>
          <p className="section-overline">YOUR CALL</p>
          <h3>Choose the safe move</h3>
        </div>
      </div>
      <p className="decision-prompt">
        You are about to act on <strong>{selectedNetwork.shortName}</strong>.
        What protects the device?
      </p>
      <div className="decision-list">
        {choices.map(choice => (
          <button
            key={choice.key}
            type="button"
            className={`decision-button ${choice.tone}`}
            onClick={() => onDecide(choice.key)}
            disabled={disabled}
          >
            <span className="decision-leading">
              {choice.key === "verified" ? (
                <ShieldCheck size={19} />
              ) : choice.key === "mobile" ? (
                <Smartphone size={19} />
              ) : (
                <Wifi size={19} />
              )}
            </span>
            <span className="decision-copy">
              <strong>{choice.title}</strong>
              <small>{choice.subtitle}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="decision-bottom">
        <span className="decision-status-dot" /> No decision is final until you
        click.
      </div>
    </section>
  );
}

/*(import {
  Wifi,
  Smartphone,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

function DecisionPanel({
  selectedNetwork,
  onDecision,
}) {
  if (!selectedNetwork) {
    return (
      <section className="wifi-card">
        <h2>Make Your Decision</h2>

        <p className="wifi-muted">
          Investigate a network before choosing what
          you would do.
        </p>
      </section>
    );
  }

  return (
    <section className="wifi-card">
      <div className="wifi-card-heading">
        <ShieldCheck size={20} />

        <div>
          <h2>Make Your Decision</h2>

          <p>
            What would you do in this situation?
          </p>
        </div>
      </div>

      <div className="wifi-decisions">
        <button
          onClick={() =>
            onDecision("connect-selected")
          }
        >
          <Wifi size={18} />

          Connect to {selectedNetwork.name}
        </button>

        <button
          onClick={() =>
            onDecision("verified-network")
          }
        >
          <ShieldCheck size={18} />

          Use the Verified Airport Wi-Fi
        </button>

        <button
          onClick={() =>
            onDecision("mobile-data")
          }
        >
          <Smartphone size={18} />

          Use Mobile Data Instead
        </button>

        <button
          onClick={() =>
            onDecision("ask-staff")
          }
        >
          <UserCheck size={18} />

          Ask Staff to Verify the Network
        </button>
      </div>
    </section>
  );
}

export default DecisionPanel;*/