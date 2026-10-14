
import { Eye } from "lucide-react";

export default function BehavioralClues({ clues = [] }) {
  return (
    <div className="se-panel">
      <div className="se-panel-heading">
        <Eye size={19} />
        Investigate the Clues
      </div>

      <div className="se-clues">
        {clues.map((clue, index) => (
          <div className="se-clue" key={clue.title}>
            <span className="se-clue-number">
              {index + 1}
            </span>

            <div>
              <strong>{clue.title}</strong>
              <p>{clue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
