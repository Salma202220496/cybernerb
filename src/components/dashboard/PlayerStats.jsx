import {
  Zap,
  Coins,
  Target,
  Trophy,
} from "lucide-react";

import "./PlayerStats.css";

const stats = [
  {
    title: "Total XP",
    value: "780",
    description: "of 1,000 XP",
    icon: Zap,
    type: "xp",
  },
  {
    title: "Credits",
    value: "450",
    description: "Available to use",
    icon: Coins,
    type: "credits",
  },
  {
    title: "Missions",
    value: "12",
    description: "8 completed",
    icon: Target,
    type: "missions",
  },
  {
    title: "Achievements",
    value: "6",
    description: "2 recently earned",
    icon: Trophy,
    type: "achievements",
  },
];

function PlayerStats() {
  return (
    <section className="player-stats">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className={`stat-card ${stat.type}`} key={stat.title}>
            <div className="stat-icon">
              <Icon size={20} />
            </div>

            <div className="stat-info">
              <span>{stat.title}</span>
              <strong>{stat.value}</strong>
              <small>{stat.description}</small>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default PlayerStats;