import { useEffect, useMemo, useState } from "react";
import {
  BatteryCharging,
  Fingerprint,
  MapPin,
  Plane,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";

import { DecisionFeedback } from "../components/publicWIFI/DecisionFeedback.jsx";
import { DecisionPanel } from "../components/publicWIFI/DecisionPanel.jsx";
import { HintPanel } from "../components/publicWIFI/HintPanel.jsx";
import { WifiInspectionPanel } from "../components/publicWIFI/WifiInspectionPanel.jsx";
import { WifiNetworkList } from "../components/publicWIFI/WifiNetworkList.jsx";
import "../components/publicWIFI/public-wifi.css";

const networks = [
  {
    id: "airport-official",
    name: "Airport_Guest",
    shortName: "Airport_Guest",
    signal: 82,
    signalLabel: "Strong",
    security: "WPA2",
    safe: true,
    description:
      "Official airport Wi‑Fi displayed on terminal signage and managed by airport IT.",
    evidence: [
      {
        label: "Owner",
        value: "Airport IT",
        detail: "Matches the terminal signage and airline Wi‑Fi notice.",
        tone: "good",
      },
      {
        label: "Encryption",
        value: "WPA2",
        detail: "Protected connection with a trusted airport setup.",
        tone: "good",
      },
      {
        label: "Trust signal",
        value: "Verified",
        detail: "The SSID is consistent with the airport's published network.",
        tone: "good",
      },
    ],
  },
  {
    id: "airport-guest-free",
    name: "Airport_Guest_Free",
    shortName: "Airport_Guest_Free",
    signal: 96,
    signalLabel: "Excellent",
    security: "OPEN",
    safe: false,
    description:
      "A free network with a strong signal that imitates the legitimate airport service but is not verified.",
    evidence: [
      {
        label: "Encryption",
        value: "Open",
        detail: "No password or encryption is configured. That is a warning sign.",
        tone: "danger",
      },
      {
        label: "SSID",
        value: "Generic",
        detail: "The name is vague and appears designed to lure travelers.",
        tone: "warn",
      },
      {
        label: "Risk",
        value: "High",
        detail: "An attacker can create a fake hotspot with a stronger signal.",
        tone: "danger",
      },
    ],
  },
  {
    id: "coffeehouse-guest",
    name: "CoffeeHouse_Guest",
    shortName: "CoffeeHouse_Guest",
    signal: 58,
    signalLabel: "Medium",
    security: "WPA2",
    safe: true,
    description:
      "A local coffee shop network that is typically legitimate but not managed by the airport.",
    evidence: [
      {
        label: "Owner",
        value: "Coffee House",
        detail: "The SSID matches the storefront branding and local signage.",
        tone: "good",
      },
      {
        label: "Encryption",
        value: "WPA2",
        detail: "Traffic is protected while connected to the hotspot.",
        tone: "good",
      },
      {
        label: "Risk",
        value: "Low",
        detail: "Still verify before entering payment or work credentials.",
        tone: "warn",
      },
    ],
  },
  {
    id: "free-public-wifi",
    name: "FREE_PUBLIC_WIFI",
    shortName: "FREE_PUBLIC_WIFI",
    signal: 98,
    signalLabel: "Excellent",
    security: "OPEN",
    safe: false,
    description:
      "A high-signal open network using a generic \"free\" name with no trusted owner information.",
    evidence: [
      {
        label: "Encryption",
        value: "Open",
        detail: "Anyone can create this SSID, including a malicious actor.",
        tone: "danger",
      },
      {
        label: "Signal",
        value: "Very strong",
        detail: "An attacker may boost signal strength to lure people in.",
        tone: "warn",
      },
      {
        label: "Verification",
        value: "Missing",
        detail: "There is no trusted source confirming that this belongs to a real vendor.",
        tone: "danger",
      },
    ],
  },
];

export default function PublicWifiMission() {
  const [selectedId, setSelectedId] = useState("airport-official");
  const [score, setScore] = useState(100);
  const [hintUsed, setHintUsed] = useState(false);
  const [result, setResult] = useState(null);

  const selectedNetwork = useMemo(
    () => networks.find(network => network.id === selectedId) ?? networks[0],
    [selectedId]
  );

  const handleHint = () => {
    if (hintUsed) return;
    setHintUsed(true);
    setScore(currentScore => Math.max(0, currentScore - 10));
  };

  const handleDecision = decision => {
    if (result) return;
    const isSafeDecision =
      decision === "verified" ||
      decision === "mobile" ||
      (decision === "connect" && selectedNetwork.safe);

    setResult(isSafeDecision ? "success" : "danger");
  };

  const resetScenario = () => {
    setSelectedId("airport-official");
    setScore(100);
    setHintUsed(false);
    setResult(null);
  };

  useEffect(() => {
    const onKeyDown = event => {
      const number = Number(event.key);
      if (!result && number >= 1 && number <= networks.length) {
        setSelectedId(networks[number - 1].id);
      }

      if (event.key.toLowerCase() === "h" && result) {
        handleHint();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [result]);

  return (
    <main className="wifi-game-shell">
      <div className="wifi-atmosphere" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark">
            <RadioTower size={18} strokeWidth={2.4} />
          </div>
          <div>
            <p className="eyebrow">CYBERSAFE TRAINING</p>
            <p className="brand-name">SignalSense</p>
          </div>
        </div>

        <div className="topbar-center">
          <span className="live-dot" /> LIVE SCENARIO
          <span className="topbar-divider" />
          <MapPin size={14} /> Abu Dhabi International Airport · Gate C
        </div>

        <div className="topbar-actions">
          <div className="battery-chip">
            <BatteryCharging size={15} /> 64%
          </div>
          <div className="score-chip">
            <Sparkles size={15} /> {score} <span>PTS</span>
          </div>
        </div>
      </header>

      <section className="mission-hero panel-surface">
        <div className="hero-copy">
          <div className="mission-kicker">
            <span>BEGINNER MISSION</span>
            <span className="kicker-line" />
            <span>01 / 03</span>
          </div>
          <h1>The signal is lying.</h1>
          <p className="hero-lede">
            Your flight is delayed. Open your Wi‑Fi settings and decide which
            network deserves your trust. <strong>Start with what the phone actually shows.</strong>
          </p>
          <div className="training-rule">
            <ShieldCheck size={16} /> Training rule: a strong signal is not proof
            of a safe network.
          </div>
        </div>

        <div className="hero-status">
          <div className="status-label">DECISION STATUS</div>
          <div className="status-track">
            <span className="complete" />
            <span className={result ? "complete" : "active"} />
            <span />
          </div>
          <p>{result ? "Answer recorded" : "Choose before connecting"}</p>
          <div className="location-stamp">
            <Plane size={15} /> Boarding in <b>18:42</b>
          </div>
        </div>
      </section>

      <div className="game-grid">
        <section className="left-column">
          <div className="section-heading">
            <div>
              <p className="section-overline">
                <Wifi size={15} /> WI‑FI SETTINGS
              </p>
              <h2>Choose a network</h2>
              <p className="section-subtitle">
                This is the information your phone gives you before you join.
              </p>
            </div>
            <div className="scan-badge">
              <span className="scan-pulse" /> 4 FOUND
            </div>
          </div>

          <WifiNetworkList
            networks={networks}
            selectedId={selectedId}
            onSelect={id => {
              if (!result) setSelectedId(id);
            }}
          />

          <HintPanel
            used={hintUsed}
            disabled={Boolean(result)}
            onReveal={handleHint}
            className="post-answer-hint"
          />

          <div className="micro-tip">
            <Fingerprint size={15} />
            <span>Remember:</span> “Secure” means protected connection—not
            automatically a trusted owner.
          </div>
        </section>

        <aside className="right-column">
          <WifiInspectionPanel network={selectedNetwork} />
          <DecisionPanel
            disabled={Boolean(result)}
            onDecide={handleDecision}
            selectedNetwork={selectedNetwork}
          />
        </aside>
      </div>

      {result && (
        <div className="after-answer">
          <DecisionFeedback
            result={result}
            score={score}
            network={selectedNetwork}
            onTryAgain={resetScenario}
          />
        </div>
      )}

      
    </main>
  );
}
