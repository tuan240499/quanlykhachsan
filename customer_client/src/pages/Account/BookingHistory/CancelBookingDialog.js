import { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NotificationContext from "../../../context/Context";
import { cancelBooking } from "../../../redux/actions/booking";

// ----------------------------
const CancelBookingDialog = ({ open, setOpen, id, setId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(NotificationContext);
  const [doing, setDoing] = useState(false);

  const handleClose = (event, reason) => {
    if (doing) return;
    setId();
    setOpen(false);
  };

  const handleSuccess = () => {
    context.setNotification({
      type: "success",
      content: "Hủy đơn đặt phòng thành công",
    });
    setDoing(false);
    handleClose();
    context.setOpen(true);
  };

  const handleFailure = (needLogin, message) => {
    context.setNotification({
      type: "error",
      content: message,
    });
    context.setOpen(true);
    setDoing(false);
    handleClose();
    if (needLogin)
      navigate("/login", {
        state: { returnUrl: "/account?tab=booking" },
      });
  };

  const handleRestore = () => {
    setDoing(true);
    dispatch(cancelBooking(id, handleSuccess, handleFailure));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">HỦY ĐƠN ĐẶT PHÒNG</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Hành động này sẽ hủy đơn đặt phòng. Quý khách chắc chắn muốn tiếp tục
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          style={{ height: 50 }}
        >
          ĐÓNG
        </Button>
        <Button
          onClick={handleRestore}
          color="error"
          variant="contained"
          style={{ marginLeft: 10, height: 50, minWidth: 110 }}
          disabled={doing}
        >
          {doing ? <CircularProgress color="inherit" /> : "HỦY ĐƠN"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelBookingDialog;
