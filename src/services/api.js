import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.BASE_URL, // Base URL de tu backend Flask
});

export const consultaPorNombre = async (nombre, tipoPersona, ciudad, pagina = 1) => {
  const url = `${config.ENDPOINTS.CONSULTA_NOMBRE}?nombre=${nombre}&tipoPersona=${tipoPersona}&ciudad=${ciudad}&pagina=${pagina}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error en la consulta por nombre:", error);
    throw error;
  }
};

export const consultaPorRadicado = async (numero, pagina = 1) => {
  const url = `${config.ENDPOINTS.CONSULTA_RADICADO}?numero=${numero}&pagina=${pagina}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error en la consulta por radicado:", error);
    throw error;
  }
};

export const detalleProceso = async (idProceso) => {
  const url = `${config.ENDPOINTS.DETALLE_PROCESO}?idProceso=${idProceso}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el detalle del proceso:", error);
    throw error;
  }
};

export const actuacionesProceso = async (idProceso) => {
  const url = `${config.ENDPOINTS.ACTUACIONES_PROCESO}?idProceso=${idProceso}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las actuaciones del proceso:", error);
    throw error;
  }
};

export const documentosActuacion = async (idRegActuacion) => {
  const url = `${config.ENDPOINTS.DOCUMENTOS_ACTUACION}?idRegActuacion=${idRegActuacion}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los documentos de la actuación:", error);
    throw error;
  }
};

export const descargaDocumento = async (idRegDocumento) => {
  const url = `${config.ENDPOINTS.DESCARGA_DOCUMENTO}?idRegDocumento=${idRegDocumento}`;
  try {
    const response = await api.get(url, { responseType: "blob" });
    return response.data;
  } catch (error) {
    console.error("Error al descargar el documento:", error);
    throw error;
  }
};