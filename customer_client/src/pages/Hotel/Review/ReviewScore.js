import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  styled,
  Grid,
} from "@mui/material";
import React from "react";
import Iconify from "../../../components/Iconify";

const RootScore = styled(Grid)(({ theme }) => ({
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-around",
  },
}));
const ScoreBox = styled(Grid)(({ theme }) => ({
  height: 200,
  borderRadius: 4,
  boxShadow: "0 0 3px 0 gray",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: 20,
  [theme.breakpoints.down("md")]: {},
}));
const InnerScoreBox = styled(Box)({
  width: "100%",
  display: "flex",
  height: 160,
  justifyContent: "center",
  position: "relative",
  alignItems: "center",
});

const ReviewScore = ({ scoreList, numReview }) => {
  const DATA = [
    {
      text: "Độ sạch sẽ",
      score: scoreList.totalCleanScore,
      value: scoreList.totalCleanScore * 10,
    },
    {
      text: "Tiện nghi",
      score: scoreList.totalFacilityScore,
      value: scoreList.totalFacilityScore * 10,
    },
    {
      text: "Vị trí",
      score: scoreList.totalLocationScore,
      value: scoreList.totalLocationScore * 10,
    },
    {
      text: "Dịch vụ",
      score: scoreList.totalServiceScore,
      value: scoreList.totalServiceScore * 10,
    },
    {
      text: "Đáng giá tiền",
      score: scoreList.totalValueScore,
      value: scoreList.totalValueScore * 10,
    },
  ];
  return (
    <>
      {/* OVERALL */}
      <Stack flexDirection="row" style={{ marginBottom: 15 }}>
        <Box
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            height: 70,
            width: 70,
            marginRight: 12,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={scoreList.totalOverallScore * 10}
            size={60}
          />
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" backgroundColor="primary">
              {scoreList.totalOverallScore}
            </Typography>
          </Box>
        </Box>
        <Stack flexDirection="column" justifyContent="space-around">
          <Typography variant="h5">
            {scoreList.totalOverallScore >= 8
              ? "Trên cả tuyệt vời"
              : scoreList.totalOverallScore >= 6
              ? "Hài lòng"
              : "Dưới mức mong đợi"}
          </Typography>
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="body1" style={{ marginRight: 5 }}>
              Dựa trên {numReview} bài đánh giá
            </Typography>
            <Iconify
              icon="akar-icons:circle-check-fill"
              sx={{ color: "success.main" }}
            />
          </Stack>
        </Stack>
      </Stack>
      {/* DETAIL */}
      <Typography variant="h5" marginBottom={2}>
        Chi tiết
      </Typography>
      <RootScore container>
        {DATA.map((item, index) => (
          <ScoreBox item key={index} xs={5} md={2.2}>
            <InnerScoreBox>
              <CircularProgress
                variant="determinate"
                value={item.value}
                size={120}
              />
              <Box
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3" style={{ cursor: "default" }}>
                  {item.score}
                </Typography>
              </Box>
            </InnerScoreBox>
            <Typography variant="h6">{item.text}</Typography>
          </ScoreBox>
        ))}
      </RootScore>
    </>
  );
};

export default ReviewScore;
