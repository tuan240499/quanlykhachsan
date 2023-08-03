import { Skeleton, Box } from "@mui/material";

const LoadingItem = () => {
  return (
    <Box
      style={{ marginBottom: 20, borderRadius: 4, padding: 10 }}
      boxShadow={2}
    >
      <Skeleton
        variant="reactangle"
        style={{
          width: "80%",
          height: 30,
          backgroundColor: "gray",
          marginBottom: 10,
        }}
      />
      <Skeleton
        variant="rectangular"
        style={{
          width: 170,
          height: 30,
          backgroundColor: "gray",
          marginBottom: 5,
        }}
      />
      <Skeleton
        variant="rectangular"
        style={{
          width: 290,
          height: 30,
          backgroundColor: "gray",
          marginBottom: 5,
        }}
      />
      <Skeleton
        variant="rectangle"
        style={{
          width: "30%",
          height: 30,
          backgroundColor: "gray",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Skeleton
          variant="rectangle"
          style={{
            width: 170,
            height: 30,
            backgroundColor: "gray",
          }}
        />
        <Skeleton
          variant="rectangle"
          style={{
            width: 120,
            height: 30,
            backgroundColor: "gray",
          }}
        />
      </div>
    </Box>
  );
};

export default LoadingItem;
