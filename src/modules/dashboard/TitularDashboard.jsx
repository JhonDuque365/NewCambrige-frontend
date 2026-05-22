import DashboardLayout from './DashboardLayout';
import ChartCard from './ChartCard';

const pazSalvoGrupo = [
  { name: 'Al día', value: 24 }, { name: 'Pendiente', value: 4 }, { name: 'Mora Crítica', value: 2 },
];
const pupitres = [
  { name: 'Asignados', value: 28 }, { name: 'Disponibles', value: 4 }, { name: 'Dañados', value: 2 },
];
const pruebas = [
  { name: 'Aprobada', value: 20 }, { name: 'Pendiente', value: 6 }, { name: 'No presentó', value: 4 },
];
const biblioteca = [
  { name: 'Devueltos', value: 18 }, { name: 'En préstamo', value: 10 }, { name: 'Mora', value: 2 },
];

export default function TitularDashboard() {
  return (
    <DashboardLayout title="Dashboard Docente Titular" subtitle="Resumen del grupo a cargo" icon="👨‍🏫" color="#10b981">
      <ChartCard title="Paz y Salvo del Grupo" data={pazSalvoGrupo}
        stat={[{value:24,label:'Al día'},{value:6,label:'Pendientes'}]}
        colors={['#10b981','#f59e0b','#ef4444']} />
      <ChartCard title="Estado Pupitres" data={pupitres}
        colors={['#3b82f6','#10b981','#ef4444']} />
      <ChartCard title="Estado Pruebas" data={pruebas}
        colors={['#7c3aed','#f59e0b','#ef4444']} />
      <ChartCard title="Préstamos Biblioteca" data={biblioteca}
        colors={['#10b981','#3b82f6','#ef4444']} />
    </DashboardLayout>
  );
}
