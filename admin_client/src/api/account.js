import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getAllAccount = () => API.get("/account/list");
export const banAccount = (id, account) =>
  API.put(`/account/ban/${id}`, account);
export const activeAccount = (id, account) =>
  API.put(`/account/active/${id}`, account);
