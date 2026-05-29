import axiosClient from "./axiosClient";

// ── Periodos académicos ──────────────────────────────────────────────────────
export const getPeriodos = () =>
  axiosClient.get("/api/paz-salvo/periodos").then((r) => r.data);

// ── Paz y Salvo ──────────────────────────────────────────────────────────────
export const getPendientes = (periodoId) =>
  axiosClient
    .get("/api/paz-salvo/pendientes", { params: { periodo_id: periodoId } })
    .then((r) => r.data);

// ── Estudiantes ───────────────────────────────────────────────────────────────
export const getEstudiantesPorPeriodo = (periodoId) =>
  axiosClient
    .get(`/api/estudiantes/periodo/${periodoId}`)
    .then((r) => r.data);

export const getEstudiantes = () =>
  axiosClient.get("/api/estudiantes/").then((r) => r.data);

// ── Tesorería ─────────────────────────────────────────────────────────────────
export const getPagosPendientes = (periodoId) =>
  axiosClient
    .get("/api/tesoreria/pagos-pendientes", { params: { periodo_id: periodoId } })
    .then((r) => r.data);

// ── Banda ─────────────────────────────────────────────────────────────────────
export const getEstadisticasBanda = () =>
  axiosClient.get("/api/banda/estadisticas").then((r) => r.data);

export const getInstrumentos = () =>
  axiosClient.get("/api/banda/instrumentos").then((r) => r.data);

export const getPrestamosBanda = () =>
  axiosClient.get("/api/banda/prestamos").then((r) => r.data);

// ── Uniformes ─────────────────────────────────────────────────────────────────
export const getObjetos = () =>
  axiosClient.get("/api/uniformes/objetos").then((r) => r.data);

export const getUniformesPrestamos = () =>
  axiosClient.get("/api/uniformes/prestamos").then((r) => r.data);

// ── Salones ───────────────────────────────────────────────────────────────────
export const getSalonesPorPeriodo = (periodoId) =>
  axiosClient
    .get(`/api/salones/periodo/${periodoId}`)
    .then((r) => r.data);
