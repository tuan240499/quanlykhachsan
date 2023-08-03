import { useContext, useState } from "react";
// UI
import {
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  CircularProgress,
  Step,
  Stepper,
  Typography,
  StepContent,
  Box,
  StepLabel,
  Rating,
  Stack,
  TextField,
  DialogActions,
} from "@mui/material";
// Logic
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NotificationContext from "../../../context/Context";
import { createNewReview } from "../../../redux/actions/booking";

// ----------------------------
const RATING_MESSAGE = [
  "",
  "Tệ",
  "Dưới mức mong đợi",
  "Ổn",
  "Tốt",
  "Tuyệt vời",
];
const RatingDialog = ({ open, setOpen, id, setId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(NotificationContext);

  const [doing, setDoing] = useState(false);
  const [overallScore, setOverallScore] = useState(5);
  const [cleanScore, setCleanScore] = useState(5);
  const [locationScore, setLocationScore] = useState(5);
  const [valueScore, setValueScore] = useState(5);
  const [serviceScore, setServiceScore] = useState(5);
  const [facilityScore, setFacilityScore] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // STEP STATES
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // END STEP STATES

  const handleClose = (event, reason) => {
    if (doing) return;
    resetReview();
    setId();
    setOpen(false);
  };

  const resetReview = () => {
    setTitle("");
    setContent("");
    setOverallScore(5);
    setCleanScore(5);
    setLocationScore(5);
    setValueScore(5);
    setServiceScore(5);
    setFacilityScore(5);
    setActiveStep(0);
  };

  const handleSuccess = () => {
    context.setNotification({
      type: "success",
      content: "Gửi đánh giá thành công",
    });
    setDoing(false);
    handleClose();
    context.setOpen(true);
  };

  const handleFailure = (needLogin, message) => {
    context.setNotification({
      type: "error",
      content: message,
    });
    context.setOpen(true);
    setDoing(false);
    if (needLogin)
      navigate("/login", {
        state: { returnUrl: "/account?tab=booking" },
      });
  };

  const handleReview = () => {
    setDoing(true);
    dispatch(
      createNewReview(
        {
          booking: id,
          title: title,
          content: content,
          overallScore: overallScore,
          cleanScore: cleanScore,
          locationScore: locationScore,
          valueScore: valueScore,
          serviceScore: serviceScore,
          facilityScore: facilityScore,
        },
        handleSuccess,
        handleFailure
      )
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">ĐÁNH GIÁ KHÁCH SẠN</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {/* OVERALL */}
          <Step>
            <StepLabel>
              <Typography
                variant="h6"
                color={activeStep === 0 ? "primary" : "#637381"}
              >
                Đánh giá tổng quan
              </Typography>
            </StepLabel>
            <StepContent>
              <Stack flexDirection="row" alignItems="center">
                <Rating
                  size="large"
                  value={overallScore}
                  onChange={(event, value) => setOverallScore(value)}
                />
                <Typography ml={1.5}>
                  {RATING_MESSAGE[overallScore] || "Chưa chọn"}
                </Typography>
              </Stack>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={overallScore === null}
                  >
                    Tiếp theo
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* LIST */}
          <Step>
            <StepLabel>
              <Typography
                variant="h6"
                color={activeStep === 1 ? "primary" : "#637381"}
              >
                Đánh giá chi tiết
              </Typography>
            </StepLabel>
            <StepContent>
              {/* CLEAN */}
              <Typography>Độ sạch sẽ</Typography>
              <Stack
                flexDirection="row"
                alignItems="center"
                style={{ marginBottom: 7 }}
              >
                <Rating
                  size="large"
                  value={cleanScore}
                  onChange={(event, value) => setCleanScore(value)}
                />
                <Typography ml={1.5}>
                  {RATING_MESSAGE[cleanScore] || "Chưa chọn"}
                </Typography>
              </Stack>
              {/* FACILITY */}
              <Typography>Tiện nghi</Typography>
              <Stack
                flexDirection="row"
                alignItems="center"
                style={{ marginBottom: 7 }}
              >
                <Rating
                  size="large"
                  value={facilityScore}
                  onChange={(event, value) => setFacilityScore(value)}
                />
                <Typography ml={1.5}>
                  {RATING_MESSAGE[facilityScore] || "Chưa chọn"}
                </Typography>
              </Stack>
              {/* LOCATION */}
              <Typography>Vị trí</Typography>
              <Stack
                flexDirection="row"
                alignItems="center"
                style={{ marginBottom: 7 }}
              >
                <Rating
                  size="large"
                  value={locationScore}
                  onChange={(event, value) => setLocationScore(value)}
                />
                <Typography ml={1.5}>
                  {RATING_MESSAGE[locationScore] || "Chưa chọn"}
                </Typography>
              </Stack>
              {/* SERVICE */}
              <Typography>Dịch vụ</Typography>
              <Stack
                flexDirection="row"
                alignItems="center"
                style={{ marginBottom: 7 }}
              >
                <Rating
                  size="large"
                  value={serviceScore}
                  onChange={(event, value) => setServiceScore(value)}
                />
                <Typography ml={1.5}>
                  {RATING_MESSAGE[serviceScore] || "Chưa chọn"}
                </Typography>
              </Stack>
              {/* VALUABLE */}
              <Typography>Đáng tiền</Typography>
              <Stack
                flexDirection="row"
                alignItems="center"
                style={{ marginBottom: 7 }}
              >
                <Rating
                  size="large"
                  value={valueScore}
                  onChange={(event, value) => setValueScore(value)}
                />
                <Typography ml={1.5}>
                  {RATING_MESSAGE[valueScore] || "Chưa chọn"}
                </Typography>
              </Stack>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={
                      !cleanScore ||
                      !facilityScore ||
                      !locationScore ||
                      !serviceScore ||
                      !valueScore
                    }
                  >
                    Tiếp theo
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Quay lại
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* FEEDBACK */}
          <Step>
            <StepLabel
              optional={<Typography variant="body2">Bước cuối</Typography>}
            >
              <Typography
                variant="h6"
                color={activeStep === 0 ? "primary" : "#637381"}
              >
                Phản hồi
              </Typography>
            </StepLabel>
            <StepContent>
              <TextField
                label="Tiêu đề"
                variant="outlined"
                type="text"
                size="small"
                name="title"
                fullWidth
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={doing}
              />
              <TextField
                fullWidth
                label="Mô tả"
                multiline
                minRows={4}
                maxRows={Infinity}
                margin="normal"
                type="text"
                size="small"
                name="content"
                onChange={(event) => setContent(event.target.value)}
                value={content}
                variant="outlined"
                autoComplete="new-password"
                disabled={doing}
              />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleReview}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={
                      !title ||
                      !content ||
                      title.trim() === "" ||
                      content.trim() === "" ||
                      doing
                    }
                  >
                    {doing ? (
                      <CircularProgress size={23.4} color="inherit" />
                    ) : (
                      "Gửi đánh giá"
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={doing}
                  >
                    Quay lại
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          disabled={doing}
          size="small"
        >
          HỦY ĐÁNH GIÁ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingDialog;
