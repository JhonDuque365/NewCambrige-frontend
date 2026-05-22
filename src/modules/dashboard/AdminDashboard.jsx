// AdminDashboard.jsx — Rediseño estilo Vento con switch de gráficas
import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line
} from "recharts";
import { BarChart2, PieChart as PieIcon, Users, CheckCircle, AlertCircle, BookOpen, Music, Shirt, DollarSign, Settings, Home, ShieldCheck } from "lucide-react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import "./Dashboard.css";

// ── PALETA ──
const C = {
  cumple:    "#2E7D4F",
  pendiente: "#8E2A25",
  activo:    "#1B3A5C",
  inactivo:  "#C9B99A",
  amarillo:  "#A06000",
  azul:      "#2E5FA7",
  morado:    "#5B2D8E",
};

// ── DATOS MOCK ──
const estudiantesData   = [{ name: "Activos", value: 380 }, { name: "Inactivos", value: 45 }];
const pazySalvoData     = [{ name: "Cumple", value: 265 }, { name: "Pendiente", value: 115 }];
const matriculaData     = [{ name: "Pagaron", value: 285 }, { name: "Faltan", value: 115 }];
const bandaData         = [{ name: "Asignados", value: 48 }, { name: "Disponibles", value: 12 }, { name: "Mantenimiento", value: 5 }];
const uniformeData      = [{ name: "Asignadas", value: 210 }, { name: "Disponibles", value: 65 }, { name: "Devueltas", value: 150 }];

const pensionData = [
  { mes: "Ene", pagados: 370, pendientes: 30 },
  { mes: "Feb", pagados: 345, pendientes: 55 },
  { mes: "Mar", pagados: 310, pendientes: 90 },
  { mes: "Abr", pagados: 290, pendientes: 110 },
  { mes: "May", pagados: 260, pendientes: 140 },
];

const salonData = [
  { grado: "1°", pupitresCumple: 55, pupitresPend: 10, pruebasCumple: 50, pruebasPend: 15 },
  { grado: "2°", pupitresCumple: 60, pupitresPend: 5,  pruebasCumple: 55, pruebasPend: 10 },
  { grado: "3°", pupitresCumple: 48, pupitresPend: 12, pruebasCumple: 45, pruebasPend: 15 },
  { grado: "4°", pupitresCumple: 52, pupitresPend: 8,  pruebasCumple: 50, pruebasPend: 10 },
  { grado: "5°", pupitresCumple: 45, pupitresPend: 15, pruebasCumple: 43, pruebasPend: 17 },
  { grado: "6°", pupitresCumple: 58, pupitresPend: 7,  pruebasCumple: 55, pruebasPend: 10 },
];

// ── TOOLTIP CUSTOM ──
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #C9B99A", borderRadius: 8, padding: "10px 14px", fontFamily: "Lato, sans-serif", fontSize: 13 }}>
      {label && <p style={{ fontWeight: 700, marginBottom: 4, color: "#1A1A1A" }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0" }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

// ── LABEL DONUT ──
const RADIAN = Math.PI / 180;
const DonutLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  return (
    <text x={cx + r * Math.cos(-midAngle * RADIAN)} y={cy + r * Math.sin(-midAngle * RADIAN)}
      fill="white" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 12, fontWeight: 700 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ── SWITCH COMPONENT ──
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

// ── COMPONENTE GRÁFICA DUAL ──
const DualChart = ({ type, barData, barKeys, barColors, donutData, donutColors, height = 260 }) => {
  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
          <XAxis dataKey={Object.keys(barData[0])[0]} tick={{ fontSize: 12, fontFamily: "Lato" }} />
          <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontFamily: "Lato", fontSize: 12 }} />
          {barKeys.map((k, i) => (
            <Bar key={k.key} dataKey={k.key} name={k.name} fill={barColors[i]} radius={[5, 5, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={donutData} cx="50%" cy="50%" outerRadius={100} innerRadius={52}
          dataKey="value" labelLine={false} label={DonutLabel}>
          {donutData.map((_, i) => <Cell key={i} fill={donutColors[i]} />)}
        </Pie>
        <Tooltip formatter={(v, n) => [`${v}`, n]} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// ── DASHBOARD ADMIN ──
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  // switches individuales por card
  const [sw, setSw] = useState({
    pazySalvo:  "bar",
    estudiantes: "bar",
    matricula:  "bar",
    pension:    "bar",
    salon:      "bar",
    banda:      "bar",
    uniforme:   "bar",
  });
  const toggle = (key, val) => setSw(p => ({ ...p, [key]: val }));

  const menuItems = [
    { label: "Dashboard",        icon: <Home /> },
    { label: "Titulares",        icon: <Users /> },
    { label: "Estudiantes",      icon: <BookOpen /> },
    { label: "Tesorería",        icon: <DollarSign /> },
    { label: "Salón",            icon: <BookOpen /> },
    { label: "Banda",            icon: <Music /> },
    { label: "Uniformes",        icon: <Shirt /> },
    { label: "Parametrización",  icon: <Settings /> },
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

            {/* BIENVENIDA */}
            <div className="dash-welcome">
              <div className="dash-welcome-text">
                <h1>Panel de Administración</h1>
                <p>Resumen general del sistema — Año escolar 2025–2026</p>
              </div>
              <span className="dash-welcome-badge">Administrador</span>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
              {[
                { label: "Estudiantes totales", value: 425, color: C.activo,    icon: <Users size={18} />,        delta: null },
                { label: "Paz y salvo al día",  value: 265, color: C.cumple,    icon: <CheckCircle size={18} />,  delta: "62%" },
                { label: "Con pendientes",       value: 115, color: C.pendiente, icon: <AlertCircle size={18} />,  delta: null },
                { label: "Estudiantes inactivos",value: 45,  color: C.amarillo,  icon: <Users size={18} />,        delta: null },
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

            {/* ── SECCIÓN 1: PAZ Y SALVO ── */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Estado Global de Paz y Salvo</h2>
              </div>
              <div className="charts-grid">

                {/* Paz y Salvo */}
                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Paz y Salvo General</h3>
                    <ChartSwitch value={sw.pazySalvo} onChange={v => toggle("pazySalvo", v)} />
                  </div>
                  <DualChart type={sw.pazySalvo}
                    barData={pazySalvoData} barKeys={[{ key: "value", name: "Estudiantes" }]} barColors={[C.cumple]}
                    donutData={pazySalvoData} donutColors={[C.cumple, C.pendiente]} />
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.cumple }} />Cumple (265)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.pendiente }} />Pendiente (115)</span>
                  </div>
                </div>

                {/* Estudiantes Activos */}
                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Estudiantes Activos / Inactivos</h3>
                    <ChartSwitch value={sw.estudiantes} onChange={v => toggle("estudiantes", v)} />
                  </div>
                  <DualChart type={sw.estudiantes}
                    barData={estudiantesData} barKeys={[{ key: "value", name: "Estudiantes" }]} barColors={[C.activo]}
                    donutData={estudiantesData} donutColors={[C.activo, C.inactivo]} />
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.activo }} />Activos (380)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.inactivo }} />Inactivos (45)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── SECCIÓN 2: TESORERÍA ── */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Tesorería</h2>
              </div>
              <div className="charts-grid">

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Matrícula</h3>
                    <ChartSwitch value={sw.matricula} onChange={v => toggle("matricula", v)} />
                  </div>
                  <DualChart type={sw.matricula}
                    barData={matriculaData} barKeys={[{ key: "value", name: "Estudiantes" }]} barColors={[C.cumple]}
                    donutData={matriculaData} donutColors={[C.cumple, C.pendiente]} />
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.cumple }} />Pagaron (285)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.pendiente }} />Faltan (115)</span>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Pensión — Evolución Mensual</h3>
                    <ChartSwitch value={sw.pension} onChange={v => toggle("pension", v)} />
                  </div>
                  {sw.pension === "bar" ? (
                    <ResponsiveContainer width="100%" height={260}>
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
                    <ResponsiveContainer width="100%" height={260}>
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

            {/* ── SECCIÓN 3: SALÓN ── */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Salón — Estado por Grado</h2>
              </div>
              <div className="chart-card">
                <div className="chart-card-header">
                  <h3 className="chart-card-title">Pupitres y Pruebas por Grado</h3>
                  <ChartSwitch value={sw.salon} onChange={v => toggle("salon", v)} />
                </div>
                {sw.salon === "bar" ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={salonData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DC" />
                      <XAxis dataKey="grado" tick={{ fontSize: 12, fontFamily: "Lato" }} />
                      <YAxis tick={{ fontSize: 12, fontFamily: "Lato" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontFamily: "Lato", fontSize: 12 }} />
                      <Bar dataKey="pupitresCumple" name="Pupitres ✓" fill={C.cumple}   radius={[5,5,0,0]} />
                      <Bar dataKey="pupitresPend"   name="Pupitres ⏳" fill="#A8D5B5" radius={[5,5,0,0]} />
                      <Bar dataKey="pruebasCumple"  name="Pruebas ✓"  fill={C.azul}    radius={[5,5,0,0]} />
                      <Bar dataKey="pruebasPend"    name="Pruebas ⏳" fill="#C9D8EE"  radius={[5,5,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={salonData.map(d => ({ name: d.grado, value: d.pupitresCumple + d.pruebasCumple }))}
                        cx="50%" cy="50%" outerRadius={110} innerRadius={55}
                        dataKey="value" label={DonutLabel} labelLine={false}>
                        {salonData.map((_, i) => <Cell key={i} fill={[C.cumple, C.azul, C.activo, C.amarillo, C.morado, C.pendiente][i]} />)}
                      </Pie>
                      <Tooltip formatter={(v, n) => [`${v}`, n]} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* ── SECCIÓN 4: BANDA Y UNIFORMES ── */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Banda y Uniformes</h2>
              </div>
              <div className="charts-grid">

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Instrumentos de Banda</h3>
                    <ChartSwitch value={sw.banda} onChange={v => toggle("banda", v)} />
                  </div>
                  <DualChart type={sw.banda}
                    barData={bandaData} barKeys={[{ key: "value", name: "Instrumentos" }]} barColors={[C.amarillo]}
                    donutData={bandaData} donutColors={[C.amarillo, C.cumple, "#E67E22"]} />
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.amarillo }} />Asignados (48)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.cumple }} />Disponibles (12)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: "#E67E22" }} />Mantenimiento (5)</span>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-card-header">
                    <h3 className="chart-card-title">Inventario de Uniformes</h3>
                    <ChartSwitch value={sw.uniforme} onChange={v => toggle("uniforme", v)} />
                  </div>
                  <DualChart type={sw.uniforme}
                    barData={uniformeData} barKeys={[{ key: "value", name: "Prendas" }]} barColors={[C.morado]}
                    donutData={uniformeData} donutColors={[C.pendiente, C.cumple, C.inactivo]} />
                  <div className="custom-legend">
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.pendiente }} />Asignadas (210)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.cumple }} />Disponibles (65)</span>
                    <span className="legend-item"><span className="legend-dot" style={{ background: C.inactivo }} />Devueltas (150)</span>
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
