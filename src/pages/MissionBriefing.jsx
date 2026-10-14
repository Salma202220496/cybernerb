import {
  ArrowLeft,
  BookOpen,
} from "lucide-react";

import MissionBriefingHeader from "../components/mission-briefing/MissionBriefingHeader";
import MissionObjectives from "../components/mission-briefing/MissionObjectives";
import MissionRules from "../components/mission-briefing/MissionRules";
import MissionBriefingCard from "../components/mission-briefing/MissionBriefingCard";

import "./mission-briefing.css";

function MissionBriefing({ onStartMission }) {
  return (
    <div className="mission-briefing-page">

      <div className="briefing-topbar">

        <div className="briefing-breadcrumb">
          <BookOpen size={15} />

          <span>Mission Map</span>

          <ArrowLeft
            size={13}
            className="breadcrumb-arrow"
          />

          <strong>The Suspicious Email</strong>
        </div>

      </div>

      <MissionBriefingHeader />

      <div className="briefing-main-grid">

        <MissionObjectives />

        <MissionRules />

      </div>

    <MissionBriefingCard
  onStartMission={onStartMission}
/>

    </div>
  );
}

export default MissionBriefing;