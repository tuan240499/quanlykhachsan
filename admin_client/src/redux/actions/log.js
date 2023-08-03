import { getAllLog } from "../../api/log";
import { STRING } from "../../constants";

//ACTION creators
export const getAllLogs =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await getAllLog();
      dispatch({ type: STRING.GET_ALL_LOG, payload: data });
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
