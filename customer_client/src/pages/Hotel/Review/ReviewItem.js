// UI lib
import { styled, Box, Typography, Divider } from "@mui/material";
// UI custom
// logic lib
// logic custom
import { formatDate } from "../../../utils/Date";
//#region CSS
const InfoSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down(740)]: {
    flexDirection: "column",
  },
}));
//#endregion

//----------------------------
const ReviewItem = ({ data }) => {
  return (
    <Box style={{ paddingBottom: 30 }}>
      <Box
        boxShadow={2}
        style={{ backgroundColor: "#F4F4F4", borderRadius: 4, padding: 20 }}
      >
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          {data.overallScore * 2} - {`"${data.title}"`}
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
        <InfoSection>
          <Typography variant="body2">{data.user.full_name}</Typography>
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
          <Typography variant="body2">
            Phòng gồm {data.booking.adult} người lớn - {data.booking.kid} trẻ em
            - {data.booking.baby} em bé
          </Typography>
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
          <Typography variant="body2">
            Đã ở vào {formatDate(data.booking.effective_from)}
          </Typography>
        </InfoSection>
      </Box>
    </Box>
  );
};

export default ReviewItem;
