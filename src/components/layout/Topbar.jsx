import {
  Menu,
  Bell,
  ChevronDown,
  Coins,
  Search,
} from 'lucide-react';

import './Topbar.css';

function Topbar({
  onMenuClick,
}) {
  return (
    <header className="cyber-topbar">

      {/* Mobile menu */}

      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      {/* Search */}

      <div className="topbar-search">

        <Search size={17} />

        <input
          type="text"
          placeholder="Search missions..."
        />

        <span className="search-shortcut">
          /
        </span>

      </div>

      {/* Right side */}

      <div className="topbar-actions">

        {/* Credits */}

        <div className="credits-display">

          <div className="credits-icon">
            <Coins size={16} />
          </div>

          <div className="credits-text">

            <span>
              Credits
            </span>

            <strong>
              450
            </strong>

          </div>

        </div>

        {/* Notifications */}

        <button
          className="topbar-icon-button"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="notification-dot" />
        </button>

        {/* Profile */}

        <button className="topbar-profile">

          <div className="profile-avatar">
            S
          </div>

          <div className="profile-info">

            <strong>
              Cyber Defender
            </strong>

            <span>
              Level 4
            </span>

          </div>

          <ChevronDown size={16} />

        </button>

      </div>

    </header>
  );
}

export default Topbar;