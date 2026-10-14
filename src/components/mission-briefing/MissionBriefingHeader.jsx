import {
  ShieldAlert,
  ArrowLeft,
  Clock,
  Star,
} from "lucide-react";

import "./MissionBriefingHeader.css";

function MissionBriefingHeader() {
  return (
    <section className="briefing-header">

      <button className="briefing-back-button">
        <ArrowLeft size={17} />
        Back to Missions
      </button>

      <div className="briefing-header-main">

        <div className="briefing-mission-icon">
          <ShieldAlert size={36} />
        </div>

        <div className="briefing-title-area">

          <div className="briefing-meta">
            <span className="briefing-mission-number">
              MISSION 03
            </span>

            <span className="briefing-category">
              PHISHING AWARENESS
            </span>
          </div>

          <h1>The Suspicious Email</h1>

          <p>
            Can you identify a phishing attempt before
            it puts your information at risk?
          </p>

          <div className="briefing-stats">

            <div className="briefing-stat">
              <Clock size={15} />
              <span>5–8 minutes</span>
            </div>

            <div className="briefing-stat">
              <Star size={15} />
              <span>+150 XP</span>
            </div>

            <span className="briefing-difficulty">
              Intermediate
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MissionBriefingHeader;