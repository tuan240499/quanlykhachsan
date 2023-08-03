import { useState, useEffect, useContext } from "react";
// UI lib
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Skeleton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

// UI custom
import Iconify from "../../components/Iconify";
// logic lib
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// logic custom
import NotificationContext from "../../context/Context";
import { changePassword } from "../../api/user";
import { formatDate } from "../../utils/Date";
import { getDeviceSpec } from "../../utils/Device";
//#region CSS
const ItemStyle = styled(Box)(({ theme }) => ({
  flex: 1,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
  padding: 15,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down(675)]: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
}));
//#endregion

//----------------------------
const LoadingList = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        animation="wave"
        style={{
          width: "100%",
          height: 100,
          marginBottom: 20,
          borderRadius: 4,
        }}
      ></Skeleton>
      <Skeleton
        variant="rectangular"
        animation="wave"
        style={{
          width: "100%",
          height: 100,
          marginBottom: 20,
          borderRadius: 4,
        }}
      ></Skeleton>
    </>
  );
};

const Authentication = () => {
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  //creating IP state
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //creating function to load ip address from the API
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      const res = await axios.get("https://geolocation-db.com/json/", {
        withCredentials: false,
      });
      if (isMounted) {
        setInfo(res.data);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Đổi mật khẩu
      </Typography>
      {/* CHANGE PW */}
      <Box
        style={{
          width: "100%",
          padding: 20,
          borderRadius: 4,
          boxShadow: "0 0 2pt 0pt gray",
        }}
      >
        <Formik
          initialValues={{
            current_password: "",
            new_password: "",
            confirm_new_password: "",
          }}
          validationSchema={Yup.object().shape({
            current_password: Yup.string()
              .min(1, "Mật khẩu dài tối thiểu 6 kí tự")
              .max(100, "Mật khẩu dài tối đa 100 kí tự")
              .required("Chưa nhập mật khẩu"),
            new_password: Yup.string()
              // .min(6, "Mật khẩu dài tối thiểu 6 kí tự")
              // .max(100, "Mật khẩu dài tối đa 100 kí tự")
              .required("Chưa nhập mật khẩu"),
            confirm_new_password: Yup.string()
              // .min(6, "Mật khẩu dài tối thiểu 6 kí tự")
              // .max(100, "Mật khẩu dài tối đa 100 kí tự")
              .oneOf([Yup.ref("new_password"), null], "Mật khẩu không khớp")
              .required("Chưa nhập mật khẩu"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            changePassword(values)
              .then((res) => {
                context.setNotification({
                  type: "success",
                  content: "Đổi mật khẩu thành công",
                });
                context.setOpen(true);
                setSubmitting(false);
                resetForm();
              })
              .catch((err) => {
                context.setNotification({
                  type: "error",
                  content: err.response.data,
                });
                context.setOpen(true);
                setSubmitting(false);
                if (err.response.status === 401) {
                  navigate("/login", {
                    state: { returnUrl: "/account?tab=security" },
                  });
                }
              });
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
                error={Boolean(
                  touched.current_password && errors.current_password
                )}
                fullWidth
                helperText={touched.current_password && errors.current_password}
                label="Mật khẩu"
                margin="normal"
                name="current_password"
                type={showCurrentPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.current_password}
                variant="outlined"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showCurrentPassword
                              ? "eva:eye-fill"
                              : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={Boolean(touched.new_password && errors.new_password)}
                fullWidth
                helperText={touched.new_password && errors.new_password}
                label="Mật khẩu mới"
                margin="normal"
                name="new_password"
                type={showNewPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.new_password}
                variant="outlined"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showNewPassword
                              ? "eva:eye-fill"
                              : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={Boolean(
                  touched.confirm_new_password && errors.confirm_new_password
                )}
                fullWidth
                helperText={
                  touched.confirm_new_password && errors.confirm_new_password
                }
                label="Xác nhận mật khẩu mới"
                margin="normal"
                name="confirm_new_password"
                type={showConfirmNewPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirm_new_password}
                variant="outlined"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showConfirmNewPassword
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
                type="submit"
                variant="contained"
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? (
                  <CircularProgress style={{ color: "#252525" }} />
                ) : (
                  "LƯU THAY ĐỔI"
                )}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      {/* SESSIONS */}
      <Typography variant="h4" style={{ marginTop: 50, marginBottom: 6 }}>
        Phiên đăng nhập
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 20 }}>
        Danh sách các thiết bị đã đăng nhập vào tài khoản của bạn
      </Typography>
      {/* ITEM LIST */}
      {isLoading ? (
        <LoadingList />
      ) : (
        <>
          <Stack
            flexDirection="row"
            style={{
              borderRadius: 4,
              boxShadow: "0 0 2pt 0pt gray",
              marginBottom: 20,
            }}
          >
            <Box
              style={{
                width: 100,
                backgroundColor: "#dedede",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            >
              <Iconify
                style={{ width: 50, height: 50 }}
                icon="emojione-monotone:desktop-computer"
                // icon="fa:mobile"
              />
            </Box>
            <ItemStyle>
              <Box>
                {/* TYPE */}
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{ marginRight: 10 }}
                  >
                    {getDeviceSpec()}
                  </Typography>
                </Box>
                {/* IP - LOCATION */}
                <Typography variant="body1" style={{ marginBottom: 2 }}>
                  Từ {info.IPv4 ? info.IPv4 : "N/A"} -{" "}
                  {info.city ? info.city : "N/A"} -{" "}
                  {info.country_name ? info.country_name : "N/A"}
                </Typography>
                <Typography variant="body1" style={{ marginRight: 2 }}>
                  {formatDate(Date.now())}
                </Typography>
              </Box>
              {/* REVOKE */}
              <Button
                variant="contained"
                color="success"
                style={{ height: 35, color: "#FFF" }}
              >
                Đang hoạt động
              </Button>
            </ItemStyle>
          </Stack>
          {/* ----- */}
          <Stack
            flexDirection="row"
            style={{
              borderRadius: 4,
              boxShadow: "0 0 2pt 0pt gray",
              marginBottom: 20,
            }}
          >
            <Box
              style={{
                width: 100,
                backgroundColor: "#dedede",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            >
              <Iconify
                style={{ width: 50, height: 50 }}
                // icon="emojione-monotone:desktop-computer"
                icon="fa:mobile"
              />
            </Box>
            <ItemStyle>
              <Box>
                {/* TYPE */}
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{ marginRight: 10 }}
                  >
                    Safari - Điện thoại iPhone
                  </Typography>
                </Box>
                {/* IP - LOCATION */}
                <Typography variant="body1" style={{ marginBottom: 2 }}>
                  Từ 14.177.134.112 - Hanoi - Vietnam
                </Typography>
                <Typography variant="body1" style={{ marginRight: 2 }}>
                  {formatDate(Date.now())}
                </Typography>
              </Box>
              {/* REVOKE */}
              <Button variant="contained" color="error" style={{ height: 35 }}>
                Xóa
              </Button>
            </ItemStyle>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Authentication;
