import { STRING } from "../../constants";

const user = (state = {}, action) => {
  switch (action.type) {
    case STRING.GET_INFO:
      return action.payload;
    case STRING.LOG_IN:
      localStorage.setItem(
        STRING.LOCAL_STORAGE_PROFILE_KEY,
        JSON.stringify({ ...action.payload })
      );
      return action.payload;
    case STRING.SIGN_UP:
      localStorage.setItem(
        STRING.LOCAL_STORAGE_PROFILE_KEY,
        JSON.stringify({ ...action.payload })
      );
      return action.payload;
    case STRING.LOG_OUT:
      localStorage.clear();
      return null;
    default:
      return state;
  }
};

export default user;
