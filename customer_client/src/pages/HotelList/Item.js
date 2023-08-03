// UI lib
import {
  Box,
  Stack,
  styled,
  Typography,
  Tooltip,
  IconButton,
  Button,
  Rating,
  Link,
} from "@mui/material";

// UI custom
import Iconify from "../../components/Iconify";
// logic lib
import { Link as RouterLink } from "react-router-dom";
// logic custom
import { HOTEL_SERVICES } from "../../__MOCK__";
import { formatNumber } from "../../utils/Number";
//#region CSS
const ItemStyle = styled(Box)(({ theme }) => ({
  borderRadius: 4,
  // boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  boxShadow: "0 1px 2px 1px gray",
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 30,
  height: 293,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "fit-content",
  },
  "&::after": {
    content: '""',
    borderRadius: 5,
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxShadow: "0 4px 10px 0px gray",
    opacity: 0,
    transition: "opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
  },
  "&:hover::after": {
    opacity: 1,
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  width: "35%",
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  overflow: "hidden",
  marginRight: 10,
  [theme.breakpoints.down("md")]: {
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    width: "100%",
    height: 300,
  },
}));
const InfoSection = styled(Box)(({ theme }) => ({
  width: "65%",
  // backgroundColor: "yellowgreen",
  padding: 10,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const TitleSection = styled(Link)(({ theme }) => ({
  color: "#252525",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const ServiceStyle = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
}));
//#endregion

//----------------------------

const BookingItem = ({ setOpenImageViewer, setImages, hotel }) => {
  return (
    <ItemStyle>
      {/* Images */}
      <ImageSection>
        <img
          style={{
            height: "70%",
            width: "100%",
            objectFit: "cover",
            marginBottom: 1,
          }}
          src={hotel.images[0]}
          alt="detail"
        />
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          style={{
            height: "30%",
            width: "100%",
          }}
        >
          <img
            style={{
              height: "100%",
              width: "33.333%",
              objectFit: "cover",
            }}
            src={hotel.images[1]}
            alt="detail"
          />
          <img
            style={{
              height: "100%",
              width: "33.333%",
              objectFit: "cover",
              marginLeft: 1,
              marginRight: 1,
            }}
            src={hotel.images[2]}
            alt="detail"
          />
          <Box
            style={{ height: "100%", width: "33.333%", position: "relative" }}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              src={hotel.images[3]}
              alt="detail"
            />
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                backgroundColor: "rgba(0, 0, 0, 0.65 )",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setImages(hotel.images);
                setOpenImageViewer(true);
              }}
            >
              <Typography color="#FFF" textAlign="center" fontWeight="bold">
                Xem tất cả
              </Typography>
            </div>
          </Box>
        </Stack>
      </ImageSection>
      <InfoSection>
        {/* Hotel name */}
        <TitleSection
          variant="h4"
          component={RouterLink}
          to={`/hotel/${hotel._id}`}
          fontWeight="bold"
          underline="hover"
        >
          {hotel.name}
        </TitleSection>
        {/* Address */}
        <Stack flexDirection="row" alignItems="center">
          <Iconify icon="carbon:location-star-filled" color="#252525" />
          <Typography variant="body2">{hotel.address}</Typography>
        </Stack>

        {/* Services */}
        <Stack flexDirection="row" sx={{ my: 1 }}>
          {hotel.services.map((service, index) => (
            <Tooltip
              key={index}
              title={HOTEL_SERVICES[service].name}
              arrow
              placement="top"
            >
              <ServiceStyle>
                <Iconify icon={HOTEL_SERVICES[service].icon} color="#252525" />
              </ServiceStyle>
            </Tooltip>
          ))}
        </Stack>
        {/* Rating */}
        <Stack flexDirection="row" alignItems="center">
          <Rating
            name="half-rating"
            value={hotel.score}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2" style={{ color: "#9E9E9E" }}>
            ({hotel.count_review} đánh giá)
          </Typography>
        </Stack>
        {/* HOT */}
        {/* <Stack flexDirection="row" alignItems="center">
          <Iconify
            sx={{ color: "error.main", marginRight: 1 }}
            icon="bi:flag-fill"
          />
          <Typography variant="body2" fontWeight="bold" color="error">
            Chỉ còn 2 phòng, hãy nhanh tay đặt phòng nào!
          </Typography>
        </Stack> */}
        {/* Price */}
        <Stack flexDirection="column" alignItems="flex-end">
          <Stack flexDirection="row" alignItems="center">
            <Typography variant=" ">Chỉ từ</Typography>
            <Typography
              variant="h3"
              color="primary"
              style={{
                marginLeft: 10,
                marginRight: 10,
                fontFamily: "revert",
              }}
            >
              {formatNumber(hotel.min_price)}
            </Typography>
            <Typography variant="h6" color="primary">
              ₫
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            style={{ marginTop: 5, marginBottom: 15 }}
          >
            phòng/đêm
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/hotel/${hotel._id}`}
            style={{ display: "flex", alignItems: "center", padding: 10 }}
          >
            <Typography variant="body1" fontWeight="bold">
              CHI TIẾT
            </Typography>{" "}
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              style={{ width: 22, height: 22 }}
            />
          </Button>
        </Stack>
      </InfoSection>
    </ItemStyle>
  );
};

export default BookingItem;
