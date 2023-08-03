import { Grid, TextField } from "@mui/material";

const RoomServiceFilter = ({ filterName, setFilterName }) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            fullWidth
            label="Tên dịch vụ"
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

export default RoomServiceFilter;
