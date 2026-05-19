import { useNavigate } from "react-router-dom";
import { LogOut, UserCircle2 } from "lucide-react";
import { useAuth } from "../../api/useAuth";
import "./Sidebar.css";

export default function Sidebar({
  menuItems = [],
  selectedMenu,
  setSelectedMenu,
  user: propUser,
}) {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const user = propUser || authUser;

  const handleNavigation = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedMenu(item);

    //este switch se quita cuando haya navegacion OJO

    switch (item) {
      
    }

    //y se pone lo de abajo 

    // // Genera la ruta: convierte a minúsculas, reemplaza espacios por guiones
    // const path = `/home/${item.toLowerCase().replace(/\s+/g, '-')}`;
    // navigate(path);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            type="button"
            key={item}
            className={`menu-item ${selectedMenu === item ? "active" : ""}`}
            onClick={(e) => handleNavigation(item, e)}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="sidebar-user">
        <UserCircle2 size={100} />
        <span className="titular-label">TITULAR</span>
        <h3>{user?.nombre ?? "Nombre usuario"}</h3>
        <p>{user?.correo}</p>
        <button type="button" className="logout-button" onClick={handleLogout}>
          <LogOut size={30} />
        </button>
      </div>
    </aside>
  );
}