// TitularDashboard.jsx — Dashboard del Titular de Salón
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import { useState } from "react";
import { Home, BookOpen, ClipboardList, Library } from "lucide-react";
import "./Dashboard.css";

// ── DATOS MOCK ──
const pupitresData = [
  { name: "Pagados", value: 28 },
  { name: "Pendientes", value: 7 },
];

const pruebasData = [
  { name: "Cumple", value: 25 },
  { name: "Pendiente", value: 10 },
];

const bibliotecaData = [
  { name: "Entregados", value: 30 },
  { name: "Faltantes", value: 5 },
];

const pazySalvoGrupoData = [
  { name: "Cumple", value: 22 },
  { name: "Pendiente", value: 13 },
];

const COLORS = {
  cumple:    "#2E7D4F",
  pendiente: "#8E2A25",
  activo:    "#1B3A5C",
  inactivo:  "#C9B99A",
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

const TitularDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard",  icon: <Home /> },
    { label: "Pupitres",   icon: <ClipboardList /> },
    { label: "Pruebas",    icon: <BookOpen /> },
    { label: "Biblioteca", icon: <Library /> },
  ];

  // contexto del grupo — vendrá del JWT
  const grupo = user?.grupo ?? "Sexto A";
  const anio  = user?.anio  ?? "2025-2026";

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

            {/* ── CONTEXTO ── */}
            <div style={{ marginBottom: "var(--space-5)", padding: "var(--space-3) var(--space-4)", background: "var(--color-info-bg)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-info)" }}>
              📚 Grupo activo: <strong>{grupo}</strong> · Año escolar: <strong>{anio}</strong>
            </div>

            {/* ── KPIs ── */}
            <div className="kpi-grid">
              <div className="kpi-card" style={{ "--kpi-color": COLORS.activo }}>
                <span className="kpi-card-value">35</span>
                <span className="kpi-card-label">Total estudiantes</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.cumple }}>
                <span className="kpi-card-value">22</span>
                <span className="kpi-card-label">Paz y salvo al día</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.pendiente }}>
                <span className="kpi-card-value">13</span>
                <span className="kpi-card-label">Con pendientes</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.azul }}>
                <span className="kpi-card-value">63%</span>
                <span className="kpi-card-label">% al día</span>
              </div>
            </div>

            {/* ── GRÁFICAS ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Estado del Grupo — {grupo}</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Paz y Salvo General del Grupo</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pazySalvoGrupoData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Cumple ({pazySalvoGrupoData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({pazySalvoGrupoData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Pupitres</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pupitresData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Pagados ({pupitresData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendientes ({pupitresData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Pruebas Institucionales</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pruebasData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.azul} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.azul }} />Cumple ({pruebasData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({pruebasData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Biblioteca</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={bibliotecaData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill="#A06000" />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Entregados ({bibliotecaData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: "#A06000" }} />Faltantes ({bibliotecaData[1].value})</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </ModuleLayout>
      </div>
    </div>
  );
};

export default TitularDashboard;
