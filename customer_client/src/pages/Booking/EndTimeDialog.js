import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Link } from "react-router-dom";

const EndTimeDialog = ({ open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: 100, height: 100 }}
            src="/static/logo.jpg"
            alt="logo"
          />
          <Typography variant="h3" mt={2} mb={2} textAlign="center">
            Thời gian giữ phòng đã kết thúc
          </Typography>
          <Typography variant="body1" mt={1} textAlign="center">
            Giá phòng và trạng thái phòng đã có thể thay đổi
          </Typography>
          <Typography variant="body1" mt={0.5} mb={2} textAlign="center">
            Quý khách vui lòng chọn lại phòng để có cập nhật mới nhất
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/hotel"
            style={{ padding: "15px 20px" }}
          >
            CHỌN LẠI PHÒNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndTimeDialog;
