import * as api from "../../api/backup";
import { STRING } from "../../constants";

//ACTION creators

export const createBackup =
  (backup, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.createBackup(backup);
      dispatch({ type: STRING.CREATE_BACKUP, payload: data });
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

export const getAllBackup =
  (performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.getAllBackup();
      dispatch({ type: STRING.GET_ALL_BACKUP, payload: data });
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

export const deleteBackup =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      await api.deleteBackup(id);
      dispatch({ type: STRING.DELETE_BACKUP, payload: id });
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

export const restore =
  (id, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.restore(id);
      dispatch({ type: STRING.RESTORE, payload: data });
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

export const updateBackup =
  (id, backup, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.updateBackup(id, backup);
      dispatch({ type: STRING.UPDATE_BACKUP, payload: data });
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
