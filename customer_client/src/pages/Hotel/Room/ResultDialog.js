import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import SlideTransition from "../../../components/SlideTransition";

const ResultDialog = ({ open, setOpen, children }) => {
  const handleClose = () => {
    if (open) setOpen(false);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={SlideTransition}
    >
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button fullWidth variant="outlined" onClick={handleClose}>
          ĐÓNG
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultDialog;
