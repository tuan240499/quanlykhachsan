import { STRING } from "../../constants";

const review = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_REVIEW:
      return action.payload;
    case STRING.UPDATE_REVIEW:
      return state.map((review) =>
        review._id !== action.payload._id ? review : action.payload
      );
    default:
      return state;
  }
};

export default review;
