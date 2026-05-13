import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Bell, GraduationCap, BookOpen, PenTool, LogOut, User } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
  const categories = [
    { title: 'Matrícula', icon: <GraduationCap size={60} strokeWidth={1.5} /> },
    { title: 'Pensión', icon: <BookOpen size={60} strokeWidth={1.5} /> },
    { title: 'Papelería', icon: <PenTool size={60} strokeWidth={1.5} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-crema-sidebar flex flex-col border-r border-gray-300 shadow-inner">
        <div className="p-8 flex flex-col items-center">
          <div className="text-vinotinto text-center mb-10">
            <h1 className="text-5xl font-serif font-bold leading-none">TITULAR</h1>
            <p className="italic text-xl tracking-tight">- Tesorería -</p>
          </div>
          
          <nav className="w-full space-y-2">
            <button className="flex items-center space-x-4 text-vinotinto font-bold w-full p-3 hover:bg-white/40 rounded-lg transition-all group">
              <Home size={24} className="group-hover:scale-110 transition" />
              <span className="text-lg">Inicio</span>
            </button>
            <button className="flex items-center space-x-4 text-vinotinto/80 w-full p-3 hover:bg-white/40 rounded-lg transition-all group">
              <Bell size={24} className="group-hover:scale-110 transition" />
              <span className="text-lg">Notificaciones</span>
            </button>
          </nav>
        </div>

        {/* Perfil al final */}
        <div className="mt-auto p-10 flex flex-col items-center text-vinotinto">
          <div className="w-20 h-20 rounded-full border-2 border-dorado flex items-center justify-center mb-3 bg-white/30 shadow-sm">
            <User size={40} className="text-dorado" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.2em]">Titular</p>
          <p className="text-md font-medium">Nombre usuario</p>
          <button className="mt-6 p-2 hover:bg-vinotinto hover:text-white rounded-xl transition-all duration-300 border border-vinotinto/20">
            <LogOut size={28} />
          </button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Header Vinotinto */}
        <header className="bg-vinotinto text-white h-24 flex items-center px-8 shadow-xl relative z-10">
          <div className="flex items-center space-x-3 bg-white/10 p-2 rounded-full border border-white/20">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                <span className="text-vinotinto font-black text-[8px]">LOGO 1</span>
             </div>
             <span className="text-2xl font-bold text-white/80">⇄</span>
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                <span className="text-vinotinto font-black text-[8px]">LOGO 2</span>
             </div>
          </div>
          <h2 className="flex-1 text-center text-2xl font-light tracking-[0.25em] uppercase italic drop-shadow-md">
            Sistema de Paz y Salvo - New Cambridge School
          </h2>
        </header>

        {/* Contenido de Tarjetas */}
        <section className="flex-1 flex justify-center items-center gap-20 p-12 relative">
          {categories.map((item, index) => (
            <div key={index} className="relative group scale-110" onClick={() => item.title === 'Matrícula' && navigate('/matricula')}>
              {/* Sombra proyectada vinotinto (Efecto exacto) */}
              <div className="absolute top-4 left-4 w-56 h-72 bg-vinotinto rounded-2xl shadow-lg transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
              
              {/* Tarjeta Blanca */}
              <div className="relative bg-white border border-gray-100 rounded-2xl w-56 h-72 flex flex-col items-center justify-center p-8 shadow-2xl transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <h3 className="text-dorado text-3xl font-serif font-medium mb-10 tracking-wide text-center">
                  {item.title}
                </h3>
                <div className="text-dorado transform transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;