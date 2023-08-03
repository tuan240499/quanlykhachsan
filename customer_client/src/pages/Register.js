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

// UI custom
import Page from "../components/Page";
import { PhoneFormatCustom } from "../components/FormattedInput";

// Logic lib
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/user";
// Logic custom
import NotificationContext from "../context/Context";

// -------------------------------------------

const Register = () => {
  const context = useContext(NotificationContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Page title="Đăng ký | TuanVQ">
      <Container maxWidth="sm" style={{ paddingTop: 20 }}>
        <Box sx={{ boxShadow: 3, borderRadius: 4, padding: 3 }}>
          <Typography variant="h5">Đăng ký</Typography>
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
              full_name: "",
              phone: "",
              username: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={Yup.object().shape({
              full_name: Yup.string().max(255).required("Chưa nhập họ và tên"),
              phone: Yup.string()
                .min(10, "Số điện thoại không hợp lệ")
                .max(10, "Số điện thoại không hợp lệ")
                .required("Chưa nhập số điện thoại"),
              username: Yup.string()
                .max(100, "Tài khoản dài tối đa 100 kí tự")
                .required("Chưa nhập tài khoản"),
              password: Yup.string()
                .min(1, "Mật khẩu dài tối thiểu 6 kí tự")
                .max(100, "Mật khẩu dài tối đa 100 kí tự")
                .required("Chưa nhập mật khẩu"),
              confirm_password: Yup.string()
                .max(255)
                .min(1, "Mật khẩu dài tối thiểu 6 kí tự")
                .max(100, "Mật khẩu dài tối đa 100 kí tự")
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
                .required("Chưa nhập mật khẩu"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              if (hasError) setHasError(false);
              dispatch(
                signup(
                  { ...values },
                  () => {
                    context.setNotification({
                      type: "success",
                      content: "Đăng ký thành công",
                    });
                    context.setOpen(true);
                    navigate("/");
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
                  error={Boolean(touched.full_name && errors.full_name)}
                  fullWidth
                  helperText={touched.full_name && errors.full_name}
                  label="Họ và tên"
                  margin="normal"
                  type="text"
                  name="full_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.full_name}
                  variant="outlined"
                  autoComplete="new-password"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Số điện thoại"
                  margin="normal"
                  type="tel"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  variant="outlined"
                  autoComplete="new-password"
                  InputProps={{
                    inputComponent: PhoneFormatCustom,
                  }}
                />
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
                <TextField
                  error={Boolean(
                    touched.confirm_password && errors.confirm_password
                  )}
                  fullWidth
                  helperText={
                    touched.confirm_password && errors.confirm_password
                  }
                  label="Xác nhận mật khẩu"
                  margin="normal"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm_password}
                  variant="outlined"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowConfirmPassword}
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showConfirmPassword
                                ? "eva:eye-fill"
                                : "eva:eye-off-fill"
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
                    "ĐĂNG KÝ"
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
                    to="/login"
                    underline="hover"
                  >
                    Đã có tài khoản?
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

export default Register;
