import * as api from "../../api/combo";
import { STRING } from "../../constants";

//ACTION creators
export const createCombo =
  (combo, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createCombo(combo);
      dispatch({ type: STRING.CREATE_COMBO, payload: data });
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
export const getAllCombo =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllCombo();
      dispatch({ type: STRING.GET_ALL_COMBO, payload: data });
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

export const updateCombo =
  (id, combo, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateCombo(id, combo);
      dispatch({ type: STRING.UPDATE_COMBO, payload: data });
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

export const deleteCombo =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteCombo(id);
      dispatch({ type: STRING.DELETE_COMBO, payload: id });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          error.response.data ||
            "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
