import * as api from "../../api/room_service";
import { STRING } from "../../constants";

//ACTION creators
export const createRoomService =
  (roomService, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createRoomService(roomService);
      dispatch({ type: STRING.CREATE_ROOM_SERVICE, payload: data });
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
export const getAllRoomService =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllRoomService();
      dispatch({ type: STRING.GET_ALL_ROOM_SERVICE, payload: data });
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

export const updateRoomService =
  (id, roomService, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateRoomService(id, roomService);
      dispatch({ type: STRING.UPDATE_ROOM_SERVICE, payload: data });
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

export const deleteRoomService =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteRoomService(id);
      dispatch({ type: STRING.DELETE_ROOM_SERVICE, payload: id });
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
