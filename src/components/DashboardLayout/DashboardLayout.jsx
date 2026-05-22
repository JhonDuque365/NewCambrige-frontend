import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DashboardLayout.css';

const NAV_ITEMS = [
  { role: 'admin',     label: 'Administrador', icon: '⚙️',  path: '/dashboard/admin' },
  { role: 'rector',    label: 'Rectoría',       icon: '🏛️',  path: '/dashboard/rectoria' },
  { role: 'tesorero',  label: 'Tesorería',      icon: '💰',  path: '/dashboard/tesorero' },
  { role: 'titular',   label: 'Titular',        icon: '👨‍🏫', path: '/dashboard/titular' },
  { role: 'banda',     label: 'Banda',          icon: '🎺',  path: '/dashboard/banda' },
  { role: 'uniforme',  label: 'Uniformes',      icon: '👕',  path: '/dashboard/uniforme' },
];

export default function DashboardLayout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`dl-root ${collapsed ? 'dl-collapsed' : ''}`}>

      {/* OVERLAY MOBILE */}
      {mobileOpen && <div className="dl-overlay" onClick={() => setMobileOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`dl-sidebar ${mobileOpen ? 'dl-mobile-open' : ''}`}>
        <div className="dl-brand">
          <span className="dl-brand-icon">🏫</span>
          {!collapsed && <span className="dl-brand-name">New Cambridge</span>}
        </div>

        <button className="dl-collapse-btn" onClick={() => setCollapsed(p => !p)}>
          {collapsed ? '▶' : '◀'}
        </button>

        <nav className="dl-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.role}
              className={`dl-nav-item ${
                location.pathname === item.path ? 'dl-nav-active' : ''
              }`}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              title={collapsed ? item.label : ''}
            >
              <span className="dl-nav-icon">{item.icon}</span>
              {!collapsed && <span className="dl-nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="dl-sidebar-footer">
          <button className="dl-logout" onClick={() => navigate('/')}>
            <span>🚪</span>
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="dl-main">
        {/* TOPBAR */}
        <header className="dl-topbar">
          <button className="dl-hamburger" onClick={() => setMobileOpen(p => !p)}>☰</button>
          <div className="dl-topbar-title">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="dl-topbar-right">
            <span className="dl-badge">Dashboard</span>
            <div className="dl-avatar">AD</div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="dl-content">
          {children}
        </main>
      </div>
    </div>
  );
}
