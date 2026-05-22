import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import StatCard from '../../components/StatCard/StatCard';
import ChartSwitch from '../../components/ChartSwitch/ChartSwitch';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import './Dashboard.css';

const C = { red: '#8E2A25', dark: '#6B1F1B', blue: '#1B3A5C', green: '#2E7D4F', amber: '#A06000', light: '#B03530' };

const psGlobal   = [{ name: 'Al día', value: 68 }, { name: 'Pendiente', value: 22 }, { name: 'Crítico', value: 10 }];
const psBars     = [{ m: 'Ago', dia: 58, pend: 30, crit: 12 }, { m: 'Sep', dia: 63, pend: 25, crit: 12 }, { m: 'Oct', dia: 68, pend: 22, crit: 10 }, { m: 'Nov', dia: 72, pend: 20, crit: 8 }, { m: 'Dic', dia: 76, pend: 18, crit: 6 }];
const tesorDonut = [{ name: 'Matrícula OK', value: 80 }, { name: 'Pendiente', value: 20 }];
const tesorBars  = [{ m: 'Ago', pag: 60, pen: 40 }, { m: 'Sep', pag: 70, pen: 30 }, { m: 'Oct', pag: 75, pen: 25 }, { m: 'Nov', pag: 80, pen: 20 }];
const bandaD     = [{ name: 'Paz y Salvo', value: 72 }, { name: 'Pendiente', value: 28 }];
const salonBars  = [{ g: '1°', ok: 28, pen: 2 }, { g: '2°', ok: 25, pen: 5 }, { g: '3°', ok: 27, pen: 3 }, { g: '4°', ok: 24, pen: 6 }, { g: '5°', ok: 26, pen: 4 }, { g: '6°', ok: 22, pen: 8 }, { g: '7°', ok: 20, pen: 10 }, { g: '8°', ok: 19, pen: 11 }, { g: '9°', ok: 21, pen: 9 }, { g: '10°', ok: 23, pen: 7 }, { g: '11°', ok: 25, pen: 5 }];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>{`${(percent * 100).toFixed(0)}%`}</text> : null;
};

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Administrador" subtitle="Panel general del sistema">
      {/* KPI CARDS */}
      <div className="db-kpis">
        <StatCard icon="👨‍🎓" label="Estudiantes" value="342" sub="Año 2024-2025" color={C.red} />
        <StatCard icon="👨‍🏫" label="Docentes" value="24" sub="Activos" color={C.blue} />
        <StatCard icon="✅" label="Paz y Salvos" value="68%" sub="Al día" color={C.green} />
        <StatCard icon="⚠️" label="Mora Crítica" value="34" sub="Estudiantes" color={C.amber} />
      </div>

      {/* FILA 1 */}
      <div className="db-grid">
        <ChartSwitch
          label="Paz y Salvo Global"
          labelA="Donut" labelB="Barras"
          accent={C.red}
          chartA={
            <ResponsiveContainer width="100%" height={220}>
              <PieChart><Pie data={psGlobal} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>
                {psGlobal.map((_, i) => <Cell key={i} fill={[C.green, C.amber, C.red][i]} />)}
              </Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          }
          chartB={
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={psBars}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="m" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Legend />
                <Bar dataKey="dia" name="Al día" fill={C.green} radius={[4,4,0,0]} />
                <Bar dataKey="pend" name="Pendiente" fill={C.amber} radius={[4,4,0,0]} />
                <Bar dataKey="crit" name="Crítico" fill={C.red} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        <ChartSwitch
          label="Tesorería — Matrículas"
          labelA="Donut" labelB="Barras"
          accent={C.blue}
          chartA={
            <ResponsiveContainer width="100%" height={220}>
              <PieChart><Pie data={tesorDonut} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>
                {tesorDonut.map((_, i) => <Cell key={i} fill={[C.blue, C.amber][i]} />)}
              </Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          }
          chartB={
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={tesorBars}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="m" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Legend />
                <Bar dataKey="pag" name="Pagado" fill={C.blue} radius={[4,4,0,0]} />
                <Bar dataKey="pen" name="Pendiente" fill={C.amber} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        <ChartSwitch
          label="Paz y Salvo Banda"
          labelA="Donut" labelB="Barras"
          accent={C.dark}
          chartA={
            <ResponsiveContainer width="100%" height={220}>
              <PieChart><Pie data={bandaD} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>
                {bandaD.map((_, i) => <Cell key={i} fill={[C.dark, C.amber][i]} />)}
              </Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          }
          chartB={
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={[{ cat: 'Paz y Salvo', val: 72 }, { cat: 'Pendiente', val: 28 }]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="cat" tick={{ fontSize: 11 }} /><YAxis /><Tooltip />
                <Bar dataKey="val" fill={C.dark} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          }
        />
      </div>

      {/* FILA 2 — Paz y salvo por salón FULL WIDTH */}
      <div className="db-grid db-grid-1">
        <ChartSwitch
          label="Estado Paz y Salvo por Grado"
          labelA="Barras" labelB="Donut"
          accent={C.red}
          chartA={
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={salonBars}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="g" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Legend />
                <Bar dataKey="ok" name="Al día" fill={C.green} radius={[4,4,0,0]} stackId="a" />
                <Bar dataKey="pen" name="Pendiente" fill={C.red} radius={[4,4,0,0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          }
          chartB={
            <ResponsiveContainer width="100%" height={260}>
              <PieChart><Pie data={[{ name: 'Al día', value: 269 }, { name: 'Pendiente', value: 73 }]} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" labelLine={false} label={renderLabel}>
                {[C.green, C.red].map((c, i) => <Cell key={i} fill={c} />)}
              </Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          }
        />
      </div>
    </DashboardLayout>
  );
}
