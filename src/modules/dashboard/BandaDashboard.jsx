// BandaDashboard.jsx — Rediseño Vento con switch de gráficas
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { BarChart2, PieChart as PieIcon, Home, Music, RotateCcw, CheckCircle, AlertCircle, Wrench } from "lucide-react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import "./Dashboard.css";

const C = { cumple: "#2E7D4F", pendiente: "#8E2A25", amarillo: "#A06000", mant: "#E67E22", inactivo: "#C9B99A" };

const inventarioData  = [{ name: "Asignados", value: 48 }, { name: "Disponibles", value: 12 }, { name: "Mantenimiento", value: 5 }];
const pazBandaData    = [{ name: "Cumple",    value: 40 }, { name: "Pendiente",   value: 13 }];
const devolucionesData = [
  { tipo: "Trompeta",  asignados: 12, devueltos: 3 },
  { tipo: "Clarinete", asignados: 10, devueltos: 1 },
  { tipo: "Tambor",    asignados: 8,  devueltos: 2 },
  { tipo: "Flauta",    asignados: 9,  devueltos: 0 },
  { tipo: "Saxofón",   asignados: 9,  devueltos: 4 },
];

const RADIAN = Math.PI / 180;
const DonutLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  return (
    <text x={cx + r * Math.cos(-midAngle * RADIAN)} y={cy + r * Math.sin(-midAngle * RADIAN)}
      fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fontWeight: 700 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #C9B99A", borderRadius: 8, padding: "10px 14px", fontFamily: "Lato", fontSize: 13 }}>
      {label && <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>}
      {payload.map((p, i) => <p key={i} style={{ color: p.color, margin: "2px 0" }}>{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  );
};

const ChartSwitch = ({ value, onChange }) => (
  <div className="chart-switch">
    <button className={`chart-switch-btn ${value === "bar" ? "active" : ""}`} onClick={() => onChange("bar")}>
      <BarChart2 size={13} /> Barras
    </button>
    <button className={`chart-switch-btn ${value === "donut" ? "active" : ""}`} onClick={() => onChange("donut")}>
      <PieIcon size={13} /> Dona
    </button>
  </div>
);

const MiniChart = ({ type, data, colors, height = 240 }) => (
  type === "bar" ? (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Lato" }} />
        <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="Instrumentos" radius={[5,5,0,0]}>
          {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={90} innerRadius={48}
          dataKey="value" labelLine={false} label={DonutLabel}>
          {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
        </Pie>
        <Tooltip formatter={(v, n) => [`${v}`, n]} />
      </PieChart>
    </ResponsiveContainer>
  )
);

const BandaDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [sw, setSw] = useState({ inventario: "bar", paz: "bar", devoluciones: "bar" });
  const toggle = (key, val) => setSw(p => ({ ...p, [key]: val }));

  const menuItems = [
    { label: "Dashboard",    icon: <Home /> },
    { label: "Instrumentos", icon: <Music /> },
    { label: "Devoluciones", icon: <RotateCcw /> },
    { label: "Paz y Salvo",  icon: <CheckCircle /> },
  ];

  return (
    <div className="dashboard-page">
      <Header title="SISTEMA DE PAZ Y SALVO - NEW CAMBRIDGE SCHOOL" />
      <div className="dashboard-body">
        <ModuleLayout sidebar={
          <Sidebar menuItems={menuItems} selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu} user={user} logout={logout} />
        }>
          <div className="dashboard-content">

            <div className="dash-welcome">
              <div className="dash-welcome-text">
                <h1>Dashboard — Banda</h1>
                <p>Estado de instrumentos y paz y salvo del módulo musical</p>
              </div>
              <span className="dash-welcome-badge">Banda</span>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
              {[
                { label: "Total instrumentos",   value: 65, color: C.amarillo,  icon: <Music size={18} /> },
                { label: "Asignados",             value: 48, color: C.pendiente, icon: <AlertCircle size={18} /> },
                { label: "Disponibles",           value: 12, color: C.cumple,    icon: <CheckCircle size={18} />, delta: "18%" },
                { label: "En mantenimiento",      value: 5,  color: C.mant,      icon: <Wrench size={18} /> },
              ].map((k, i) => (
                <div key={i} className="kpi-card" style={{ "--kpi-color": k.color }}>
                  <div className="kpi-card-header">
                    <div className="kpi-card-icon">{k.icon}</div>
                    {k.delta && <span className="kpi-card-delta kpi-delta-down">{k.delta}</span>}
                  </div>
                  <div className="kpi-card-value">{k.value}</div>
                  <div className="kpi-card-label">{k.label}</div>
                </div>
              ))}
            </div>

            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Instrumentos y Paz y Salvo</h2>
              </div>
              <div className="charts-grid">

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Estado del Inventario</h3>
                    <ChartSwitch value={sw.inventario} onChange={v => toggle("inventario", v)} />
                  </div>
                  <MiniChart type={sw.inventario} data={inventarioData} colors={[C.amarillo, C.cumple, C.mant]} />
                  <div className="custom-legend">
                    {[[C.amarillo,"Asignados (48)"],[C.cumple,"Disponibles (12)"],[C.mant,"Mantenimiento (5)"]].map(([c,l],i)=>(
                      <span key={i} className="legend-item"><span className="legend-dot" style={{background:c}}/>{l}</span>
                    ))}
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Paz y Salvo — Banda</h3>
                    <ChartSwitch value={sw.paz} onChange={v => toggle("paz", v)} />
                  </div>
                  <MiniChart type={sw.paz} data={pazBandaData} colors={[C.cumple, C.pendiente]} />
                  <div className="custom-legend">
                    {[[C.cumple,"Cumple (40)"],[C.pendiente,"Pendiente (13)"]].map(([c,l],i)=>(
                      <span key={i} className="legend-item"><span className="legend-dot" style={{background:c}}/>{l}</span>
                    ))}
                  </div>
                </div>

                <div className="chart-card chart-card-full">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Asignados vs Devueltos por Tipo</h3>
                    <ChartSwitch value={sw.devoluciones} onChange={v => toggle("devoluciones", v)} />
                  </div>
                  {sw.devoluciones === "bar" ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={devolucionesData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
                        <XAxis dataKey="tipo" tick={{ fontSize: 12, fontFamily: "Lato" }} />
                        <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontFamily: "Lato", fontSize: 12 }} />
                        <Bar dataKey="asignados" name="Asignados" fill={C.amarillo} radius={[5,5,0,0]} />
                        <Bar dataKey="devueltos" name="Devueltos" fill={C.cumple}   radius={[5,5,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={devolucionesData.map(d=>({name:d.tipo, value:d.asignados}))} cx="50%" cy="50%"
                          outerRadius={110} innerRadius={55} dataKey="value" labelLine={false} label={DonutLabel}>
                          {devolucionesData.map((_,i)=><Cell key={i} fill={[C.amarillo,C.cumple,C.activo,"#5B2D8E",C.mant][i]} />)}
                        </Pie>
                        <Tooltip formatter={(v,n)=>[`${v}`,n]} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

              </div>
            </div>
          </div>
        </ModuleLayout>
      </div>
    </div>
  );
};

export default BandaDashboard;
