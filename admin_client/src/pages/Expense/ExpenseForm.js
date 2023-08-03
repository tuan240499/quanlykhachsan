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
import { PriceFormatCustom } from "../../components/FormattedInput";
import { createExpense, updateExpense } from "../../redux/actions/expense";
import { getAllHotelForForm } from "../../api/hotel";

//#region CSS
//#endregion

//----------------------------

const ExpenseForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const expense = useSelector((state) =>
    editedId ? state.expense.find((item) => item._id === editedId) : null
  );

  const handleSuccess = (message) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const handleFailure = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const handleCloseDialog = () => {
    if (editedId) setEditedId();
    setOpen(false);
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
        {editedId ? "CẬP NHẬT HOÁN ĐƠN CHI" : "THÊM MỚI HÓA ĐƠN CHI"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            expense
              ? {
                  hotel: expense.hotel,
                  amount: expense.amount,
                  description: expense.description,
                }
              : {
                  hotel: { name: "", _id: "" },
                  amount: "",
                  description: "",
                }
          }
          validationSchema={Yup.object().shape({
            hotel: Yup.object()
              .nullable()
              .test("hotel", "Chưa chọn khách sạn", (val) => val?._id),
            description: Yup.string().required("Chưa nhập mô tả chi phí"),
            amount: Yup.number().required("Chưa nhập tổng tiền"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (editedId) {
              dispatch(
                updateExpense(
                  editedId,
                  values,
                  () => {
                    handleSuccess("Cập nhật hóa đơn chi thành công");
                    handleCloseDialog();
                    setSubmitting(false);
                  },
                  (needLogin, message) => {
                    handleFailure(message);
                    setSubmitting(false);
                    if (needLogin) navigate("/login", { replace: true });
                  }
                )
              );
            } else {
              dispatch(
                createExpense(
                  values,
                  () => {
                    handleSuccess("Thêm hóa đơn chi thành công");
                    setSubmitting(false);
                    handleCloseDialog();
                  },
                  (needLogin, message) => {
                    handleFailure(message);
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
                label="Tổng tiền"
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
              {/* DESCRIPTION */}
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Mô tả"
                multiline
                minRows={4}
                maxRows={Infinity}
                margin="normal"
                type="text"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
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
                    "TẠO HÓA ĐƠN"
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

export default ExpenseForm;
