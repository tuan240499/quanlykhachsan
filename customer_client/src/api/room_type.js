import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getAvailableRoomType = (id, data) =>
  API.post(`/room_type/search/${id}`, data, { withCredentials: false });
