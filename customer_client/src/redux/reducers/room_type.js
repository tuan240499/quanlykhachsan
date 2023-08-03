import { STRING } from "../../constants";

export default (state = [], action) => {
  switch (action.type) {
    case STRING.GET_AVAILABLE_ROOM_TYPE:
      return action.payload;
    default:
      return state;
  }
};
