
"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <div className={mobileOpen ? "sidebar-mobile-open" : ""}>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </div>

      <div className="app-main">
        <Topbar onMenuClick={() => setMobileOpen(!mobileOpen)} />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
