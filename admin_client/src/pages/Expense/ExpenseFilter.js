import { Grid, TextField } from "@mui/material";
import FilterAutocomplete from "../../components/AsyncAutocomplete/FilterAutocomplete";
import { getAllHotelForForm } from "../../api/hotel";

const ExpenseFilter = ({
  filterHotel,
  setFilterHotel,
  filterNumber,
  setFilterNumber,
}) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            fullWidth
            label="Mã hóa đơn"
            margin="normal"
            type="number"
            name="number"
            onChange={(e) => setFilterNumber(e.target.value)}
            value={filterNumber}
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

export default ExpenseFilter;
