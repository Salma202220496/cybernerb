
import {
  Home,
  Target,
  BarChart3,
  Trophy,
  Zap,
  Settings,
  User,
  Shield,
  X,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({
  activeItem = "dashboard",
  mobileOpen = false,
  onClose,
  onNavigate,
}) {
  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "missions",
      label: "Missions",
      icon: Target,
    },
    {
      id: "progress",
      label: "My Progress",
      icon: BarChart3,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Zap,
    },
  ];

  const secondaryNavigation = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const handleNavigation = (id) => {
    // Missions can only be entered through Dashboard.
    if (id === "missions") {
      return;
    }

    onNavigate?.(id);
    onClose?.();
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`cyber-sidebar ${
          mobileOpen ? "sidebar-mobile-open" : ""
        }`}
      >
        {/* Brand */}

        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Shield size={21} />
          </div>

          <div className="sidebar-brand-text">
            <span className="brand-name">
              CYBERNERB
            </span>

            <span className="brand-subtitle">
              CYBER DEFENDER
            </span>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Navigation */}

        <div className="sidebar-section">
          <p className="sidebar-section-title">
            LEARN
          </p>

          <nav className="sidebar-navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isMissions = item.id === "missions";

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sidebar-item ${
                    activeItem === item.id
                      ? "sidebar-item-active"
                      : ""
                  }`}
                  onClick={() =>
                    handleNavigation(item.id)
                  }
                  aria-disabled={isMissions}
                  title={
                    isMissions
                      ? "Enter missions through Dashboard"
                      : undefined
                  }
                >
                  <Icon size={19} />

                  <span>
                    {item.label}
                  </span>

                  {isMissions && (
                    <span className="sidebar-notification">
                      3
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Navigation */}

        <div className="sidebar-bottom">
          <p className="sidebar-section-title">
            ACCOUNT
          </p>

          <nav className="sidebar-navigation">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sidebar-item ${
                    activeItem === item.id
                      ? "sidebar-item-active"
                      : ""
                  }`}
                  onClick={() =>
                    handleNavigation(item.id)
                  }
                >
                  <Icon size={19} />

                  <span>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
