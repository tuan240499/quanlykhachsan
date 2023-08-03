import { useMemo } from "react";
// UI lib
import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography,
} from "@mui/material";
// UI custom
import Page from "../../components/Page";
import BookingInfo from "./BookingInfo";
import StepLayout from "./StepLayout";
import EndTimeDialog from "./EndTimeDialog";
import CompleteDialog from "./CompleteDialog";
// logic lib
import { Link } from "react-router-dom";
// logic custom
import { STRING } from "../../constants";
import { useState } from "react";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down(920)]: {
    flexDirection: "column-reverse",
    justifyContent: "center",
  },
}));
//#endregion

//----------------------------
const Booking = () => {
  const data = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_BOOKING_INFO)
  );
  const [open, setOpen] = useState(false);
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
  const isValidBooking = useMemo(
    () => data && Date.now() < data.expire,
    [data]
  );
  return (
    <Page title="Hóa đơn | TuanVQ">
      <Container maxWidth="lg" style={{ paddingTop: 20 }}>
        {isValidBooking ? (
          <RootStyle>
            <StepLayout setOpenCompleteDialog={setOpenCompleteDialog} />
            <BookingInfo data={data} setOpen={setOpen} />
            <EndTimeDialog open={open} setOpen={setOpen} />
            <CompleteDialog
              open={openCompleteDialog}
              setOpen={setOpenCompleteDialog}
            />
          </RootStyle>
        ) : (
          <Stack flexDirection="column" alignItems="center">
            <img src="/static/hotel_list/no-result.webp" alt="not found" />
            <Typography variant="h5" mb={2}>
              Quý khách chưa có đơn đặt chỗ nào
            </Typography>
            <Button variant="outlined" component={Link} to="/hotel">
              TÌM PHÒNG NGAY
            </Button>
          </Stack>
        )}
      </Container>
    </Page>
  );
};

export default Booking;
