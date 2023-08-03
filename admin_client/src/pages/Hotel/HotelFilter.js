import { Autocomplete, Grid, TextField } from "@mui/material";
import { city } from "../../__MOCK__";

const HotelFilter = ({
  filterCity,
  setFilterCity,
  filterName,
  setFilterName,
}) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={5} md={4}>
          <Autocomplete
            id="fake"
            value={city[filterCity]}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => {
              setFilterCity(value !== null ? value.fake : 0);
            }}
            options={city}
            renderInput={(params) => (
              <TextField {...params} margin="normal" label="Tỉnh / Thành phố" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            fullWidth
            label="Tên khách sạn"
            margin="normal"
            type="text"
            onChange={(e) => setFilterName(e.target.value)}
            value={filterName}
            variant="outlined"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default HotelFilter;
