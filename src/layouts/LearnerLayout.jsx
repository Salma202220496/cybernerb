import { useState } from 'react';

import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

import './learner-layout.css';

function LearnerLayout({
  children,
  activeItem = 'dashboard',
  onNavigate,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <div className="learner-layout">

      <Sidebar
        activeItem={activeItem}
        mobileOpen={mobileSidebarOpen}
        onClose={() =>
          setMobileSidebarOpen(false)
        }
        onNavigate={onNavigate}
      />

      <Topbar
        onMenuClick={() =>
          setMobileSidebarOpen(true)
        }
      />

      <main className="learner-main">
        <div className="learner-content">
          {children}
        </div>
      </main>

    </div>
  );
}

export default LearnerLayout;