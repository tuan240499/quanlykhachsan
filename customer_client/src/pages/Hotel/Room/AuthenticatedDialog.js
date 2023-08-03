import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AuthenticatedDialog = ({ open, setOpen }) => {
  const returnPath = useLocation().pathname;
  const navigate = useNavigate();
  const handleClose = () => {
    if (open) setOpen(false);
  };
  const handleMoveToLoginPage = () => {
    navigate("/login", {
      state: {
        returnUrl: returnPath + "?tab=room-list",
      },
    });
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>YÊU CẦU ĐĂNG NHẬP</DialogTitle>
      <DialogContent>
        Quý khách vui lòng đăng nhập để thực hiện chức năng này
      </DialogContent>
      <DialogActions>
        <Stack
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="outlined" onClick={handleClose}>
            HỦY
          </Button>
          <Button
            variant="contained"
            onClick={handleMoveToLoginPage}
            style={{ marginLeft: 15 }}
          >
            ĐĂNG NHẬP
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AuthenticatedDialog;
