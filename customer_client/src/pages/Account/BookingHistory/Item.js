// UI lib
import { Box, Typography, styled, Stack, Link, Button } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import ChatIcon from "@mui/icons-material/Chat";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// UI custom
import Iconify from "../../../components/Iconify";
// logic lib
import { Link as RouterLink } from "react-router-dom";
// logic custom
import { formatNumber } from "../../../utils/Number";
import { formatDate } from "../../../utils/Date";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  marginBottom: 25,
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  [theme.breakpoints.down(922)]: {
    flexDirection: "column",
    height: "fit-content",
  },
}));
const ImageSection = styled("div")(({ theme }) => ({
  width: "30%",
  marginRight: 20,
  [theme.breakpoints.down(922)]: {
    width: "100%",
    height: 200,
  },
}));
const InfoSection = styled("div")(({ theme }) => ({
  width: "70%",
  height: "100%",
  padding: "10px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down(922)]: {
    width: "100%",
    paddingLeft: 20,
  },
  [theme.breakpoints.down(672)]: {
    flexDirection: "column",
  },
}));

const InfoSide = styled("div")(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down(672)]: {
    width: "100%",
  },
}));
const DateSide = styled("div")(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down(672)]: {
    width: "100%",
  },
}));

const HotelName = styled(Link)(({ theme }) => ({
  color: "#252525",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

//#endregion
//----------------------------

const STATUS = [
  {},
  { text: "Đã hủy", icon: "ic:outline-cancel", color: "#FF4842" },
  { text: "Sắp tới", icon: "bytesize:clock", color: "#B78103" },
  { text: "Đã nhận phòng", icon: "bytesize:clock", color: "#00AB55" },
  { text: "Hoàn tất", icon: "eva:checkmark-circle-fill", color: "#00AB55" },
];
const Item = ({ data, setId, setOpenCancelDialog, setOpenRatingDialog }) => {
  const handleCancelBooking = () => {
    setId(data._id);
    setOpenCancelDialog(true);
  };
  const handleOpenRatingDialog = () => {
    setId(data._id);
    setOpenRatingDialog(true);
  };
  return (
    <RootStyle boxShadow={3}>
      <ImageSection>
        <img
          src={data.hotel.images[0]}
          alt="banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </ImageSection>
      <InfoSection>
        {/* INFO SIDE */}
        <InfoSide>
          <HotelName
            variant="h4"
            component={RouterLink}
            to={`/hotel/${data.hotel._id}`}
            underline="hover"
          >
            {data.hotel.name}
          </HotelName>
          <Typography variant="body1">
            Mã số đặt phòng:{" "}
            <span style={{ fontWeight: "bold" }}>#{data.number}</span>
          </Typography>
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="body1" mr={0.5}>
              Tổng tiền:
            </Typography>
            <Typography variant="h5" color="primary" mr={0.5}>
              {formatNumber(data.amount)}
            </Typography>
            <Typography variant="body1">VNĐ</Typography>
          </Stack>
          <Typography>
            Thanh toán:{" "}
            <span style={{ fontWeight: "bold" }}>{data.payment_method}</span>
          </Typography>
          <Typography>
            Số phòng:{" "}
            <span style={{ fontWeight: "bold" }}>{data.room_list.length}</span>
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>{data.adult}</span> Người lớn -{" "}
            <span style={{ fontWeight: "bold" }}>{data.kid}</span> Trẻ em -{" "}
            <span style={{ fontWeight: "bold" }}>{data.baby}</span> Em bé
          </Typography>
          <Stack flexDirection="row" alignItems="center" mb={1}>
            <Iconify
              icon={STATUS[data.status].icon}
              style={{
                width: 20,
                height: 20,
                color: STATUS[data.status].color,
              }}
            />
            <Typography
              variant="body1"
              ml={0.5}
              color={STATUS[data.status].color}
              fontWeight="bold"
            >
              {STATUS[data.status].text}
            </Typography>
          </Stack>
          <Stack flexDirection="row">
            {data.status === 4 &&
              (data.reviewed ? (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ChatIcon />}
                  disabled={true}
                >
                  ĐÃ ĐÁNH GIÁ
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ChatIcon />}
                  style={{ marginRight: 15 }}
                  onClick={handleOpenRatingDialog}
                >
                  ĐÁNH GIÁ
                </Button>
              ))}
            {data.status === 2 && (
              <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<CancelPresentationIcon />}
                onClick={handleCancelBooking}
              >
                HỦY ĐƠN
              </Button>
            )}
          </Stack>
        </InfoSide>
        {/* DATE SIDE */}
        <DateSide>
          <Timeline position="left">
            <TimelineItem>
              <TimelineOppositeContent style={{ flex: 0.1 }}>
                {formatDate(data.created_date, "/")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Đặt phòng</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent style={{ flex: 0.1 }}>
                {formatDate(data.effective_from, "/")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Nhận phòng</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent style={{ flex: 0.1 }}>
                {formatDate(data.effective_to, "/")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Trả phòng</TimelineContent>
            </TimelineItem>
          </Timeline>
        </DateSide>
      </InfoSection>
    </RootStyle>
  );
};

export default Item;
