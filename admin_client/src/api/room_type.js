import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//SERVICES
export const getAllRoomType = () => API.get("/room_type");
export const getRoomTypeByHotel = (id) => API.get(`/room_type/by_hotel/${id}`);
export const createRoomType = (roomType) =>
  API.post("/room_type/new", roomType);
export const deleteRoomType = (id) => API.delete(`/room_type/delete/${id}`);
export const updateRoomType = (id, roomType) =>
  API.put(`/room_type/update/${id}`, roomType);
