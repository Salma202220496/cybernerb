import {
  ShieldAlert,
  KeyRound,
  Wifi,
  Users,
} from "lucide-react";

import "./SkillProgress.css";

const skills = [
  {
    name: "Phishing Awareness",
    progress: 78,
    icon: ShieldAlert,
  },
  {
    name: "Password Security",
    progress: 65,
    icon: KeyRound,
  },
  {
    name: "Network Security",
    progress: 52,
    icon: Wifi,
  },
  {
    name: "Social Engineering",
    progress: 41,
    icon: Users,
  },
];

function SkillProgress() {
  return (
    <section className="skill-progress-card">
      <div className="card-title-row">
        <div>
          <span className="section-label">SKILLS</span>
          <h2>Security Skills</h2>
        </div>
      </div>

      <div className="skills-list">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div className="skill-item" key={skill.name}>
              <div className="skill-top">
                <div className="skill-name">
                  <Icon size={16} />
                  <span>{skill.name}</span>
                </div>

                <strong>{skill.progress}%</strong>
              </div>

              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SkillProgress;