import { Grid, MenuItem, TextField } from "@mui/material";
import FilterAutocomplete from "../../components/AsyncAutocomplete/FilterAutocomplete";
import { getAllHotelForForm } from "../../api/hotel";

const BOOKING_STATUS = [
  { value: 0, text: "Tất cả" },
  { value: 1, text: "Đã hủy" },
  { value: 2, text: "Sắp tới" },
  { value: 3, text: "Đã nhận phòng" },
  { value: 4, text: "Hoàn tất" },
];

const BookingFilter = ({
  filterBookingCode,
  setFilterBookingCode,
  filterBookingStatus,
  setFilterBookingStatus,
  filterHotel,
  setFilterHotel,
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
          <FilterAutocomplete
            value={filterHotel}
            setValue={setFilterHotel}
            name="hotel"
            text="Khách sạn"
            getData={getAllHotelForForm}
            getOptionLabel={(option) => option.name}
            noOptionsText="Không tìm thấy khách sạn"
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
            value={filterBookingStatus}
            onChange={(e) => setFilterBookingStatus(e.target.value)}
          >
            {BOOKING_STATUS.map((booking, index) => (
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

export default BookingFilter;
