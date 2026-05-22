// UniformeDashboard.jsx — Rediseño Vento con switch de gráficas
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { BarChart2, PieChart as PieIcon, Home, Shirt, RotateCcw, CheckCircle, AlertCircle, Package } from "lucide-react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import "./Dashboard.css";

const C = { cumple: "#2E7D4F", pendiente: "#8E2A25", activo: "#1B3A5C", morado: "#5B2D8E", inactivo: "#C9B99A" };

const inventarioData      = [{ name: "Asignadas", value: 210 }, { name: "Disponibles", value: 65 }, { name: "Devueltas", value: 150 }];
const pazUniformeData     = [{ name: "Cumple",    value: 330 }, { name: "Pendiente",   value: 95  }];
const prendasData = [
  { prenda: "Camisa",        total: 120, disponibles: 30 },
  { prenda: "Pantalón",      total: 110, disponibles: 25 },
  { prenda: "Chaqueta Gala", total: 85,  disponibles: 15 },
  { prenda: "Zapatos",       total: 95,  disponibles: 20 },
  { prenda: "Corbata",       total: 105, disponibles: 40 },
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
        <Bar dataKey="value" name="Prendas" radius={[5,5,0,0]}>
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

const UniformeDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [sw, setSw] = useState({ inventario: "bar", paz: "bar", prendas: "bar" });
  const toggle = (key, val) => setSw(p => ({ ...p, [key]: val }));

  const menuItems = [
    { label: "Dashboard",       icon: <Home /> },
    { label: "Inv. Prendas",    icon: <Package /> },
    { label: "Asignaciones",    icon: <Shirt /> },
    { label: "Devoluciones",    icon: <RotateCcw /> },
    { label: "Paz y Salvo",     icon: <CheckCircle /> },
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
                <h1>Dashboard — Uniformes</h1>
                <p>Estado del inventario y devoluciones de prendas</p>
              </div>
              <span className="dash-welcome-badge">Uniforme</span>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
              {[
                { label: "Prendas totales",  value: 425, color: C.morado,    icon: <Package size={18} /> },
                { label: "Asignadas",        value: 210, color: C.pendiente, icon: <AlertCircle size={18} /> },
                { label: "Disponibles",      value: 65,  color: C.cumple,    icon: <CheckCircle size={18} />, delta: "15%" },
                { label: "Devueltas",        value: 150, color: C.activo,    icon: <RotateCcw size={18} /> },
              ].map((k, i) => (
                <div key={i} className="kpi-card" style={{ "--kpi-color": k.color }}>
                  <div className="kpi-card-header">
                    <div className="kpi-card-icon">{k.icon}</div>
                    {k.delta && <span className="kpi-card-delta kpi-delta-up">{k.delta}</span>}
                  </div>
                  <div className="kpi-card-value">{k.value}</div>
                  <div className="kpi-card-label">{k.label}</div>
                </div>
              ))}
            </div>

            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Estado de Uniformes y Paz y Salvo</h2>
              </div>
              <div className="charts-grid">

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Estado del Inventario</h3>
                    <ChartSwitch value={sw.inventario} onChange={v => toggle("inventario", v)} />
                  </div>
                  <MiniChart type={sw.inventario} data={inventarioData} colors={[C.pendiente, C.cumple, C.inactivo]} />
                  <div className="custom-legend">
                    {[[C.pendiente,"Asignadas (210)"],[C.cumple,"Disponibles (65)"],[C.inactivo,"Devueltas (150)"]].map(([c,l],i)=>(
                      <span key={i} className="legend-item"><span className="legend-dot" style={{background:c}}/>{l}</span>
                    ))}
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Paz y Salvo — Uniformes</h3>
                    <ChartSwitch value={sw.paz} onChange={v => toggle("paz", v)} />
                  </div>
                  <MiniChart type={sw.paz} data={pazUniformeData} colors={[C.cumple, C.pendiente]} />
                  <div className="custom-legend">
                    {[[C.cumple,"Cumple (330)"],[C.pendiente,"Pendiente (95)"]].map(([c,l],i)=>(
                      <span key={i} className="legend-item"><span className="legend-dot" style={{background:c}}/>{l}</span>
                    ))}
                  </div>
                </div>

                <div className="chart-card chart-card-full">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Prendas Totales vs Disponibles por Tipo</h3>
                    <ChartSwitch value={sw.prendas} onChange={v => toggle("prendas", v)} />
                  </div>
                  {sw.prendas === "bar" ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={prendasData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
                        <XAxis dataKey="prenda" tick={{ fontSize: 12, fontFamily: "Lato" }} />
                        <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontFamily: "Lato", fontSize: 12 }} />
                        <Bar dataKey="total"       name="Total"       fill={C.morado} radius={[5,5,0,0]} />
                        <Bar dataKey="disponibles" name="Disponibles" fill={C.cumple} radius={[5,5,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={prendasData.map(d=>({name:d.prenda,value:d.total}))} cx="50%" cy="50%"
                          outerRadius={110} innerRadius={55} dataKey="value" labelLine={false} label={DonutLabel}>
                          {prendasData.map((_,i)=><Cell key={i} fill={[C.morado,C.cumple,C.activo,C.amarillo,C.pendiente][i] ?? C.morado} />)}
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

export default UniformeDashboard;
