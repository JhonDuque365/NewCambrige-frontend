import TesoreriaSidebar from './TesoreriaSidebar';
import Header from './TesoreriaHeader';


const TesoreriaEstadistica = () => {
  return (

    <div className="flex flex-col h-screen w-full bg-white overflow-hidden font-sans">
  
  <Header />

  
  <div className="flex flex-1 overflow-hidden">
   
    <TesoreriaSidebar />
    <h1>Estadisticas</h1>
    </div>
    </div>
  );
};

export default TesoreriaEstadistica;