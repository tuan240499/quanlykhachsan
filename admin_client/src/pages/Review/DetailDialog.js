// UI
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  styled,
  Chip,
  Rating,
} from "@mui/material";
import SlideTransition from "../../components/SlideTransition";
// Logic
import { useSelector } from "react-redux";
import { formatDateWithHour } from "../../utils/date";
import "./table.css";
// ----------------------------
const ScoreText = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const STATUS_TAG = [
  "",
  <Chip label="Chờ duyệt" color="primary" variant="outlined" />,
  <Chip label="Đã duyệt" color="success" variant="outlined" />,
  <Chip label="Từ chối" color="error" variant="outlined" />,
];

const DetailDialog = ({ open, setOpen, id }) => {
  const review = useSelector((state) => {
    return open && id ? state.review.find((item) => item._id === id) : null;
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
      {review ? (
        <>
          <DialogTitle>THÔNG TIN BÀI ĐÁNH GIÁ</DialogTitle>
          <DialogContent>
            <table id="tuanvq_review_table">
              <tbody>
                <tr>
                  <td>Khách hàng</td>
                  <td>
                    {review.user.full_name} - {review.user.phone}
                  </td>
                </tr>
                <tr>
                  <td>Khách sạn</td>
                  <td>{review.booking.hotel.name}</td>
                </tr>
                <tr>
                  <td>Mã đơn</td>
                  <td>#{review.booking.number}</td>
                </tr>
                <tr>
                  <td>Tiêu đề</td>
                  <td>{review.title}</td>
                </tr>
                <tr>
                  <td>Nội dung</td>
                  <td>{review.content}</td>
                </tr>
                <tr>
                  <td>Kết quả</td>
                  <td>
                    <ScoreText>
                      Tổng quan -
                      <Rating
                        name="read-only"
                        value={review.overallScore}
                        readOnly
                      />
                    </ScoreText>
                    <ScoreText>
                      Sạch sẽ -
                      <Rating
                        name="read-only"
                        value={review.cleanScore}
                        readOnly
                      />
                    </ScoreText>
                    <ScoreText>
                      Tiện nghi -
                      <Rating
                        name="read-only"
                        value={review.facilityScore}
                        readOnly
                      />
                    </ScoreText>
                    <ScoreText>
                      Vị trí -
                      <Rating
                        name="read-only"
                        value={review.locationScore}
                        readOnly
                      />
                    </ScoreText>
                    <ScoreText>
                      Dịch vụ -
                      <Rating
                        name="read-only"
                        value={review.serviceScore}
                        readOnly
                      />
                    </ScoreText>
                    <ScoreText>
                      Đáng tiền -
                      <Rating
                        name="read-only"
                        value={review.valueScore}
                        readOnly
                      />
                    </ScoreText>
                  </td>
                </tr>
                <tr>
                  <td>Trạng thái</td>
                  <td>{STATUS_TAG[review.status]}</td>
                </tr>
                <tr>
                  <td>Ngày tạo</td>
                  <td>{formatDateWithHour(review.created_date)}</td>
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
