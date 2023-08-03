// UI lib
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import CustomDateAdapter from "../../components/CustomDateAdapter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// UI custom
import SlideTransition from "../../components/SlideTransition";
// logic lib
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// logic custom
import { createPeakDay, updatePeakDay } from "../../redux/actions/peak_day";
//#region CSS
//#endregion

//----------------------------
const INITIAL_DATES = [new Date(), new Date(Date.now() + 86400000)];
const PeakDayForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const peakDay = useSelector((state) =>
    editedId ? state.peak_day.find((item) => item._id === editedId) : null
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
        {editedId ? "CẬP NHẬT NGÀY CAO ĐIỂM" : "THÊM MỚI NGÀY CAO ĐIỂM"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            peakDay
              ? {
                  name: peakDay.name,
                  start_date: peakDay.start_date,
                  end_date: peakDay.end_date,
                }
              : {
                  name: "",
                  start_date: INITIAL_DATES[0],
                  end_date: INITIAL_DATES[1],
                }
          }
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Chưa nhập tiêu đề"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (
              new Date(values.start_date).setHours(0, 0, 0, 0) >=
              new Date(values.end_date).setHours(0, 0, 0, 0)
            ) {
              setSubmitting(false);
              return alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
            }
            if (editedId)
              dispatch(
                updatePeakDay(
                  editedId,
                  values,
                  () => {
                    showNotification(
                      "Cập nhật ngày cao điểm thành công",
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
                createPeakDay(
                  values,
                  () => {
                    showNotification(
                      "Thêm ngày cao điểm thành công",
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
                label="Tiêu đề ngày cao điểm"
                margin="normal"
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
                autoComplete="new-password"
              />
              {/* START DATE */}
              <LocalizationProvider dateAdapter={CustomDateAdapter}>
                <DatePicker
                  label="Ngày bắt đầu"
                  inputFormat="dd/MM/yyyy"
                  value={values.start_date}
                  onChange={(date) => {
                    setFieldValue("start_date", date);
                  }}
                  renderInput={(params) => (
                    <TextField margin="normal" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
              {/* END DATE */}
              <LocalizationProvider dateAdapter={CustomDateAdapter}>
                <DatePicker
                  label="Ngày kết thúc"
                  inputFormat="dd/MM/yyyy"
                  value={values.end_date}
                  onChange={(date) => {
                    setFieldValue("end_date", date);
                  }}
                  renderInput={(params) => (
                    <TextField margin="normal" fullWidth {...params} />
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
                    "TẠO NGÀY CAO ĐIỂM"
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

export default PeakDayForm;
