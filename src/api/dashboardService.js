// src/api/dashboardService.js
import axiosClient from "./axiosClient";

// Períodos académicos (filtro global)
export const getPeriodos = () =>
  axiosClient.get("/api/paz-salvo/periodos");

// KPI: total estudiantes (sin filtro de período en endpoint, filtramos en frontend)
export const getEstudiantes = () =>
  axiosClient.get("/api/estudiantes/");

// KPI + gráfica: estudiantes por período
export const getEstudiantesPorPeriodo = (idPeriodo) =>
  axiosClient.get(`/api/estudiantes/periodo/${idPeriodo}`);

// KPI + gráfica: paz y salvo pendientes
export const getPendientesPazSalvo = () =>
  axiosClient.get("/api/paz-salvo/pendientes");

// KPI: pagos pendientes
export const getPagosPendientes = () =>
  axiosClient.get("/api/tesoreria/pagos-pendientes");

// Estadísticas banda
export const getEstadisticasBanda = () =>
  axiosClient.get("/api/banda/estadisticas");

// Préstamos activos banda
export const getPrestamosActivosBanda = () =>
  axiosClient.get("/api/banda/prestamos/activos");

// Préstamos activos uniformes
export const getPrestamosActivosUniformes = () =>
  axiosClient.get("/api/uniformes/prestamos/activos");

// Salones por período
export const getSalonesPorPeriodo = (idPeriodo) =>
  axiosClient.get(`/api/salones/periodo/${idPeriodo}`);
