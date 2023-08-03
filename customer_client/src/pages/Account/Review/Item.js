// UI lib
import {
  styled,
  Box,
  Typography,
  Divider,
  Rating,
  Stack,
  Button,
} from "@mui/material";
// UI custom
import Iconify from "../../../components/Iconify";
// logic lib
// logic custom
import { formatDate } from "../../../utils/Date";
//#region CSS
const TitleSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down(470)]: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 15,
  },
}));
const ScoreSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down(765)]: {
    flexDirection: "column",
  },
}));
const ScoreWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
//#endregion

//----------------------------
const STATUS = [
  "",
  { text: "Chờ duyệt", color: "primary" },
  { text: "Đã duyệt", color: "success" },
  { text: "Từ chối", color: "error" },
];
const ReviewItem = ({ data }) => {
  return (
    <Box
      boxShadow={2}
      style={{
        backgroundColor: "#FFF",
        borderRadius: 4,
        padding: 20,
        marginBottom: 25,
      }}
    >
      <TitleSection>
        <Stack
          flexDirection="row"
          alignItems="center"
          style={{ marginBottom: 15 }}
        >
          <Rating size="large" value={data.overallScore} readOnly />
          <Typography mx={2}>-</Typography>
          <Typography variant="h5">{`"${data.title}"`}</Typography>
        </Stack>
        <Button
          size="medium"
          color={STATUS[data.status].color}
          variant="contained"
          style={{ color: "#FFF" }}
        >
          {STATUS[data.status].text}
        </Button>
      </TitleSection>
      <Typography variant="body2" color="gray">
        Mã đặt phòng: <span>{data.booking.number}</span>
      </Typography>
      <Typography variant="body2" color="gray">
        Đã nhận xét vào {formatDate(data.created_date)}
      </Typography>
      <Divider
        style={{
          borderBottomWidth: 0.5,
          backgroundColor: "#a8a8a8",
          marginBottom: 15,
          marginTop: 15,
        }}
      />
      <Typography variant="body1" textAlign="justify">
        {data.content}
      </Typography>
      <Divider
        style={{
          borderBottomWidth: 0.5,
          backgroundColor: "#a8a8a8",
          marginBottom: 15,
          marginTop: 15,
        }}
      />
      <ScoreSection>
        <ScoreWrapper>
          <Typography>Sạch sẽ - {data.cleanScore}</Typography>
          <Iconify
            icon="ant-design:star-filled"
            style={{ width: 20, height: 20, color: "#FAAF00" }}
          />
        </ScoreWrapper>
        <Divider
          flexItem
          orientation="vertical"
          style={{
            width: 2,
            backgroundColor: "#a8a8a8",
            marginLeft: 10,
            marginRight: 10,
          }}
        />
        <ScoreWrapper>
          <Typography>Tiện nghi - {data.facilityScore}</Typography>
          <Iconify
            icon="ant-design:star-filled"
            style={{ width: 20, height: 20, color: "#FAAF00" }}
          />
        </ScoreWrapper>
        <Divider
          flexItem
          orientation="vertical"
          style={{
            width: 2,
            backgroundColor: "#a8a8a8",
            marginLeft: 10,
            marginRight: 10,
          }}
        />
        <ScoreWrapper>
          <Typography>Địa điểm - {data.locationScore}</Typography>
          <Iconify
            icon="ant-design:star-filled"
            style={{ width: 20, height: 20, color: "#FAAF00" }}
          />
        </ScoreWrapper>
        <Divider
          flexItem
          orientation="vertical"
          style={{
            width: 2,
            backgroundColor: "#a8a8a8",
            marginLeft: 10,
            marginRight: 10,
          }}
        />
        <ScoreWrapper>
          <Typography>Dịch vụ - {data.serviceScore}</Typography>
          <Iconify
            icon="ant-design:star-filled"
            style={{ width: 20, height: 20, color: "#FAAF00" }}
          />
        </ScoreWrapper>
        <Divider
          flexItem
          orientation="vertical"
          style={{
            width: 2,
            backgroundColor: "#a8a8a8",
            marginLeft: 10,
            marginRight: 10,
          }}
        />
        <ScoreWrapper>
          <Typography>Đáng tiền - {data.valueScore}</Typography>
          <Iconify
            icon="ant-design:star-filled"
            style={{ width: 20, height: 20, color: "#FAAF00" }}
          />
        </ScoreWrapper>
      </ScoreSection>
    </Box>
  );
};

export default ReviewItem;
