import { Grid, TextField } from "@mui/material";
import FilterAutocomplete from "../../components/AsyncAutocomplete/FilterAutocomplete";
import { getAllHotelForForm } from "../../api/hotel";

const RoomFilter = ({
  filterRoomNumber,
  setFilterRoomNumber,
  filterHotel,
  setFilterHotel,
}) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={5} md={4}>
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
            label="Số phòng"
            margin="normal"
            type="number"
            onChange={(e) => setFilterRoomNumber(e.target.value)}
            value={filterRoomNumber}
            variant="outlined"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RoomFilter;
