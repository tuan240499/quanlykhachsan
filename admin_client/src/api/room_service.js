import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//SERVICES
export const getAllRoomService = () => API.get("/room_service");
export const createRoomService = (roomService) =>
  API.post("/room_service/new", roomService);
export const deleteRoomService = (id) =>
  API.delete(`/room_service/delete/${id}`);
export const updateRoomService = (id, roomService) =>
  API.put(`/room_service/update/${id}`, roomService);
