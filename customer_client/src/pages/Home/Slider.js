import { useState } from "react";
// UI lib
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// logic lib
import { Link as RouterLink } from "react-router-dom";
// logic custom
import useReponsive from "../../theme/useReponsive";

const ContainerStyle = styled(Container)({
  paddingTop: 40,
  paddingBottom: 40,
  position: "relative",
});

const SlideWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 350,
  overflow: "visible",
  position: "relative",
  top: 0,
  transition: "left .5s ease",
  [theme.breakpoints.down(945)]: {
    height: 300,
  },
}));

const LinkStyle = styled(Link)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 4,
});

const ImgStyle = styled("img")({
  objectFit: "cover",
  height: "100%",
  width: "100%",
  borderRadius: 8,
  position: "absolute",
  zIndex: 2,
  top: 0,
});

const data = [
  {
    location: 38,
    title: "Đà Lạt",
    path: "/static/home/dalat.webp",
  },
  {
    location: 47,
    title: "Hội An",
    path: "/static/home/hoian.jpg",
  },
  {
    location: 15,
    title: "Đà Nẵng",
    path: "/static/home/danang.jpg",
  },
  {
    location: 24,
    title: "Hà Nội",
    path: "/static/home/hanoi.jpeg",
  },
  {
    location: 57,
    title: "Huế",
    path: "/static/home/hue.jpg",
  },
  {
    location: 32,
    title: "Nha Trang",
    path: "/static/home/nhatrang.jpg",
  },
  {
    location: 2,
    title: "Vũng Tàu",
    path: "/static/home/vungtau.jpg",
  },

  {
    location: 30,
    title: "Hồ Chí Minh",
    path: "/static/home/hochiminh.jpg",
  },
  {
    location: 33,
    title: "Đảo Phú Quốc",
    path: "/static/home/phuquoc.png",
  },
];

const Slider = () => {
  const [curSlide, setCurSlide] = useState(0);

  const isTablet = useReponsive("down", 945);
  const offset = isTablet ? 52 : 34;
  const itemPerScreen = isTablet ? 2 : 3;

  const getLeft = (input) => input * offset + "%";
  const rearIndex = data.length - itemPerScreen;
  const handleNext = () => {
    if (curSlide > rearIndex * -1) setCurSlide(curSlide - 1);
    else setCurSlide(0);
  };
  const handlePrev = () => {
    if (curSlide !== 0) setCurSlide(curSlide + 1);
    else setCurSlide(rearIndex * -1);
  };
  return (
    <ContainerStyle maxWidth="lg">
      <Typography variant="h4">TOP ĐIỂM DU LỊCH VIỆT NAM</Typography>
      <Typography variant="body1" style={{ marginBottom: 20 }}>
        Trải nghiệm du lịch cùng TUANVU COTO HOTEL theo cách hoàn toàn mới
      </Typography>
      <SlideWrapper style={{ left: getLeft(curSlide) }}>
        {data.map((slide, index) => (
          <Box
            boxShadow={5}
            key={index}
            style={{
              left: getLeft(index),
              width: isTablet ? "48%" : "32%",
              height: isTablet ? 300 : 350,
              position: "absolute",
              top: 0,
              borderRadius: 8,
            }}
          >
            <LinkStyle
              component={RouterLink}
              to={`/hotel?locationId=${slide.location}`}
            ></LinkStyle>
            <ImgStyle src={slide.path} alt="banner" />
            <Box
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.05) 70%,rgba(0,0,0,.9))",
                position: "absolute",
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8,
                bottom: 0,
                display: "flex",
                alignItems: "flex-end",
                zIndex: 3,
              }}
            >
              <Stack
                style={{ width: "100%", padding: 20 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" color="#FFF">
                  {slide.title}
                </Typography>
                <ArrowForwardIosIcon style={{ color: "#FFF" }} />
              </Stack>
            </Box>
          </Box>
        ))}
      </SlideWrapper>
      <Box
        style={{
          marginTop: 20,
          width: "100%",
          //   backgroundColor: "gray",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon style={{ color: "#000" }} />
          </IconButton>
          {[...Array(rearIndex + 1)].map((item, index) => (
            <FiberManualRecordIcon
              key={index}
              sx={{
                transition: "font-size .3s ease",
                fontSize: curSlide === index * -1 ? 20 : 15,
                color: curSlide === index * -1 ? "#000" : "#9E9E9E",
              }}
            />
          ))}
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon style={{ color: "#000" }} />
          </IconButton>
        </Stack>
      </Box>
    </ContainerStyle>
  );
};

export default Slider;
