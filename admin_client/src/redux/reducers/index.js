import { combineReducers } from "redux";
import user from "./user";
import hotel from "./hotel";
import room from "./room";
import room_type from "./room_type";
import room_service from "./room_service";
import booking from "./booking";
import backup from "./backup";
import expense from "./expense";
import account from "./account";
import log from "./log";
import review from "./review";
import discount from "./discount";
import combo from "./combo";
import peak_day from "./peak_day";

export default combineReducers({
  user,
  hotel,
  room,
  room_service,
  room_type,
  booking,
  expense,
  backup,
  account,
  log,
  review,
  discount,
  combo,
  peak_day,
});
