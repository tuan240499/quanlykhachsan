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
import { banAccount, activeAccount } from "../../redux/actions/account";

// ----------------------------
const UserDialog = ({ typeDialog, open, setOpen, id, setId }) => {
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
    enqueueSnackbar(
      typeDialog === "BAN"
        ? "Khóa tài khoản thành công"
        : "Mở khóa tài khoản thành công",
      { variant: "success" }
    );
    setDoing(false);
    handleClose();
  };

  const handleFailure = (needLogin, message) => {
    enqueueSnackbar(message, { variant: "error" });
    setDoing(false);
    if (needLogin)
      navigate("/login", {
        state: { returnUrl: "/user" },
      });
    handleClose();
  };

  const handleDelete = () => {
    setDoing(true);
    switch (typeDialog) {
      case "BAN":
        dispatch(banAccount(id, handleSuccess, handleFailure));
        break;
      case "ACTIVE":
        dispatch(activeAccount(id, handleSuccess, handleFailure));
        break;
      default:
        alert("Đã có lỗi xảy ra");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {typeDialog === "BAN" ? "KHÓA TÀI KHOẢN" : "MỞ KHÓA TÀI KHOẢN"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {typeDialog === "BAN"
            ? "Bạn chắc chắn muốn khóa tài khoản này ?"
            : "Bạn chắc chắn muốn mở khóa tài khoản này ?"}
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
          onClick={handleDelete}
          color={typeDialog === "BAN" ? "error" : "success"}
          variant="contained"
          style={{
            marginLeft: 10,
            height: 50,
            minWidth: 80,
            color: "#FFF",
          }}
          disabled={doing}
        >
          {doing ? (
            <CircularProgress style={{ color: "#FFF" }} />
          ) : typeDialog === "BAN" ? (
            "KHÓA"
          ) : (
            "MỞ KHÓA"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
