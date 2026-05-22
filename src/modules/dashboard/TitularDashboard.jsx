// TitularDashboard.jsx — Rediseño Vento con switch de gráficas
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { BarChart2, PieChart as PieIcon, Home, BookOpen, ClipboardList, Library, CheckCircle, AlertCircle } from "lucide-react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import "./Dashboard.css";

const C = { cumple: "#2E7D4F", pendiente: "#8E2A25", activo: "#1B3A5C", azul: "#2E5FA7", amarillo: "#A06000" };

const pupitresData   = [{ name: "Pagados",    value: 28 }, { name: "Pendientes", value: 7  }];
const pruebasData    = [{ name: "Cumple",     value: 25 }, { name: "Pendiente",  value: 10 }];
const bibliotecaData = [{ name: "Entregados", value: 30 }, { name: "Faltantes",  value: 5  }];
const pazGrupoData   = [{ name: "Cumple",     value: 22 }, { name: "Pendiente",  value: 13 }];

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
        <Bar dataKey="value" name="Estudiantes" radius={[5,5,0,0]}>
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

const TitularDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [sw, setSw] = useState({ paz: "bar", pupitres: "bar", pruebas: "bar", biblioteca: "bar" });
  const toggle = (key, val) => setSw(p => ({ ...p, [key]: val }));

  const grupo = user?.grupo ?? "Sexto A";
  const anio  = user?.anio  ?? "2025–2026";

  const menuItems = [
    { label: "Dashboard",  icon: <Home /> },
    { label: "Pupitres",   icon: <ClipboardList /> },
    { label: "Pruebas",    icon: <BookOpen /> },
    { label: "Biblioteca", icon: <Library /> },
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
                <h1>Dashboard — Titular</h1>
                <p>Vista general de tu grupo asignado</p>
              </div>
              <span className="dash-welcome-badge">Titular</span>
            </div>

            <div className="dash-context-banner">
              📚 Grupo activo: <strong>{grupo}</strong> &nbsp;·&nbsp; Año escolar: <strong>{anio}</strong>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
              {[
                { label: "Total estudiantes",  value: 35,   color: C.activo,    icon: <CheckCircle size={18} /> },
                { label: "Paz y salvo al día", value: 22,   color: C.cumple,    icon: <CheckCircle size={18} />, delta: "63%" },
                { label: "Con pendientes",      value: 13,   color: C.pendiente, icon: <AlertCircle size={18} /> },
                { label: "Pupitres pagados",   value: "28/35", color: C.azul,   icon: <ClipboardList size={18} /> },
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

            {/* Gráficas */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Estado del Grupo — {grupo}</h2>
              </div>
              <div className="charts-grid">

                {[{key:"paz", title:"Paz y Salvo General", data:pazGrupoData,   colors:[C.cumple, C.pendiente]},
                  {key:"pupitres", title:"Pupitres",       data:pupitresData,   colors:[C.cumple, C.pendiente]},
                  {key:"pruebas", title:"Pruebas Inst.",   data:pruebasData,    colors:[C.azul, C.pendiente]},
                  {key:"biblioteca", title:"Biblioteca",   data:bibliotecaData, colors:[C.cumple, C.amarillo]},
                ].map(card => (
                  <div key={card.key} className="chart-card">
                    <div className="chart-card-header">
                      <h3 className="chart-card-title">{card.title}</h3>
                      <ChartSwitch value={sw[card.key]} onChange={v => toggle(card.key, v)} />
                    </div>
                    <MiniChart type={sw[card.key]} data={card.data} colors={card.colors} />
                    <div className="custom-legend">
                      {card.data.map((d, i) => (
                        <span key={i} className="legend-item">
                          <span className="legend-dot" style={{ background: card.colors[i] }} />
                          {d.name} ({d.value})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </ModuleLayout>
      </div>
    </div>
  );
};

export default TitularDashboard;
