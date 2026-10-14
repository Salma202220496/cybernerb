import {
  Mail,
  Wifi,
  ShieldAlert,
  ArrowRight,
  Target,
  Zap,
  Clock3,
  UsersRound,
} from "lucide-react";

import "./missions.css";

function Missions({
  onStartPhishing,
  onStartPublicWifi,
  onStartSocialEngineering,
}) {
  return (
    <div className="missions-page">
      <section className="missions-hero">
        <div>
          <div className="missions-eyebrow">
            <Target size={15} />
            CYBERNERB 'TRAINING MISSIONS'
          </div>

          <h1>Choose your mission</h1>

          <p>
            Enter a realistic cybersecurity scenario, investigate the threat,
            and make the right security decision.
          </p>
        </div>

        <div className="missions-status">
          <span className="missions-status-dot" />

          <div>
            <small>TRAINING NODE</small>
            <strong>BEGINNER</strong>
          </div>
        </div>
      </section>

      <div className="missions-section-heading">
        <div>
          <span>01 AVAILABLE MISSIONS</span>
          <h2>Beginner training</h2>
        </div>

        <div className="missions-count">03 MISSIONS</div>
      </div>

      <section className="missions-grid">
        <article className="mission-card">
          <div className="mission-card-top">
            <div className="mission-card-icon">
              <Mail size={25} />
            </div>

            <span className="mission-number">MISSION_01</span>
          </div>

          <div className="mission-card-content">
            <span className="mission-type">EMAIL SECURITY</span>

            <h2>Phishing Email</h2>

            <p>
              Investigate suspicious emails, inspect warning signs, use hints,
              and decide how to respond.
            </p>

            <div className="mission-divider" />

            <div className="mission-card-info">
              <span>
                <ShieldAlert size={15} />
                Beginner
              </span>

              <span>
                <Zap size={15} />
                150 XP
              </span>

              <span>
                <Clock3 size={15} />
                5 min
              </span>
            </div>

            <button
              className="mission-start-button"
              type="button"
              onClick={onStartPhishing}
            >
              <span>Start Mission</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </article>

        <article className="mission-card">
          <div className="mission-card-top">
            <div className="mission-card-icon">
              <Wifi size={25} />
            </div>

            <span className="mission-number">MISSION_02</span>
          </div>

          <div className="mission-card-content">
            <span className="mission-type">NETWORK SECURITY</span>

            <h2>Public Wi-Fi Trap</h2>

            <p>
              Investigate available Wi-Fi networks, identify suspicious
              hotspots and choose the safest connection.
            </p>

            <div className="mission-divider" />

            <div className="mission-card-info">
              <span>
                <ShieldAlert size={15} />
                Beginner
              </span>

              <span>
                <Zap size={15} />
                150 XP
              </span>

              <span>
                <Clock3 size={15} />
                5 min
              </span>
            </div>

            <button
              className="mission-start-button"
              type="button"
              onClick={onStartPublicWifi}
            >
              <span>Start Mission</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </article>

        <article className="mission-card">
          <div className="mission-card-top">
            <div className="mission-card-icon">
              <UsersRound size={25} />
            </div>

            <span className="mission-number">MISSION_03</span>
          </div>

          <div className="mission-card-content">
            <span className="mission-type">HUMAN SECURITY</span>

            <h2>Social Engineering</h2>

            <p>
              Recognize manipulation tactics, verify unexpected requests, and
              protect restricted areas from unauthorized access.
            </p>

            <div className="mission-divider" />

            <div className="mission-card-info">
              <span>
                <ShieldAlert size={15} />
                Beginner
              </span>

              <span>
                <Zap size={15} />
                150 XP
              </span>

              <span>
                <Clock3 size={15} />
                5 min
              </span>
            </div>

            <button
              className="mission-start-button"
              type="button"
              onClick={onStartSocialEngineering}
            >
              <span>Start Mission</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </article>
      </section>

      <div className="missions-footer-info">
        <span>
          <span className="missions-live-dot" />
          CYBERNERB TRAINING SYSTEM ONLINE
        </span>
      </div>
    </div>
  );
}

export default Missions;
