import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { formatNumber } from "../../../utils/Number";

const NotEnoughDialog = ({ open, setOpen, data }) => {
  const handleClose = () => {
    if (open) setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <Typography variant="h5" textAlign="center">
          Một số phòng không đáp ứng số lượng yêu cầu
        </Typography>
        <Typography variant="h6" textAlign="center" mb={2}>
          Quý khách vui lòng thay đổi số lượng phòng
        </Typography>
        {data.map((item, index) => (
          <Typography key={index} variant="body1">
            {item.name} - {formatNumber(item.rent_bill)}VNĐ được yêu cầu{" "}
            <span style={{ fontWeight: 900 }}>
              {item.requested_count} phòng
            </span>{" "}
            <span style={{ fontWeight: 900, color: "#FF4842" }}>
              còn {item.actual_count} phòng
            </span>
          </Typography>
        ))}
        <Stack flexDirection="row" justifyContent="center">
          <Button
            variant="contained"
            style={{ padding: 5, marginTop: 20 }}
            onClick={handleClose}
          >
            OK
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NotEnoughDialog;
