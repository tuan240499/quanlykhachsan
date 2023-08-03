import { useEffect, useState, useContext } from "react";
// UI lib
import { Box, Typography } from "@mui/material";
// UI custom
import Filter from "./Filter";
import LoadingItem from "./LoadingItem";
import Item from "./Item";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationContext from "../../../context/Context";
// logic custom
import { getAllReviewByUser } from "../../../redux/actions/review";
//#region CSS
//#endregion

//----------------------------
const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(true);

  // FILTER STATES
  const [filterStatus, setFilterStatus] = useState(0);
  // FILTER STATES

  const reviewList = useSelector((state) => {
    if (filterStatus === 0) return state.review;

    return state.review.filter((item) => item.status === filterStatus);
  });

  useEffect(() => {
    let isMounted = true;
    dispatch(
      getAllReviewByUser(
        () => {
          if (isMounted) {
            setIsLoading(false);
          }
        },
        (needLogin, message) => {
          if (isMounted) {
            context.setNotification({
              type: "error",
              content: message,
            });
            context.setOpen(true);
            setIsLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/account?tab=review" },
              });
          }
        }
      )
    );

    return () => (isMounted = false);
  }, [dispatch, navigate]);

  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      {isLoading ? (
        <>
          <LoadingItem />
          <LoadingItem />
          <LoadingItem />
        </>
      ) : reviewList.length > 0 || filterStatus !== 0 ? (
        <>
          <Filter
            number={reviewList.length}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          {reviewList.map((item) => (
            <Item data={item} key={item._id} />
          ))}
        </>
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/static/hotel_list/no-result.webp"
            alt="no booking"
            style={{ width: "60%" }}
          />
          <Typography variant="h6" mb={1}>
            Quý khách chưa có bài đánh giá
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Review;
