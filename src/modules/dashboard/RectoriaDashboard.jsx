// RectoriaDashboard.jsx — Dashboard de Rectoría
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import { useState } from "react";
import { Home, GraduationCap, Users, FileCheck } from "lucide-react";
import "./Dashboard.css";

// ── DATOS MOCK ──
const pazySalvoEstudiantesData = [
  { name: "Cumple",    value: 290 },
  { name: "Pendiente", value: 110 },
];

const pazySalvoDocentesData = [
  { name: "Cumple",    value: 18 },
  { name: "Pendiente", value: 6 },
];

const pendientesPorModuloData = [
  { modulo: "Tesorería",  estudiantes: 85,  docentes: 3 },
  { modulo: "Salón",      estudiantes: 60,  docentes: 2 },
  { modulo: "Banda",      estudiantes: 13,  docentes: 0 },
  { modulo: "Uniformes",  estudiantes: 95,  docentes: 1 },
  { modulo: "Biblioteca", estudiantes: 40,  docentes: 4 },
];

const COLORS = {
  cumple:    "#2E7D4F",
  pendiente: "#8E2A25",
  activo:    "#1B3A5C",
  azul:      "#2E5FA7",
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

const RectoriaDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard",         icon: <Home /> },
    { label: "Paz y Salvo Est.",  icon: <GraduationCap /> },
    { label: "Paz y Salvo Doc.",  icon: <Users /> },
    { label: "Reportes",          icon: <FileCheck /> },
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
                <span className="kpi-card-value">290</span>
                <span className="kpi-card-label">Est. con paz y salvo</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.pendiente }}>
                <span className="kpi-card-value">110</span>
                <span className="kpi-card-label">Est. con pendientes</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.azul }}>
                <span className="kpi-card-value">24</span>
                <span className="kpi-card-label">Docentes totales</span>
              </div>
            </div>

            {/* ── SECCIÓN PAZ Y SALVO ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Estado de Paz y Salvo</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Estudiantes</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pazySalvoEstudiantesData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Cumple ({pazySalvoEstudiantesData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({pazySalvoEstudiantesData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Docentes Titulares</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pazySalvoDocentesData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} docentes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Cumple ({pazySalvoDocentesData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({pazySalvoDocentesData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card chart-card-full">
                  <h3 className="chart-card-title">Pendientes por Módulo — Estudiantes vs Docentes</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={pendientesPorModuloData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="modulo" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="estudiantes" name="Estudiantes" fill={COLORS.pendiente} radius={[4,4,0,0]} />
                      <Bar dataKey="docentes"    name="Docentes"    fill={COLORS.azul}      radius={[4,4,0,0]} />
                    </BarChart>
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

export default RectoriaDashboard;
