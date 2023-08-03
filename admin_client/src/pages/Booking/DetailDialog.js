// UI
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  styled,
  Chip,
} from "@mui/material";
import SlideTransition from "../../components/SlideTransition";
import "./table.css";
// Logic
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/number";
import { formatDateWithHour } from "../../utils/date";
import { INTEGER } from "../../constants";

// ----------------------------
const BlueBolderText = styled("span")(({ theme }) => ({
  fontWeight: "bolder",
  color: theme.palette.primary.main,
}));

const STATUS_TAG = [
  "",
  <Chip label="Đã hủy" color="error" variant="outlined" />,
  <Chip label="Sắp tới" color="warning" variant="outlined" />,
  <Chip label="Đã nhận phòng" color="success" variant="outlined" />,
  <Chip label="Hoàn tất" color="success" variant="outlined" />,
];

const DetailDialog = ({ open, setOpen, id }) => {
  const booking = useSelector((state) => {
    return open && id ? state.booking.find((item) => item._id === id) : null;
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={SlideTransition}
      maxWidth="md"
      fullWidth
    >
      {booking ? (
        <>
          <DialogTitle>
            THÔNG TIN ĐƠN ĐẶT CHỖ{" "}
            <span style={{ fontWeight: "bolder" }}>#{booking.number}</span>
          </DialogTitle>
          <DialogContent>
            <table id="tuanvq_booking_table">
              <tbody>
                <tr>
                  <td>Khách hàng</td>
                  <td>
                    {booking.user.full_name} - {booking.user.phone}
                  </td>
                </tr>
                <tr>
                  <td>Khách sạn</td>
                  <td>{booking.hotel.name}</td>
                </tr>
                <tr>
                  <td>Tổng tiền</td>
                  <td>{formatNumber(booking.amount)} VNĐ</td>
                </tr>
                {booking.discount && (
                  <tr>
                    <td>Mã khuyến mãi</td>
                    <td>
                      <BlueBolderText>{booking.discount.code}</BlueBolderText>{" "}
                      giảm{" "}
                      {booking.discount.type === INTEGER.AMOUNT_DISCOUNT
                        ? formatNumber(booking.discount.value) + " VNĐ"
                        : booking.discount.value + "%"}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>Thành viên</td>
                  <td>
                    <BlueBolderText>{booking.adult}</BlueBolderText> người lớn -{" "}
                    <BlueBolderText>{booking.kid}</BlueBolderText> trẻ em -{" "}
                    <BlueBolderText>{booking.baby}</BlueBolderText> em bé
                  </td>
                </tr>
                <tr>
                  <td>Danh sách phòng</td>
                  <td>
                    {booking.room_list.map((room, index) => (
                      <span style={{ whiteSpace: "pre" }} key={index}>
                        {"Phòng " +
                          room.number +
                          " - " +
                          room.room_type.name +
                          " - " +
                          booking.combo_list[index].name +
                          " - " +
                          formatNumber(
                            room.room_type.rent_bill +
                              booking.combo_list[index].amount
                          ) +
                          " VNĐ" +
                          "\n"}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Trạng thái</td>
                  <td>{STATUS_TAG[booking.status]}</td>
                </tr>
                <tr>
                  <td>Phương thức thanh toán</td>
                  <td>{booking.payment_method}</td>
                </tr>
                <tr>
                  <td>Thời gian thanh toán</td>
                  <td>{formatDateWithHour(booking.payment_date)}</td>
                </tr>
                <tr>
                  <td>Thời gian nhận phòng</td>
                  <td>{formatDateWithHour(booking.effective_from)}</td>
                </tr>
                <tr>
                  <td>Thời gian trả phòng</td>
                  <td>{formatDateWithHour(booking.effective_to)}</td>
                </tr>
              </tbody>
            </table>
          </DialogContent>
        </>
      ) : (
        ""
      )}
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          ĐÓNG
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailDialog;
