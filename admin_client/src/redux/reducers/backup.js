import { STRING } from "../../constants";

const backup = (state = [], action) => {
  switch (action.type) {
    case STRING.GET_ALL_BACKUP:
      return action.payload;
    case STRING.CREATE_BACKUP:
      return [action.payload, ...state];
    case STRING.DELETE_BACKUP:
      return state.filter((backup) => backup._id !== action.payload);
    case STRING.RESTORE:
      return state.map((backup) =>
        backup._id !== action.payload._id ? backup : action.payload
      );
    case STRING.UPDATE_BACKUP:
      return state.map((backup) =>
        backup._id !== action.payload._id ? backup : action.payload
      );
    default:
      return state;
  }
};

export default backup;
