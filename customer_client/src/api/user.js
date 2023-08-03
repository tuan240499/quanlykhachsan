import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const checkAuth = () =>
  API.get("/user/check", { withCredentials: true });
export const changePassword = (data) =>
  API.post("/user/change-password", data, { withCredentials: true });
export const updateInfo = (data) =>
  API.post("/user/update", data, { withCredentials: true });
export const getInfo = () => API.get("/user", { withCredentials: true });
export const login = (user) => API.post("/user/login", user);
export const signup = (user) => API.post(`/user/signup`, user);
export const logout = () => API.post("/user/logout");
export const ping = (user) =>
  API.post("/user/ping", user, { withCredentials: true })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
export const upload = (data) =>
  API.post("/user/upload", data, { withCredentials: true });
