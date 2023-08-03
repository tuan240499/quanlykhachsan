import { useState } from "react";
// UI lib
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  styled,
  Backdrop,
  CircularProgress,
  Stack,
} from "@mui/material";
// UI custom
import UserInfo from "./UserInfo";
import PaymentMethod from "./PaymentMethod";
// logic lib

// logic custom

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  width: "60%",
  marginRight: 20,
  [theme.breakpoints.down(920)]: {
    width: "100%",
  },
}));
//#endregion

//----------------------------

const StepLayout = ({ setOpenCompleteDialog }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <RootStyle>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={paymentProcessing}
      >
        <Stack flexDirection="column" alignItems="center">
          <CircularProgress style={{ color: "#FFF" }} />
          <Typography textAlign="center" variant="h6">
            Quý khách vui lòng chờ trong giây lát
          </Typography>
          <Typography textAlign="center" variant="h6">
            Thanh toán đang được thực hiện...
          </Typography>
        </Stack>
      </Backdrop>
      <Stepper activeStep={activeStep} orientation="vertical">
        {/* USER INFO */}
        <Step>
          <StepLabel>
            <Typography
              variant="h6"
              color={activeStep === 0 ? "primary" : "#637381"}
            >
              Thông tin khách hàng
            </Typography>
          </StepLabel>
          <StepContent>
            <UserInfo />
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                Tiếp tục
              </Button>
            </Box>
          </StepContent>
        </Step>
        {/* PAYMENT METHOD */}
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Bước cuối</Typography>}
          >
            <Typography
              variant="h6"
              color={activeStep === 1 ? "primary" : "#637381"}
            >
              Chi tiết thanh toán
            </Typography>
          </StepLabel>
          <StepContent>
            <PaymentMethod
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              setOpenCompleteDialog={setOpenCompleteDialog}
              paymentProcessing={paymentProcessing}
              setPaymentProcessing={setPaymentProcessing}
            />
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleBack}
                sx={{ mt: 2, mr: 1 }}
              >
                Quay lại
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </RootStyle>
  );
};

export default StepLayout;
