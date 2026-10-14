import './button.css';

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={`cn-button cn-button-${variant} cn-button-${size} ${
        fullWidth ? 'cn-button-full' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={18} strokeWidth={2} />}
      <span>{children}</span>
    </button>
  );
}

export default Button;