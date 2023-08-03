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
import { createRoom, updateRoom } from "../../redux/actions/room";
import { getAllHotelForForm } from "../../api/hotel";
import { getRoomTypeByHotel } from "../../api/room_type";

//#region CSS
//#endregion

//----------------------------

const RoomForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const room = useSelector((state) =>
    editedId ? state.room.find((item) => item._id === editedId) : null
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
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        {editedId ? "CẬP NHẬT PHÒNG KHÁCH SẠN" : "THÊM MỚI PHÒNG KHÁCH SẠN"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            room
              ? {
                  number: room.number,
                  hotel: room.hotel,
                  room_type: room.room_type,
                }
              : {
                  number: "",
                  hotel: { name: "", _id: "" },
                  room_type: { name: "", _id: "" },
                }
          }
          validationSchema={Yup.object().shape({
            number: Yup.number()
              .min(1, "Số phòng không hợp lệ")
              .required("Chưa nhập số phòng"),
            hotel: Yup.object()
              .nullable()
              .test("hotel", "Chưa chọn khách sạn", (val) => val?._id),
            room_type: Yup.object()
              .nullable()
              .test("room_type", "Chưa chọn loại phòng", (val) => val?._id),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (editedId) {
              dispatch(
                updateRoom(
                  editedId,
                  values,
                  () => {
                    handleSuccess("Cập nhật loại phòng thành công");
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
                createRoom(
                  values,
                  () => {
                    handleSuccess("Thêm loại phòng thành công");
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
              {/* NUMBER */}
              <TextField
                error={Boolean(touched.number && errors.number)}
                fullWidth
                helperText={touched.number && errors.number}
                label="Số phòng"
                margin="normal"
                type="number"
                name="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.number}
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
              {/* ROOM_TYPE */}
              {values.hotel?.name && (
                <SingleAsyncAutocomplete
                  touched={touched.room_type}
                  errors={errors.room_type}
                  value={values.room_type}
                  name="room_type"
                  text="Loại phòng"
                  setFieldValue={setFieldValue}
                  fieldToSetValue="room_type"
                  getData={getRoomTypeByHotel}
                  parentId={values.hotel._id}
                  getOptionLabel={(option) => option.name}
                  noOptionsText="Không tìm thấy loại phòng"
                />
              )}

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
                    "TẠO PHÒNG"
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

export default RoomForm;
