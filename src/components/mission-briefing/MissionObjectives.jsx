import {
  Search,
  TriangleAlert,
  ShieldCheck,
  MousePointerClick,
} from "lucide-react";

import "./MissionObjectives.css";

const objectives = [
  {
    icon: Search,
    title: "Inspect the email",
    description:
      "Examine the sender, subject, links, and message content carefully.",
  },
  {
    icon: TriangleAlert,
    title: "Identify warning signs",
    description:
      "Look for clues that could indicate a phishing attempt.",
  },
  {
    icon: MousePointerClick,
    title: "Make the right decision",
    description:
      "Choose whether the email is safe or should be reported.",
  },
  {
    icon: ShieldCheck,
    title: "Protect the account",
    description:
      "Apply safe cybersecurity practices when handling suspicious messages.",
  },
];

function MissionObjectives() {
  return (
    <section className="objectives-card">

      <div className="briefing-section-heading">
        <span>MISSION OBJECTIVES</span>
        <h2>What you will learn</h2>
      </div>

      <div className="objectives-list">

        {objectives.map((objective, index) => {
          const Icon = objective.icon;

          return (
            <div
              className="objective-item"
              key={objective.title}
            >

              <div className="objective-number">
                {index + 1}
              </div>

              <div className="objective-icon">
                <Icon size={18} />
              </div>

              <div className="objective-content">
                <h3>{objective.title}</h3>

                <p>{objective.description}</p>
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default MissionObjectives;