
import { Search } from "lucide-react";

import ShoppingMessage from "./ShoppingMessage";
import BehavioralClues from "./BehavioralClues";
import DecisionPanel from "./DecisionPanel";
import ScenarioFeedback from "./ScenarioFeedback";

export default function SocialEngineeringScenario({
  scenario,
  choiceId,
  hintUsed,
  score,
  onDecide,
  onRevealHint,
  onTryAgain,
  onNext,
  isLastScenario = false,
}) {
  const selected = scenario.choices.find(
    (choice) => choice.id === choiceId
  );

  return (
    <div className="se-grid">
      <section className="se-left">
        {/* Situation briefing */}

        <div className="se-panel">
          <div className="se-panel-heading">
            <Search size={19} />
            Situation Briefing
          </div>

          <p className="se-story">
            {scenario.story}
          </p>
        </div>

        {/* Attacker's message */}

        <ShoppingMessage scenario={scenario} />

        {/* Behavioral targeting clues */}

        <BehavioralClues clues={scenario.clues} />
      </section>

      <aside className="se-right">
        {/* User decisions */}

        <DecisionPanel
          scenario={scenario}
          choiceId={choiceId}
          hintUsed={hintUsed}
          onDecide={onDecide}
          onRevealHint={onRevealHint}
        />

        {/* Feedback and next scenario */}

        {selected && (
          <ScenarioFeedback
            selected={selected}
            scenario={scenario}
            score={score}
            onTryAgain={onTryAgain}
            onNext={onNext}
            isLastScenario={isLastScenario}
          />
        )}
      </aside>
    </div>
  );
}
