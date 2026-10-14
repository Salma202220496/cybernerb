import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import "./MissionBriefingCard.css";

function MissionBriefingCard({ onStartMission }) {
  return (
    <section className="start-mission-card">

      <div className="start-card-glow" />

      <div className="start-card-content">

        <div className="start-card-icon">
          <ShieldCheck size={28} />
        </div>

        <div>
          <span className="start-card-label">
            READY, CYBER DEFENDER?
          </span>

          <h2>Your mission starts now.</h2>

          <p>
            You are about to enter a simulated inbox.
            Investigate the message carefully and decide
            how you would respond in a real situation.
          </p>
        </div>

      </div>

      <div className="start-card-action">

        <div className="start-card-reward">
          <Sparkles size={15} />

          <span>
            Complete the mission to earn{" "}
            <strong>150 XP</strong>
          </span>
        </div>

        <button
          type="button"
          className="start-mission-button"
            onClick={onStartMission}
        >
          Start Mission
          <ArrowRight size={18} />
        </button>

      </div>

    </section>
  );
}

export default MissionBriefingCard;