import {
  AlertOctagon,
  CheckCircle2,
  Fingerprint,
  LockKeyhole,
  Search,
  ShieldAlert,
  Wifi,
} from "lucide-react";

const toneIcon = tone => {
  if (tone === "good") return <CheckCircle2 size={15} />;
  if (tone === "danger") return <AlertOctagon size={15} />;
  if (tone === "warn") return <ShieldAlert size={15} />;
  return <Fingerprint size={15} />;
};

export function WifiInspectionPanel({ network }) {
  return (
    <section className="inspection-panel panel-surface">
      <div className="panel-header">
        <div className="panel-title-icon">
          <Search size={18} />
        </div>
        <div>
          <p className="section-overline">LIVE INSPECTION</p>
          <h3>Read the evidence</h3>
        </div>
        <span className="trust-pill neutral">NETWORK NOTES</span>
      </div>
      <div className="inspection-target">
        <div className="target-symbol">
          <Wifi size={22} />
        </div>
        <div>
          <p className="target-label">CURRENTLY INSPECTING</p>
          <h4>{network.name}</h4>
          <p>{network.description}</p>
        </div>
      </div>
      <div className="evidence-grid standalone-evidence">
        {network.evidence.map(item => (
          <div className={`evidence-item ${item.tone}`} key={item.label}>
            <div className="evidence-icon">{toneIcon(item.tone)}</div>
            <div className="evidence-text">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.detail}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="inspection-note">
        <LockKeyhole size={14} />
        <span>Read carefully:</span> encryption can protect a connection, but it
        does not prove who owns the network.
      </div>
    </section>
  );
}
/*import {
  Search,
  Shield,
  Globe,
  Radio,
} from "lucide-react";

function WifiInspectionPanel({
  network,
  inspectedClues,
  onInspectClue,
}) {
  if (!network) {
    return (
      <section className="wifi-card wifi-inspection-empty">
        <Search size={25} />

        <h2>No network selected</h2>

        <p>
          Select a Wi-Fi network above to inspect its
          security information.
        </p>
      </section>
    );
  }

  const clues = [
    {
      id: `${network.id}-security`,
      icon: Shield,
      title: "Security",
      value: network.security,
    },
    {
      id: `${network.id}-domain`,
      icon: Globe,
      title: "Login Domain",
      value: network.loginDomain,
    },
    {
      id: `${network.id}-signal`,
      icon: Radio,
      title: "Signal Strength",
      value: network.signal,
    },
  ];

  return (
    <section className="wifi-card">
      <div className="wifi-card-heading">
        <Search size={20} />

        <div>
          <h2>Network Inspection</h2>
          <p>{network.name}</p>
        </div>
      </div>

      <div className="wifi-clues">
        {clues.map((clue) => {
          const Icon = clue.icon;
          const inspected =
            inspectedClues.includes(clue.id);

          return (
            <button
              key={clue.id}
              className={`wifi-clue ${
                inspected ? "wifi-clue-inspected" : ""
              }`}
              onClick={() => onInspectClue(clue.id)}
            >
              <Icon size={18} />

              <div>
                <strong>{clue.title}</strong>

                <span>
                  {inspected
                    ? clue.value
                    : "Click to inspect"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default WifiInspectionPanel;*/