import DashboardLayout from './DashboardLayout';
import ChartCard from './ChartCard';

const inventario = [
  { name: 'Activos', value: 45 }, { name: 'Inactivos', value: 8 }, { name: 'Mantenimiento', value: 5 },
];
const pazSalvo = [
  { name: 'Al día', value: 34 }, { name: 'Pendiente', value: 8 },
];
const devoluciones = [
  { name: 'Trompeta', value: 4 }, { name: 'Clarinete', value: 2 }, { name: 'Tambor', value: 6 },
  { name: 'Flauta', value: 3 }, { name: 'Saxofón', value: 1 },
];

export default function BandaDashboard() {
  return (
    <DashboardLayout title="Dashboard Banda Musical" subtitle="Inventario e instrumentos" icon="🎺" color="#ec4899">
      <ChartCard title="Inventario Instrumentos" data={inventario}
        stat={[{value:45,label:'Activos'},{value:13,label:'No disponibles'}]}
        colors={['#10b981','#f59e0b','#ef4444']} />
      <ChartCard title="Paz y Salvo Banda" data={pazSalvo}
        colors={['#10b981','#ef4444']} />
      <ChartCard title="Devoluciones por Instrumento" data={devoluciones} defaultType="bar"
        wide colors={['#ec4899','#7c3aed','#3b82f6','#10b981','#f59e0b']} />
    </DashboardLayout>
  );
}
