import { STRING } from "../../constants";

const combo = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_COMBO:
      return action.payload;
    case STRING.CREATE_COMBO:
      return [action.payload, ...state];
    case STRING.DELETE_COMBO:
      return state.filter((combo) => combo._id !== action.payload);
    case STRING.UPDATE_COMBO:
      return state.map((combo) =>
        combo._id !== action.payload._id ? combo : action.payload
      );
    default:
      return state;
  }
};

export default combo;
