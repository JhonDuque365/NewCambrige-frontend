import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import StatCard from '../../components/StatCard/StatCard';
import ChartSwitch from '../../components/ChartSwitch/ChartSwitch';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
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

const psGrupo  = [{ name: 'Al día', value: 22 }, { name: 'Pendiente', value: 6 }, { name: 'Crítico', value: 2 }];
const pupitre  = [{ name: 'Asignado', value: 27 }, { name: 'Sin pupitre', value: 3 }];
const pruebas  = [{ name: 'Completada', value: 25 }, { name: 'Pendiente', value: 5 }];
const biblio   = [{ name: 'Sin deuda', value: 24 }, { name: 'Con deuda', value: 6 }];
const barsPrueba = [{ p: 'Tipo 1', comp: 18, pend: 4 }, { p: 'Tipo 2', comp: 16, pend: 6 }, { p: 'Tipo 3', comp: 14, pend: 8 }];

export default function TitularDashboard() {
  return (
    <DashboardLayout title="Titular" subtitle="Seguimiento del grupo a cargo">
      <div className="db-kpis">
        <StatCard icon="👥" label="Estudiantes" value="30" sub="Grupo 9B" color={C.red} />
        <StatCard icon="✅" label="Paz y Salvo" value="73%" sub="Al día" color={C.green} />
        <StatCard icon="📋" label="Pruebas OK" value="83%" sub="Completadas" color={C.blue} />
        <StatCard icon="📚" label="Biblio OK" value="80%" sub="Sin deuda" color={C.amber} />
      </div>

      <div className="db-grid">
        <ChartSwitch label="Paz y Salvo del Grupo" labelA="Donut" labelB="Barras" accent={C.red}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={psGrupo} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{psGrupo.map((_,i)=><Cell key={i} fill={[C.green,C.amber,C.red][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={[{cat:'Al día',v:22},{cat:'Pendiente',v:6},{cat:'Crítico',v:2}]}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="cat" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="v" fill={C.red} radius={[4,4,0,0]}><Cell fill={C.green}/><Cell fill={C.amber}/><Cell fill={C.red}/></Bar></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Pupitres Asignados" labelA="Donut" labelB="Barras" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={pupitre} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{pupitre.map((_,i)=><Cell key={i} fill={[C.blue,C.amber][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={[{cat:'Asignado',v:27},{cat:'Sin pupitre',v:3}]}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="cat" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="v" fill={C.blue} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
        />
        <ChartSwitch label="Estado de Pruebas" labelA="Donut" labelB="Barras" accent={C.amber}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={pruebas} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{pruebas.map((_,i)=><Cell key={i} fill={[C.green,C.amber][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={barsPrueba}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="p" tick={{fontSize:11}}/><YAxis/><Tooltip/><Legend/><Bar dataKey="comp" name="Completada" fill={C.green} radius={[4,4,0,0]}/><Bar dataKey="pend" name="Pendiente" fill={C.amber} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
        />
      </div>

      <div className="db-grid db-grid-1">
        <ChartSwitch label="Biblioteca — Estado de Préstamos" labelA="Donut" labelB="Barras" accent={C.blue}
          chartA={<ResponsiveContainer width="100%" height={220}><PieChart><Pie data={biblio} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" labelLine={false} label={renderLabel}>{biblio.map((_,i)=><Cell key={i} fill={[C.green,C.red][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer>}
          chartB={<ResponsiveContainer width="100%" height={220}><BarChart data={[{cat:'Sin deuda',v:24},{cat:'Con deuda',v:6}]}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="cat" tick={{fontSize:11}}/><YAxis/><Tooltip/><Bar dataKey="v" fill={C.blue} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>}
        />
      </div>
    </DashboardLayout>
  );
}
