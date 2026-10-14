import './badge.css';

function Badge({
  children,
  variant = 'default',
}) {
  return (
    <span className={`cn-badge cn-badge-${variant}`}>
      {children}
    </span>
  );
}

export default Badge;