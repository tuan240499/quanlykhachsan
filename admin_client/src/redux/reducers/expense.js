import { STRING } from "../../constants";

const expense = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_EXPENSE:
      return action.payload;
    case STRING.CREATE_EXPENSE:
      return [action.payload, ...state];
    case STRING.DELETE_EXPENSE:
      return state.filter((expense) => expense._id !== action.payload);
    case STRING.UPDATE_EXPENSE:
      return state.map((expense) =>
        expense._id !== action.payload._id ? expense : action.payload
      );
    default:
      return state;
  }
};

export default expense;
