import * as api from "../../api/review";
import { STRING } from "../../constants";

//ACTION creators
export const getAllReviewByUser =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllReviewByUser();
      dispatch({ type: STRING.GET_ALL_REVIEW_BY_USER, payload: data });
      performSuccess(data.length);
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
