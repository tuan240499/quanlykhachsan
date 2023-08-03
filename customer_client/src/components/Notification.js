import { useContext } from "react";
import { Slide, Snackbar } from "@mui/material";
import { forwardRef } from "react";
import NotificationContext from "../context/Context";
import MuiAlert from "@mui/material/Alert";

const Transition = forwardRef((props, ref) => {
  return <Slide {...props} direction="down" />;
});

const MyAlert = forwardRef(function MyAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const context = useContext(NotificationContext);
  const notification = context.notification;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    context.setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={context.open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <MyAlert onClose={handleClose} severity={notification.type}>
        {notification.content}
      </MyAlert>
    </Snackbar>
  );
};

export default Notification;
