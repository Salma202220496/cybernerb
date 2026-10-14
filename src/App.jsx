
import { useRef, useState } from "react";
import { useProgress } from "./context/ProgressContext";

import LearnerLayout from "./layouts/LearnerLayout";

import Dashboard from "./pages/Dashboard";
import Missions from "./pages/Missions";
import MissionBriefing from "./pages/MissionBriefing";
import PhishingMission from "./pages/PhishingMission";
import PublicWifiMission from "./pages/PublicWifiMission";
import SocialEngineeringMission from "./pages/SocialEngineeringMission";
import MissionResults from "./pages/MissionResults";

function App() {
  const { progress, completeMission } = useProgress();

  const credits = progress?.credits ?? 450;

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [missionResult, setMissionResult] = useState(null);
  const [activeMission, setActiveMission] = useState("phishing");
  const [enteredFromDashboard, setEnteredFromDashboard] =
    useState(false);

  // Prevent accidental duplicate mission submissions.
  const completionLocked = useRef(false);

  const handleEnterLevel = (level) => {
    if (level !== "beginner" || currentPage !== "dashboard") {
      return;
    }

    setEnteredFromDashboard(true);
    setMissionResult(null);
    setCurrentPage("missions");
  };

  const beginMission = (missionId) => {
    if (!enteredFromDashboard) {
      return;
    }

    completionLocked.current = false;

    setActiveMission(missionId);
    setMissionResult(null);
    setCurrentPage(missionId);
  };

  // PHISHING MISSION

  const startMission = () => {
    beginMission("phishing");
  };

  // PUBLIC WIFI MISSION

  const startPublicWifiMission = () => {
    beginMission("publicWifi");
  };

  // SOCIAL ENGINEERING MISSION

  const startSocialEngineeringMission = () => {
    beginMission("socialEngineering");
  };

  // Save a completed mission once.
  const saveMissionResult = (result, destination) => {
    if (
      !enteredFromDashboard ||
      completionLocked.current ||
      !result
    ) {
      return;
    }

    completionLocked.current = true;

    try {
      completeMission(result);
      setMissionResult(result);

      if (destination === "dashboard") {
        setEnteredFromDashboard(false);
      }

      setCurrentPage(destination);
    } catch (error) {
      completionLocked.current = false;
      console.error("Mission completion failed:", error);
    }
  };

  // Phishing: show results page.
  const handleMissionComplete = (result) => {
    saveMissionResult(result, "results");
  };

  // Public Wi-Fi: return to Dashboard.
  const handlePublicWifiComplete = (result) => {
    saveMissionResult(result, "dashboard");
  };

  // Social Engineering: save both scenarios and return.
  const handleSocialEngineeringComplete = (result) => {
    const normalizedResult = {
      ...result,
      missionId: "social-engineering",
      completed: true,
    };

    saveMissionResult(normalizedResult, "dashboard");
  };

  // Replay the most recently completed mission.
  const replayMission = () => {
    if (!enteredFromDashboard) {
      return;
    }

    completionLocked.current = false;
    setMissionResult(null);
    setCurrentPage(activeMission);
  };

  // Return to mission selection.
  const nextMission = () => {
    if (!enteredFromDashboard) {
      return;
    }

    completionLocked.current = false;
    setMissionResult(null);
    setCurrentPage("missions");
  };

  // Exit an active mission.
  const exitMission = () => {
    completionLocked.current = false;
    setMissionResult(null);

    if (enteredFromDashboard) {
      setCurrentPage("missions");
    } else {
      setCurrentPage("dashboard");
    }
  };

  // Sidebar navigation.
  const navigateToPage = (page) => {
    if (page === "dashboard") {
      completionLocked.current = false;
      setEnteredFromDashboard(false);
      setMissionResult(null);
      setCurrentPage("dashboard");
      return;
    }

    // Missions must only be accessed through
    // the Enter Beginner button on Dashboard.
    if (page === "missions") {
      return;
    }

    // Preserve navigation to other learner pages.
    if (
      [
        "progress",
        "achievements",
        "leaderboard",
        "profile",
        "settings",
      ].includes(page)
    ) {
      setCurrentPage(page);
    }
  };

  const activeItem =
    [
      "progress",
      "achievements",
      "leaderboard",
      "profile",
      "settings",
    ].includes(currentPage)
      ? currentPage
      : currentPage === "dashboard"
        ? "dashboard"
        : "missions";

  return (
    <LearnerLayout
      activeItem={activeItem}
      onNavigate={navigateToPage}
    >
      {/* DASHBOARD */}

      {currentPage === "dashboard" && (
        <Dashboard onEnterLevel={handleEnterLevel} />
      )}

      {/* MISSIONS SELECTION */}

      {currentPage === "missions" &&
        enteredFromDashboard && (
          <Missions
            onStartPhishing={startMission}
            onStartPublicWifi={startPublicWifiMission}
            onStartSocialEngineering={
              startSocialEngineeringMission
            }
          />
        )}

      {/* MISSION BRIEFING */}

      {currentPage === "briefing" &&
        enteredFromDashboard && (
          <MissionBriefing
            onStartMission={startMission}
          />
        )}

      {/* PHISHING */}

      {currentPage === "phishing" &&
        enteredFromDashboard && (
          <PhishingMission
            initialCredits={credits}
            onExitMission={exitMission}
            onMissionComplete={handleMissionComplete}
          />
        )}

      {/* PUBLIC WIFI */}

      {currentPage === "publicWifi" &&
        enteredFromDashboard && (
          <PublicWifiMission
            initialCredits={credits}
            onExitMission={exitMission}
            onMissionComplete={handlePublicWifiComplete}
          />
        )}

      {/* SOCIAL ENGINEERING */}

      {currentPage === "socialEngineering" &&
        enteredFromDashboard && (
          <SocialEngineeringMission
            initialCredits={credits}
            onExitMission={exitMission}
            onMissionComplete={
              handleSocialEngineeringComplete
            }
          />
        )}

      {/* MISSION RESULTS */}

      {currentPage === "results" &&
        enteredFromDashboard &&
        missionResult && (
          <MissionResults
            result={missionResult}
            onReplay={replayMission}
            onNextMission={nextMission}
          />
        )}
    </LearnerLayout>
  );
}

export default App;

/*import { useState } from "react";
import { useProgress } from "./context/ProgressContext";

import LearnerLayout from "./layouts/LearnerLayout";

import Dashboard from "./pages/Dashboard";
import Missions from "./pages/Missions";
import MissionBriefing from "./pages/MissionBriefing";
import PhishingMission from "./pages/PhishingMission";
import PublicWifiMission from "./pages/PublicWifiMission";
import SocialEngineeringMission from "./pages/SocialEngineeringMission";
import MissionResults from "./pages/MissionResults";

function App() {
  const { progress, completeMission } = useProgress();

  const credits = progress.credits ?? 450;

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [missionResult, setMissionResult] = useState(null);
  const [activeMission, setActiveMission] = useState("phishing");
  const [enteredFromDashboard, setEnteredFromDashboard] = useState(false);

  const handleEnterLevel = (level) => {
    if (level !== "beginner" || currentPage !== "dashboard") {
      return;
    }

    setEnteredFromDashboard(true);
    setCurrentPage("missions");
  };

  const startMission = () => {
    if (!enteredFromDashboard) {
      return;
    }

    setActiveMission("phishing");
    setMissionResult(null);
    setCurrentPage("phishing");
  };

  const startPublicWifiMission = () => {
    if (!enteredFromDashboard) {
      return;
    }

    setActiveMission("publicWifi");
    setMissionResult(null);
    setCurrentPage("publicWifi");
  };

  const startSocialEngineeringMission = () => {
    if (!enteredFromDashboard) {
      return;
    }

    setActiveMission("socialEngineering");
    setMissionResult(null);
    setCurrentPage("socialEngineering");
  };

  const handleMissionComplete = (result) => {
    if (!enteredFromDashboard) {
      return;
    }

    setMissionResult(result);
    completeMission(result);
    setCurrentPage("results");
  };

  const handlePublicWifiComplete = (result) => {
    if (!enteredFromDashboard) {
      return;
    }

    setMissionResult(result);
    completeMission(result);
    setEnteredFromDashboard(false);
    setCurrentPage("dashboard");
  };

  const handleSocialEngineeringComplete = (result) => {
    if (!enteredFromDashboard) {
      return;
    }

    setMissionResult(result);
    completeMission(result);
    setEnteredFromDashboard(false);
    setCurrentPage("dashboard");
  };

  const replayMission = () => {
    if (!enteredFromDashboard) {
      return;
    }

    setCurrentPage(activeMission);
  };

  const nextMission = () => {
    if (!enteredFromDashboard) {
      return;
    }

    setCurrentPage("missions");
  };

  const exitMission = () => {
    if (enteredFromDashboard) {
      setCurrentPage("missions");
    } else {
      setCurrentPage("dashboard");
    }
  };

  const navigateToPage = (page) => {
    if (page === "dashboard") {
      setEnteredFromDashboard(false);
      setMissionResult(null);
      setCurrentPage("dashboard");
      return;
    }

    if (page === "missions") {
      return;
    }
  };

  const activeItem = currentPage === "dashboard" ? "dashboard" : "missions";

  return (
    <LearnerLayout activeItem={activeItem} onNavigate={navigateToPage}>
      {currentPage === "dashboard" && (
        <Dashboard onEnterLevel={handleEnterLevel} />
      )}

      {currentPage === "missions" && enteredFromDashboard && (
        <Missions
          onStartPhishing={startMission}
          onStartPublicWifi={startPublicWifiMission}
          onStartSocialEngineering={startSocialEngineeringMission}
        />
      )}

      {currentPage === "briefing" && enteredFromDashboard && (
        <MissionBriefing onStartMission={startMission} />
      )}

      {currentPage === "phishing" && enteredFromDashboard && (
        <PhishingMission
          initialCredits={credits}
          onExitMission={exitMission}
          onMissionComplete={handleMissionComplete}
        />
      )}

      {currentPage === "publicWifi" && enteredFromDashboard && (
        <PublicWifiMission
          initialCredits={credits}
          onExitMission={exitMission}
          onMissionComplete={handlePublicWifiComplete}
        />
      )}

      {currentPage === "socialEngineering" && enteredFromDashboard && (
        <SocialEngineeringMission
          initialCredits={credits}
          onExitMission={exitMission}
          onMissionComplete={handleSocialEngineeringComplete}
        />
      )}

      {currentPage === "results" && enteredFromDashboard && missionResult && (
        <MissionResults
          result={missionResult}
          onReplay={replayMission}
          onNextMission={nextMission}
        />
      )}
    </LearnerLayout>
  );
}

export default App;

*/