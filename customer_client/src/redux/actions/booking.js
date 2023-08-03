import * as api from "../../api/booking";
import { createReview } from "../../api/review";
import { STRING } from "../../constants";

//ACTION creators
export const getAllBookingByUser =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllBookingByUser();
      dispatch({ type: STRING.GET_ALL_BOOKING_BY_USER, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else
        performFailure(
          true,
          "Quý khách vui lòng đăng nhập để sử dụng chức năng này"
        );
    }
  };

export const cancelBooking =
  (bookingId, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.cancelBooking(bookingId);
      dispatch({ type: STRING.CANCEL_BOOKING, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else
        performFailure(
          true,
          "Quý khách vui lòng đăng nhập để sử dụng chức năng này"
        );
    }
  };

export const createNewReview =
  (review, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await createReview(review);
      dispatch({ type: STRING.UPDATE_BOOKING, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
        );
      else
        performFailure(
          true,
          "Quý khách vui lòng đăng nhập để sử dụng chức năng này"
        );
    }
  };
