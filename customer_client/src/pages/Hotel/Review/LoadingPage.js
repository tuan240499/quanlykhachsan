import { Grid, Skeleton, Stack } from "@mui/material";

const TEMP = [0, 0, 0, 0, 0];
const LoadingPage = () => {
  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        style={{ marginBottom: 30 }}
      >
        <Skeleton
          variant="circular"
          style={{
            width: 60,
            height: 60,
            backgroundColor: "gray",
            marginRight: 20,
          }}
        />
        <div>
          <Skeleton
            variant="text"
            width={170}
            style={{ backgroundColor: "gray" }}
          />
          <Skeleton
            variant="text"
            width={230}
            style={{ backgroundColor: "gray" }}
          />
        </div>
      </Stack>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={2}
        justifyContent="space-between"
        mb={3}
      >
        {TEMP.map((item, index) => (
          <Grid item xs={5.5} md={2.2} key={index}>
            <Skeleton
              variant="rectangular"
              style={{ backgroundColor: "gray", width: "100%", height: 200 }}
            />
          </Grid>
        ))}
      </Grid>
      <Stack flexDirection="row" justifyContent="space-between" mb={3}>
        <Skeleton
          variant="text"
          height={40}
          width={200}
          style={{ backgroundColor: "gray" }}
        />
        <Skeleton
          variant="text"
          width={200}
          height={40}
          style={{ backgroundColor: "gray" }}
        />
      </Stack>
      {TEMP.map((item, index) => (
        <div
          key={index}
          style={{
            padding: "10px 20px",
            width: "100%",
            borderRadius: 8,
            boxShadow: "0 0 4px 0px gray",
            marginBottom: 40,
          }}
        >
          <Skeleton
            variant="text"
            height={40}
            width={200}
            style={{ backgroundColor: "gray", marginBottom: 2 }}
          />
          <Skeleton
            variant="text"
            height={20}
            width={230}
            style={{ backgroundColor: "gray", marginBottom: 15 }}
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width="100%"
            style={{ backgroundColor: "gray", marginBottom: 20 }}
          />
          <Stack flexDirection="row">
            <Skeleton
              variant="text"
              height={20}
              width={50}
              style={{
                backgroundColor: "gray",
                marginBottom: 15,
                marginRight: 10,
              }}
            />
            <Skeleton
              variant="text"
              height={20}
              width={100}
              style={{
                backgroundColor: "gray",
                marginBottom: 15,
                marginRight: 10,
              }}
            />
            <Skeleton
              variant="text"
              height={20}
              width={150}
              style={{ backgroundColor: "gray", marginBottom: 15 }}
            />
          </Stack>
        </div>
      ))}
    </>
  );
};

export default LoadingPage;
