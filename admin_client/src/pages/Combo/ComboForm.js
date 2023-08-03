// UI lib
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Stack,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
// UI custom
import SlideTransition from "../../components/SlideTransition";
import SingleAsyncAutocomplete from "../../components/AsyncAutocomplete/SingleAutocomplete";
// logic lib
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// logic custom
import { getAllHotelForForm } from "../../api/hotel";
import { createCombo, updateCombo } from "../../redux/actions/combo";
import { PriceFormatCustom } from "../../components/FormattedInput";
//#region CSS
//#endregion

//----------------------------

const ComboForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const combo = useSelector((state) =>
    editedId ? state.combo.find((item) => item._id === editedId) : null
  );

  const handleCloseDialog = () => {
    if (editedId) setEditedId();
    setOpen(false);
  };

  const showNotification = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={SlideTransition}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">
        {editedId ? "CẬP NHẬT GÓI DỊCH VỤ PHÒNG" : "THÊM MỚI GÓI DỊCH VỤ PHÒNG"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            combo
              ? {
                  name: combo.name,
                  hotel: combo.hotel,
                  amount: combo.amount,
                  detail: combo.detail,
                }
              : {
                  name: "",
                  hotel: { name: "", _id: "" },
                  amount: "",
                  detail: "",
                }
          }
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Chưa nhập tên dịch vụ"),
            hotel: Yup.object()
              .nullable()
              .test("hotel", "Chưa chọn khách sạn", (val) => val?._id),
            amount: Yup.number().required("Chưa nhập giá gói / 1 đêm"),
            detail: Yup.string().required("Chưa nhập mô tả gói"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (editedId)
              dispatch(
                updateCombo(
                  editedId,
                  values,
                  () => {
                    showNotification(
                      "Cập nhật gói dịch vụ thành công",
                      "success"
                    );
                    setSubmitting(false);
                    handleCloseDialog();
                  },
                  (needLogin, message) => {
                    showNotification(message, "error");
                    setSubmitting(false);
                    if (needLogin) navigate("/login", { replace: true });
                  }
                )
              );
            else
              dispatch(
                createCombo(
                  values,
                  () => {
                    showNotification("Thêm gói dịch vụ thành công", "success");
                    setSubmitting(false);
                    handleCloseDialog();
                  },
                  (needLogin, message) => {
                    showNotification(message, "error");
                    setSubmitting(false);
                    if (needLogin) navigate("/login", { replace: true });
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Tên gói"
                margin="normal"
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* HOTEL */}
              <SingleAsyncAutocomplete
                touched={touched.hotel}
                errors={errors.hotel}
                value={values.hotel}
                name="hotel"
                text="Khách sạn"
                setFieldValue={setFieldValue}
                fieldToSetValue="hotel"
                getData={getAllHotelForForm}
                getOptionLabel={(option) => option.name}
                noOptionsText="Không tìm thấy khách sạn"
              />
              {/* AMOUNT */}
              <TextField
                error={Boolean(touched.amount && errors.amount)}
                fullWidth
                helperText={touched.amount && errors.amount}
                label="Giá gói / 1 đêm"
                margin="normal"
                type="text"
                name="amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                variant="outlined"
                autoComplete="new-password"
                InputProps={{
                  inputComponent: PriceFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>VNĐ</Typography>
                    </InputAdornment>
                  ),
                }}
              />
              {/* DETAIL */}
              <TextField
                error={Boolean(touched.detail && errors.detail)}
                fullWidth
                helperText={touched.detail && errors.detail}
                label="Mô tả gói"
                multiline
                minRows={4}
                maxRows={Infinity}
                margin="normal"
                type="text"
                name="detail"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.detail}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* SUBMIT BUTTON */}
              <Stack
                flexDirection="row"
                justifyContent="flex-end"
                marginTop={3}
              >
                <Button variant="outlined" onClick={handleCloseDialog}>
                  HỦY
                </Button>
                <Button
                  sx={{ marginLeft: 2 }}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting ? true : false}
                >
                  {isSubmitting ? (
                    <CircularProgress style={{ color: "#252525" }} />
                  ) : editedId ? (
                    "CẬP NHẬT"
                  ) : (
                    "TẠO GÓI DỊCH VỤ"
                  )}
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ComboForm;
