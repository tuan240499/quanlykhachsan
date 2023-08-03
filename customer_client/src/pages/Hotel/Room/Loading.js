// UI lib
import { Box, Stack, styled, Skeleton } from "@mui/material";
// UI custom

// logic lib

// logic custom

//#region CSS
const ItemStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: 213,
  boxShadow: "0 1px 2px 1px gray",
  borderRadius: 4,
  marginBottom: 30,
  [theme.breakpoints.down(759)]: {
    flexDirection: "column",
    height: "auto",
  },
}));
const Image = styled(Skeleton)(({ theme }) => ({
  width: "40%",
  height: "100%",
  backgroundColor: "gray",
  [theme.breakpoints.down(759)]: {
    width: "100%",
    height: 200,
  },
}));

const Ske = styled(Skeleton)({
  backgroundColor: "gray",
});
//#endregion

//----------------------------

const RoomLoading = () => {
  return (
    <ItemStyle>
      <Image variant="rectangular" animation="pulse" />
      <Box
        style={{
          flexGrow: 1,
          paddingLeft: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Ske variant="text" width="90%" height={50} animation="pulse" />
        <Ske variant="text" width="60%" height={50} animation="pulse" />
        <Ske variant="text" width="30%" height={50} animation="pulse" />
        <Stack
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          style={{ flexGrow: 1, padding: 10 }}
        >
          <Ske
            variant="rectangular"
            width="20%"
            height={40}
            animation="pulse"
            style={{ marginBottom: 5 }}
          />
          <Ske
            variant="rectangular"
            width="30%"
            height={40}
            animation="pulse"
          />
        </Stack>
      </Box>
    </ItemStyle>
  );
};

export default RoomLoading;
