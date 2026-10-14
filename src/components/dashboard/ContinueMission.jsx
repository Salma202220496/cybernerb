import {
  MailWarning,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";

import "./ContinueMission.css";

function ContinueMission() {
  return (
    <section className="continue-mission">
      <div className="mission-header">
        <div>
          <span className="section-label">CONTINUE YOUR JOURNEY</span>

          <h2>The Suspicious Email</h2>

          <p>
            Can you identify the warning signs before it's too late?
          </p>
        </div>

        <div className="mission-icon">
          <MailWarning size={30} />
        </div>
      </div>

      <div className="mission-details">
        <div className="mission-detail">
          <Clock size={16} />
          <span>5–8 min</span>
        </div>

        <div className="mission-detail">
          <Star size={16} />
          <span>+100 XP</span>
        </div>

        <span className="difficulty medium">
          Intermediate
        </span>
      </div>

      <div className="mission-progress">
        <div className="progress-heading">
          <span>Mission progress</span>
          <strong>35%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "35%" }}
          />
        </div>
      </div>

      <button className="continue-button">
        Continue Mission
        <ArrowRight size={18} />
      </button>
    </section>
  );
}

export default ContinueMission;