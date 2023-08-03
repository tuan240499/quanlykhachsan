import { combineReducers } from "redux";
import user from "./user";
import hotelList from "./hotelList";
import room_type from "./room_type";
import booking from "./booking";
import review from "./review";
export default combineReducers({
  user,
  hotelList,
  room_type,
  booking,
  review,
});
