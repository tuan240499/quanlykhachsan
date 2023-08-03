import * as api from "../../api/review";
import { STRING } from "../../constants";

//ACTION creators
export const getAllReview =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllReview();
      dispatch({ type: STRING.GET_ALL_REVIEW, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
export const acceptReview =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.acceptReview(id);
      dispatch({ type: STRING.UPDATE_REVIEW, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const ignoreReview =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.ignoreReview(id);
      dispatch({ type: STRING.UPDATE_REVIEW, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const resetReview =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.resetReview(id);
      dispatch({ type: STRING.UPDATE_REVIEW, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
