import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getAllExpense = () => API.get("/expense/list");
export const createExpense = (expense) => API.post("/expense/new", expense);
export const deleteExpense = (id) => API.delete(`/expense/delete/${id}`);
export const updateExpense = (id, expense) =>
  API.put(`/expense/update/${id}`, expense);
