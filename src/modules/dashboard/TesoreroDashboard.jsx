import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import StatCard from '../../components/StatCard/StatCard';
import ChartSwitch from '../../components/ChartSwitch/ChartSwitch';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from 'recharts';
import './Dashboard.css';

const C = { red: '#8E2A25', blue: '#1B3A5C', green: '#2E7D4F', amber: '#A06000' };
const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>{`${(percent*100).toFixed(0)}%`}</text> : null;
};

const matricula = [{ name: 'Pagada', value: 280 }, { name: 'Pendiente', value: 62 }];
const papeleria = [{ name: 'Al día', value: 295 }, { name: 'Pendiente', value: 47 }];
const pension   = [
  { m: 'Ago', pag: 320, pen: 22 }, { m: 'Sep', pag: 315, pen: 27 },
  { m: 'Oct', pag: 308, pen: 34 }, { m: 'Nov', pag: 310, pen: 32 }, { m: 'Dic', pag: 322, pen: 20 }
];
const mora = [{ cat: 'Mora normal', v: 28 }, { cat: 'Mora crítica', v: 34 }];

export default function TesoreroDashboard() {
  return (
    <DashboardLayout title="Tesorería" subtitle="Control de pagos y matrículas">
      <div className="db-kpis">
        <StatCard icon="💰" label="Matrículas OK" value="280" sub="De 342 estudiantes" color={C.blue} />
        <StatCard icon="📄" label="Papelería OK" value="295" sub="Al día" color={C.green} />
        <StatCard icon="⚠️" label="Mora Crítica" value="34" sub="3+ meses pendientes" color={C.red} />
        <StatCard icon="📅" label="Mes actual" value="Nov" sub="Pensiones recaudadas" color={C.amber} />
      </div>

      <div className="db-grid">
        <ChartSwitch label="Matrículas" labelA="Donut" labelB="Barras" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={matricula} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{matricula.map((_,i)=><Cell key={i} fill={[C.blue,C.amber][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={matricula}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.blue} radius={[4,4,0,0]}><Cell fill={C.blue}/><Cell fill={C.amber}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Papelería" labelA="Donut" labelB="Barras" accent={C.green}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={papeleria} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{papeleria.map((_,i)=><Cell key={i} fill={[C.green,C.amber][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={papeleria}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.green} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Mora" labelA="Donut" labelB="Barras" accent={C.red}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={mora} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{mora.map((_,i)=><Cell key={i} fill={[C.amber,C.red][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={mora}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="cat" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="v" fill={C.red} radius={[4,4,0,0]}><Cell fill={C.amber}/><Cell fill={C.red}/></Bar></BarChart></ResponsiveContainer>}
        />
      </div>

      <div className="db-grid db-grid-1">
        <ChartSwitch label="Pensión Mensual — Pagado vs Pendiente" labelA="Línea" labelB="Barras" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={240}><LineChart data={pension}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="m" tick={{fontSize:11}}/><YAxis/><Tooltip/><Legend/><Line type="monotone" dataKey="pag" name="Pagado" stroke={C.green} strokeWidth={2} dot={{r:4}}/><Line type="monotone" dataKey="pen" name="Pendiente" stroke={C.red} strokeWidth={2} dot={{r:4}}/></LineChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={240}><BarChart data={pension}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="m" tick={{fontSize:11}}/><YAxis/><Tooltip/><Legend/><Bar dataKey="pag" name="Pagado" fill={C.green} radius={[4,4,0,0]}/><Bar dataKey="pen" name="Pendiente" fill={C.red} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
        />
      </div>
    </DashboardLayout>
  );
}
