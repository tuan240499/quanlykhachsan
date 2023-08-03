import * as api from "../../api/account";
import { STRING } from "../../constants";

//ACTION creators
export const getAllAccount =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllAccount();
      dispatch({ type: STRING.GET_ALL_ACCOUNT, payload: data });
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

export const banAccount =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.banAccount(id);
      dispatch({ type: STRING.UPDATE_ACCOUNT, payload: data });
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
export const activeAccount =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.activeAccount(id);
      dispatch({ type: STRING.UPDATE_ACCOUNT, payload: data });
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
