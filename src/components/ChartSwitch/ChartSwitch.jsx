import { useState } from 'react';
import './ChartSwitch.css';

/**
 * ChartSwitch — toggle visual entre dos gráficas
 * Props:
 *   label     : string   — título de la tarjeta
 *   labelA    : string   — nombre opción A
 *   labelB    : string   — nombre opción B
 *   chartA    : ReactNode
 *   chartB    : ReactNode
 *   accent    : string   — color CSS hex para el switch activo
 */
export default function ChartSwitch({ label, labelA = 'Donut', labelB = 'Barras', chartA, chartB, accent }) {
  const [active, setActive] = useState('A');
  const accentColor = accent || 'var(--color-primary)';

  return (
    <div className="cs-card">
      <div className="cs-header">
        <span className="cs-label">{label}</span>
        <div className="cs-toggle">
          <button
            className={`cs-btn ${active === 'A' ? 'cs-btn-active' : ''}`}
            style={active === 'A' ? { background: accentColor } : {}}
            onClick={() => setActive('A')}
          >{labelA}</button>
          <button
            className={`cs-btn ${active === 'B' ? 'cs-btn-active' : ''}`}
            style={active === 'B' ? { background: accentColor } : {}}
            onClick={() => setActive('B')}
          >{labelB}</button>
        </div>
      </div>
      <div className="cs-chart-area">
        {active === 'A' ? chartA : chartB}
      </div>
    </div>
  );
}
