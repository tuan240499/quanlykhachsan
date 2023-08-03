import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getAllReview = () => API.get("/review/list");
export const ignoreReview = (id) => API.get(`/review/ignore/${id}`);
export const acceptReview = (id) => API.get(`/review/accept/${id}`);
export const resetReview = (id) => API.get(`/review/reset/${id}`);
