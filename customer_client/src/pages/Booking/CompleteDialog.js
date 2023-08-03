import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  Stack,
} from "@mui/material";
import Lottie from "react-lottie-player";
import lottieJson from "../../__MOCK__/lottie/complete.json";
import { Link } from "react-router-dom";
import { STRING } from "../../constants/index";

const CompleteDialog = ({ open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    if (open) setOpen(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="md"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <DialogContent>
        <Stack flexDirection="column" alignItems="center">
          <Lottie
            loop
            animationData={lottieJson}
            play
            style={{ width: 200, height: 200 }}
          />
          <Typography variant="h4" textAlign="center" mb={2} color="primary">
            CHÚC MỪNG QUÝ KHÁCH ĐÃ ĐẶT PHÒNG THÀNH CÔNG
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              localStorage.removeItem(STRING.LOCAL_STORAGE_BOOKING_INFO)
            }
            component={Link}
            to="/account?tab=booking"
          >
            XEM CHI TIẾT
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteDialog;
