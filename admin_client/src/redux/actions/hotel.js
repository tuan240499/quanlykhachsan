import * as api from "../../api/hotel";
import { STRING } from "../../constants";

//ACTION creators
export const createHotel =
  (hotel, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createHotel(hotel);
      dispatch({ type: STRING.CREATE_HOTEL, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          error.response.data ||
            "Đã có lỗi xảy ra, quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const getAllHotel =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllHotel();
      dispatch({ type: STRING.GET_ALL_HOTEL, payload: data });
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

export const deleteHotel =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteHotel(id);
      dispatch({ type: STRING.DELETE_HOTEL, payload: id });
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

export const updateHotel =
  (id, hotel, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateHotel(id, hotel);
      dispatch({ type: STRING.UPDATE_HOTEL, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(
          false,
          error.response.data ||
            "Đã có lỗi xảy ra, quý khách vui lòng thử lại sau"
        );
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
