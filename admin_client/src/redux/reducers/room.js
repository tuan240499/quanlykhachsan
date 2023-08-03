import { STRING } from "../../constants";

const room = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_ROOM:
      return action.payload;
    case STRING.CREATE_ROOM:
      return [action.payload, ...state];
    case STRING.DELETE_ROOM:
      return state.filter((room) => room._id !== action.payload);
    case STRING.UPDATE_ROOM:
      return state.map((room) =>
        room._id !== action.payload._id ? room : action.payload
      );
    default:
      return state;
  }
};

export default room;
