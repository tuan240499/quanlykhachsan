import { Skeleton, Stack, styled, Box } from "@mui/material";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  marginBottom: 25,
  borderRadius: 4,
  padding: "0 15px",
  [theme.breakpoints.down(922)]: {},
}));
const TitleSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down(470)]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));
const ScoreSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down(765)]: {
    flexDirection: "column",
  },
}));
//#endregion

const TEMP = new Array(5).fill(0);
const LoadingItem = () => {
  return (
    <RootStyle boxShadow={2}>
      <TitleSection>
        <Skeleton
          variant="text"
          style={{ width: 250, height: 60, backgroundColor: "gray" }}
        />
        <Skeleton
          variant="text"
          style={{ width: 110, height: 60, backgroundColor: "gray" }}
        />
      </TitleSection>
      <Skeleton
        variant="rectangular"
        style={{
          width: 100,
          height: 30,
          backgroundColor: "gray",
          marginBottom: 5,
        }}
      />
      <Skeleton
        variant="rectangular"
        style={{ width: 150, height: 30, backgroundColor: "gray" }}
      />
      <Skeleton
        variant="rectangle"
        style={{
          width: "100%",
          height: 80,
          backgroundColor: "gray",
          margin: "7px 0",
        }}
      />
      <ScoreSection>
        {TEMP.map((item, index) => (
          <Skeleton
            key={index}
            variant="text"
            style={{
              width: 100,
              height: 40,
              backgroundColor: "gray",
              marginRight: 10,
            }}
          />
        ))}
      </ScoreSection>
    </RootStyle>
  );
};

export default LoadingItem;
