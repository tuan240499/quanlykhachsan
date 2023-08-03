import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

//SERVICES
export const getAllPeakDay = () => API.get("/peak_day");
