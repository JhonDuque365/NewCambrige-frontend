// RectoriaDashboard.jsx — Rediseño Vento con switch de gráficas
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { BarChart2, PieChart as PieIcon, Home, GraduationCap, Users, FileCheck, CheckCircle, AlertCircle } from "lucide-react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import "./Dashboard.css";

const C = { cumple: "#2E7D4F", pendiente: "#8E2A25", activo: "#1B3A5C", azul: "#2E5FA7" };

const pazEstudiantesData = [{ name: "Cumple",    value: 290 }, { name: "Pendiente", value: 110 }];
const pazDocentesData    = [{ name: "Cumple",    value: 18  }, { name: "Pendiente", value: 6   }];
const pendientesPorModulo = [
  { modulo: "Tesorería",  estudiantes: 85,  docentes: 3 },
  { modulo: "Salón",      estudiantes: 60,  docentes: 2 },
  { modulo: "Banda",      estudiantes: 13,  docentes: 0 },
  { modulo: "Uniformes",  estudiantes: 95,  docentes: 1 },
  { modulo: "Biblioteca", estudiantes: 40,  docentes: 4 },
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
        <Bar dataKey="value" radius={[5,5,0,0]}>
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

const RectoriaDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [sw, setSw] = useState({ estudiantes: "bar", docentes: "bar", modulos: "bar" });
  const toggle = (key, val) => setSw(p => ({ ...p, [key]: val }));

  const menuItems = [
    { label: "Dashboard",        icon: <Home /> },
    { label: "Paz y Salvo Est.", icon: <GraduationCap /> },
    { label: "Paz y Salvo Doc.", icon: <Users /> },
    { label: "Reportes",         icon: <FileCheck /> },
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
                <h1>Dashboard — Rectoría</h1>
                <p>Vista global del estado de paz y salvo institucional</p>
              </div>
              <span className="dash-welcome-badge">Rectoría</span>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
              {[
                { label: "Estudiantes totales",      value: 400, color: C.activo,    icon: <GraduationCap size={18} /> },
                { label: "Est. con paz y salvo",      value: 290, color: C.cumple,    icon: <CheckCircle size={18} />, delta: "73%" },
                { label: "Est. con pendientes",       value: 110, color: C.pendiente, icon: <AlertCircle size={18} /> },
                { label: "Docentes totales",          value: 24,  color: C.azul,      icon: <Users size={18} /> },
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

            {/* Paz y Salvo */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Estado de Paz y Salvo</h2>
              </div>
              <div className="charts-grid">

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Estudiantes</h3>
                    <ChartSwitch value={sw.estudiantes} onChange={v => toggle("estudiantes", v)} />
                  </div>
                  <MiniChart type={sw.estudiantes} data={pazEstudiantesData} colors={[C.cumple, C.pendiente]} />
                  <div className="custom-legend">
                    {[[C.cumple,"Cumple (290)"],[C.pendiente,"Pendiente (110)"]].map(([c,l],i)=>(
                      <span key={i} className="legend-item"><span className="legend-dot" style={{background:c}}/>{l}</span>
                    ))}
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Docentes Titulares</h3>
                    <ChartSwitch value={sw.docentes} onChange={v => toggle("docentes", v)} />
                  </div>
                  <MiniChart type={sw.docentes} data={pazDocentesData} colors={[C.cumple, C.pendiente]} />
                  <div className="custom-legend">
                    {[[C.cumple,"Cumple (18)"],[C.pendiente,"Pendiente (6)"]].map(([c,l],i)=>(
                      <span key={i} className="legend-item"><span className="legend-dot" style={{background:c}}/>{l}</span>
                    ))}
                  </div>
                </div>

                <div className="chart-card chart-card-full">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Pendientes por Módulo — Estudiantes vs Docentes</h3>
                    <ChartSwitch value={sw.modulos} onChange={v => toggle("modulos", v)} />
                  </div>
                  {sw.modulos === "bar" ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={pendientesPorModulo} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
                        <XAxis dataKey="modulo" tick={{ fontSize: 12, fontFamily: "Lato" }} />
                        <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontFamily: "Lato", fontSize: 12 }} />
                        <Bar dataKey="estudiantes" name="Estudiantes" fill={C.pendiente} radius={[5,5,0,0]} />
                        <Bar dataKey="docentes"    name="Docentes"    fill={C.azul}      radius={[5,5,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={pendientesPorModulo.map(d=>({name:d.modulo,value:d.estudiantes}))} cx="50%" cy="50%"
                          outerRadius={110} innerRadius={55} dataKey="value" labelLine={false} label={DonutLabel}>
                          {pendientesPorModulo.map((_,i)=><Cell key={i} fill={[C.pendiente,C.azul,C.cumple,"#5B2D8E","#A06000"][i]} />)}
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

export default RectoriaDashboard;
