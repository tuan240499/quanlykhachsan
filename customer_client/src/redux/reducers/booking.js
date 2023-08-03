import { STRING } from "../../constants";

export default (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_BOOKING_BY_USER:
      return action.payload;
    case STRING.CANCEL_BOOKING:
      return state.map((booking) =>
        booking._id !== action.payload._id ? booking : action.payload
      );
    case STRING.UPDATE_BOOKING:
      return state.map((booking) =>
        booking._id !== action.payload._id ? booking : action.payload
      );
    default:
      return state;
  }
};
