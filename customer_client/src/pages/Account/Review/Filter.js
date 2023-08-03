import { MenuItem, Stack, TextField, Typography, styled } from "@mui/material";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  [theme.breakpoints.down(469)]: {
    flexDirection: "column-reverse",
  },
}));

const Filter = ({ number, filterStatus, setFilterStatus }) => {
  return (
    <RootStyle>
      <Typography variant="h6">Quý khách có {number} bài đánh giá</Typography>

      <Stack flexDirection="row" alignItems="center">
        <Typography variant="body1" style={{ marginRight: 10 }}>
          Trạng thái
        </Typography>
        <TextField
          name="filter"
          variant="outlined"
          select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <MenuItem value={0}>Tất cả</MenuItem>
          <MenuItem value={1}>Chờ duyệt</MenuItem>
          <MenuItem value={2}>Đã đăng</MenuItem>
          <MenuItem value={3}>Từ chối</MenuItem>
        </TextField>
      </Stack>
    </RootStyle>
  );
};

export default Filter;
