import DashboardLayout from './DashboardLayout';
import ChartCard from './ChartCard';

const matricula = [
  { name: 'Pagada', value: 168 }, { name: 'Pendiente', value: 24 },
];
const papeleria = [
  { name: 'Pagada', value: 160 }, { name: 'Pendiente', value: 32 },
];
const pension = [
  { name: 'Ene', value: 180 }, { name: 'Feb', value: 172 }, { name: 'Mar', value: 165 },
  { name: 'Abr', value: 158 }, { name: 'May', value: 144 }, { name: 'Jun', value: 130 },
];

export default function TesoreroDashboard() {
  return (
    <DashboardLayout title="Dashboard Tesorería" subtitle="Control de pagos y matrículas" icon="💰" color="#f59e0b">
      <ChartCard title="Estado Matrícula" data={matricula}
        stat={[{value:168,label:'Pagada'},{value:24,label:'Pendiente'}]}
        colors={['#10b981','#ef4444']} />
      <ChartCard title="Estado Papelería" data={papeleria}
        colors={['#3b82f6','#f59e0b']} />
      <ChartCard title="Pensión por Mes" data={pension} defaultType="bar"
        wide colors={['#f59e0b','#f59e0b','#f59e0b','#f59e0b','#f59e0b','#ef4444']} />
    </DashboardLayout>
  );
}
