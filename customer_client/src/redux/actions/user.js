import * as api from "../../api/user";
import { STRING } from "../../constants";

//ACTION creators
export const login =
  (user, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.login(user);
      dispatch({ type: STRING.LOG_IN, payload: data });
      performSuccess();
    } catch (error) {
      if (!error.response)
        performFailure("Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau");
      else performFailure(error.response.data);
    }
  };

export const signup =
  (user, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.signup(user);
      dispatch({ type: STRING.SIGN_UP, payload: data });
      performSuccess();
    } catch (error) {
      if (!error.response)
        performFailure("Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau");
      else performFailure(error.response.data);
    }
  };

export const getInfo = (performSuccess, performFailure) => async (dispatch) => {
  try {
    const { data } = await api.getInfo();
    dispatch({ type: STRING.GET_INFO, payload: data });
    performSuccess();
  } catch (error) {
    console.log("ERROR");
    if (!error.response)
      performFailure("Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau");
    else performFailure(error.response.data);
  }
};

export const logout = (performSuccess, performFailure) => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: STRING.LOG_OUT });
    performSuccess();
  } catch (error) {
    if (!error.response)
      performFailure("Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau");
    else performFailure(error.response.data);
  }
};
