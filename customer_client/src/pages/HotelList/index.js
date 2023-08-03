// UI lib
import {
  Box,
  Container,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// UI custom
import Page from "../../components/Page";
import Filter from "../../components/Filter";
import List from "./List";
import LoadingList from "./LoadingList";
import ImageViewer from "../../components/ImageViewer";
// logic lib
// logic custom

//#region CSS
const ResultStyle = styled(Box)(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down(720)]: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
//#endregion

//----------------------------

const HotelList = () => {
  const [result, setResult] = useState({ loading: false, num: -1 });
  const [sortValue, setSortValue] = useState(1);
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [images, setImages] = useState([]);

  return (
    <Page title="Booking | TuanVQ">
      <Filter setResult={setResult} />
      {result.loading ? (
        <LoadingList />
      ) : result.num !== -1 ? (
        <>
          {result.num > 0 ? (
            <>
              <Container maxWidth="lg">
                <ResultStyle>
                  <Typography variant="h6">
                    Hiển thị {result.num} kết quả phù hợp
                  </Typography>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography variant="body1" style={{ marginRight: 10 }}>
                      Sắp xếp theo
                    </Typography>
                    <TextField
                      label=""
                      name="filter"
                      variant="outlined"
                      select
                      value={sortValue}
                      disabled={result.loading}
                      onChange={(e) => setSortValue(e.target.value)}
                    >
                      <MenuItem value={1}>Giá thấp đến cao</MenuItem>
                      <MenuItem value={2}>Giá cao đến thấp</MenuItem>
                      <MenuItem value={3}>Hữu ích nhất</MenuItem>
                    </TextField>
                  </Stack>
                </ResultStyle>
              </Container>
              <List
                sortValue={sortValue}
                setOpenImageViewer={setOpenImageViewer}
                setImages={setImages}
              />
            </>
          ) : (
            <Container
              maxWidth="lg"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/static/hotel_list/no-result.webp"
                alt="banner"
                width="100%"
                style={{ maxHeight: "50vh", objectFit: "contain" }}
              />
              <Typography textAlign="center" variant="h6">
                Rất tiếc, không có khách sạn theo lựa chọn của quý khách.
              </Typography>
              <Typography textAlign="center" variant="h6">
                Vui lòng thay đổi thời gian lưu trú hoặc khách sạn cùng khu vực
                (nếu có).
              </Typography>
            </Container>
          )}
        </>
      ) : (
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/static/hotel_list/not-search.webp"
            alt="banner"
            width="100%"
            style={{ maxHeight: "60vh", objectFit: "contain" }}
          />
          <Typography textAlign="center" variant="h3">
            Tìm kiếm chỗ nghỉ chân ngay nào!!
          </Typography>
        </Container>
      )}
      <ImageViewer
        open={openImageViewer}
        setOpen={setOpenImageViewer}
        images={images}
      />
    </Page>
  );
};

export default HotelList;
