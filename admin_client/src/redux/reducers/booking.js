import { STRING } from "../../constants";

const booking = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_BOOKING:
      return action.payload;
    case STRING.CREATE_BOOKING:
      return [action.payload, ...state];
    case STRING.DELETE_BOOKING:
      return state.filter((booking) => booking._id !== action.payload);
    case STRING.UPDATE_BOOKING:
      return state.map((booking) =>
        booking._id !== action.payload._id ? booking : action.payload
      );
    // return state.map((room_type) =>
    //   room_type._id !== action.payload._id ? room_type : action.payload
    // );
    default:
      return state;
  }
};

export default booking;
