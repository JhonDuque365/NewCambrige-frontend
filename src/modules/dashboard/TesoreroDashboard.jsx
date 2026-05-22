// TesoreroDashboard.jsx — Rediseño Vento con switch de gráficas
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line
} from "recharts";
import { BarChart2, PieChart as PieIcon, Home, CreditCard, Calendar, FileText, Bell, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import "./Dashboard.css";

const C = { cumple: "#2E7D4F", pendiente: "#8E2A25", activo: "#1B3A5C", mora: "#A06000" };

const matriculaData = [{ name: "Pagaron", value: 285 }, { name: "Faltan", value: 115 }];
const papeleriaData = [{ name: "Cumple",  value: 300 }, { name: "Pendiente", value: 100 }];
const pensionData = [
  { mes: "Ene", pagados: 370, pendientes: 30 },
  { mes: "Feb", pagados: 345, pendientes: 55 },
  { mes: "Mar", pagados: 310, pendientes: 90 },
  { mes: "Abr", pagados: 290, pendientes: 110 },
  { mes: "May", pagados: 260, pendientes: 140 },
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

const TesoreroDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [sw, setSw] = useState({ matricula: "bar", papeleria: "bar", pension: "bar" });
  const toggle = (key, val) => setSw(p => ({ ...p, [key]: val }));

  const menuItems = [
    { label: "Dashboard",      icon: <Home /> },
    { label: "Notificaciones", icon: <Bell /> },
    { label: "Matrícula",      icon: <CreditCard /> },
    { label: "Pensión",        icon: <Calendar /> },
    { label: "Papelería",      icon: <FileText /> },
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
                <h1>Dashboard — Tesorería</h1>
                <p>Control de pagos y estado financiero del año escolar</p>
              </div>
              <span className="dash-welcome-badge">Tesorero</span>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
              {[
                { label: "Estudiantes totales",  value: 400, color: C.activo,    icon: <CheckCircle size={18} /> },
                { label: "Matrícula pagada",      value: 285, color: C.cumple,    icon: <CheckCircle size={18} />, delta: "71%" },
                { label: "Matrícula pendiente",   value: 115, color: C.pendiente, icon: <AlertCircle size={18} /> },
                { label: "Mora crítica",          value: 18,  color: C.mora,      icon: <AlertTriangle size={18} /> },
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

            {/* Matrícula y Papelería */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Matrícula y Papelería</h2>
              </div>
              <div className="charts-grid">
                {[{ key: "matricula", title: "Estado Matrícula", data: matriculaData, colors: [C.cumple, C.pendiente] },
                  { key: "papeleria", title: "Estado Papelería", data: papeleriaData, colors: [C.cumple, C.pendiente] },
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

            {/* Pensión mensual */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Pensión — Evolución Mensual</h2>
              </div>
              <div className="chart-card">
                <div className="chart-card-header">
                  <h3 className="chart-card-title">Pagados vs Pendientes por Mes</h3>
                  <ChartSwitch value={sw.pension} onChange={v => toggle("pension", v)} />
                </div>
                {sw.pension === "bar" ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={pensionData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
                      <XAxis dataKey="mes" tick={{ fontSize: 12, fontFamily: "Lato" }} />
                      <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontFamily: "Lato", fontSize: 12 }} />
                      <Bar dataKey="pagados" name="Pagados" fill={C.cumple} radius={[5,5,0,0]} />
                      <Bar dataKey="pendientes" name="Pendientes" fill={C.pendiente} radius={[5,5,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={pensionData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
                      <XAxis dataKey="mes" tick={{ fontSize: 12, fontFamily: "Lato" }} />
                      <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontFamily: "Lato", fontSize: 12 }} />
                      <Line type="monotone" dataKey="pagados" name="Pagados" stroke={C.cumple} strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="pendientes" name="Pendientes" stroke={C.pendiente} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </div>
        </ModuleLayout>
      </div>
    </div>
  );
};

export default TesoreroDashboard;
