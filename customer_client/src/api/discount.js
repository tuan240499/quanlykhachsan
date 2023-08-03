import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const checkDiscount = (discount) =>
  API.post("/discount/check", discount);
export const getDiscountByUser = () => API.get("/discount/user");
