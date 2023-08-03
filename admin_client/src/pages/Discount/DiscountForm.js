// UI lib
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// UI custom
import SlideTransition from "../../components/SlideTransition";
import { PriceFormatCustom } from "../../components/FormattedInput";
// logic lib
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import viLocale from "date-fns/locale/vi";
// logic custom
import CustomDateAdapter from "../../components/CustomDateAdapter";
import { createDiscount, updateDiscount } from "../../redux/actions/discount";
import { INTEGER } from "../../constants";
//#region CSS
//#endregion

//----------------------------

const HotelForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const discount = useSelector((state) =>
    editedId ? state.discount.find((item) => item._id === editedId) : null
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
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {editedId ? "CẬP NHẬT MÃ KHUYẾN MÃI" : "THÊM MỚI MÃ KHUYẾN MÃI"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            discount
              ? {
                  code: discount.code,
                  title: discount.title,
                  type: discount.type,
                  value: discount.value,
                  quantity: discount.quantity,
                  pricing_condition: discount.pricing_condition,
                  effective_from: discount.effective_from,
                  effective_to: discount.effective_to,
                }
              : {
                  code: "",
                  title: "",
                  type: 0,
                  value: "",
                  quantity: "",
                  pricing_condition: "",
                  effective_from: new Date(),
                  effective_to: new Date(Date.now() + 86400000),
                }
          }
          validationSchema={Yup.object().shape({
            code: Yup.string().required("Chưa nhập mã khuyến mãi"),
            title: Yup.string().required("Chưa nhập tên mô tả"),
            quantity: Yup.number()
              .required("Chưa nhập số lượng mã")
              .min(0, "Số lượng mã không hợp lệ"),
            value: Yup.number().test(
              "value_required", // test name
              "Giá trị mã không hợp lệ (1 - 100 với %)", // error message
              function (item) {
                return (
                  (this.parent.type === INTEGER.AMOUNT_DISCOUNT && item > 1) ||
                  (this.parent.type === INTEGER.PERCENTAGE_DISCOUNT &&
                    item > 1 &&
                    item <= 100)
                );
              }
            ),
            pricing_condition: Yup.number()
              .required("Chưa nhập giá trị đơn hàng yêu cầu")
              .min(0, "Giá trị mã không hợp lệ"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (editedId) {
              dispatch(
                updateDiscount(
                  editedId,
                  values,
                  () => {
                    showNotification(
                      "Cập nhật mã khuyến mãi thành công",
                      "success"
                    );
                    handleCloseDialog();
                    setSubmitting(false);
                  },
                  (needLogin, message) => {
                    showNotification(message, "error");
                    setSubmitting(false);
                    if (needLogin) navigate("/login", { replace: true });
                  }
                )
              );
            } else {
              dispatch(
                createDiscount(
                  values,
                  () => {
                    showNotification(
                      "Thêm mã khuyến mãi thành công",
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
            }
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
              {/* CODE - TITLE */}
              <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(touched.code && errors.code)}
                    fullWidth
                    helperText={touched.code && errors.code}
                    label="Mã khuyến mãi"
                    margin="normal"
                    type="text"
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code}
                    variant="outlined"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Mô tả"
                    margin="normal"
                    type="text"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {/* TYPE - VALUE */}
              <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
                    value={values.type}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    margin="normal"
                    select
                    name="type"
                    variant="outlined"
                    label="Loại"
                  >
                    <MenuItem value={INTEGER.AMOUNT_DISCOUNT}>
                      Số tiền nhất định
                    </MenuItem>
                    <MenuItem value={INTEGER.PERCENTAGE_DISCOUNT}>
                      Phần trăm đơn hàng
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(touched.value && errors.value)}
                    fullWidth
                    helperText={touched.value && errors.value}
                    label="Giá trị"
                    margin="normal"
                    type="text"
                    name="value"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.value}
                    variant="outlined"
                    InputProps={{
                      inputComponent: PriceFormatCustom,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="h6">
                            {values.type === 0 ? "VNĐ" : "%"}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              {/* QUANTITY - PRICING_CONDITION */}
              <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(touched.quantity && errors.quantity)}
                    fullWidth
                    helperText={touched.quantity && errors.quantity}
                    label="Số lượng"
                    margin="normal"
                    type="text"
                    name="quantity"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantity}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: PriceFormatCustom,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    error={Boolean(
                      touched.pricing_condition && errors.pricing_condition
                    )}
                    fullWidth
                    helperText={
                      touched.pricing_condition && errors.pricing_condition
                    }
                    label="Đơn hàng tối thiểu"
                    margin="normal"
                    type="text"
                    name="pricing_condition"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pricing_condition}
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      inputComponent: PriceFormatCustom,
                    }}
                  />
                </Grid>
              </Grid>
              {/* DATE */}
              <LocalizationProvider
                locale={viLocale}
                dateAdapter={CustomDateAdapter}
              >
                <DateRangePicker
                  calendars={2}
                  disabled={isSubmitting}
                  inputFormat="dd/MM/yyyy"
                  name="date"
                  startText="Thời gian bắt đầu"
                  endText="Thời gian kết thúc"
                  value={[values.effective_from, values.effective_to]}
                  onChange={(newValue) => {
                    setFieldValue("effective_from", newValue[0]);
                    setFieldValue("effective_to", newValue[1]);
                  }}
                  renderInput={(startProps, endProps) => (
                    <Grid container columnSpacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField {...startProps} margin="normal" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField {...endProps} margin="normal" fullWidth />
                      </Grid>
                    </Grid>
                  )}
                />
              </LocalizationProvider>
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
                    "TẠO MÃ KHUYẾN MÃI"
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

export default HotelForm;
