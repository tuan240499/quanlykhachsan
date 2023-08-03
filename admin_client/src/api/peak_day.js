import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//SERVICES
export const getAllPeakDay = () => API.get("/peak_day/admin");
export const createPeakDay = (peakDay) => API.post("/peak_day/new", peakDay);
export const deletePeakDay = (id) => API.delete(`/peak_day/delete/${id}`);
export const updatePeakDay = (id, peakDay) =>
  API.put(`/peak_day/update/${id}`, peakDay);
