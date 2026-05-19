import { useEffect, useState } from "react";
import "./HomePage.css";

import salonIcon from "../../assets/Salon/salon.svg";
import tesoreriaIcon from "../../assets/Tesoreria/tesoreria.svg";
import rectoriaIcon from "../../assets/Rectoria/estudiante.svg";
import uniformesIcon from "../../assets/Objetos/objetos.svg";
import bandaIcon from "../../assets/Banda/banda.svg";

import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/Sidebar";

import { useAuth } from "../../api/useAuth";
import { checkSessionRequest } from "../../api/authService";

const HomePage = () => {
  const { user, logout } = useAuth();

  // MENU ACTIVO
  const [selectedMenu, setSelectedMenu] = useState("Inicio");

  // VALIDAR SESION
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await checkSessionRequest();
      } catch (error) {
        console.log("Sesión expirada");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ITEMS MENU
  const menuItems = [
    "Inicio",
    "Estudiante",
    "Docente",
  ];

  // CARDS
  const cards = [
    {
      title: "Salón",
      icon: salonIcon,
    },
    {
      title: "Tesorería",
      icon: tesoreriaIcon,
    },
    {
      title: "Rectoría",
      icon: rectoriaIcon,
    },
    {
      title: "Uniformes",
      icon: uniformesIcon,
    },
    {
      title: "Banda",
      icon: bandaIcon,
    },
  ];

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <Header title="SISTEMA DE PAZ Y SALVO - NEW CAMBRIDGE SCHOOL" />

      <div className="content-wrapper">

        {/* SIDEBAR IMPORTADO */}
        <Sidebar
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          user={user}
          logout={logout}
        />

        {/* MAIN */}
        <main className="main-content">

          <div className="cards-grid">
            {cards.map((card) => (
              <div
                className="dashboard-card"
                key={card.title}
              >
                <h2>{card.title}</h2>

                <div className="card-icon">
                  <img
                    src={card.icon}
                    alt={card.title}
                  />
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};

export default HomePage;