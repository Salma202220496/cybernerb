import './stat-card.css';

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="cn-stat-card">
      <div className="cn-stat-icon">
        {Icon && <Icon size={20} />}
      </div>

      <div className="cn-stat-content">
        <span className="cn-stat-label">
          {label}
        </span>

        <strong className="cn-stat-value">
          {value}
        </strong>

        {description && (
          <span className="cn-stat-description">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;