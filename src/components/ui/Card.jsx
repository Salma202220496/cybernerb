import './card.css';

function Card({
  children,
  className = '',
  hover = false,
  padding = 'medium',
}) {
  return (
    <div
      className={`cn-card cn-card-padding-${padding} ${
        hover ? 'cn-card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;