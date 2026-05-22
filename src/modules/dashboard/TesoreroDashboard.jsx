// TesoreroDashboard.jsx — Dashboard del Tesorero
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import { useState } from "react";
import { Home, CreditCard, Calendar, FileText, Bell } from "lucide-react";
import "./Dashboard.css";

// ── DATOS MOCK ──
const matriculaData = [
  { name: "Pagaron", value: 285 },
  { name: "Faltan",  value: 115 },
];

const papeleriaData = [
  { name: "Cumple",    value: 300 },
  { name: "Pendiente", value: 100 },
];

const pensionData = [
  { mes: "Ene", pagados: 370, pendientes: 30 },
  { mes: "Feb", pagados: 345, pendientes: 55 },
  { mes: "Mar", pagados: 310, pendientes: 90 },
  { mes: "Abr", pagados: 290, pendientes: 110 },
  { mes: "May", pagados: 260, pendientes: 140 },
  { mes: "Jun", pagados: 0,   pendientes: 0 },
  { mes: "Jul", pagados: 0,   pendientes: 0 },
  { mes: "Ago", pagados: 0,   pendientes: 0 },
  { mes: "Sep", pagados: 0,   pendientes: 0 },
  { mes: "Oct", pagados: 0,   pendientes: 0 },
  { mes: "Nov", pagados: 0,   pendientes: 0 },
];

const COLORS = {
  cumple:    "#2E7D4F",
  pendiente: "#8E2A25",
  activo:    "#1B3A5C",
  mora:      "#A06000",
};

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: "13px", fontWeight: "bold" }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TesoreroDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

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
        <ModuleLayout
          sidebar={
            <Sidebar menuItems={menuItems} selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} user={user} logout={logout} />
          }
        >
          <div className="dashboard-content">

            {/* ── KPIs ── */}
            <div className="kpi-grid">
              <div className="kpi-card" style={{ "--kpi-color": COLORS.activo }}>
                <span className="kpi-card-value">400</span>
                <span className="kpi-card-label">Estudiantes totales</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.cumple }}>
                <span className="kpi-card-value">285</span>
                <span className="kpi-card-label">Matrícula pagada</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.pendiente }}>
                <span className="kpi-card-value">115</span>
                <span className="kpi-card-label">Matrícula pendiente</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.mora }}>
                <span className="kpi-card-value">18</span>
                <span className="kpi-card-label">Mora crítica</span>
              </div>
            </div>

            {/* ── MATRÍCULA Y PAPELERÍA ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Matrícula y Papelería</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Estado Matrícula</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={matriculaData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Pagaron ({matriculaData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Faltan ({matriculaData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Estado Papelería</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={papeleriaData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Cumple ({papeleriaData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({papeleriaData[1].value})</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── PENSIÓN MENSUAL ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Pensión — Evolución Mensual</h2>
              <div className="charts-grid">
                <div className="chart-card chart-card-full">
                  <h3 className="chart-card-title">Pagados vs Pendientes por Mes</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={pensionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pagados"    name="Pagados"    stroke={COLORS.cumple}    strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="pendientes" name="Pendientes" stroke={COLORS.pendiente} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        </ModuleLayout>
      </div>
    </div>
  );
};

export default TesoreroDashboard;
