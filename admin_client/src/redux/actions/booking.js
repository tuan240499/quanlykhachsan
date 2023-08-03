import * as api from "../../api/booking";
import { STRING } from "../../constants";

//ACTION creators

export const getAllBooking =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllBooking();
      dispatch({ type: STRING.GET_ALL_BOOKING, payload: data });
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

export const checkInBooking =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.checkInBooking(id);
      dispatch({ type: STRING.UPDATE_BOOKING, payload: data });
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
export const checkOutBooking =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.checkOutBooking(id);
      dispatch({ type: STRING.UPDATE_BOOKING, payload: data });
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
export const cancelBooking =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.cancelBooking(id);
      dispatch({ type: STRING.UPDATE_BOOKING, payload: data });
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
