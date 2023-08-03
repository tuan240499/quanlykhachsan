import * as api from "../../api/discount";
import { STRING } from "../../constants";

//ACTION creators
export const createDiscount =
  (discount, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createDiscount(discount);
      dispatch({ type: STRING.CREATE_DISCOUNT, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(false, error.response.data);
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
export const getAllDiscount =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllDiscount();
      dispatch({ type: STRING.GET_ALL_DISCOUNT, payload: data });
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

export const updateDiscount =
  (id, discount, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateDiscount(id, discount);
      dispatch({ type: STRING.UPDATE_DISCOUNT, payload: data });
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

export const deleteDiscount =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteDiscount(id);
      dispatch({ type: STRING.DELETE_DISCOUNT, payload: id });
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
