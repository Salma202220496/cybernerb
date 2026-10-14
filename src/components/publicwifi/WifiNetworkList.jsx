import { LockKeyhole, Signal, Unlock, Wifi } from "lucide-react";

function SignalBars({ strength }) {
  const bars = [24, 48, 72, 96];
  return (
    <span className="signal-bars" aria-label={`${strength}% signal`}>
      {bars.map(threshold => (
        <i key={threshold} className={strength >= threshold ? "on" : ""} />
      ))}
    </span>
  );
}

export function WifiNetworkList({ networks, selectedId, onSelect }) {
  return (
    <div className="network-stack">
      {networks.map((network, index) => {
        const selected = selectedId === network.id;
        const isOpen = network.security === "OPEN";
        return (
          <button
            type="button"
            key={network.id}
            className={`network-card ${selected ? "selected" : ""}`}
            onClick={() => onSelect(network.id)}
            aria-pressed={selected}
          >
            <div className="network-index">0{index + 1}</div>
            <div className="network-icon">
              <Wifi size={21} />
            </div>
            <div className="network-main">
              <div className="network-title-row">
                <span className="network-name">{network.name}</span>
              </div>
              <div className="network-meta">
                <span className="signal-label">
                  <Signal size={13} /> {network.signalLabel}
                </span>
              </div>
            </div>
            <div
              className={`network-security ${isOpen ? "open-security" : ""}`}
            >
              {isOpen ? <Unlock size={16} /> : <LockKeyhole size={16} />}
              <span>{isOpen ? "Open" : "Secure"}</span>
              <SignalBars strength={network.signal} />
            </div>
            <div className="select-chevron">
              {selected ? (
                <span className="selected-check">✓</span>
              ) : (
                <span>↗</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}


/*import {
  Wifi,
  Lock,
  LockOpen,
} from "lucide-react";

function WifiNetworkList({
  networks,
  selectedNetwork,
  onSelectNetwork,
}) {
  return (
    <section className="wifi-card">
      <div className="wifi-card-heading">
        <Wifi size={20} />

        <div>
          <h2>Available Networks</h2>
          <p>Select a network to investigate.</p>
        </div>
      </div>

      <div className="wifi-network-list">
        {networks.map((network) => {
          const selected =
            selectedNetwork?.id === network.id;

          return (
            <button
              key={network.id}
              className={`wifi-network ${
                selected ? "wifi-network-selected" : ""
              }`}
              onClick={() => onSelectNetwork(network)}
            >
              <div className="wifi-network-icon">
                <Wifi size={20} />
              </div>

              <div className="wifi-network-info">
                <strong>{network.name}</strong>

                <span>
                  Signal: {network.signal}
                </span>
              </div>

              <div className="wifi-security">
                {network.security === "OPEN" ? (
                  <LockOpen size={16} />
                ) : (
                  <Lock size={16} />
                )}

                {network.security}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default WifiNetworkList;*/