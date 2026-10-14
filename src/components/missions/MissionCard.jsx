import {
  Check,
  Lock,
  Play,
  ShieldAlert,
  Wifi,
  Globe,
  Users,
  KeyRound,
  Trophy,
} from "lucide-react";

import "./MissionCard.css";

const iconMap = {
  password: KeyRound,
  wifi: Wifi,
  phishing: ShieldAlert,
  website: Globe,
  social: Users,
  final: Trophy,
};

function MissionCard({
  number,
  title,
  description,
  category,
  difficulty,
  xp,
  status,
  type,
}) {
  const Icon = iconMap[type] || ShieldAlert;

  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isLocked = status === "locked";

  return (
    <article
      className={`mission-card ${status}`}
    >
      <div className="mission-number">
        {isCompleted ? (
          <Check size={20} />
        ) : isLocked ? (
          <Lock size={18} />
        ) : (
          number
        )}
      </div>

      <div className="mission-card-icon">
        <Icon size={24} />
      </div>

      <div className="mission-card-content">
        <div className="mission-card-top">
          <span className="mission-category">
            {category}
          </span>

          <span className={`mission-difficulty ${difficulty.toLowerCase()}`}>
            {difficulty}
          </span>
        </div>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="mission-card-footer">
          <span className="mission-xp">
            +{xp} XP
          </span>

          {isCompleted && (
            <span className="mission-status completed-status">
              Completed
            </span>
          )}

          {isCurrent && (
            <button className="mission-start-button">
              Start Mission
              <Play size={14} />
            </button>
          )}

          {isLocked && (
            <span className="mission-status locked-status">
              Locked
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default MissionCard;