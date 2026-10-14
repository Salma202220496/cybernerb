import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  Coins,
  Star,
} from "lucide-react";

import "./DecisionFeedback.css";

function DecisionFeedback({
  decision,
  inspectedClues,
  hintsUsed = 0,
  creditsSpent = 0,
  onContinue,
}) {
  const isCorrect = decision === "phishing";

  const baseXp = isCorrect ? 150 : 30;

  const xpPenalty = hintsUsed * 10;

  const finalXp = Math.max(
    10,
    baseXp - xpPenalty
  );

  const baseCredits = isCorrect ? 50 : 10;

  const finalCredits = Math.max(
    0,
    baseCredits - creditsSpent
  );

  return (
    <section
      className={`decision-feedback ${
        isCorrect ? "correct" : "incorrect"
      }`}
    >

      <div className="feedback-result">

        <div className="feedback-result-icon">
          {isCorrect ? (
            <CheckCircle2 size={34} />
          ) : (
            <XCircle size={34} />
          )}
        </div>

        <div>

          <span className="feedback-label">
            {isCorrect
              ? "EXCELLENT DECISION"
              : "NOT THE SAFEST CHOICE"}
          </span>

          <h1>
            {isCorrect
              ? "You identified the phishing attempt."
              : "This email was a phishing attempt."}
          </h1>

          <p>
            {isCorrect
              ? "Your decision protected the account from a potentially dangerous phishing attack."
              : "The email contained several warning signs that indicated it was designed to steal account information."}
          </p>

        </div>

      </div>

      <div className="feedback-score">

        <div className="score-item">

          <div className="score-icon xp">
            <Star size={18} />
          </div>

          <div>
            <span>XP EARNED</span>

            <strong>
              +{finalXp} XP
            </strong>
          </div>

        </div>

        <div className="score-item">

          <div className="score-icon credits">
            <Coins size={18} />
          </div>

          <div>
            <span>CREDITS EARNED</span>

            <strong>
              +{finalCredits}
            </strong>
          </div>

        </div>

        <div className="score-item">

          <div className="score-icon clues">
            <ShieldCheck size={18} />
          </div>

          <div>
            <span>CLUES FOUND</span>

            <strong>
              {inspectedClues.length}/3
            </strong>
          </div>

        </div>

      </div>

      <div className="feedback-explanation">

        <div className="explanation-heading">

          <Lightbulb size={18} />

          <div>
            <span>SECURITY LESSON</span>

            <h2>
              Why was this phishing?
            </h2>
          </div>

        </div>

        <div className="warning-list">

          <div className="warning-item">

            <strong>
              1. Look-alike domain
            </strong>

            <p>
              The sender used
              "micros0ft-support.com"
              instead of the legitimate Microsoft domain.
            </p>

          </div>

          <div className="warning-item">

            <strong>
              2. Urgent pressure
            </strong>

            <p>
              The message creates fear by claiming the
              account will be suspended within 24 hours.
            </p>

          </div>

          <div className="warning-item">

            <strong>
              3. Suspicious destination
            </strong>

            <p>
              The verification link points to an unrelated
              domain rather than Microsoft's official website.
            </p>

          </div>

        </div>

      </div>

      <div className="feedback-tip">

        <ShieldCheck size={19} />

        <div>

          <strong>
            Cyber Defender Tip
          </strong>

          <p>
            Never trust an email just because the display
            name looks familiar. Always inspect the actual
            sender address and link destination.
          </p>

        </div>

      </div>

      <div className="feedback-extra-info">

        <span>
          HINTS USED: {hintsUsed}
        </span>

        <span>
          CREDITS SPENT: {creditsSpent}
        </span>

      </div>

      <button
        className="feedback-continue"
        onClick={onContinue}
      >
        Continue to Results

        <ArrowRight size={17} />
      </button>

    </section>
  );
}

export default DecisionFeedback;