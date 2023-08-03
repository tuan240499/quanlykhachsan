import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getAllHotelForForm = () => API.get("/hotel/form");
export const getAllHotel = () => API.get("/hotel/list");
export const createHotel = (hotel) => API.post("/hotel/new", hotel);
export const deleteHotel = (id) => API.delete(`/hotel/delete/${id}`);
export const updateHotel = (id, hotel) => API.put(`/hotel/update/${id}`, hotel);
