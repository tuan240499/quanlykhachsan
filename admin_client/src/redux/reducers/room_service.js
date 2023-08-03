import { STRING } from "../../constants";

const room_service = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_ROOM_SERVICE:
      return action.payload;
    case STRING.CREATE_ROOM_SERVICE:
      return [action.payload, ...state];
    case STRING.DELETE_ROOM_SERVICE:
      return state.filter(
        (room_service) => room_service._id !== action.payload
      );
    case STRING.UPDATE_ROOM_SERVICE:
      return state.map((room_service) =>
        room_service._id !== action.payload._id ? room_service : action.payload
      );
    default:
      return state;
  }
};

export default room_service;
