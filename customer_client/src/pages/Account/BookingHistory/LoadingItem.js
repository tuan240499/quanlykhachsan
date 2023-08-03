import { Skeleton, styled, Box } from "@mui/material";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  marginBottom: 25,
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  height: 210,
  [theme.breakpoints.down(922)]: {
    flexDirection: "column",
    height: "fit-content",
  },
}));
const ImageSection = styled(Skeleton)(({ theme }) => ({
  height: "100%",
  width: "30%",
  backgroundColor: "gray",
  display: "block",
  marginRight: 20,
  [theme.breakpoints.down(922)]: {
    width: "100%",
    height: 200,
  },
}));

const InfoSection = styled("div")(({ theme }) => ({
  width: "70%",
  height: "100%",
  padding: "10px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down(922)]: {
    width: "100%",
    paddingLeft: 20,
  },
  [theme.breakpoints.down(672)]: {
    flexDirection: "column",
  },
}));

const InfoSide = styled("div")(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down(672)]: {
    width: "100%",
  },
}));
const DateSide = styled("div")(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "flex-end",
  paddingRight: 20,
  [theme.breakpoints.down(672)]: {
    width: "100%",
  },
}));

const TextAnimation = styled(Skeleton)(({ theme }) => ({
  backgroundColor: "gray",
  height: 30,
  marginBottom: 10,
}));
//#endregion

const LoadingItem = () => {
  return (
    <RootStyle boxShadow={3}>
      <ImageSection variant="rectangular" animation="pulse" />
      <InfoSection>
        <InfoSide>
          <TextAnimation
            variant="reactangle"
            animation="pulse"
            style={{
              width: "90%",
            }}
          />
          <TextAnimation
            variant="reactangle"
            animation="pulse"
            style={{
              width: "60%",
            }}
          />
          <TextAnimation
            variant="reactangle"
            animation="pulse"
            style={{
              width: "30%",
            }}
          />
        </InfoSide>
        <DateSide>
          <TextAnimation
            variant="reactangle"
            animation="pulse"
            style={{
              width: "90%",
            }}
          />
          <TextAnimation
            variant="reactangle"
            animation="pulse"
            style={{
              width: "60%",
            }}
          />
          <TextAnimation
            variant="reactangle"
            animation="pulse"
            style={{
              width: "30%",
            }}
          />
        </DateSide>
      </InfoSection>
    </RootStyle>
  );
};

export default LoadingItem;
