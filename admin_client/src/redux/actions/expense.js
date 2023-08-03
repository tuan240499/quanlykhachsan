import * as api from "../../api/expense";
import { STRING } from "../../constants";

//ACTION creators
export const createExpense =
  (hotel, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createExpense(hotel);
      dispatch({ type: STRING.CREATE_EXPENSE, payload: data });
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

export const getAllExpense =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllExpense();
      dispatch({ type: STRING.GET_ALL_EXPENSE, payload: data });
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

export const deleteExpense =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteExpense(id);
      dispatch({ type: STRING.DELETE_EXPENSE, payload: id });
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

export const updateExpense =
  (id, hotel, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateExpense(id, hotel);
      dispatch({ type: STRING.UPDATE_EXPENSE, payload: data });
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
