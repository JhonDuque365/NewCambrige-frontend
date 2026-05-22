import DashboardLayout from './DashboardLayout';
import ChartCard from './ChartCard';

const estudiantes = [
  { name: 'Paz y Salvo', value: 142 }, { name: 'Pendientes', value: 38 }, { name: 'Mora Crítica', value: 12 },
];
const docentes = [
  { name: 'Activos', value: 24 }, { name: 'Inactivos', value: 3 },
];
const pendientesMod = [
  { name: 'Tesorería', value: 24 }, { name: 'Biblioteca', value: 12 }, { name: 'Banda', value: 8 },
  { name: 'Uniforme', value: 15 }, { name: 'Secretaría', value: 6 },
];

export default function RectoriaDashboard() {
  return (
    <DashboardLayout title="Dashboard Rectoría" subtitle="Visión global del colegio" icon="🏫" color="#ef4444">
      <ChartCard title="Paz y Salvo Estudiantes" data={estudiantes}
        stat={[{value:142,label:'Al día'},{value:50,label:'Con pendientes'}]}
        colors={['#10b981','#f59e0b','#ef4444']} />
      <ChartCard title="Estado Docentes" data={docentes}
        colors={['#3b82f6','#ef4444']} />
      <ChartCard title="Pendientes por Módulo" data={pendientesMod} defaultType="bar"
        wide colors={['#f59e0b','#3b82f6','#ec4899','#10b981','#7c3aed']} />
    </DashboardLayout>
  );
}
