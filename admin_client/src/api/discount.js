import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//SERVICES
export const getAllDiscount = () => API.get("/discount");
export const createDiscount = (discount) => API.post("/discount/new", discount);
export const deleteDiscount = (id) => API.delete(`/discount/delete/${id}`);
export const updateDiscount = (id, discount) =>
  API.put(`/discount/update/${id}`, discount);
