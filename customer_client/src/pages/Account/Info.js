import { useState, useRef, useEffect, useContext } from "react";
// UI lib
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

// UI custom
import Iconify from "../../components/Iconify";
import {
  PhoneFormatCustom,
  IdFormatCustom,
} from "../../components/FormattedInput";
// logic lib
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// logic custom
import NotificationContext from "../../context/Context";
import { getInfo, updateInfo } from "../../api/user";

//#region CSS
const RootStyle = styled(Stack)(({ theme }) => ({
  minHeight: 250,
  flexDirection: "row",
  [theme.breakpoints.down(900)]: {
    flexDirection: "column",
  },
}));
const ImageSection = styled(Stack)(({ theme }) => ({
  width: "30%",
  boxShadow: "0 0 2pt 0pt gray",
  borderRadius: 4,
  marginRight: 20,
  padding: 20,
  [theme.breakpoints.down(900)]: {
    width: "100%",
    marginBottom: 20,
  },
}));
const InfoSection = styled(Stack)(({ theme }) => ({
  width: "70%",
  boxShadow: "0 0 2pt 0pt gray",
  borderRadius: 4,
  padding: "10px 20px",
  [theme.breakpoints.down(900)]: {
    width: "100%",
  },
}));
//#endregion

//----------------------------
const Info = () => {
  const context = useContext(NotificationContext);
  const [show, setShow] = useState(false);
  const inputFile = useRef(null);
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      await getInfo()
        .then((res) => {
          if (isMounted) setUser(res.data);
        })
        .catch((err) => {
          context.setNotification({
            type: "error",
            content: err.response.data,
          });
          context.setOpen(true);
          if (err.response.status === 401)
            navigate("/login", {
              state: { returnUrl: "/account?tab=info" },
            });
        });
    };

    getData();

    // To prevent "Can't perform a React state update on an unmounted component" warning, avoid memory leak
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleChangeAvatar = (image) => {
    setAvatar(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <RootStyle>
      {/* IMAGE */}
      <ImageSection
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            position: "relative",
            marginBottom: 15,
            border: "1px solid #637381",
          }}
          onMouseEnter={(e) => {
            setShow(true);
          }}
          onMouseLeave={(e) => {
            setShow(false);
          }}
        >
          {user ? (
            <img
              src={preview ? preview : user.profile_image + "?" + Date.now()}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Skeleton
              variant="circular"
              animation="wave"
              style={{ width: "100%", height: "100%" }}
            />
          )}

          {show && (
            <Box
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "50%",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => inputFile.current.click()}
            >
              <Iconify
                icon="mdi:camera-plus"
                style={{
                  color: "#FFF",
                  width: 35,
                  height: 35,
                  marginBottom: 8,
                }}
              />
              <Typography variant="body1" color="#FFF">
                Thay ảnh
              </Typography>
              <input
                type="file"
                hidden
                accept="image/*"
                ref={inputFile}
                onChange={(e) => handleChangeAvatar(e.target.files[0])}
              />
            </Box>
          )}
        </Box>
        <Typography variant="body2" color="gray" textAlign="center">
          Nhận ảnh *.jpeg, *.jpg, *.png
        </Typography>
        <Typography variant="body2" color="gray" textAlign="center">
          kích thước tối đa 3.1 MB
        </Typography>
      </ImageSection>
      {/* INFO */}
      <InfoSection>
        <Formik
          enableReinitialize
          initialValues={
            user
              ? {
                  username: user.username,
                  full_name: user.full_name,
                  phone: user.phone,
                  identification: "123456789111",
                }
              : {
                  username: "",
                  full_name: "",
                  phone: "",
                  identification: "",
                }
          }
          validationSchema={Yup.object().shape({
            full_name: Yup.string().max(255).required("Chưa nhập họ và tên"),
            phone: Yup.string()
              .min(10, "Số điện thoại không hợp lệ")
              .max(10, "Số điện thoại không hợp lệ")
              .required("Chưa nhập số điện thoại"),
            username: Yup.string()
              .max(100, "Tài khoản dài tối đa 100 kí tự")
              .required("Chưa nhập tài khoản"),
            identification: Yup.string()
              .max(12, "CMT không hợp lệ")
              .required("Chưa nhập chứng minh thư"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("_id", user._id);

            for (let key in values) {
              formData.append(key, values[key]);
            }
            if (avatar) formData.append("profile_image", avatar);

            updateInfo(formData)
              .then((res) => {
                context.setNotification({
                  type: "success",
                  content: "Sửa thông tin thành công",
                });
                context.setOpen(true);
                setSubmitting(false);
              })
              .catch((err) => {
                context.setNotification({
                  type: "error",
                  content: "Đã có lỗi xảy ra",
                });
                context.setOpen(true);
                setSubmitting(false);
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
            <form onSubmit={handleSubmit} style={{ position: "relative" }}>
              <Grid container justifyContent="space-between">
                <Grid item xs={5.6}>
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
                    disabled
                  />
                </Grid>
                <Grid item xs={5.6}>
                  <TextField
                    error={Boolean(touched.full_name && errors.full_name)}
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
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item xs={5.6}>
                  <TextField
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
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
                </Grid>
                <Grid item xs={5.6}>
                  <TextField
                    fullWidth
                    error={Boolean(
                      touched.identification && errors.identification
                    )}
                    helperText={touched.identification && errors.identification}
                    label="Chứ minh thư"
                    margin="normal"
                    type="text"
                    name="identification"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.identification}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: IdFormatCustom,
                    }}
                  />
                </Grid>
              </Grid>
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
      </InfoSection>
    </RootStyle>
  );
};

export default Info;
