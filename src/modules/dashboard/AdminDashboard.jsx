// AdminDashboard.jsx — Dashboard del Administrador
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import { useState } from "react";
import { Home, Users, DollarSign, BookOpen, Music, Shirt, Settings } from "lucide-react";
import "./Dashboard.css";

// ── DATOS MOCK — se reemplazarán por llamadas al API ──
const estudiantesData = [
  { name: "Activos", value: 380 },
  { name: "Inactivos", value: 45 },
];

const pazySalvoGlobalData = [
  { name: "Cumple requisitos", value: 265 },
  { name: "Pendientes", value: 115 },
];

const matriculaData = [
  { name: "Pagaron", value: 285 },
  { name: "Faltan", value: 115 },
];

const pensionMensualData = [
  { mes: "Ene", pagados: 370, pendientes: 55 },
  { mes: "Feb", pagados: 340, pendientes: 85 },
  { mes: "Mar", pagados: 310, pendientes: 115 },
  { mes: "Abr", pagados: 290, pendientes: 135 },
  { mes: "May", pagados: 260, pendientes: 165 },
  { mes: "Jun", pagados: 0, pendientes: 0 },
  { mes: "Jul", pagados: 0, pendientes: 0 },
  { mes: "Ago", pagados: 0, pendientes: 0 },
  { mes: "Sep", pagados: 0, pendientes: 0 },
  { mes: "Oct", pagados: 0, pendientes: 0 },
  { mes: "Nov", pagados: 0, pendientes: 0 },
];

const bandaData = [
  { name: "Asignados", value: 48 },
  { name: "Disponibles", value: 12 },
];

const uniformeData = [
  { name: "Asignadas", value: 210 },
  { name: "Disponibles", value: 65 },
  { name: "Devueltas", value: 150 },
];

const salonData = [
  { grado: "1°", pupitresCumple: 55, pupitresPend: 10, pruebasCumple: 50, pruebasPend: 15 },
  { grado: "2°", pupitresCumple: 60, pupitresPend: 5,  pruebasCumple: 55, pruebasPend: 10 },
  { grado: "3°", pupitresCumple: 48, pupitresPend: 12, pruebasCumple: 45, pruebasPend: 15 },
  { grado: "4°", pupitresCumple: 52, pupitresPend: 8,  pruebasCumple: 50, pruebasPend: 10 },
  { grado: "5°", pupitresCumple: 45, pupitresPend: 15, pruebasCumple: 43, pruebasPend: 17 },
  { grado: "6°", pupitresCumple: 58, pupitresPend: 7,  pruebasCumple: 55, pruebasPend: 10 },
];

const COLORS = {
  cumple:    "#2E7D4F",
  pendiente: "#8E2A25",
  activo:    "#1B3A5C",
  inactivo:  "#C9B99A",
  azul:      "#2E5FA7",
  amarillo:  "#A06000",
};

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard",       icon: <Home /> },
    { label: "Titulares",       icon: <Users /> },
    { label: "Estudiantes",     icon: <BookOpen /> },
    { label: "Tesorería",       icon: <DollarSign /> },
    { label: "Salón",           icon: <BookOpen /> },
    { label: "Banda",           icon: <Music /> },
    { label: "Uniformes",       icon: <Shirt /> },
    { label: "Parametrización", icon: <Settings /> },
  ];

  return (
    <div className="dashboard-page">
      <Header title="SISTEMA DE PAZ Y SALVO - NEW CAMBRIDGE SCHOOL" />
      <div className="dashboard-body">
        <ModuleLayout
          sidebar={
            <Sidebar
              menuItems={menuItems}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              user={user}
              logout={logout}
            />
          }
        >
          <div className="dashboard-content">

            {/* ── KPIs GLOBALES ── */}
            <div className="kpi-grid">
              <div className="kpi-card" style={{ "--kpi-color": COLORS.activo }}>
                <span className="kpi-card-value">425</span>
                <span className="kpi-card-label">Estudiantes totales</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.cumple }}>
                <span className="kpi-card-value">265</span>
                <span className="kpi-card-label">Paz y salvo al día</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.pendiente }}>
                <span className="kpi-card-value">115</span>
                <span className="kpi-card-label">Paz y salvo pendiente</span>
              </div>
              <div className="kpi-card" style={{ "--kpi-color": COLORS.amarillo }}>
                <span className="kpi-card-value">45</span>
                <span className="kpi-card-label">Estudiantes inactivos</span>
              </div>
            </div>

            {/* ── SECCIÓN 1: PAZ Y SALVO GLOBAL ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Estado Global de Paz y Salvo</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Paz y Salvo General</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pazySalvoGlobalData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderCustomLabel}>
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.pendiente} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Cumple ({pazySalvoGlobalData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.pendiente }} />Pendiente ({pazySalvoGlobalData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Estudiantes Activos / Inactivos</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={estudiantesData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderCustomLabel}>
                        <Cell fill={COLORS.activo} />
                        <Cell fill={COLORS.inactivo} />
                      </Pie>
                      <Tooltip formatter={(v) => `${v} estudiantes`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.activo }} />Activos ({estudiantesData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.inactivo }} />Inactivos ({estudiantesData[1].value})</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── SECCIÓN 2: TESORERÍA ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Tesorería</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Matrícula</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={matriculaData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderCustomLabel}>
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

                <div className="chart-card chart-card-full">
                  <h3 className="chart-card-title">Pensión — Evolución Mensual</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={pensionMensualData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="mes" tick={{ fontSize: 12, fontFamily: "Lato, sans-serif" }} />
                      <YAxis tick={{ fontSize: 12, fontFamily: "Lato, sans-serif" }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pagados" name="Pagados" stroke={COLORS.cumple} strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="pendientes" name="Pendientes" stroke={COLORS.pendiente} strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </div>

            {/* ── SECCIÓN 3: SALÓN ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Salón — Pupitres y Pruebas por Grado</h2>
              <div className="charts-grid">
                <div className="chart-card chart-card-full">
                  <h3 className="chart-card-title">Estado por Grado</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={salonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                      <XAxis dataKey="grado" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pupitresCumple" name="Pupitres ✓" fill={COLORS.cumple} radius={[4,4,0,0]} />
                      <Bar dataKey="pupitresPend"   name="Pupitres ⏳" fill="#A8D5B5" radius={[4,4,0,0]} />
                      <Bar dataKey="pruebasCumple"  name="Pruebas ✓" fill={COLORS.azul} radius={[4,4,0,0]} />
                      <Bar dataKey="pruebasPend"    name="Pruebas ⏳" fill="#C9D8EE" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ── SECCIÓN 4: BANDA Y UNIFORMES ── */}
            <div className="dash-section">
              <h2 className="dash-section-title">Banda y Uniformes</h2>
              <div className="charts-grid">

                <div className="chart-card">
                  <h3 className="chart-card-title">Instrumentos de Banda</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={bandaData} cx="50%" cy="50%"
                        outerRadius={100} innerRadius={55}
                        dataKey="value" labelLine={false} label={renderCustomLabel}>
                        <Cell fill={COLORS.amarillo} />
                        <Cell fill={COLORS.inactivo} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.amarillo }} />Asignados ({bandaData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.inactivo }} />Disponibles ({bandaData[1].value})</span>
                  </div>
                </div>

                <div className="chart-card">
                  <h3 className="chart-card-title">Inventario de Uniformes</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={uniformeData} cx="50%" cy="50%"
                        outerRadius={100} dataKey="value"
                        labelLine={false} label={renderCustomLabel}>
                        <Cell fill={COLORS.activo} />
                        <Cell fill={COLORS.cumple} />
                        <Cell fill={COLORS.inactivo} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.activo }} />Asignadas ({uniformeData[0].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.cumple }} />Disponibles ({uniformeData[1].value})</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: COLORS.inactivo }} />Devueltas ({uniformeData[2].value})</span>
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

export default AdminDashboard;
