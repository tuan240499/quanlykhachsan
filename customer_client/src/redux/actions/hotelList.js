import * as api from "../../api/hotel";
import { STRING } from "../../constants";

//ACTION creators
export const getHotelByFilter =
  (filter, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getHotelByFilter(filter);
      dispatch({ type: STRING.GET_ALL_HOTEL, payload: data });
      performSuccess(data.length);
    } catch (error) {
      if (!error.response)
        performFailure("Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau");
      else performFailure(error.response.data);
    }
  };
