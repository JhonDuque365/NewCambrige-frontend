import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";
import { useAuth } from "../../modules/auth/useAuth";
import { allrolesuserRequest } from '../../api/endpoints';

import MatriculaLogo from '../../assets/Tesoreria/matricula.svg';
import PensionLogo from '../../assets/Tesoreria/pension.svg';
import PapeleriaLogo from '../../assets/Tesoreria/papeleria.svg';
import UserIcon from '../../assets/Login/usuario_login.svg';

import Header        from "../../components/layout/Header";
import ModuleLayout  from "../../components/layout/ModuleLayout";
import Sidebar       from "../../components/layout/Sidebar";
import SearchBar     from "../../components/shared/SearchBar";
import DataTable     from "../../components/shared/DataTable";
import ActionButtons from "../../components/shared/ActionButtons";
import Modal         from "../../components/shared/Modal";


const Dashboard = () => {
  const navigate = useNavigate();
  const categories = [
    { title: 'Matrícula', icon: <img src={MatriculaLogo} alt="Matrícula" className="w-16 h-16" />, path: "/tesoreria/matricula" },
    { title: 'Pensión', icon: <img src={PensionLogo} alt="Pensión" className="w-16 h-16" />, path: "/tesoreria/pension" },
    { title: 'Papelería', icon: <img src={PapeleriaLogo} alt="Papelería" className="w-16 h-16" />, path: "/tesoreria/papeleria" },
  ];
  const { user, logout } = useAuth();
  const userName = user?.nombre || "Usuario";
  const idUser = user?.id_usuario;
  const [rolNombre, setRolNombre] = useState("Cargando...");
  const rol = rolNombre[0]|| "Rol Desconocido";
  useEffect(() => {
    const obtenerRoles = async () => {
      if (idUser) {
        try {
          const response = await allrolesuserRequest(idUser);
          const nombres = response?.data;
          setRolNombre(nombres);
        } catch (error) {
          console.error("Error al obtener el rol:", error);
          setRolNombre("Error al cargar");
        }
      }
    };
    obtenerRoles();
  }, [idUser]);

  return (
 <div>
  
  <Header />

   <ModuleLayout
    sidebar={<Sidebar 
            modulos={[
              { label: "Notificaciones",    path: "/tesoreria/notificaciones" },
            ]}
            userIcon={user.icon || UserIcon}
            usuario={{ nombre: userName, rol: rol }}
            onLogout={logout}
    />}
      children={<main className="flex-1 overflow-y-auto bg-gray-50">

        {/* Contenido de Tarjetas */}
        <section className="h-full w-full flex justify-center items-center gap-20 py-24 relative">
          {categories.map((item, index) => (
            <div key={index} className="relative group scale-110" onClick={ () => navigate(item.path)}>
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
      </main>}  
      />
      
    </div>
   
  );
};

export default Dashboard;