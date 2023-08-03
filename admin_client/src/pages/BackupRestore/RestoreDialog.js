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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { restore } from "../../redux/actions/backup";

// ----------------------------
const RestoreDialog = ({ open, setOpen, id, setId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [doing, setDoing] = useState(false);

  const handleClose = (event, reason) => {
    if (doing) return;
    // if (reason && reason == "backdropClick") return;
    setId();
    setOpen(false);
  };

  const handleSuccess = () => {
    enqueueSnackbar("Khôi phục dữ liệu thành công", { variant: "success" });
    setDoing(false);
    handleClose();
  };

  const handleFailure = (needLogin, message) => {
    enqueueSnackbar(message, { variant: "error" });
    setDoing(false);
    if (needLogin)
      navigate("/login", {
        state: { returnUrl: "/backup-restore" },
      });
    handleClose();
  };

  const handleRestore = () => {
    setDoing(true);
    dispatch(restore(id, handleSuccess, handleFailure));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        KHÔI PHỤC DỮ LIỆU HỆ THỐNG
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Dữ liệu hiện tại của hệ thống sẽ mất và khôi phục dữ liệu sao lưu. Bạn
          chắc chắn muốn tiếp tục chứ ?
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
          onClick={handleRestore}
          color="error"
          variant="contained"
          style={{ marginLeft: 10, height: 50, minWidth: 110 }}
          disabled={doing}
        >
          {doing ? <CircularProgress color="inherit" /> : "KHÔI PHỤC"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestoreDialog;
