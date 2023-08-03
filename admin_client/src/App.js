import "./App.css";
// snackbar
import { styled } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SnackbarProvider } from "notistack";
// routes
import ScrollToTop from "./components/ScrollToTop";
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

// styles
const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-variantError {
    background: #ff4842;
  }
  ,
  &.SnackbarItem-variantWarning {
    background-color: #ffc107;
  }
  ,
  &.SnackbarItem-variantSuccess {
    background-color: #00ab55;
  }
  ,
  &.SnackbarItem-variantInfo {
    background-color: #1890ff;
  }
`;
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <StyledSnackbarProvider
        iconVariant={{
          success: <CheckCircleOutlineIcon style={{ marginRight: 5 }} />,
          error: <ErrorOutlineIcon style={{ marginRight: 5 }} />,
          warning: <WarningAmberIcon style={{ marginRight: 5 }} />,
          info: <InfoOutlinedIcon style={{ marginRight: 5 }} />,
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        maxSnack={2}
      >
        <ScrollToTop />
        <GlobalStyles />
        <Router />
      </StyledSnackbarProvider>
    </ThemeConfig>
  );
}
