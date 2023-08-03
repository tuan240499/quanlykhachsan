import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getHotelByFilter = (data) =>
  API.post("/hotel/search", data, { withCredentials: false });

export const getHotelById = (id) => API.get(`/hotel/one/${id}`);
