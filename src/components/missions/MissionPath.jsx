import MissionCard from "./MissionCard";

import "./MissionPath.css";

const missions = [
  {
    number: 1,
    title: "Password Fortress",
    description:
      "Learn how to recognize weak passwords and build stronger authentication habits.",
    category: "Password Security",
    difficulty: "Beginner",
    xp: 100,
    status: "completed",
    type: "password",
  },
  {
    number: 2,
    title: "Public Wi-Fi Trap",
    description:
      "Discover the risks of unsecured public networks and learn how to stay protected.",
    category: "Network Security",
    difficulty: "Beginner",
    xp: 100,
    status: "completed",
    type: "wifi",
  },
  {
    number: 3,
    title: "The Suspicious Email",
    description:
      "Investigate an incoming email and identify the warning signs of a phishing attack.",
    category: "Phishing",
    difficulty: "Intermediate",
    xp: 150,
    status: "current",
    type: "phishing",
  },
  {
    number: 4,
    title: "Fake Website",
    description:
      "Can you distinguish a legitimate website from a carefully designed fake?",
    category: "Phishing",
    difficulty: "Intermediate",
    xp: 150,
    status: "locked",
    type: "website",
  },
  {
    number: 5,
    title: "The Social Engineer",
    description:
      "Someone is trying to manipulate you into revealing sensitive information. Can you spot the tactics?",
    category: "Social Engineering",
    difficulty: "Advanced",
    xp: 200,
    status: "locked",
    type: "social",
  },
  {
    number: 6,
    title: "The Final Defense",
    description:
      "Put everything you've learned together and defend against multiple cybersecurity threats.",
    category: "Final Challenge",
    difficulty: "Advanced",
    xp: 300,
    status: "locked",
    type: "final",
  },
];

function MissionPath() {
  return (
    <div className="mission-path">
      {missions.map((mission, index) => (
        <div className="mission-path-item" key={mission.number}>
          <MissionCard {...mission} />

          {index < missions.length - 1 && (
            <div
              className={`mission-connector ${
                mission.status === "completed"
                  ? "connector-completed"
                  : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MissionPath;