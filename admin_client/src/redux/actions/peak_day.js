import * as api from "../../api/peak_day";
import { STRING } from "../../constants";

//ACTION creators
export const createPeakDay =
  (peakDay, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createPeakDay(peakDay);
      dispatch({ type: STRING.CREATE_PEAK_DAY, payload: data });
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
export const getAllPeakDay =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllPeakDay();
      dispatch({ type: STRING.GET_ALL_PEAK_DAY, payload: data });
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

export const updatePeakDay =
  (id, peakDay, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updatePeakDay(id, peakDay);
      dispatch({ type: STRING.UPDATE_PEAK_DAY, payload: data });
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

export const deletePeakDay =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deletePeakDay(id);
      dispatch({ type: STRING.DELETE_PEAK_DAY, payload: id });
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
