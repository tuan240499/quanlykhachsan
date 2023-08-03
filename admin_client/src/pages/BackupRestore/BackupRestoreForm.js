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
import { createBackup, updateBackup } from "../../redux/actions/backup";
//#region CSS
//#endregion

//----------------------------

const BackupRestoreForm = ({ open, setOpen, editedId, setEditedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const backup = useSelector((state) =>
    editedId ? state.backup.find((item) => item._id === editedId) : null
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
        {editedId ? "CẬP NHẬT BẢN SAO LƯU" : "THÊM MỚI BẢN SAO LƯU"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={backup ? { detail: backup.detail } : { detail: "" }}
          validationSchema={Yup.object().shape({
            detail: Yup.string().required("Chưa nhập mô tả"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            if (editedId)
              dispatch(
                updateBackup(
                  editedId,
                  values,
                  () => {
                    showNotification(
                      "Cập nhật bản sao lưu thành công",
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
                createBackup(
                  values,
                  () => {
                    showNotification("Tạo bản sao lưu thành công", "success");
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
                error={Boolean(touched.detail && errors.detail)}
                fullWidth
                helperText={touched.detail && errors.detail}
                label="Mô tả"
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
                  sx={{ marginLeft: 2, height: 50 }}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting ? true : false}
                >
                  {isSubmitting ? (
                    <CircularProgress style={{ color: "#252525" }} />
                  ) : editedId ? (
                    "CẬP NHẬT"
                  ) : (
                    "SAO LƯU"
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

export default BackupRestoreForm;
