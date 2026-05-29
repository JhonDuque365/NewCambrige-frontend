import './DashboardLayout.css';

const DashboardLayout = ({ title, subtitle, icon, color, children }) => {
  return (
    <div className="dash-layout">
      <div className="dash-header" style={{ borderLeft: `5px solid ${color}` }}>
        <span className="dash-icon" style={{ background: color }}>{icon}</span>
        <div>
          <h1 className="dash-title">{title}</h1>
          <p className="dash-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="dash-bento">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
