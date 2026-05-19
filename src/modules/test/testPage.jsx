import { useState } from "react";

import Header from "../../components/layout/header";
import ModuleLayout from "../../components/layout/ModuleLayout";
import Sidebar from "../../components/layout/Sidebar";
import SearchBar from "../../components/shared/searchBar";
import DataTable from "../../components/shared/DataTable";
import ActionButtons from "../../components/shared/ActionButtons";
import Modal from "../../components/shared/Modal";
import { useAuth } from "../../api/useAuth";

const libros = [
  { id_libro: 1, nombre: "Matemáticas 6", autor: "Santillana", disponible: true },
  { id_libro: 2, nombre: "Lenguaje 7", autor: "Norma", disponible: false },
  { id_libro: 3, nombre: "Ciencias 8", autor: "SM", disponible: true },
];

export default function TestPage() {

  const { user, logout } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState("Inventario Libros");

  const [fila, setFila] = useState(null);
  const [modal, setModal] = useState(false);
  const [formValues, setFormValues] = useState({});

  const menuItems = [
    "Inventario Libros",
    "Uniformes",
    "Instrumentos",
  ];

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <Header title="ESTO ES UNA PRUEBA BBCITA" />

      <div className="content-wrapper">

        {/* SIDEBAR IMPORTADO */}
        <Sidebar
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          user={"holi"}
          logout={logout}
        />

        {/* MAIN */}
        <main className="main-content">

          actions={
            <ActionButtons
              filaSeleccionada={fila}
              botones={[
                { label: "Agregar Libro", onClick: () => { setFormValues({}); setModal(true); }, siempreActivo: true, variante: "primary" },
                { label: "Editar Libro", onClick: (f) => { setFormValues(f); setModal(true); }, variante: "secondary" },
                { label: "Eliminar Libro", onClick: (f) => console.log("eliminar", f), variante: "danger" },
              ]}
            />
          }

          <SearchBar
          fields={[
            { key: "documento", label: "Código",          type: "text" },
            { key: "nombre",    label: "Título del Libro",type: "text" },
            { key: "edicion",   label: "Edición",         type: "text" },
          ]}
          onSearch={(f) => console.log(f)}
        />

        <DataTable
          columns={[
            { key: "id_libro", label: "ID" },
            { key: "nombre",   label: "Título del Libro" },
            { key: "autor",    label: "Autor" },
            { key: "disponible", label: "Disponibilidad",
              render: (val) => (
                <span className={val ? "badge--ok" : "badge--no"}>
                  {val ? "Disponible" : "No disponible"}
                </span>
              )
            },
          ]}
          rows={libros}
          onRowClick={(f) => setFila(f)}
        />

        </main>
      </div>
    </div>
  );
}