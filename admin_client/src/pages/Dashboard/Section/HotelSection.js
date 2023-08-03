import { Box, Grid, Stack, Typography } from "@mui/material";
import { formatCount } from "../../../utils/number";
import RoomChart from "../Chart/RoomChart";

const HotelSection = ({ hotel, room }) => {
  const GRID = [
    {
      text: "Khách sạn",
      img: "/static/hotel.png",
      value: hotel,
    },
    {
      text: "Phòng",
      img: "/static/room.webp",
      value: formatCount(room.total_count),
    },
  ];
  return (
    <Grid
      container
      spacing={3}
      style={{ marginBottom: 35 }}
      direction="row"
      alignItems="stretch"
    >
      {GRID.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Box
            boxShadow={2}
            style={{
              borderRadius: 8,
              padding: 20,
              backgroundColor: "#FFF",
            }}
          >
            <Stack
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                alt="illustration"
                src={item.img}
                style={{ height: 200, objectFit: "contain" }}
              />
              <Typography variant="h3">{item.value}</Typography>
              <Typography variant="h6" color="rgb(99, 115, 129)">
                {item.text}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={6}>
        <Box
          boxShadow={2}
          style={{
            borderRadius: 8,
            padding: 20,
            backgroundColor: "#FFF",
          }}
        >
          <Typography variant="h6">Trạng thái phòng</Typography>
          <RoomChart
            data={[room.empty_count, room.pending_count, room.rented_count]}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HotelSection;
