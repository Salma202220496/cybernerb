import './progress-bar.css';

function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  variant = 'primary',
}) {
  const percentage = Math.min(
    Math.max((value / max) * 100, 0),
    100
  );

  return (
    <div className="cn-progress-wrapper">
      {(label || showValue) && (
        <div className="cn-progress-header">
          {label && (
            <span className="cn-progress-label">
              {label}
            </span>
          )}

          {showValue && (
            <span className="cn-progress-value">
              {value} / {max}
            </span>
          )}
        </div>
      )}

      <div className="cn-progress-track">
        <div
          className={`cn-progress-fill cn-progress-${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;