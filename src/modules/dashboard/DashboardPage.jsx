import { useState } from "react";
import { BarChart2, Users, FileCheck, AlertTriangle, LayoutDashboard } from "lucide-react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";
import ModuleLayout from "../../components/layout/ModuleLayout";
import { useAuth } from "../../api/useAuth";
import { useDashboard } from "../../hooks/useDashboard";
import { Home } from "lucide-react";
import salonIcon from "../../assets/Salon/salon.svg";
import tesoreriaIcon from "../../assets/Tesoreria/tesoreria.svg";
import bandaIcon from "../../assets/Banda/banda.svg";
import uniformesIcon from "../../assets/Objetos/objetos.svg";
import DashboardIcon from "../../assets/Parametrizacion/parametrizacion.svg";
import rectoriaIcon from "../../assets/Rectoria/estudiante.svg";
import paraIcon from "../../assets/Parametrizacion/parametrizacion.svg";
import "./DashboardPage.css";

// ── Mini chart components (SVG puro, sin dependencias externas) ───────────────

function BarChartSVG({ data, colors }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const H = 120;
  const barW = Math.max(20, Math.floor(240 / data.length) - 8);
  return (
    <svg width="100%" viewBox={`0 0 ${data.length * (barW + 8)} ${H + 30}`} className="db-svg-chart">
      {data.map((d, i) => {
        const h = Math.max(4, (d.value / max) * H);
        const x = i * (barW + 8);
        const y = H - h;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={h} fill={colors[i % colors.length]} rx="4" />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" fontSize="10" fill="#666">
              {d.label.length > 6 ? d.label.slice(0, 6) + "…" : d.label}
            </text>
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutSVG({ segments, size = 110 }) {
  const r = 38;
  const cx = size / 2;
  const cy = size / 2;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let startAngle = -90;
  const slices = segments.map((s) => {
    const angle = (s.value / total) * 360;
    const start = startAngle;
    startAngle += angle;
    return { ...s, startAngle: start, angle };
  });
  const toXY = (angle, radius) => [
    cx + radius * Math.cos((angle * Math.PI) / 180),
    cy + radius * Math.sin((angle * Math.PI) / 180),
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => {
        if (s.angle === 0) return null;
        const [x1, y1] = toXY(s.startAngle, r);
        const [x2, y2] = toXY(s.startAngle + s.angle, r);
        const large = s.angle > 180 ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
        return <path key={i} d={path} fill={s.color} opacity="0.9" />;
      })}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="white" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">
        {total}
      </text>
    </svg>
  );
}

// ── Tarjeta KPI ───────────────────────────────────────────────────────────────
function KpiCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="db-kpi" style={{ "--accent": accent }}>
      <div className="db-kpi-icon">
        <Icon size={22} />
      </div>
      <div>
        <p className="db-kpi-val">{value ?? "—"}</p>
        <p className="db-kpi-label">{label}</p>
      </div>
    </div>
  );
}

// ── Tarjeta de gráfica con switch opcional ────────────────────────────────────
function ChartCard({ title, showSwitch = false, bar, donut, defaultType = "donut" }) {
  const [type, setType] = useState(defaultType);
  return (
    <div className="db-chart-card">
      <div className="db-chart-header">
        <span className="db-chart-title">{title}</span>
        {showSwitch && (
          <div className="db-switch">
            <button
              className={type === "donut" ? "active" : ""}
              onClick={() => setType("donut")}
            >
              Dona
            </button>
            <button
              className={type === "bar" ? "active" : ""}
              onClick={() => setType("bar")}
            >
              Barras
            </button>
          </div>
        )}
      </div>
      <div className="db-chart-body">
        {type === "donut" ? donut : bar}
      </div>
    </div>
  );
}

// ── Leyenda ───────────────────────────────────────────────────────────────────
function Legend({ items }) {
  return (
    <ul className="db-legend">
      {items.map((item) => (
        <li key={item.label}>
          <span className="db-legend-dot" style={{ background: item.color }} />
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </li>
      ))}
    </ul>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="db-skeleton">
      {[...Array(4)].map((_, i) => <div key={i} className="db-skel-card" />)}
      {[...Array(3)].map((_, i) => <div key={i} className="db-skel-chart" />)}
    </div>
  );
}

// ── Paleta ────────────────────────────────────────────────────────────────────
const ROJO = "#8e2a25";
const AZUL = "#1B3A5C";
const VERDE = "#2e7d52";
const NARANJA = "#c46a00";
const GRIS = "#bdbdbd";
const PALETA = [ROJO, AZUL, VERDE, NARANJA, "#6d4c9e", "#00838f"];

// ── Página principal ──────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const { periodos, periodoSeleccionado, setPeriodoSeleccionado, data, loading, error } = useDashboard();

  const menuItems = [
    { label: "Inicio",         icon: <Home size={24} /> },
    { label: "Dashboard",      icon: DashboardIcon },
    { label: "Salón",          icon: salonIcon },
    { label: "Tesorería",      icon: tesoreriaIcon },
    { label: "Rectoría",       icon: rectoriaIcon },
    { label: "Uniformes",      icon: uniformesIcon },
    { label: "Banda",          icon: bandaIcon },
    { label: "Parametrización",icon: paraIcon },
  ];

  // ── Datos procesados para gráficas ─────────────────────────────────────────
  const pazSalvoSegs = data
    ? [
        { label: "Firmados",   value: data.pazSalvo.firmados,   color: VERDE },
        { label: "Pendientes", value: data.pazSalvo.pendientes, color: ROJO },
      ]
    : [];

  const pazSalvoBar = data
    ? [
        { label: "Firmados",   value: data.pazSalvo.firmados,   color: VERDE },
        { label: "Pendientes", value: data.pazSalvo.pendientes, color: ROJO },
      ]
    : [];

  const tesoreriaSegs = data
    ? [
        { label: "Al día",     value: data.tesoreria.pagados,    color: VERDE },
        { label: "Pendiente",  value: data.tesoreria.pendientes, color: NARANJA },
      ]
    : [];

  const bandaSegs = data
    ? [
        { label: "Disponibles", value: data.banda.disponibles, color: AZUL },
        { label: "Prestados",   value: data.banda.prestados,   color: ROJO },
      ]
    : [];

  const bandaCatBar = data
    ? Object.entries(data.banda.categorias).map(([k, v], i) => ({
        label: k,
        value: v,
        color: PALETA[i % PALETA.length],
      }))
    : [];

  const firmasBar = data
    ? Object.entries(data.pazSalvo.firmaModulos).map(([k, v], i) => ({
        label: k.charAt(0).toUpperCase() + k.slice(1),
        value: v,
        color: PALETA[i % PALETA.length],
      }))
    : [];

  const uniformesSegs = data
    ? [
        { label: "Disponibles",      value: data.uniformes.disponibles,     color: VERDE },
        { label: "Préstamos activos", value: data.uniformes.prestamosActivos, color: NARANJA },
      ]
    : [];

  return (
    <div className="db-root">
      <Header title="DASHBOARD — NEW CAMBRIDGE SCHOOL" />
      <ModuleLayout
        sidebar={
          <Sidebar
            menuItems={menuItems}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            user={user}
          />
        }
      >
        <div className="db-content">

          {/* ── Filtro de periodo ─────────────────────────────────────── */}
          <div className="db-topbar">
            <div className="db-topbar-left">
              <BarChart2 size={20} color={ROJO} />
              <span>Resumen general</span>
            </div>
            <div className="db-topbar-right">
              <label htmlFor="periodo-select">Periodo académico</label>
              <select
                id="periodo-select"
                value={periodoSeleccionado ?? ""}
                onChange={(e) => setPeriodoSeleccionado(Number(e.target.value))}
              >
                {periodos.map((p) => (
                  <option key={p.id_periodo} value={p.id_periodo}>
                    {p.nombre}{p.activo ? " ✓" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="db-error">{error}</div>}

          {loading ? <Skeleton /> : data && (
            <div className="db-bento">

              {/* ── Fila 1: KPIs ──────────────────────────────────────── */}
              <div className="db-row db-kpi-row">
                <KpiCard label="Estudiantes" value={data.kpis.totalEstudiantes} icon={Users} accent={AZUL} />
                <KpiCard label="Paz y Salvo firmados" value={data.kpis.pazSalvoFirmados} icon={FileCheck} accent={VERDE} />
                <KpiCard label="Pendientes firma" value={data.kpis.pazSalvoPendientes} icon={AlertTriangle} accent={ROJO} />
                <KpiCard label="Salones activos" value={data.kpis.totalSalones} icon={LayoutDashboard} accent={NARANJA} />
              </div>

              {/* ── Fila 2: Paz y Salvo + Tesorería + Banda ───────────── */}
              <div className="db-row db-charts-row">

                {/* Paz y Salvo – con switch dona / barras */}
                <ChartCard
                  title="Paz y Salvo"
                  showSwitch
                  defaultType="donut"
                  donut={
                    <div className="db-chart-inner">
                      <DonutSVG segments={pazSalvoSegs} size={120} />
                      <Legend items={[
                        { label: "Firmados",   value: data.pazSalvo.firmados,   color: VERDE },
                        { label: "Pendientes", value: data.pazSalvo.pendientes, color: ROJO },
                      ]} />
                    </div>
                  }
                  bar={
                    <BarChartSVG data={pazSalvoBar} colors={[VERDE, ROJO]} />
                  }
                />

                {/* Tesorería – solo dona */}
                <ChartCard
                  title="Pagos Tesorería"
                  showSwitch={false}
                  defaultType="donut"
                  donut={
                    <div className="db-chart-inner">
                      <DonutSVG segments={tesoreriaSegs} size={120} />
                      <Legend items={[
                        { label: "Al día",     value: data.tesoreria.pagados,    color: VERDE },
                        { label: "Pendiente",  value: data.tesoreria.pendientes, color: NARANJA },
                      ]} />
                    </div>
                  }
                />

                {/* Banda – con switch dona / barras por categoría */}
                <ChartCard
                  title="Instrumentos Banda"
                  showSwitch
                  defaultType="donut"
                  donut={
                    <div className="db-chart-inner">
                      <DonutSVG segments={bandaSegs} size={120} />
                      <Legend items={[
                        { label: "Disponibles", value: data.banda.disponibles, color: AZUL },
                        { label: "Prestados",   value: data.banda.prestados,   color: ROJO },
                      ]} />
                    </div>
                  }
                  bar={
                    bandaCatBar.length > 0
                      ? <BarChartSVG data={bandaCatBar} colors={PALETA} />
                      : <p className="db-empty">Sin categorías registradas</p>
                  }
                />
              </div>

              {/* ── Fila 3: Pendientes por módulo (barras) + Uniformes ── */}
              <div className="db-row db-bottom-row">

                {/* Pendientes por módulo – solo barras, ocupa 2 columnas */}
                <div className="db-chart-card db-wide">
                  <div className="db-chart-header">
                    <span className="db-chart-title">Firmas pendientes por módulo</span>
                  </div>
                  <div className="db-chart-body">
                    {firmasBar.length > 0
                      ? <BarChartSVG data={firmasBar} colors={PALETA} />
                      : <p className="db-empty">Todos los módulos al día ✓</p>
                    }
                  </div>
                </div>

                {/* Uniformes */}
                <ChartCard
                  title="Uniformes / Objetos"
                  showSwitch={false}
                  defaultType="donut"
                  donut={
                    <div className="db-chart-inner">
                      <DonutSVG segments={uniformesSegs} size={120} />
                      <Legend items={[
                        { label: "Disponibles",      value: data.uniformes.disponibles,     color: VERDE },
                        { label: "Préstamos activos", value: data.uniformes.prestamosActivos, color: NARANJA },
                      ]} />
                    </div>
                  }
                />
              </div>

            </div>
          )}
        </div>
      </ModuleLayout>
    </div>
  );
}
