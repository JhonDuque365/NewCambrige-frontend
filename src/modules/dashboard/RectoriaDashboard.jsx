import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import StatCard from '../../components/StatCard/StatCard';
import ChartSwitch from '../../components/ChartSwitch/ChartSwitch';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import './Dashboard.css';

const C = { red: '#8E2A25', blue: '#1B3A5C', green: '#2E7D4F', amber: '#A06000', dark: '#6B1F1B' };
const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>{`${(percent*100).toFixed(0)}%`}</text> : null;
};

const psGlobal   = [{ name: 'Al día', value: 232 }, { name: 'Pendiente', value: 72 }, { name: 'Crítico', value: 38 }];
const docentes   = [{ name: 'Activos', value: 20 }, { name: 'Inactivos', value: 4 }];
const modPend    = [{ mod: 'Tesorería', pend: 34 }, { mod: 'Banda', pend: 10 }, { mod: 'Uniforme', pend: 47 }, { mod: 'Biblioteca', pend: 18 }, { mod: 'Titular', pend: 22 }];
const firmas     = [{ f: 'Banda', ok: 89, pend: 11 }, { f: 'Secretaría', ok: 92, pend: 8 }, { f: 'Rectora', ok: 88, pend: 12 }, { f: 'Chaqueta', ok: 78, pend: 22 }, { f: 'Coordinadora', ok: 85, pend: 15 }, { f: 'Titular', ok: 90, pend: 10 }];

export default function RectoriaDashboard() {
  return (
    <DashboardLayout title="Rectoría" subtitle="Resumen institucional de paz y salvos">
      <div className="db-kpis">
        <StatCard icon="👨‍🎓" label="Estudiantes" value="342" sub="Total matriculados" color={C.red} />
        <StatCard icon="✅" label="Paz y Salvo" value="68%" sub="Completados" color={C.green} />
        <StatCard icon="🏛️" label="Año activo" value="2024-25" sub="Único año activo" color={C.blue} />
        <StatCard icon="⚠️" label="Críticos" value="38" sub="Requieren atención" color={C.amber} />
      </div>

      <div className="db-grid">
        <ChartSwitch label="Paz y Salvo Global" labelA="Donut" labelB="Barras" accent={C.red}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={psGlobal} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{psGlobal.map((_,i)=><Cell key={i} fill={[C.green,C.amber,C.red][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={psGlobal}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.red} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/><Cell fill={C.red}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Estado Docentes" labelA="Donut" labelB="Barras" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={docentes} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{docentes.map((_,i)=><Cell key={i} fill={[C.green,C.amber][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={docentes}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.blue} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Pendientes por Módulo" labelA="Barras" labelB="Donut" accent={C.amber}
          chartA={<ResponsiveContainer width="100%" height={220}><BarChart data={modPend}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="mod" tick={{fontSize:10}}/><YAxis/><Tooltip/><Bar dataKey="pend" name="Pendientes" fill={C.amber} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={modPend.map(m=>({name:m.mod,value:m.pend}))} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{modPend.map((_,i)=><Cell key={i} fill={[C.red,C.blue,C.green,C.amber,C.dark][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
        />
      </div>

      <div className="db-grid db-grid-1">
        <ChartSwitch label="Estado de Firmas de Paz y Salvo (6 secciones)" labelA="Barras" labelB="Donut" accent={C.red}
          chartA={<ResponsiveContainer width="100%" height={260}><BarChart data={firmas}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="f" tick={{fontSize:11}}/><YAxis/><Tooltip/><Legend/><Bar dataKey="ok" name="Firmado" fill={C.green} radius={[4,4,0,0]} stackId="a"/><Bar dataKey="pend" name="Pendiente" fill={C.red} radius={[4,4,0,0]} stackId="a"/></BarChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={260}><PieChart><Pie data={[{name:'Firmado',value:522},{name:'Pendiente',value:78}]} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" labelLine={false} label={renderLabel}>{[C.green,C.red].map((c,i)=><Cell key={i} fill={c}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
        />
      </div>
    </DashboardLayout>
  );
}
