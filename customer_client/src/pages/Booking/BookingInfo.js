import { useMemo } from "react";
// UI lib
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// UI custom
import Iconify from "../../components/Iconify";
// logic custom
import { getDiffDays, formatDate } from "../../utils/Date";
import { formatNumber } from "../../utils/Number";
import useCountDown from "../../hooks/useCountDown";
import { INTEGER } from "../../constants";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  width: "40%",
  height: "fit-content",
  borderRadius: 4,
  padding: 15,
  backgroundColor: "#FFF",
  [theme.breakpoints.down(920)]: {
    width: "100%",
    marginBottom: 20,
  },
}));
const AccordionStyle = styled(Accordion)({
  padding: 0,
  boxShadow: "none",
  border: "none",
  "&:before": {
    display: "none",
  },
});

const AccordionSummaryStyle = styled(AccordionSummary)({
  padding: 0,
});

const AccordionDetailsStyle = styled(AccordionDetails)({
  padding: 0,
});
//#endregion

//----------------------------
const BookingInfo = ({ data, setOpen }) => {
  const [timeLeft, setEndTime] = useCountDown(data.expire, () => setOpen(true));
  const diffDays = useMemo(
    () => getDiffDays(new Date(data.startDate), new Date(data.endDate)),
    [data.startDate, data.endDate]
  );

  //TIMER
  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;
  const renderMinutes = minutes < 10 ? "0" + minutes : minutes;
  const renderSeconds = seconds > 9 ? seconds : "0" + seconds;
  return (
    <RootStyle boxShadow={3}>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Thông tin đặt phòng
      </Typography>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">Thời gian giữ phòng</Typography>
        <Typography
          variant="h5"
          fontWeight="bolder"
          color="primary"
        >{`${renderMinutes}:${renderSeconds}`}</Typography>
      </Stack>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      <Typography variant="body1" fontWeight="bold">
        {data.hotelName}
      </Typography>
      {/* SCHEDULE */}
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Box>
          <Typography variant="body2" textAlign="center">
            Nhận phòng
          </Typography>
          <Typography variant="h6" textAlign="center">
            {formatDate(data.startDate)}
          </Typography>
        </Box>
        <Iconify
          icon="ri:building-line"
          sx={{ width: 30, height: 30, color: "primary.main" }}
        />
        <Box>
          <Typography variant="body2" textAlign="center">
            Trả phòng
          </Typography>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            {formatDate(data.endDate)}
          </Typography>
        </Box>
      </Stack>
      {/* NUM PEOPLE */}
      <Stack
        style={{ width: "100%" }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body2">
            Người lớn:{" "}
            <span style={{ fontWeight: "bolder" }}>{data.visitor.adult}</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body2">
            Trẻ em:{" "}
            <span style={{ fontWeight: "bolder" }}>{data.visitor.kid}</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body2">
            Em bé:{" "}
            <span style={{ fontWeight: "bolder" }}>{data.visitor.kid}</span>
          </Typography>
        </Box>
      </Stack>
      {/* DURATION */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số đêm</Typography>
        <Typography variant="body1" fontWeight="bold">
          {diffDays + 1} ngày {diffDays} đêm
        </Typography>
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số phòng</Typography>
        <Typography variant="body1" fontWeight="bold">
          {data.selectedRooms.length}
        </Typography>
      </Stack>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* ROOM LIST */}
      <AccordionStyle defaultExpanded>
        <AccordionSummaryStyle
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Thông tin phòng</Typography>
        </AccordionSummaryStyle>
        <AccordionDetailsStyle>
          {/* LIST */}
          {data.selectedRooms.length > 0 ? (
            data.selectedRooms.map((room, index) => (
              <Stack
                key={index}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="body1" style={{ maxWidth: "60%" }}>
                  <span style={{ fontWeight: "bold" }}>Phòng {index + 1}:</span>{" "}
                  {room.name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  {formatNumber(room.rent_bill)} đ
                </Typography>
              </Stack>
            ))
          ) : (
            <Typography variant="body1">Chưa chọn phòng</Typography>
          )}
        </AccordionDetailsStyle>
      </AccordionStyle>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />

      {/* PRICE */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold">
          Tổng tiền:
        </Typography>
        <Typography variant="h3" color="primary" fontWeight="bold">
          {formatNumber(data.basedAmount)}{" "}
          <span style={{ fontSize: 17 }}>đ</span>
        </Typography>
      </Stack>
      {/* DISCOUNT */}
      {data.discount && (
        <>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Khuyến mãi:
            </Typography>
            <Typography variant="h3" color="primary" fontWeight="bold">
              -{formatNumber(data.discount.value)}
              {data.discount.type === INTEGER.PERCENTAGE_DISCOUNT && "%"}
            </Typography>
          </Stack>
          {/* PRICE AFTER APPLYING DISCOUNT */}
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Sau khuyến mãi:
            </Typography>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {formatNumber(data.amount)}{" "}
              <span style={{ fontSize: 17 }}>đ</span>
            </Typography>
          </Stack>
        </>
      )}
    </RootStyle>
  );
};

export default BookingInfo;
