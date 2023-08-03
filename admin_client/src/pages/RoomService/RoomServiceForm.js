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
// logic lib
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// logic custom
import {
  createRoomService,
  updateRoomService,
} from "../../redux/actions/room_service";
//#region CSS
//#endregion

//----------------------------

const RoomServiceForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const roomService = useSelector((state) =>
    editedId ? state.room_service.find((item) => item._id === editedId) : null
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
        {editedId ? "CẬP NHẬT DỊCH VỤ PHÒNG" : "THÊM MỚI DỊCH VỤ PHÒNG"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            roomService
              ? { icon: roomService.icon, name: roomService.name }
              : { icon: "", name: "" }
          }
          validationSchema={Yup.object().shape({
            icon: Yup.string().required("Chưa nhập icon"),
            name: Yup.string().required("Chưa nhập tên dịch vụ"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (editedId)
              dispatch(
                updateRoomService(
                  editedId,
                  values,
                  () => {
                    showNotification(
                      "Cập nhật dịch vụ phòng thành công",
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
                createRoomService(
                  values,
                  () => {
                    showNotification(
                      "Thêm dịch vụ phòng thành công",
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
          }) => (
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Tên dịch vụ"
                margin="normal"
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
                autoComplete="new-password"
              />
              <TextField
                error={Boolean(touched.icon && errors.icon)}
                fullWidth
                helperText={touched.icon && errors.icon}
                label="Icon"
                margin="normal"
                type="text"
                name="icon"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.icon}
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
                    "TẠO DỊCH VỤ"
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

export default RoomServiceForm;
