// UI lib
import { Box, Divider, Grid, Stack, styled, Typography } from "@mui/material";
// UI custom
import Iconify from "../../components/Iconify";

// logic lib

// logic custom
import { HOTEL_SERVICES } from "../../__MOCK__";
import { formatNumber } from "../../utils/Number";

//#region CSS
const TitleStyle = styled(Typography)({
  marginTop: 30,
  marginBottom: 10,
});

const DetailContent = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const DetailRight = styled(Box)(({ theme }) => ({
  width: 300,
  padding: 20,
  borderRadius: 4,
  border: "1px solid gray",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  marginLeft: 20,
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    marginTop: 20,
    width: "100%",
    height: 130,
  },
}));

const ServiceCard = styled(Grid)(({ theme }) => ({
  width: "20%",
}));
//#endregion

//----------------------------

const data = [
  {
    icon: "ant-design:wifi-outlined",
    text: "Wi-Fi miễn phí trong tất cả các phòng!",
  },
  {
    icon: "carbon:clean",
    text: "Dọn phòng hằng ngày",
  },
  {
    icon: "bxs:car",
    text: "Đưa đón sân bay",
  },
  {
    icon: "icon-park-outline:air-conditioning",
    text: "Điều hòa",
  },
  {
    icon: "emojione-monotone:tropical-drink",
    text: "Quán bar",
  },
  {
    icon: "iconoir:gym",
    text: "Gym",
  },
  {
    icon: "cil:pool",
    text: "Hồ bơi 4 mùa",
  },
  {
    icon: "ic:baseline-golf-course",
    text: "Sân golf",
  },
];

const Overview = ({ hotel }) => {
  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      {/* DETAIL */}
      <TitleStyle variant="h4" textTransform="uppercase">
        KHÁCH SẠN {hotel.name}
      </TitleStyle>
      <DetailContent>
        <Typography variant="body1" textAlign="justify" style={{ flex: 1 }}>
          {hotel.description}
        </Typography>
        <DetailRight boxShadow={3}>
          <Stack flexDirection="row" alignItems="center">
            <Iconify icon="bi:crop" style={{ width: 30, height: 30 }} />
            <Typography
              variant="body1"
              style={{ marginRight: 10, marginLeft: 10 }}
            >
              Diện tích:
            </Typography>
            <Typography variant="body1" fontWeight="bold" color="primary">
              {formatNumber(hotel.size)} m<sup>2</sup>
            </Typography>
          </Stack>
          <Divider style={{ width: "80%" }} />
          <Stack flexDirection="row" alignItems="center">
            <Iconify
              icon="ri:door-open-line"
              style={{ width: 30, height: 30 }}
            />
            <Typography
              variant="body1"
              style={{ marginRight: 10, marginLeft: 10 }}
            >
              Số phòng:
            </Typography>
            <Typography variant="body1" fontWeight="bold" color="primary">
              {formatNumber(hotel.numberOfRooms)}
            </Typography>
          </Stack>
        </DetailRight>
      </DetailContent>
      {/* SERVICES */}
      <TitleStyle variant="h4">CÁC TIỆN NGHI NỔI BẬT</TitleStyle>
      <Grid
        container
        style={{
          flexDirection: "row",
          display: "flex",
          borderRadius: 4,
          border: "1px solid #252525",
          padding: 10,
        }}
      >
        {hotel.services.map((item, index) => (
          <ServiceCard
            key={index}
            item
            xs={6}
            sm={6}
            md={3}
            xl={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Iconify
              icon={HOTEL_SERVICES[item].icon}
              sx={{ width: 40, height: 40, color: "primary.main" }}
            />
            <Typography variant="body1" textAlign="center">
              {HOTEL_SERVICES[item].name}
            </Typography>
          </ServiceCard>
        ))}
      </Grid>
    </Box>
  );
};

export default Overview;
