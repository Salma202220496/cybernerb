import { Check, Lightbulb, LockKeyhole } from "lucide-react";

export function HintPanel({ used, disabled, onReveal, className = "" }) {
  return (
    <section className={`hint-panel ${used ? "revealed" : ""} ${className}`}>
      {!used ? (
        <button
          type="button"
          className="hint-button"
          onClick={onReveal}
          disabled={disabled}
        >
          <Lightbulb size={25} /> <strong>Hint - 10 Points</strong>
        </button>
      ) : (
        <div className="hint-copy">
          <div className="hint-check">
            <Check size={16} />
          </div>
          <div>
            <strong>ONE-TIME HINT USED</strong>
            <p>
              Compare the SSID with a trusted source.{" "}
              <em>“Free” + “Excellent signal” + “Open”</em> is a classic lure.
            </p>
          </div>
        </div>
      )}
      {!used && (
        <div className="hint-foot">
          <LockKeyhole size={12} /> One use only
        </div>
      )}
    </section>
  );
}

/*import {
  Lightbulb,
  Coins,
} from "lucide-react";

function HintPanel({
  credits,
  usedHints,
  onUseHint,
}) {
  const hints = [
    {
      id: "evil-twin",
      cost: 10,
      text:
        "Attackers can create a Wi-Fi name that closely resembles a legitimate network.",
    },
    {
      id: "open-network",
      cost: 10,
      text:
        "An open network does not automatically mean it is malicious, but it deserves additional verification.",
    },
    {
      id: "domain-check",
      cost: 15,
      text:
        "Check whether the captive portal domain appears to belong to the organization providing the Wi-Fi.",
    },
  ];

  return (
    <section className="wifi-card">
      <div className="wifi-card-heading">
        <Lightbulb size={20} />

        <div>
          <h2>Hints</h2>
          <p>
            Available credits: {credits}
          </p>
        </div>
      </div>

      <div className="wifi-hints">
        {hints.map((hint) => {
          const used = usedHints.includes(hint.id);

          return (
            <div
              key={hint.id}
              className="wifi-hint"
            >
              {used ? (
                <p>{hint.text}</p>
              ) : (
                <button
                  onClick={() => onUseHint(hint)}
                  disabled={credits < hint.cost}
                >
                  <Lightbulb size={16} />

                  Reveal Hint

                  <span>
                    <Coins size={13} />
                    {hint.cost}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HintPanel;*/