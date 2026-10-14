import {
  CheckCircle2,
  Award,
  Zap,
} from "lucide-react";

import "./RecentActivity.css";

const activities = [
  {
    icon: CheckCircle2,
    title: "Completed Password Fortress",
    detail: "Mission completed",
    reward: "+100 XP",
  },
  {
    icon: Award,
    title: "Earned First Defender",
    detail: "Achievement unlocked",
    reward: "Badge",
  },
  {
    icon: Zap,
    title: "Phishing Awareness improved",
    detail: "Skill level increased",
    reward: "+40 XP",
  },
];

function RecentActivity() {
  return (
    <section className="recent-activity">
      <div className="card-title-row">
        <div>
          <span className="section-label">ACTIVITY</span>
          <h2>Recent Activity</h2>
        </div>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div className="activity-item" key={index}>
              <div className="activity-icon">
                <Icon size={17} />
              </div>

              <div className="activity-content">
                <strong>{activity.title}</strong>
                <span>{activity.detail}</span>
              </div>

              <div className="activity-reward">
                {activity.reward}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentActivity;