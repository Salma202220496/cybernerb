import {
  Mail,
  Paperclip,
  ExternalLink,
  User,
} from "lucide-react";

import EmailClue from "./EmailClue";

import "./PhishingEmail.css";

function PhishingEmail({
  inspectedClues,
  onInspectClue,
}) {
  const clues = [
    {
      id: "sender",
      title: "Sender Address",
      description:
        "The display name says Microsoft Security, but the actual address is security-alert@micros0ft-support.com. The domain uses 'micros0ft' with a zero instead of the letter 'o'.",
      type: "danger",
    },
    {
      id: "link",
      title: "Suspicious Link",
      description:
        "The button appears to lead to Microsoft's security page, but the actual destination points to account-verification-login.com.",
      type: "danger",
    },
    {
      id: "message",
      title: "Urgent Language",
      description:
        "The message pressures you to act immediately and threatens account suspension. Urgency is a common phishing tactic.",
      type: "danger",
    },
  ];

  return (
    <section className="phishing-email-card">

      {/* Email toolbar */}

      <div className="email-toolbar">

        <div className="email-toolbar-left">
          <Mail size={17} />

          <span>Simulated Inbox</span>
        </div>

        <span className="simulation-badge">
          SAFE SIMULATION
        </span>

      </div>

      {/* Email */}

      <div className="email-content">

        <div className="email-header">

          <div className="sender-avatar">
            <User size={20} />
          </div>

          <div className="sender-information">

            <div className="sender-name-row">
              <strong>Microsoft Security</strong>

              <span className="new-email">
                NEW
              </span>
            </div>

            <span className="sender-email">
              security-alert@micros0ft-support.com
            </span>

            <span className="email-time">
              Today, 10:42 AM
            </span>

          </div>

        </div>

        <div className="email-subject">
          Urgent: Your Microsoft Account Requires Verification
        </div>

        <div className="email-body">

          <p>
            Dear Customer,
          </p>

          <p>
            We detected unusual activity on your Microsoft
            account. Your account may be suspended within
            24 hours unless you verify your identity.
          </p>

          <p>
            Please confirm your account information immediately
            using the secure verification page below.
          </p>

          <button className="fake-link-button">
            Verify My Account
            <ExternalLink size={13} />
          </button>

          <p>
            Failure to complete verification may result in
            temporary account restriction.
          </p>

          <p className="email-signature">
            Microsoft Account Security Team
          </p>

        </div>

        <div className="email-attachment">
          <Paperclip size={14} />
          <span>Security_Notice.pdf</span>
        </div>

      </div>

      {/* Investigation */}

      <div className="investigation-section">

        <div className="investigation-header">
          <div>
            <span className="investigation-label">
              INVESTIGATE
            </span>

            <h3>Inspect the email</h3>

            <p>
              Look for clues before making your decision.
            </p>
          </div>

          <span className="clue-count">
            {inspectedClues.length}/3 clues
          </span>
        </div>

        <div className="clues-list">

          {clues.map((clue) => (
            <EmailClue
              key={clue.id}
              title={clue.title}
              description={clue.description}
              type={clue.type}
              inspected={inspectedClues.includes(clue.id)}
              onInspect={() =>
                onInspectClue(clue.id)
              }
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default PhishingEmail;