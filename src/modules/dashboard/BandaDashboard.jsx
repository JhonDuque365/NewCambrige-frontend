// BandaDashboard.jsx — Dashboard del Titular de Banda
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import { useState } from "react";
import { Home, Music, RotateCcw, CheckCircle } from "lucide-react";
import "./Dashboard.css";

// ── DATOS MOCK ──
const instrumentosEstadoData = [
  { name: "Asignados",      value: 48 },
  { name: "Disponibles",    value: 12 },
  { name: "Mantenimiento",  value: 5 },
];

const pazySalvoBandaData = [
  { name: "Cumple", value: 40 },
  { name: "Pendiente", value: 13 },
];

const devolucionesPorTipoData = [
  { tipo: "Trompeta",   asignados: 12, devueltos: 3 },
  { tipo: "Clarinete",  asignados: 10, devueltos: 1 },
  { tipo: "Tambor",     asignados: 8,  devueltos: 2 },
  { tipo: "Flauta",     asignados: 9,  devueltos: 0 },
  { tipo: "Saxofón",    asignados: 9,  devueltos: 4 },
];

const COLORS = {
  cumple:       "#2E7D4F",
  pendiente:    "#8E2A25",
  amarillo:     "#A06000",
  inactivo:     "#C9B99A",
  mantenimiento:"#E67E22",
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

const BandaDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

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
        <ModuleLayout
          sidebar={
            <Sidebar menuItems={menuItems} selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} user={user} logout={logout} />
          }
        >
          <div className="dashboard-content">

            {/* ── KPIs ── */}
            <div className="kpi-grid">
              <div className="kpi-card" style={{ "--kpi-color": "#A06000" }}>
                <span className="kpi-card-value">65</span>
                <span className="kpi-card-label">Total instrumentos</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.pendiente }}>
                <span className="kpi-card-value">48</span>
                <span className="kpi-card-label">Asignados</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.cumple }}>
                <span className="kpi-card-value">12</span>
                <span className="kpi-card-label">Disponibles</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.mantenimiento }}>
                <span className="kpi-card-value">5</span>
                <span className="kpi-card-label">En mantenimiento</span>
              </div>
            </div>

            {/* ── GRÁFICAS ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Estado de Instrumentos y Paz y Salvo</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Estado del Inventario</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={instrumentosEstadoData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.amarillo} />
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.mantenimiento} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.amarillo }} />Asignados ({instrumentosEstadoData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Disponibles ({instrumentosEstadoData[1].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.mantenimiento }} />Mantenimiento ({instrumentosEstadoData[2].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Paz y Salvo — Banda</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pazySalvoBandaData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Cumple ({pazySalvoBandaData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({pazySalvoBandaData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card chart-card-full">
                  <h3 className="chart-card-title">Instrumentos Asignados vs Devoluciones Pendientes por Tipo</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={devolucionesPorTipoData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="tipo" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="asignados" name="Asignados"  fill={COLORS.amarillo}  radius={[4,4,0,0]} />
                      <Bar dataKey="devueltos" name="Devueltos"  fill={COLORS.cumple}    radius={[4,4,0,0]} />
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

export default BandaDashboard;
