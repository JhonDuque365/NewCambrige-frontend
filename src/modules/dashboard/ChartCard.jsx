import { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import './ChartCard.css';

const RCOLORS = ['#7c3aed','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899'];

const SwitchBtn = ({ active, onClick, label }) => (
  <button
    className={`chart-switch-btn ${active ? 'active' : ''}`}
    onClick={onClick}
  >{label}</button>
);

const ChartCard = ({ title, data, wide = false, colors = RCOLORS, defaultType = 'pie', stat }) => {
  const [type, setType] = useState(defaultType);

  return (
    <div className={`chart-card ${wide ? 'bento-wide' : ''}`}>
      <div className="chart-card-top">
        <h3 className="chart-card-title">{title}</h3>
        <div className="chart-switches">
          <SwitchBtn active={type === 'pie'}  onClick={() => setType('pie')}  label="🥧 Torta" />
          <SwitchBtn active={type === 'bar'}  onClick={() => setType('bar')}  label="📊 Barras" />
        </div>
      </div>

      {stat && (
        <div className="chart-stat-row">
          {stat.map((s, i) => (
            <div key={i} className="chart-stat" style={{ borderColor: colors[i % colors.length] }}>
              <span className="stat-num" style={{ color: colors[i % colors.length] }}>{s.value}</span>
              <span className="stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      <ResponsiveContainer width="100%" height={240}>
        {type === 'pie' ? (
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
              paddingAngle={3} dataKey="value" label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" iconSize={10} />
          </PieChart>
        ) : (
          <BarChart data={data} margin={{ top: 8, right: 10, left: -20, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
