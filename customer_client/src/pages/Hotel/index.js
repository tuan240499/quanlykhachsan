import { useEffect, useState } from "react";
// UI lib
import { Box, Typography, styled, Stack, Divider } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import ImageViewer from "../../components/ImageViewer";
import Iconify from "../../components/Iconify";
import Content from "./Content";
// logic lib
import { useParams } from "react-router-dom";
import { getHotelById } from "../../api/hotel";
import Loading from "./Loading";
import { formatPhoneNumber } from "../../utils/Number";
// logic custom

//#region CSS
const BannerStyle = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 64px)",
  width: "100%",
  position: "relative",
  [theme.breakpoints.down(600)]: {
    height: "calc(100vh - 56px)",
  },
}));

const InfoStyle = styled(Stack)({
  background:
    "linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,.05) 5%,rgba(0,0,0,.9))",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  paddingTop: 30,
  flexDirection: "column",
  alignItems: "center",
});

const InfoInner = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid #FFF",
  paddingBottom: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(1080)]: {
    flexDirection: "column",
  },
}));

const DividerStyle = styled(Divider)(({ theme }) => ({
  width: 1,
  height: "100%",
  background: "#FFF",
  marginLeft: 10,
  marginRight: 10,
  [theme.breakpoints.down(1080)]: {
    display: "none",
  },
}));

const BannerImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

//#endregion

//----------------------------

const Hotel = () => {
  const id = useParams().id;
  const [loading, setLoading] = useState(true);
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [hotel, setHotel] = useState({});
  useEffect(() => {
    let isMounted = true;
    getHotelById(id)
      .then((res) => {
        if (isMounted) {
          setHotel(res.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleOpenImageViewer = () => {
    setOpenImageViewer(true);
  };

  return (
    <Page title="Khách sạn | TuanVQ">
      {loading ? (
        <Loading />
      ) : (
        <>
          <BannerStyle>
            <InfoStyle>
              <Typography variant="h3" color="#FFF" marginBottom={2}>
                {hotel.name}
              </Typography>
              <InfoInner>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Iconify
                    icon="ep:location"
                    color="#FFF"
                    style={{ marginRight: 5 }}
                  />
                  <Typography variant="body1" color="#FFF" textAlign="center">
                    {hotel.address}
                  </Typography>
                </Stack>
                <DividerStyle orientation="vertical" />
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Iconify
                    icon="clarity:phone-handset-line"
                    color="#FFF"
                    style={{ marginRight: 5 }}
                  />
                  <Typography variant="body1" color="#FFF" textAlign="center">
                    <a
                      href={`tel:${hotel.phone}`}
                      style={{ textDecoration: "none", color: "#FFF" }}
                    >
                      {formatPhoneNumber(hotel.phone)}
                    </a>
                  </Typography>
                </Stack>
                <DividerStyle orientation="vertical" />
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Iconify
                    icon="fluent:mail-48-regular"
                    color="#FFF"
                    style={{ marginRight: 5 }}
                  />
                  <Typography variant="body1" color="#FFF" textAlign="center">
                    {hotel.email}
                  </Typography>
                </Stack>
              </InfoInner>
            </InfoStyle>
            <BannerImage src={hotel.images[0]} alt="banner" />
            <Stack
              style={{
                position: "absolute",
                bottom: 15,
                left: 15,
                padding: "10px 20px",
                borderRadius: 4,
                color: "#FFF",
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              }}
              flexDirection="row"
              alignItems="center"
              onClick={handleOpenImageViewer}
            >
              <Iconify icon="bi:image" style={{ marginRight: 10 }} />
              <Typography>ẢNH</Typography>
            </Stack>
          </BannerStyle>
          <Content hotel={hotel} />
          <ImageViewer
            images={hotel.images}
            open={openImageViewer}
            setOpen={setOpenImageViewer}
          />
        </>
      )}
    </Page>
  );
};

export default Hotel;
