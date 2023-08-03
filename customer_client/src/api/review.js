import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const createReview = (data) => API.post("/review/new", data);
export const getAllReviewByHotel = (id) => API.get(`/review/hotel/${id}`);
export const getAllReviewByPagination = (hotel, page) =>
  API.get(`/review/page/${hotel}&${page}`);
export const getAllReviewByUser = () => API.get("/review/user");
