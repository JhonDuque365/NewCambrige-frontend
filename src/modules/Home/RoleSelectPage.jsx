// RoleSelectPage.jsx — Pantalla de selección de rol cuando el usuario tiene 2+ módulos
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/useAuth";
import Header from "../../components/layout/header";
import {
  BookOpen,
  Music,
  Shirt,
  DollarSign,
  GraduationCap,
  ShieldCheck
} from "lucide-react";
import "./RoleSelectPage.css";

const ROLE_CONFIG = {
  administrador: {
    label: "Administrador",
    icon: <ShieldCheck size={48} />,
    route: "/dashboard/admin",
    color: "#8E2A25",
  },
  titular: {
    label: "Titular",
    icon: <BookOpen size={48} />,
    route: "/dashboard/titular",
    color: "#1B3A5C",
  },
  tesorero: {
    label: "Tesorería",
    icon: <DollarSign size={48} />,
    route: "/dashboard/tesorero",
    color: "#2E7D4F",
  },
  banda: {
    label: "Banda",
    icon: <Music size={48} />,
    route: "/dashboard/banda",
    color: "#A06000",
  },
  uniforme: {
    label: "Uniformes",
    icon: <Shirt size={48} />,
    route: "/dashboard/uniforme",
    color: "#5B2D8E",
  },
  rectoria: {
    label: "Rectoría",
    icon: <GraduationCap size={48} />,
    route: "/dashboard/rectoria",
    color: "#1B3A5C",
  },
};

const RoleSelectPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // roles del usuario — en producción vendrán del JWT
  // ej: user.roles = ["titular", "banda"]
  const userRoles = user?.roles ?? ["titular", "banda"];

  const handleSelect = (route) => {
    navigate(route);
  };

  return (
    <div className="role-select-container">
      <Header title="SISTEMA DE PAZ Y SALVO - NEW CAMBRIDGE SCHOOL" />
      <main className="role-select-main">
        <div className="role-select-greeting">
          <h2>Bienvenido/a, <span>{user?.nombre ?? "Usuario"}</span></h2>
          <p>¿A qué módulo deseas ingresar hoy?</p>
        </div>
        <div className="role-cards-grid">
          {userRoles.map((rol) => {
            const config = ROLE_CONFIG[rol];
            if (!config) return null;
            return (
              <button
                key={rol}
                className="role-card"
                style={{ "--card-color": config.color }}
                onClick={() => handleSelect(config.route)}
              >
                <div className="role-card-icon">{config.icon}</div>
                <h3 className="role-card-label">{config.label}</h3>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default RoleSelectPage;
