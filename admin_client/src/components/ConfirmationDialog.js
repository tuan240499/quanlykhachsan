import { useState } from "react";
// UI
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  CircularProgress,
} from "@mui/material";
// Logic
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRoomService } from "../redux/actions/room_service";
import { deleteHotel } from "../redux/actions/hotel";
import { deleteRoomType } from "../redux/actions/room_type";
import { deleteRoom } from "../redux/actions/room";
import { deleteBackup } from "../redux/actions/backup";
import { deleteExpense } from "../redux/actions/expense";
import { deleteDiscount } from "../redux/actions/discount";
import { deleteCombo } from "../redux/actions/combo";
import { deletePeakDay } from "../redux/actions/peak_day";

// ----------------------------
const ConfirmationDialog = ({
  title,
  open,
  setOpen,
  id,
  setId,
  deleteType,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [doing, setDoing] = useState(false);

  const handleClose = () => {
    if (doing) return;
    setId();
    setOpen(false);
  };

  const handleSuccess = () => {
    enqueueSnackbar("Xóa thành công", { variant: "success" });
    setDoing(false);
    handleClose();
  };

  const handleFailure = (needLogin, message) => {
    enqueueSnackbar(message, { variant: "error" });
    setDoing(false);
    if (needLogin) navigate("/login", { replace: true });
    handleClose();
  };

  const handleDelete = () => {
    setDoing(true);
    switch (deleteType) {
      case "HOTEL":
        dispatch(deleteHotel(id, handleSuccess, handleFailure));
        break;
      case "ROOM":
        dispatch(deleteRoom(id, handleSuccess, handleFailure));
        break;
      case "ROOM_SERVICE":
        dispatch(deleteRoomService(id, handleSuccess, handleFailure));
        break;
      case "ROOM_TYPE":
        dispatch(deleteRoomType(id, handleSuccess, handleFailure));
        break;
      case "BACKUP":
        dispatch(deleteBackup(id, handleSuccess, handleFailure));
        break;
      case "EXPENSE":
        dispatch(deleteExpense(id, handleSuccess, handleFailure));
        break;
      case "DISCOUNT":
        dispatch(deleteDiscount(id, handleSuccess, handleFailure));
        break;
      case "COMBO":
        dispatch(deleteCombo(id, handleSuccess, handleFailure));
        break;
      case "PEAK_DAY":
        dispatch(deletePeakDay(id, handleSuccess, handleFailure));
        break;
      default:
        alert("Đã xảy ra lỗi, quý khách vui lòng thử lại sau");
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Hành động này sẽ không thể khôi phục. Bạn chắc chắn muốn xóa chứ ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          style={{ height: 50 }}
        >
          HỦY
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          style={{ marginLeft: 10, height: 50, minWidth: 80 }}
          disabled={doing}
        >
          {doing ? <CircularProgress color="inherit" /> : "XÓA"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
