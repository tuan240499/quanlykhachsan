import { Box, Grid, Stack, Typography } from "@mui/material";
import { formatCount } from "../../../utils/number";

const BookingSection = ({ data }) => {
  const GRID = [
    {
      text: "Tổng đơn",
      img: "/static/all_booking.png",
      value: formatCount(data.total_count),
    },
    {
      text: "Check In",
      img: "/static/check_in_booking.png",
      value: formatCount(data.check_in_count),
    },
    {
      text: "Check Out",
      img: "/static/check_out_booking.png",
      value: formatCount(data.check_out_count),
    },
  ];
  return (
    <Grid container spacing={3} style={{ marginBottom: 35 }}>
      {GRID.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <Box
            boxShadow={2}
            style={{
              borderRadius: 8,
              padding: 20,
              backgroundColor: "#FFF",
            }}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack flexDirection="column" alignItems="center">
                <Typography variant="h3">{item.value}</Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="rgb(99, 115, 129)"
                >
                  {item.text}
                </Typography>
              </Stack>
              <div
                style={{
                  backgroundColor: "#ebebeb",
                  borderRadius: "50%",
                }}
              >
                <img
                  alt="illustration"
                  src={item.img}
                  style={{ width: 130, height: 130 }}
                />
              </div>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookingSection;
