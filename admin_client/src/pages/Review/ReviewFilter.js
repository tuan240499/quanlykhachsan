import { Grid, MenuItem, TextField } from "@mui/material";

const REVIEW_STATUS = [
  { value: 0, text: "Tất cả" },
  { value: 1, text: "Chờ duyệt" },
  { value: 2, text: "Đã duyệt" },
  { value: 3, text: "Từ chối" },
];

const ReviewFilter = ({
  filterBookingCode,
  setFilterBookingCode,
  filterReviewStatus,
  setFilterReviewStatus,
}) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            fullWidth
            label="Mã đặt phòng"
            margin="normal"
            type="number"
            name="number"
            onChange={(e) => setFilterBookingCode(e.target.value)}
            value={filterBookingCode}
            variant="outlined"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            fullWidth
            margin="normal"
            select
            name="status"
            variant="outlined"
            label="Trạng thái"
            value={filterReviewStatus}
            onChange={(e) => setFilterReviewStatus(e.target.value)}
          >
            {REVIEW_STATUS.map((booking, index) => (
              <MenuItem key={index} value={booking.value}>
                {booking.text}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewFilter;
