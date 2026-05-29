import { useState, useEffect, useCallback } from "react";
import {
  getPeriodos,
  getPendientes,
  getEstudiantes,
  getEstudiantesPorPeriodo,
  getPagosPendientes,
  getEstadisticasBanda,
  getInstrumentos,
  getPrestamosBanda,
  getObjetos,
  getUniformesPrestamos,
  getSalonesPorPeriodo,
} from "../api/dashboardService";

const safe = (promise) =>
  promise.catch(() => null);

export function useDashboard() {
  const [periodos, setPeriodos] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga periodos al inicio
  useEffect(() => {
    getPeriodos()
      .then((list) => {
        setPeriodos(list);
        const activo = list.find((p) => p.activo) ?? list[0];
        if (activo) setPeriodoSeleccionado(activo.id_periodo);
      })
      .catch(() => setError("No se pudo cargar los periodos"));
  }, []);

  const cargarDatos = useCallback(async (pId) => {
    if (!pId) return;
    setLoading(true);
    setError(null);
    try {
      const [pendientes, estudiantes, pagosPendientes, estadBanda, instrumentos, prestamosBanda, objetos, uniformesPrestamos, salones] =
        await Promise.all([
          safe(getPendientes(pId)),
          safe(getEstudiantesPorPeriodo(pId)),
          safe(getPagosPendientes(pId)),
          safe(getEstadisticasBanda()),
          safe(getInstrumentos()),
          safe(getPrestamosBanda()),
          safe(getObjetos()),
          safe(getUniformesPrestamos()),
          safe(getSalonesPorPeriodo(pId)),
        ]);

      // ── Paz y Salvo ──────────────────────────────────────────────────
      const totalEst = estudiantes?.length ?? 0;
      const totalPendientes = pendientes?.length ?? 0;
      const totalFirmados = totalEst - totalPendientes;

      // Conteo de firmas por módulo a partir de pendientes
      const firmaModulos = {
        banda: 0, tesoreria: 0, uniforme: 0, rectoria: 0, secretaria: 0, salon: 0,
      };
      (pendientes ?? []).forEach((e) => {
        Object.keys(firmaModulos).forEach((k) => {
          if (e[k] === false || e[k] === null) firmaModulos[k]++;
        });
      });

      // ── Tesorería ─────────────────────────────────────────────────────
      const totalPagosPend = pagosPendientes?.length ?? 0;
      const totalPagados = totalEst - totalPagosPend;

      // ── Banda ─────────────────────────────────────────────────────────
      const totalInstrumentos = instrumentos?.length ?? 0;
      const disponibles = instrumentos?.filter((i) => i.disponible).length ?? 0;
      const prestados = totalInstrumentos - disponibles;
      const prestamoActivos = prestamosBanda?.filter((p) => !p.fecha_devolucion).length ?? 0;

      // Instrumentos por categoría
      const catMap = {};
      (instrumentos ?? []).forEach((i) => {
        const cat = i.categoria_nombre ?? "Sin categoría";
        catMap[cat] = (catMap[cat] ?? 0) + 1;
      });

      // ── Uniformes ─────────────────────────────────────────────────────
      const totalObjetos = objetos?.length ?? 0;
      const objDisp = objetos?.filter((o) => o.disponible !== false).length ?? 0;
      const prestamosUniActivos = uniformesPrestamos?.filter((p) => !p.fecha_devolucion).length ?? 0;

      // ── Salones ───────────────────────────────────────────────────────
      const totalSalones = salones?.length ?? 0;

      setData({
        kpis: {
          totalEstudiantes: totalEst,
          pazSalvoFirmados: totalFirmados,
          pazSalvoPendientes: totalPendientes,
          totalSalones,
        },
        pazSalvo: {
          firmados: totalFirmados,
          pendientes: totalPendientes,
          firmaModulos,
        },
        tesoreria: {
          pagados: totalPagados,
          pendientes: totalPagosPend,
        },
        banda: {
          totalInstrumentos,
          disponibles,
          prestados,
          prestamoActivos,
          categorias: catMap,
          stats: estadBanda,
        },
        uniformes: {
          totalObjetos,
          disponibles: objDisp,
          prestamosActivos: prestamosUniActivos,
        },
      });
    } catch (e) {
      setError("Error cargando datos del dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (periodoSeleccionado) cargarDatos(periodoSeleccionado);
  }, [periodoSeleccionado, cargarDatos]);

  return { periodos, periodoSeleccionado, setPeriodoSeleccionado, data, loading, error };
}
