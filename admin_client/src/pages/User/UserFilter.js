import { Grid, MenuItem, TextField } from "@mui/material";
import { PhoneFormatCustom } from "../../components/FormattedInput";
import { INTEGER } from "../../constants";

const USER_ROLE = [
  { value: 0, text: "Tất cả" },
  { value: INTEGER.ADMIN_ROLE, text: "Quản trị viên" },
  { value: INTEGER.EMPLOYEE_ROLE, text: "Nhân viên" },
  { value: INTEGER.CUSTOMER_ROLE, text: "Khách hàng" },
];

const STATUS = [
  { value: 2, text: "Tất cả" },
  { value: 0, text: "Hoạt động" },
  { value: 1, text: "Đã khóa" },
];

const UserFilter = ({
  filterName,
  setFilterName,
  filterPhone,
  setFilterPhone,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Họ và tên"
            margin="normal"
            type="text"
            name="full_name"
            onChange={(e) => setFilterName(e.target.value)}
            value={filterName}
            variant="outlined"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Số điện thoại"
            margin="normal"
            type="text"
            name="phone"
            onChange={(e) => setFilterPhone(e.target.value)}
            value={filterPhone}
            variant="outlined"
            autoComplete="new-password"
            InputProps={{
              inputComponent: PhoneFormatCustom,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            margin="normal"
            select
            name="status"
            variant="outlined"
            label="Trạng thái"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {STATUS.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            margin="normal"
            select
            name="role"
            variant="outlined"
            label="Vai trò"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {USER_ROLE.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserFilter;
