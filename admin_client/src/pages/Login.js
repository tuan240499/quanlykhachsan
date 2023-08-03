import { useState } from "react";
// UI lib
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Iconify from "../components/Iconify";

// Logic lib
import { useSnackbar } from "notistack";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

// UI custom
import Page from "../components/Page";

// Logic custom
import { login } from "../redux/actions/user";

// -------------------------------------------

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const state = useLocation().state;

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Page title="Đăng nhập | TuanVQ" maxWidth="sm" style={{ paddingTop: 20 }}>
      <Box sx={{ boxShadow: 3, borderRadius: 4, padding: 3 }}>
        <Typography variant="h5">Đăng nhập</Typography>
        <Typography variant="body1">
          Xin vui lòng đăng nhập để truy cập
        </Typography>

        {hasError && (
          <Box
            boxShadow={3}
            style={{
              borderLeft: "5px solid #E12D2D",
              padding: 10,
              marginBottom: 15,
              marginTop: 15,
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
                  enqueueSnackbar("Đăng nhập thành công", {
                    variant: "success",
                  });
                  setSubmitting(false);
                  navigate(state ? state.returnUrl : "/dashboard");
                },
                (errorMessage) => {
                  setErrorMessage(errorMessage);
                  setHasError(true);
                  setSubmitting(false);
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
                sx={{ mt: 2 }}
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
    </Page>
  );
};

export default Login;
