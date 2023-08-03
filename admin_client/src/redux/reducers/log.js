import { STRING } from "../../constants";

const log = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_LOG:
      return action.payload;
    default:
      return state;
  }
};

export default log;
