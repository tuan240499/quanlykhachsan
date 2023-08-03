import { Skeleton, Stack } from "@mui/material";

const TEMP = [0, 0, 0, 0, 0];
const LoadingList = () => {
  return (
    <>
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

export default LoadingList;
