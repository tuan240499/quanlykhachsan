import { STRING } from "../../constants";

const room_type = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_ROOM_TYPE:
      return action.payload;
    case STRING.CREATE_ROOM_TYPE:
      return [action.payload, ...state];
    case STRING.DELETE_ROOM_TYPE:
      return state.filter((room_type) => room_type._id !== action.payload);
    case STRING.UPDATE_ROOM_TYPE:
      return state.map((room_type) =>
        room_type._id !== action.payload._id ? room_type : action.payload
      );
    default:
      return state;
  }
};

export default room_type;
