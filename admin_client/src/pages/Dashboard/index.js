import { useEffect, useState } from "react";
// UI lib
import { Box, Grid, Typography } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import ChartLoading from "./ChartLoading";
import IncomeExpenseChart from "./Chart/IncomeExpenseChart";
import BookingSection from "./Section/BookingSection";
import IncomExpenseInterestSection from "./Section/IncomExpenseInterestSection";
import HotelSection from "./Section/HotelSection";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// logic custom
import { getDashboard } from "../../api/dashboard";
//#region CSS
//#endregion

//----------------------------
const Dashboard = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [bookingCount, setBookingCount] = useState({
    total_count: 0,
    check_in_count: 0,
    check_out_count: 0,
  });
  const [hotelCount, setHotelCount] = useState(0);
  const [roomCount, setRoomCount] = useState({
    total_count: 0,
    empty_count: 0,
    pending_count: 0,
    rented_count: 0,
  });

  const [interest, setInterest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const performFailure = (needLogin, message) => {
      if (isMounted) {
        enqueueSnackbar(message, { variant: "error" });
        setLoading(false);
        if (needLogin)
          navigate("/login", {
            state: { returnUrl: "/dashboard" },
          });
      }
    };

    getDashboard()
      .then((res) => {
        if (isMounted) {
          let tempIncome = new Array(12).fill(0);
          let tempExpense = new Array(12).fill(0);
          for (const item of res.data.income) {
            tempIncome[item._id] = item.total;
          }
          for (const item of res.data.expense) {
            tempExpense[item._id] = item.total;
          }

          setBookingCount(res.data.bookingCount);
          setHotelCount(res.data.hotelCount);
          setRoomCount(res.data.roomCount);
          setInterest(() =>
            tempIncome.map((item, index) => item - tempExpense[index])
          );
          setIncome(tempIncome);
          setExpense(tempExpense);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!error.response || error.response.status !== 401)
          performFailure(
            false,
            "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau"
          );
        else performFailure(true, "Phiên đăng nhập hết hạn");
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <Page title="Tổng quan">
      {/* INCOME-EXPENSE-OVERALL */}
      <Typography variant="h4" my={1}>
        SƠ ĐỒ THU CHI
      </Typography>
      <Grid container columnSpacing={3} style={{ marginBottom: 35 }}>
        <Grid item xs={12} sm={12}>
          <Box boxShadow={2} style={{ padding: 20, borderRadius: 8 }}>
            {loading ? (
              <ChartLoading />
            ) : (
              <IncomeExpenseChart income={income} expense={expense} />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* BOOKING */}
      <Typography variant="h4" mb={1}>
        ĐƠN ĐẶT PHÒNG
      </Typography>
      <BookingSection data={bookingCount} />

      {/* INCOME-EXPENSE-INTEREST-SPECIFICATION */}
      <Typography variant="h4" my={1}>
        THU - CHI - LÃI
      </Typography>
      <IncomExpenseInterestSection
        income={income}
        expense={expense}
        interest={interest}
      />

      {/* USER REPORT */}
      <Typography variant="h4" my={1}>
        THỐNG KÊ PHÒNG KHÁCH SẠN
      </Typography>
      <HotelSection hotel={hotelCount} room={roomCount} />
    </Page>
  );
};

export default Dashboard;
