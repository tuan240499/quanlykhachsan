import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const login = (user) => API.post("/admin/login", user);
export const signup = (user) => API.post(`/admin/signup`, user);
export const logout = () => API.post("/admin/logout");
export const checkAuth = () => API.get("/admin/auth");

export const changePassword = (data) =>
  API.post("/admin/change-password", data);
export const updateInfo = (data) => API.post("/admin/update", data);
export const getInfo = () => API.get("/admin");

// management
export const getAllUserForForm = () => API.get("/admin/user/list/form");
