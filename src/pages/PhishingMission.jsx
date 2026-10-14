import RealisticPhishingTraining from "../components/phishing/RealisticPhishingTraining";

function PhishingMission({
  onExitMission,
  onMissionComplete,
  initialCredits = 450,
}) {
  return (
    <RealisticPhishingTraining
      onExitMission={onExitMission}
      onMissionComplete={onMissionComplete}
      initialCredits={initialCredits}
    />
  );
}

export default PhishingMission;