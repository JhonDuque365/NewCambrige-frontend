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

const invEstado  = [{ name: 'Disponible', value: 120 }, { name: 'Prestado', value: 45 }, { name: 'Dañado', value: 8 }];
const psEstado   = [{ name: 'Paz y Salvo', value: 295 }, { name: 'Pendiente', value: 47 }];
const prendas    = [{ p: 'Camisa', disp: 40, prest: 18 }, { p: 'Pantalón', disp: 38, prest: 16 }, { p: 'Chaqueta', disp: 25, prest: 12 }, { p: 'Sudadera', disp: 17, prest: 15 }, { p: 'Corbata', disp: 22, prest: 8 }];

export default function UniformeDashboard() {
  return (
    <DashboardLayout title="Uniformes" subtitle="Inventario y préstamo de prendas">
      <div className="db-kpis">
        <StatCard icon="👕" label="Total Prendas" value="173" sub="En inventario" color={C.blue} />
        <StatCard icon="✅" label="Disponibles" value="120" sub="Sin préstamo" color={C.green} />
        <StatCard icon="🔄" label="Prestadas" value="45" sub="En uso" color={C.amber} />
        <StatCard icon="⚠️" label="Dañadas" value="8" sub="Requieren revisión" color={C.red} />
      </div>

      <div className="db-grid">
        <ChartSwitch label="Estado Inventario" labelA="Donut" labelB="Barras" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={invEstado} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{invEstado.map((_,i)=><Cell key={i} fill={[C.green,C.amber,C.red][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={invEstado}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.blue} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/><Cell fill={C.red}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Paz y Salvo Uniformes" labelA="Donut" labelB="Barras" accent={C.red}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={psEstado} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{psEstado.map((_,i)=><Cell key={i} fill={[C.green,C.amber][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={psEstado}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="value" fill={C.red} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Prendas por Tipo" labelA="Barras" labelB="Donut" accent={C.dark}
          chartA={<ResponsiveContainer width="100%" height={220}><BarChart data={prendas}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="p" tick={{fontSize:11}}/><YAxis/><Tooltip/><Legend/><Bar dataKey="disp" name="Disponible" fill={C.green} radius={[4,4,0,0]}/><Bar dataKey="prest" name="Prestado" fill={C.amber} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={prendas.map(p=>({name:p.p,value:p.disp+p.prest}))} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{prendas.map((_,i)=><Cell key={i} fill={[C.blue,C.red,C.green,C.amber,C.dark][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
        />
      </div>

      <div className="db-grid db-grid-1">
        <ChartSwitch label="Disponibilidad vs Préstamos por Prenda" labelA="Barras" labelB="Donut" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={240}><BarChart data={prendas}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="p" tick={{fontSize:11}}/><YAxis/><Tooltip/><Legend/><Bar dataKey="disp" name="Disponible" fill={C.green} radius={[4,4,0,0]}/><Bar dataKey="prest" name="Prestado" fill={C.amber} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={240}><PieChart><Pie data={[{name:'Disponible',value:120},{name:'Prestado',value:45},{name:'Dañado',value:8}]} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" labelLine={false} label={renderLabel}>{[C.green,C.amber,C.red].map((c,i)=><Cell key={i} fill={c}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
        />
      </div>
    </DashboardLayout>
  );
}
