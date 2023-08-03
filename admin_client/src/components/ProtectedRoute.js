import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/user";
import { useSnackbar } from "notistack";

// -----------------------------------------------
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        enqueueSnackbar("Phiên đăng nhập hết hạn", { variant: "success" });
        navigate("/login", { replace: true });
      });
  }, []);

  return isAuthenticated ? (
    <MainLayout />
  ) : (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default ProtectedRoute;
