const TesoreriaFiltro = () => {
  return (

   
  
  <div className="p-4 bg-white border-b flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <span>Código</span>
            <input type="text" className="border rounded-full px-4 py-1 bg-gray-100 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <span>Nombre</span>
            <input type="text" className="border rounded-full px-4 py-1 bg-gray-100 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <span>Grado</span>
            <select className="border rounded-full px-4 py-1 bg-gray-100"><option></option></select>
          </div>
          <div className="flex items-center gap-2">
            <span>Grupo</span>
            <select className="border rounded-full px-4 py-1 bg-gray-100"><option></option></select>
          </div>
          <div className="flex items-center gap-2">
            <span>Año</span>
            <select className="border rounded-full px-4 py-1 bg-gray-100"><option></option></select>
          </div>
          <button className="bg-[#2B4C7E] text-white px-6 py-1 rounded-full flex items-center gap-2 hover:bg-[#1A3A63]">
            Buscar
          </button>
        </div>

  
 
  );
};
 export default TesoreriaFiltro;