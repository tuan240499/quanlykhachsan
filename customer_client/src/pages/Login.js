import { useState, useContext } from "react";
// UI lib
import {
  Button,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Typography,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import Iconify from "../components/Iconify";

// Logic lib
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

// UI custom
import Page from "../components/Page";

// Logic custom
import NotificationContext from "../context/Context";
import { login } from "../redux/actions/user";
import { STRING } from "../constants";

// -------------------------------------------

const Login = () => {
  const context = useContext(NotificationContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useLocation().state;

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const isAuthenticated = localStorage.getItem(
  //   STRING.LOCAL_STORAGE_PROFILE_KEY
  // );
  // if (isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <Page title="Đăng nhập | TuanVQ">
      <Container maxWidth="sm" style={{ paddingTop: 20 }}>
        <Box sx={{ boxShadow: 3, borderRadius: 4, padding: 3 }}>
          <Typography variant="h5">Đăng nhập</Typography>
          <Typography variant="body1">
            Xin vui lòng đăng nhập để truy cập
          </Typography>
          {/* <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:google-fill"
                color="#DF3E30"
                sx={{ height: 20, width: 20 }}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:facebook-fill"
                color="#1877F2"
                sx={{ height: 20, width: 20 }}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:twitter-fill"
                color="#1C9CEA"
                sx={{ height: 20, width: 20 }}
              />
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Hoặc tiếp tục với
            </Typography>
          </Divider> */}

          {hasError && (
            <Box
              boxShadow={3}
              style={{
                borderLeft: "5px solid #E12D2D",
                padding: 10,
                marginBottom: 15,
              }}
            >
              <Typography variant="body1">{errorMessage}</Typography>
            </Box>
          )}

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(100, "Tài khoản dài tối đa 100 kí tự")
                .required("Chưa nhập tài khoản"),
              password: Yup.string()
                .min(1, "Mật khẩu dài tối thiểu 6 kí tự")
                .max(100, "Mật khẩu dài tối đa 100 kí tự")
                .required("Chưa nhập mật khẩu"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              if (hasError) setHasError(false);
              dispatch(
                login(
                  { ...values },
                  () => {
                    context.setNotification({
                      type: "success",
                      content: "Đăng nhập thành công",
                    });
                    context.setOpen(true);
                    navigate(state ? state.returnUrl : "/");
                  },
                  (errorMessage) => {
                    setErrorMessage(errorMessage);
                    setHasError(true);
                    setSubmitting(false);
                    window.scroll({ top: 0, left: 0, behavior: "smooth" });
                  }
                )
              );
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Tài khoản"
                  margin="normal"
                  type="text"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                  autoComplete="new-password"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Mật khẩu"
                  margin="normal"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{ marginTop: 2, height: 50 }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting ? true : false}
                >
                  {isSubmitting ? (
                    <CircularProgress style={{ color: "#252525" }} />
                  ) : (
                    "ĐĂNG NHẬP"
                  )}
                </Button>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ my: 2 }}
                >
                  <Link
                    component={RouterLink}
                    variant="body1"
                    to="/register"
                    underline="hover"
                  >
                    Tạo tài khoản
                  </Link>

                  <Link
                    component={RouterLink}
                    variant="body1"
                    to="#"
                    underline="hover"
                  >
                    Quên mật khẩu?
                  </Link>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Page>
  );
};

export default Login;
