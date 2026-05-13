import axiosClient from "./axiosClient";

export const allestudiantesRequest = () => axiosClient.get("/api/estudiantes/");
export const allrolesuserRequest = (id) => axiosClient.get(`/api/usuarios/${id}/roles`);
export const allsalonesRequest = () => axiosClient.get("/api/salones/");