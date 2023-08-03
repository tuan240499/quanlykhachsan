import { Grid, MenuItem, TextField } from "@mui/material";
import { INTEGER } from "../../constants";

const DiscountFilter = ({
  filterCode,
  setFilterCode,
  filterType,
  setFilterType,
  filterTitle,
  setFilterTitle,
}) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Mã khuyến mãi"
            margin="normal"
            type="text"
            name="code"
            onChange={(e) => setFilterCode(e.target.value)}
            value={filterCode}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Tiêu đề"
            margin="normal"
            type="text"
            name="title"
            onChange={(e) => setFilterTitle(e.target.value)}
            value={filterTitle}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            margin="normal"
            select
            name="type_filter"
            variant="outlined"
            label="Loại"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value={-1}>Tất cả</MenuItem>
            <MenuItem value={INTEGER.AMOUNT_DISCOUNT}>Trừ tiền</MenuItem>
            <MenuItem value={INTEGER.PERCENTAGE_DISCOUNT}>Phần trăm</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

export default DiscountFilter;
