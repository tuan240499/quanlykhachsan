import { Grid, TextField } from "@mui/material";

const BackupFilter = ({ filterBackupCode, setFilterBackupCode }) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={5} md={3}>
          <TextField
            fullWidth
            label="Mã bản sao lưu"
            margin="normal"
            type="text"
            onChange={(e) => setFilterBackupCode(e.target.value)}
            value={filterBackupCode}
            variant="outlined"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BackupFilter;
