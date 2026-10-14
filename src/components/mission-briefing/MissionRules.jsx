import {
  Info,
  Coins,
  Lightbulb,
  Target,
} from "lucide-react";

import "./MissionRules.css";

function MissionRules() {
  return (
    <section className="rules-card">

      <div className="briefing-section-heading">
        <span>MISSION RULES</span>
        <h2>Before you begin</h2>
      </div>

      <div className="rules-list">

        <div className="rule-item">
          <div className="rule-icon">
            <Target size={17} />
          </div>

          <div>
            <strong>Think before you decide</strong>

            <p>
              Carefully inspect the information provided
              before making your decision.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">
            <Lightbulb size={17} />
          </div>

          <div>
            <strong>Hints are available</strong>

            <p>
              You can spend credits to receive helpful
              hints during the mission.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">
            <Coins size={17} />
          </div>

          <div>
            <strong>Earn XP</strong>

            <p>
              Correct decisions increase your XP and
              help you progress to more difficult missions.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <div className="rule-icon">
            <Info size={17} />
          </div>

          <div>
            <strong>Learn from mistakes</strong>

            <p>
              Every decision will provide feedback explaining
              why it was safe or unsafe.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default MissionRules;