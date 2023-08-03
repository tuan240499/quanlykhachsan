import { Box, Grid, Stack, Typography } from "@mui/material";
import SparkLineChart from "../Chart/SparkLineChart";
import Iconify from "../../../components/Iconify";
import { formatNumber } from "../../../utils/number";

const IncomExpenseInterestSection = ({ income, expense, interest }) => {
  const DATA = [
    {
      title: "Tổng thu",
      value: formatNumber(income.reduce((prev, cur) => prev + cur, 0)),
      array: income,
      bgColor: "#D1FFFC",
      iconColor: "#0E77B7",
      chartColor: "#1CCAFF",
    },
    {
      title: "Tổng chi",
      value: formatNumber(expense.reduce((prev, cur) => prev + cur, 0)),
      array: expense,
      bgColor: "#FFF7CD",
      iconColor: "#B78103",
      chartColor: "#FFC107",
    },
    {
      title: "Tổng lãi",
      value: formatNumber(interest.reduce((prev, cur) => prev + cur, 0)),
      array: interest,
      bgColor: "#C8FACD",
      iconColor: "#007B55",
      chartColor: "#00AB55",
    },
  ];
  return (
    <Grid container spacing={3} style={{ marginBottom: 35 }}>
      {DATA.map((item, index) => (
        <Grid key={index} item xs={12} md={4}>
          <Box
            boxShadow={2}
            style={{
              borderRadius: 8,
              backgroundColor: item.bgColor,
              overflow: "hidden",
            }}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              style={{ padding: 20 }}
            >
              <div>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h3">{item.value}</Typography>
                {/* <Typography variant="body1">+2.6% với tháng trước</Typography> */}
              </div>
              <Iconify
                icon="bi:arrow-up-right-circle-fill"
                style={{ width: 35, height: 35, color: item.iconColor }}
              />
            </Stack>
            <SparkLineChart data={item.array} color={item.chartColor} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default IncomExpenseInterestSection;
