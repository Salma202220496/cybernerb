import {
  Search,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import "./EmailClue.css";

function EmailClue({
  title,
  description,
  type,
  inspected,
  onInspect,
}) {
  return (
    <div className={`email-clue ${inspected ? "inspected" : ""}`}>
      <div className="clue-icon">
        {inspected ? (
          type === "danger" ? (
            <AlertTriangle size={17} />
          ) : (
            <CheckCircle2 size={17} />
          )
        ) : (
          <Search size={17} />
        )}
      </div>

      <div className="clue-content">
        <strong>{title}</strong>

        {inspected && (
          <p>{description}</p>
        )}
      </div>

      <button
        className="clue-button"
        onClick={onInspect}
        disabled={inspected}
      >
        {inspected ? "Inspected" : "Inspect"}
      </button>
    </div>
  );
}

export default EmailClue;