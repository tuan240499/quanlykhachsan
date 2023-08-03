import { Container, Skeleton, Stack } from "@mui/material";

const HotelLoading = () => {
  return (
    <Container
      maxWidth="lg"
      style={{
        paddingTop: 20,
      }}
    >
      <Skeleton
        variant="text"
        style={{ width: "100%", height: 50, backgroundColor: "gray" }}
      />
      <Stack flexDirection="row" justifyContent="space-between">
        <Skeleton
          variant="text"
          style={{ height: 50, width: "32%", backgroundColor: "gray" }}
        />
        <Skeleton
          variant="text"
          style={{ height: 50, width: "32%", backgroundColor: "gray" }}
        />
        <Skeleton
          variant="text"
          style={{ height: 50, width: "32%", backgroundColor: "gray" }}
        />
      </Stack>
      <Skeleton
        variant="rectangular"
        style={{
          height: 50,
          width: 150,
          backgroundColor: "gray",
          position: "fixed",
          bottom: 20,
          left: 20,
        }}
      />
    </Container>
  );
};

export default HotelLoading;
