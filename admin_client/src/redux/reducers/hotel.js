import { STRING } from "../../constants";

const hotel = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_HOTEL:
      return action.payload;
    case STRING.CREATE_HOTEL:
      return [action.payload, ...state];
    case STRING.DELETE_HOTEL:
      return state.filter((hotel) => hotel._id !== action.payload);
    case STRING.UPDATE_HOTEL:
      return state.map((hotel) =>
        hotel._id !== action.payload._id ? hotel : action.payload
      );
    default:
      return state;
  }
};

export default hotel;
