import './StatCard.css';

/**
 * StatCard — tarjeta de KPI numérico
 * Props: icon, label, value, sub, color (CSS var o hex)
 */
export default function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="sc-card" style={{ borderTop: `4px solid ${color || 'var(--color-primary)'}` }}>
      <div className="sc-icon" style={{ background: color || 'var(--color-primary)' }}>{icon}</div>
      <div className="sc-body">
        <p className="sc-label">{label}</p>
        <p className="sc-value">{value}</p>
        {sub && <p className="sc-sub">{sub}</p>}
      </div>
    </div>
  );
}
