import {
  Trophy,
  Star,
  Coins,
  Target,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";



import {
  getPerformanceLevel,
  getRecommendedDifficulty,
} from "../utils/adaptiveDifficulty";

import "./mission-results.css";

function MissionResults({
  result,
  onReplay,
  onNextMission,
}) {
  const {
  missionType,
  decision,
  inspectedClues = [],
  hintsUsed = 0,
  creditsSpent = 0,
  creditsRemaining = 0,
  timeRemaining = 0,
  correct,
} = result;

  const performance = {
  score: 85,
  correct: true
   }

  const performanceLevel =
    getPerformanceLevel(performance);

  const recommendedDifficulty =
    getRecommendedDifficulty(
      performance,
      2
    );

  const isCorrect =
    decision === "phishing";

  
  const xpEarned = isCorrect
    ? Math.max(10, 150 - hintsUsed * 10)
    : 30;

  const creditsEarned = isCorrect
    ? Math.max(0, 50 - creditsSpent)
    : 10;

  return (
    <div className="mission-results-page">

      <div className="results-hero">

        <div className="results-trophy">
          <Trophy size={35} />
        </div>

        <span className="results-label">
          MISSION COMPLETE
        </span>

        <h1>
          {isCorrect
            ? "Excellent work, Cyber Defender."
            : "Mission completed. Keep practicing."}
        </h1>

        <p>
          Your performance has been analyzed and
          your learning path has been updated.
        </p>

      </div>

      <div className="performance-card">

        <div className="performance-score">

          <div className="score-circle">
            <strong>
              {performance}
            </strong>

            <span>
              /100
            </span>
          </div>

          <div>
            <span>
              PERFORMANCE
            </span>

            <h2>
              {performanceLevel}
            </h2>

            <p>
              {performance >= 85
                ? "You're ready for a more challenging scenario."
                : performance >= 60
                ? "You're progressing well. Keep building your skills."
                : "Review the lesson and practice a similar scenario."}
            </p>
          </div>

        </div>

        <div className="performance-progress">

          <div className="performance-progress-track">

            <div
              className="performance-progress-fill"
              style={{
                width: `${performance}%`,
              }}
            />

          </div>

        </div>

      </div>

      <div className="results-stat-grid">

        <div className="result-stat">

          <div className="result-stat-icon xp">
            <Star size={19} />
          </div>

          <span>
            XP EARNED
          </span>

          <strong>
            +{xpEarned}
          </strong>

        </div>

        <div className="result-stat">

          <div className="result-stat-icon credits">
            <Coins size={19} />
          </div>

          <span>
            CREDITS EARNED
          </span>

          <strong>
            +{creditsEarned}
          </strong>

        </div>

        <div className="result-stat">

          <div className="result-stat-icon clues">
            <Target size={19} />
          </div>

          <span>
            CLUES FOUND
          </span>

          <strong>
            {inspectedClues.length}/3
          </strong>

        </div>

        <div className="result-stat">

          <div className="result-stat-icon hints">
            <ShieldCheck size={19} />
          </div>

          <span>
            HINTS USED
          </span>

          <strong>
            {hintsUsed}
          </strong>

        </div>

      </div>

      <div className="results-analysis">

        <div className="analysis-header">

          <div>
            <span>
              ADAPTIVE LEARNING
            </span>

            <h2>
              Your next mission
            </h2>
          </div>

          <TrendingUp size={20} />

        </div>

        <div className="adaptive-message">

          <div className="adaptive-icon">
            <ShieldCheck size={20} />
          </div>

          <div>

            <strong>
              Difficulty Level {recommendedDifficulty}
            </strong>

            <p>
              {performance >= 85
                ? "Your strong performance means the next scenario can introduce more complex threats."
                : performance >= 60
                ? "Your next scenario will maintain a similar challenge while introducing new security concepts."
                : "You'll receive additional practice at a similar difficulty to strengthen your understanding."}
            </p>

          </div>

        </div>

      </div>

      <div className="results-review">

        <h2>
          Mission Review
        </h2>

        <div className="review-row">
          <span>
            Your decision
          </span>

          <strong
            className={
              isCorrect
                ? "review-correct"
                : "review-wrong"
            }
          >
            {isCorrect
              ? "Reported as Phishing"
              : "Trusted the Email"}
          </strong>
        </div>

        <div className="review-row">
          <span>
            Clues inspected
          </span>

          <strong>
            {inspectedClues.length} / 3
          </strong>
        </div>

        <div className="review-row">
          <span>
            Hints used
          </span>

          <strong>
            {hintsUsed}
          </strong>
        </div>

        <div className="review-row">
          <span>
            Credits remaining
          </span>

          <strong>
            {creditsRemaining}
          </strong>
        </div>

      </div>

      <div className="results-actions">

        <button
          className="results-button secondary"
          onClick={onReplay}
        >
          <RotateCcw size={17} />
          Replay Mission
        </button>

        <button
          className="results-button primary"
          onClick={onNextMission}
        >
          Next Mission
          <ArrowRight size={17} />
        </button>

      </div>

    </div>
  );
}

export default MissionResults;