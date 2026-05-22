// UniformeDashboard.jsx — Dashboard del Titular de Uniformes
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import { useState } from "react";
import { Home, Shirt, RotateCcw, CheckCircle, Package } from "lucide-react";
import "./Dashboard.css";

// ── DATOS MOCK ──
const inventarioData = [
  { name: "Asignadas",   value: 210 },
  { name: "Disponibles", value: 65 },
  { name: "Devueltas",   value: 150 },
];

const pazySalvoUniformeData = [
  { name: "Cumple",    value: 330 },
  { name: "Pendiente", value: 95 },
];

const prendasPorTipoData = [
  { prenda: "Camisa",         total: 120, disponibles: 30 },
  { prenda: "Pantalón",       total: 110, disponibles: 25 },
  { prenda: "Chaqueta Gala",  total: 85,  disponibles: 15 },
  { prenda: "Zapatos",        total: 95,  disponibles: 20 },
  { prenda: "Corbata",        total: 105, disponibles: 40 },
];

const COLORS = {
  cumple:    "#2E7D4F",
  pendiente: "#8E2A25",
  activo:    "#1B3A5C",
  inactivo:  "#C9B99A",
  morado:    "#5B2D8E",
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

const UniformeDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard",      icon: <Home /> },
    { label: "Inv. de Prendas",icon: <Package /> },
    { label: "Asignaciones",   icon: <Shirt /> },
    { label: "Devoluciones",   icon: <RotateCcw /> },
    { label: "Paz y Salvo",    icon: <CheckCircle /> },
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
              <div className="kpi-card" style={{ "--kpi-color": COLORS.morado }}>
                <span className="kpi-card-value">425</span>
                <span className="kpi-card-label">Prendas totales</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.pendiente }}>
                <span className="kpi-card-value">210</span>
                <span className="kpi-card-label">Asignadas</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.cumple }}>
                <span className="kpi-card-value">65</span>
                <span className="kpi-card-label">Disponibles</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.activo }}>
                <span className="kpi-card-value">150</span>
                <span className="kpi-card-label">Devueltas</span>
              </div>
            </div>

            {/* ── GRÁFICAS ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Estado de Uniformes y Paz y Salvo</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Estado del Inventario</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={inventarioData} cx="50%" cy="50%"
                        outerRadius={100} dataKey="value"
                        labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.pendiente} />
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.inactivo} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Asignadas ({inventarioData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Disponibles ({inventarioData[1].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.inactivo }} />Devueltas ({inventarioData[2].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Paz y Salvo — Uniformes</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pazySalvoUniformeData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Cumple ({pazySalvoUniformeData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({pazySalvoUniformeData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card chart-card-full">
                  <h3 className="chart-card-title">Prendas Totales vs Disponibles por Tipo</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={prendasPorTipoData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="prenda" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total"       name="Total"       fill={COLORS.morado}  radius={[4,4,0,0]} />
                      <Bar dataKey="disponibles" name="Disponibles" fill={COLORS.cumple}  radius={[4,4,0,0]} />
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

export default UniformeDashboard;
