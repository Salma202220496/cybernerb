import { ShieldCheck, Flame } from "lucide-react";
import "./WelcomeHeader.css";

function WelcomeHeader() {
  return (
    <section className="welcome-header">
      <div className="welcome-content">
        <div className="welcome-icon">
          <ShieldCheck size={28} />
        </div>

        <div>
          <p className="welcome-label">WELCOME BACK</p>

          <h1>
            Cyber Defender
            <span className="welcome-wave">👋</span>
          </h1>

          <p className="welcome-subtitle">
            Ready to strengthen your cybersecurity skills?
          </p>
        </div>
      </div>

      <div className="streak-badge">
        <Flame size={20} />
        <div>
          <strong>7 Day Streak</strong>
          <span>Keep it going!</span>
        </div>
      </div>
    </section>
  );
}

export default WelcomeHeader;