import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getAllBooking = () => API.get("/booking/admin/list");
export const checkInBooking = (id) => API.get(`/booking/check-in/${id}`);
export const checkOutBooking = (id) => API.get(`/booking/check-out/${id}`);
export const cancelBooking = (id) => API.get(`/booking/admin/cancel/${id}`);
