import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/Number";
import { formatDate, getDiffDays } from "../../../utils/Date";
import { INTEGER } from "../../../constants";

const Item = ({ data }) => {
  const remaining_day =
    getDiffDays(Date.now(), new Date(data.effective_to).getTime()) + 1;
  return (
    <Box
      boxShadow={2}
      style={{ padding: 10, borderRadius: 4, marginBottom: 20 }}
    >
      <Typography variant="h6" mb={1}>
        #{data.code} - {data.title}
      </Typography>
      <Typography variant="body1" style={{ color: "gray" }}>
        Giá trị:{" "}
        {data.type === INTEGER.AMOUNT_DISCOUNT
          ? `${formatNumber(data.value)} VNĐ`
          : `${data.value}%`}
      </Typography>
      <Typography variant="body1" style={{ color: "gray" }}>
        Đơn hàng tối thiểu: {formatNumber(data.pricing_condition)} VNĐ
      </Typography>
      <Typography variant="body1" style={{ color: "gray" }}>
        Thời gian: {formatDate(data.effective_from)} đến{" "}
        {formatDate(data.effective_to)}
      </Typography>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        {remaining_day <= 5 ? (
          <div
            style={{
              backgroundColor: "#FFF3E0",
              color: "#F57F17",
              padding: "5px 10px",
              boxShadow: "0 0 1px 0 #F57F17",
              userSelect: "none",
            }}
          >
            Hết hạn sau {remaining_day} ngày
          </div>
        ) : (
          <div></div>
        )}
        <Button component={Link} to="/hotel" variant="outlined">
          DÙNG NGAY
        </Button>
      </Stack>
    </Box>
  );
};

export default Item;
