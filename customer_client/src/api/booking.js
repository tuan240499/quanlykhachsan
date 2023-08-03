import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const createBooking = (booking) => API.post("/booking/new", booking);
export const getAllBookingByUser = () => API.get(`/booking/list`);
export const cancelBooking = (bookingId) =>
  API.get(`/booking/cancel/${bookingId}`);
export const createVnpayPaymentUrl = (data) =>
  API.post("/booking/create-vnpay-payment-url", data);
export const createMomoPaymentUrl = (data) =>
  API.post("/booking/create-momo-payment-url", data);
export const checkVnpayPaymentReturn = (data) =>
  API.post("/booking/check-vnpay-payment-return", data);
export const checkMomoPaymentReturn = (data) =>
  API.post("/booking/check-momo-payment-return", data);
