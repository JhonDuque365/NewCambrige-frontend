import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import StatCard from '../../components/StatCard/StatCard';
import ChartSwitch from '../../components/ChartSwitch/ChartSwitch';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import './Dashboard.css';

const C = { red: '#8E2A25', dark: '#6B1F1B', blue: '#1B3A5C', green: '#2E7D4F', amber: '#A06000' };
const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>{`${(percent*100).toFixed(0)}%`}</text> : null;
};

const instrEstado = [{ name: 'Activo', value: 40 }, { name: 'Inactivo', value: 8 }, { name: 'Mantenimiento', value: 5 }];
const psEstado   = [{ name: 'Paz y Salvo', value: 38 }, { name: 'Pendiente', value: 10 }];
const devolucion = [{ inst: 'Trompeta', dev: 5 }, { inst: 'Clarinete', dev: 3 }, { inst: 'Saxofón', dev: 4 }, { inst: 'Flauta', dev: 2 }, { inst: 'Percusión', dev: 6 }, { inst: 'Trombón', dev: 1 }];
const prestamos  = [{ m: 'Ago', prest: 12, dev: 10 }, { m: 'Sep', prest: 15, dev: 13 }, { m: 'Oct', prest: 11, dev: 9 }, { m: 'Nov', prest: 14, dev: 12 }];

export default function BandaDashboard() {
  return (
    <DashboardLayout title="Banda Musical" subtitle="Inventario e instrumentos">
      <div className="db-kpis">
        <StatCard icon="🎺" label="Instrumentos" value="53" sub="En inventario" color={C.dark} />
        <StatCard icon="✅" label="Activos" value="40" sub="En uso" color={C.green} />
        <StatCard icon="🔧" label="Mantenimiento" value="5" sub="Fuera de servicio" color={C.amber} />
        <StatCard icon="📋" label="Paz y Salvo" value="79%" sub="Integrantes al día" color={C.blue} />
      </div>

      <div className="db-grid">
        <ChartSwitch label="Estado de Instrumentos" labelA="Donut" labelB="Barras" accent={C.dark}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={instrEstado} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{instrEstado.map((_,i)=><Cell key={i} fill={[C.green,C.amber,C.red][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={instrEstado}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.dark} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/><Cell fill={C.red}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Paz y Salvo Banda" labelA="Donut" labelB="Barras" accent={C.red}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={psEstado} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{psEstado.map((_,i)=><Cell key={i} fill={[C.green,C.amber][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={psEstado}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.red} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Préstamos vs Devoluciones" labelA="Barras" labelB="Donut" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={220}><BarChart data={prestamos}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="m" tick={{fontSize:11}}/><YAxis/><Tooltip/><Legend/><Bar dataKey="prest" name="Prestados" fill={C.blue} radius={[4,4,0,0]}/><Bar dataKey="dev" name="Devueltos" fill={C.green} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={[{name:'Prestados',value:52},{name:'Devueltos',value:44}]} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{[C.blue,C.green].map((c,i)=><Cell key={i} fill={c}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
        />
      </div>

      <div className="db-grid db-grid-1">
        <ChartSwitch label="Devoluciones por Tipo de Instrumento" labelA="Barras" labelB="Donut" accent={C.dark}
          chartA={<ResponsiveContainer width="100%" height={240}><BarChart data={devolucion}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="inst" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="dev" name="Devoluciones" fill={C.dark} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={240}><PieChart><Pie data={devolucion.map(d=>({name:d.inst,value:d.dev}))} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" labelLine={false} label={renderLabel}>{devolucion.map((_,i)=><Cell key={i} fill={[C.dark,C.red,C.blue,C.green,C.amber,'#7B4F2E'][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
        />
      </div>
    </DashboardLayout>
  );
}
