import { Box } from "@mui/material";
import CommentItem from "./ReviewItem";

const ReviewList = ({ data }) => {
  return (
    <Box style={{ width: "100%" }}>
      {data.map((item, index) => (
        <CommentItem key={index} data={item} />
      ))}
    </Box>
  );
};

export default ReviewList;
