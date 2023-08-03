import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Grid,
  Box,
  Stack,
  IconButton,
  styled,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SlideTransition from "../../../components/SlideTransition";
import Iconify from "../../../components/Iconify";
import { formatNumber } from "../../../utils/Number";

//#region CSS
const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginBottom: 30,
  [theme.breakpoints.down(888)]: {
    flexDirection: "column",
  },
}));

const ImageSection = styled("div")(({ theme }) => ({
  overflow: "hidden",
  height: 300,
  width: "50%",
  borderRadius: 8,
  position: "relative",
  boxShadow: "0 0 5pt 1pt gray",
  marginRight: 20,
  [theme.breakpoints.down(888)]: {
    width: "100%",
    marginBottom: 10,
  },
}));
const InfoSection = styled("div")(({ theme }) => ({
  overflow: "hidden",
  width: "50%",
  borderRadius: 8,
  [theme.breakpoints.down(888)]: {
    width: "100%",
  },
}));
//#endregion

const Viewer = ({ open, setOpen, data }) => {
  const [curSlide, setCurSlide] = useState(0);
  const MAX = data.images?.length - 1;
  const handlePrev = () => {
    if (curSlide === 0) setCurSlide(MAX);
    else setCurSlide(curSlide - 1);
  };
  const handleNext = () => {
    if (curSlide === MAX) setCurSlide(0);
    else setCurSlide(curSlide + 1);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={SlideTransition}
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <RootStyle>
          {/* IMAGES */}
          <ImageSection>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                padding: "0 10px",
                zIndex: 1,
                top: 0,
                left: 0,
              }}
            >
              <IconButton
                onClick={handlePrev}
                style={{ backgroundColor: "#FFF" }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                style={{ backgroundColor: "#FFF" }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Stack>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                position: "absolute",
                top: 0,
                transition: "left .3s ease",
                left: curSlide * -100 + "%",
              }}
            >
              {data?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="banner"
                  style={{
                    minWidth: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          </ImageSection>
          <InfoSection>
            <Typography variant="h4">{data?.name}</Typography>
            <Typography variant="body1">
              Diện tích: {data?.size} m<sup>2</sup>
            </Typography>
            <Typography>
              Số lượng khách: {data?.adult} người lớn - {data?.kid} trẻ em
            </Typography>
            <Typography>
              Giá thuê: {formatNumber(data.rent_bill)} đ/đêm
            </Typography>
          </InfoSection>
        </RootStyle>
        {/* SERVICES */}
        <Grid container spacing={2}>
          {data?.services?.map((service, index) => (
            <Grid key={index} item xs={6} md={4} lg={3}>
              <Box
                boxShadow={1}
                style={{
                  padding: "15px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Iconify
                  icon={service.icon}
                  style={{ width: 25, height: 25 }}
                />
                <Typography variant="body2" textAlign="center" mt={1}>
                  {service.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Viewer;
