import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//SERVICES
export const getAllRoom = () => API.get("/room/list");
export const createRoom = (room) => API.post("/room/new", room);
export const deleteRoom = (id) => API.delete(`/room/delete/${id}`);
export const updateRoom = (id, room) => API.put(`/room/update/${id}`, room);
