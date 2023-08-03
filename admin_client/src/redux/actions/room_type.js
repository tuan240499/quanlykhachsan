import * as api from "../../api/room_type";
import { STRING } from "../../constants";

//ACTION creators
export const createRoomType =
  (roomType, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createRoomType(roomType);
      dispatch({ type: STRING.CREATE_ROOM_TYPE, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(false, error.response.data);
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
export const getAllRoomType =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllRoomType();
      dispatch({ type: STRING.GET_ALL_ROOM_TYPE, payload: data });
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

export const updateRoomType =
  (id, roomType, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateRoomType(id, roomType);
      dispatch({ type: STRING.UPDATE_ROOM_TYPE, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(false, error.response.data);
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const deleteRoomType =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteRoomType(id);
      dispatch({ type: STRING.DELETE_ROOM_TYPE, payload: id });
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
