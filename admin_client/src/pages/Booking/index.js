import { useState } from "react";
// UI lib
import { Stack, Typography } from "@mui/material";
// UI custom
import BookingDialog from "./BookingDialog";
import Page from "../../components/Page";
import List from "./BookingList";
// logic lib
// logic custom

//----------------------------

const Booking = () => {
  const [editedId, setEditedId] = useState();
  // BOOKING DIALOG
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    content: "",
    buttonText: "",
    type: "",
    successMessage: "",
  });
  // END BOOKING DIALOG
  return (
    <Page title="Đơn đặt chỗ">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">ĐƠN ĐẶT CHỖ</Typography>
      </Stack>
      <List
        editedId={editedId}
        setEditedId={setEditedId}
        setDialogContent={setDialogContent}
        setOpenBookingDialog={setOpenBookingDialog}
      />
      <BookingDialog
        id={editedId}
        setId={setEditedId}
        open={openBookingDialog}
        setOpen={setOpenBookingDialog}
        dialogContent={dialogContent}
      />
    </Page>
  );
};

export default Booking;
