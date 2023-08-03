import { Skeleton, Stack } from "@mui/material";
import React from "react";

const COLS = [64, 16, 65, 84, 41, 64, 66, 88, 76, 3];
const ChartLoading = () => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-end"
      style={{ height: 400, width: "100%" }}
    >
      {COLS.map((item, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          style={{
            width: 50,
            height: item + "%",
            backgroundColor: "gray",
            marginRight: 20,
          }}
        />
      ))}
    </Stack>
  );
};

export default ChartLoading;
