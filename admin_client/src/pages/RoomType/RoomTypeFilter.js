import { Grid, TextField } from "@mui/material";
import FilterAutocomplete from "../../components/AsyncAutocomplete/FilterAutocomplete";
import { getAllHotelForForm } from "../../api/hotel";

const RoomTypeFilter = ({
  filterName,
  setFilterName,
  filterHotel,
  setFilterHotel,
}) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            fullWidth
            label="Tên loại phòng"
            margin="normal"
            type="text"
            onChange={(e) => setFilterName(e.target.value)}
            value={filterName}
            variant="outlined"
            autoComplete="new-password"
          />
        </Grid>
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
      </Grid>
    </div>
  );
};

export default RoomTypeFilter;
