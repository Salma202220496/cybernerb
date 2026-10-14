
import {
  ShoppingBag,
  AlertTriangle,
  LockKeyhole,
  BadgeCheck,
} from "lucide-react";

export default function ShoppingMessage({ scenario }) {
  const isVerified =
    scenario.id === "genuine-loyalty-reward";

  return (
    <div className="se-message">
      <div className="se-message-header">
        <div className="se-avatar">
          <ShoppingBag size={22} />
        </div>

        <div>
          <strong>{scenario.sender}</strong>
          <small>{scenario.source}</small>
        </div>

        <span
          className={
            isVerified
              ? "se-verified"
              : "se-unverified"
          }
        >
          {isVerified ? "VERIFIED" : "UNVERIFIED"}
        </span>
      </div>

      <div className="se-message-body">
        <p>{scenario.message}</p>

        <div
          className={
            isVerified
              ? "se-request se-safe-request"
              : "se-request"
          }
        >
          {isVerified ? (
            <BadgeCheck size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}

          <span>{scenario.request}</span>
        </div>

        <div className="se-fake-link">
          <LockKeyhole size={15} />
          {scenario.link}
        </div>
      </div>
    </div>
  );
}
