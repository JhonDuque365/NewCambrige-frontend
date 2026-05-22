// AppRouter.jsx — Rutas completas con protección por rol
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage      from "../modules/auth/LoginPage";
import RoleSelectPage from "../modules/Home/RoleSelectPage";

import AdminDashboard    from "../modules/dashboard/AdminDashboard";
import TitularDashboard  from "../modules/dashboard/TitularDashboard";
import TesoreroDashboard from "../modules/dashboard/TesoreroDashboard";
import BandaDashboard    from "../modules/dashboard/BandaDashboard";
import UniformeDashboard from "../modules/dashboard/UniformeDashboard";
import RectoriaDashboard from "../modules/dashboard/RectoriaDashboard";

import TestPage from "../modules/test/testPage";

// ── RUTA PRIVADA ──
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return <Navigate to="/" replace />;
  return children;
};

// ── ROUTER PRINCIPAL ──
const AppRouter = () => {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<LoginPage />} />

      {/* SELECCIÓN DE ROL — cuando el usuario tiene 2+ módulos */}
      <Route path="/home" element={
        <PrivateRoute><RoleSelectPage /></PrivateRoute>
      } />

      {/* DASHBOARDS POR ROL */}
      <Route path="/dashboard/admin" element={
        <PrivateRoute><AdminDashboard /></PrivateRoute>
      } />
      <Route path="/dashboard/titular" element={
        <PrivateRoute><TitularDashboard /></PrivateRoute>
      } />
      <Route path="/dashboard/tesorero" element={
        <PrivateRoute><TesoreroDashboard /></PrivateRoute>
      } />
      <Route path="/dashboard/banda" element={
        <PrivateRoute><BandaDashboard /></PrivateRoute>
      } />
      <Route path="/dashboard/uniforme" element={
        <PrivateRoute><UniformeDashboard /></PrivateRoute>
      } />
      <Route path="/dashboard/rectoria" element={
        <PrivateRoute><RectoriaDashboard /></PrivateRoute>
      } />

      {/* TEST */}
      <Route path="/test" element={<TestPage />} />

      {/* CATCH ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRouter;
