import { useEffect, useState } from "react";
// UI lib
import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Divider,
  Pagination,
  styled,
} from "@mui/material";
// UI custom
import CommentList from "./ReviewList";
import LoadingPage from "./LoadingPage";
import LoadingList from "./LoadingList";
import Score from "./ReviewScore";
import NoResult from "./NoResult";
// logic lib
// logic custom
import {
  getAllReviewByHotel,
  getAllReviewByPagination,
} from "../../../api/review";
//#region CSS
const ReviewToolbar = styled("div")(({ theme }) => ({
  marginTop: 10,
  marginBottom: 10,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down(720)]: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
}));
//#endregion

//----------------------------

const Review = ({ hotel }) => {
  const [filterValue, setFilterValue] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewList, setReviewList] = useState([]);
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getAllReviewByHotel(hotel._id)
      .then((res) => {
        if (isMounted) {
          setReviewList(res.data.review);
          setInfo(res.data.info);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.log(err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (!loading) {
      setLoadingList(true);
      getAllReviewByPagination(hotel._id, reviewPage)
        .then((res) => {
          if (isMounted) {
            setReviewList(res.data);
            setLoadingList(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.log(err);
            setLoadingList(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [reviewPage]);

  return (
    <Box
      style={{
        width: "100%",
        paddingBottom: 20,
      }}
    >
      <Typography variant="h4" style={{ marginTop: 30, marginBottom: 15 }}>
        Nhận xét hữu ích cho {hotel.name}
      </Typography>
      {loading ? (
        <LoadingPage />
      ) : reviewList.length > 0 ? (
        <>
          <Score scoreList={info.scores} numReview={info.count} />
          {/* COMMENT INFO */}
          <ReviewToolbar>
            <Typography variant="h6">
              Hiển thị {info.count} đánh giá thực từ du khách
            </Typography>
          </ReviewToolbar>
          {/* PAGINATION */}
          <Stack flexDirection="row" justifyContent="center">
            <Pagination
              count={info.totalPage}
              page={reviewPage}
              size="large"
              color="primary"
              onChange={(event, value) => setReviewPage(value)}
            />
          </Stack>

          <Stack
            flexDirection="row"
            justifyContent="center"
            style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          >
            <Divider
              style={{
                width: "80%",
                borderBottomWidth: 1,
                backgroundColor: "#F4F4F4",
              }}
            />
          </Stack>
          {/* COMMENT LIST */}
          {loadingList ? <LoadingList /> : <CommentList data={reviewList} />}

          {/* PAGINATION */}
          <Stack flexDirection="column" alignItems="center">
            <Divider
              style={{
                width: "80%",
                borderBottomWidth: 1,
                backgroundColor: "#F4F4F4",
              }}
            />
            <Pagination
              count={info.totalPage}
              page={reviewPage}
              size="large"
              color="primary"
              onChange={(event, value) => setReviewPage(value)}
              style={{ marginTop: 20 }}
            />
          </Stack>
        </>
      ) : (
        <NoResult />
      )}
    </Box>
  );
};

export default Review;
