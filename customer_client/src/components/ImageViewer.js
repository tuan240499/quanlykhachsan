import { useState } from "react";
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import SlideTransition from "./SlideTransition";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ImageViewer = ({ images, open, setOpen }) => {
  const [curSlide, setCurSlide] = useState(0);
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const MAX = images.length - 1;
  const handlePrev = () => {
    if (curSlide === 0) setCurSlide(MAX);
    else setCurSlide(curSlide - 1);
  };
  const handleNext = () => {
    if (curSlide === MAX) setCurSlide(0);
    else setCurSlide(curSlide + 1);
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={SlideTransition}
      fullWidth
      maxWidth="md"
    >
      <div
        style={{
          width: "100%",
          height: 500,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: curSlide * -100 + "%",
            transition: "left .4s ease",
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="detailed iamge"
              style={{
                minWidth: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ height: "100%", padding: "0 10px" }}
        >
          <IconButton onClick={handlePrev} style={{ backgroundColor: "#FFF" }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={handleNext} style={{ backgroundColor: "#FFF" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </div>
    </Dialog>
  );
};

export default ImageViewer;
