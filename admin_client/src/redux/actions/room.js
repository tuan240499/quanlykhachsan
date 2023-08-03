import * as api from "../../api/room";
import { STRING } from "../../constants";

//ACTION creators
export const createRoom =
  (hotel, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createRoom(hotel);
      dispatch({ type: STRING.CREATE_ROOM, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(false, error.response.data);
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };

export const getAllRoom =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllRoom();
      dispatch({ type: STRING.GET_ALL_ROOM, payload: data });
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

export const deleteRoom =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteRoom(id);
      dispatch({ type: STRING.DELETE_ROOM, payload: id });
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

export const updateRoom =
  (id, hotel, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateRoom(id, hotel);
      dispatch({ type: STRING.UPDATE_ROOM, payload: data });
      performSuccess();
    } catch (error) {
      console.log(error);
      if (!error.response || error.response.status !== 401)
        performFailure(false, error.response.data);
      else performFailure(true, "Phiên đăng nhập hết hạn");
    }
  };
