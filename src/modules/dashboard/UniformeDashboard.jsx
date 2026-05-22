import DashboardLayout from './DashboardLayout';
import ChartCard from './ChartCard';

const inventario = [
  { name: 'Disponible', value: 80 }, { name: 'Prestado', value: 60 }, { name: 'Dañado', value: 10 },
];
const pazSalvo = [
  { name: 'Al día', value: 150 }, { name: 'Pendiente', value: 42 },
];
const prendas = [
  { name: 'Camiseta', value: 55 }, { name: 'Pantalón', value: 48 }, { name: 'Chaqueta', value: 30 },
  { name: 'Corbata', value: 42 }, { name: 'Zapatos', value: 38 },
];

export default function UniformeDashboard() {
  return (
    <DashboardLayout title="Dashboard Uniformes" subtitle="Control de prendas y entregas" icon="👔" color="#3b82f6">
      <ChartCard title="Inventario General" data={inventario}
        stat={[{value:80,label:'Disponible'},{value:60,label:'Prestado'}]}
        colors={['#10b981','#3b82f6','#ef4444']} />
      <ChartCard title="Paz y Salvo Uniforme" data={pazSalvo}
        colors={['#10b981','#f59e0b']} />
      <ChartCard title="Prendas por Tipo" data={prendas} defaultType="bar"
        wide colors={['#3b82f6','#7c3aed','#ec4899','#f59e0b','#10b981']} />
    </DashboardLayout>
  );
}
