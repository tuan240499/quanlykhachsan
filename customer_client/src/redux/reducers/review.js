import { STRING } from "../../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case STRING.GET_ALL_REVIEW_BY_USER:
      return action.payload;
    default:
      return state;
  }
};
