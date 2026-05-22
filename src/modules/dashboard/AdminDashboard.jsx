import DashboardLayout from './DashboardLayout';
import ChartCard from './ChartCard';

const pazSalvoGlobal = [
  { name: 'Al día', value: 142 },
  { name: 'Pendientes', value: 38 },
  { name: 'Mora Crítica', value: 12 },
];
const tesoreria = [
  { name: 'Matrícula pagada', value: 168 },
  { name: 'Matrícula pendiente', value: 24 },
];
const pension = [
  { name: 'Ene', value: 180 }, { name: 'Feb', value: 172 }, { name: 'Mar', value: 165 },
  { name: 'Abr', value: 158 }, { name: 'May', value: 144 },
];
const porSalon = [
  { name: '1°A', value: 28 }, { name: '2°B', value: 30 }, { name: '3°C', value: 25 },
  { name: '4°A', value: 27 }, { name: '5°B', value: 22 },
];
const banda = [
  { name: 'Al día', value: 34 }, { name: 'Pendiente', value: 8 },
];
const uniformes = [
  { name: 'Entregado', value: 150 }, { name: 'Pendiente', value: 42 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Dashboard Administrador" subtitle="Resumen general del sistema" icon="⚙️" color="#7c3aed">
      <ChartCard title="Paz y Salvo Global" data={pazSalvoGlobal}
        stat={[{value:142,label:'Al día'},{value:50,label:'Pendientes'}]}
        colors={['#10b981','#f59e0b','#ef4444']} />
      <ChartCard title="Estado Tesorería" data={tesoreria}
        colors={['#3b82f6','#f59e0b']} />
      <ChartCard title="Pensión Mensual" data={pension} defaultType="bar"
        wide colors={['#7c3aed','#7c3aed','#7c3aed','#7c3aed','#7c3aed']} />
      <ChartCard title="Estudiantes por Salón" data={porSalon} defaultType="bar"
        wide colors={['#10b981','#3b82f6','#f59e0b','#ec4899','#ef4444']} />
      <ChartCard title="Paz y Salvo Banda" data={banda}
        colors={['#10b981','#ef4444']} />
      <ChartCard title="Uniformes" data={uniformes}
        colors={['#3b82f6','#f59e0b']} />
    </DashboardLayout>
  );
}
