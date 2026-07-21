import { NavLink, Outlet } from "react-router";

const navigationItems = [
  { to: "/", label: "Home", end: true },
  { to: "/countries", label: "Countries" },
  { to: "/players", label: "Players" },
  { to: "/equipment", label: "Equipment" },
  { to: "/match-setup", label: "Match Setup" },
  { to: "/live-match", label: "Live Match" },
  { to: "/tournaments", label: "Tournaments" },
  { to: "/settings", label: "Settings" },
];

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <span className="app-eyebrow">Avium Sports</span>
          <strong className="app-title">Table Tennis Engine</strong>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <nav aria-label="Main navigation">
            <ul className="navigation-list">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      isActive
                        ? "navigation-link navigation-link-active"
                        : "navigation-link"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}