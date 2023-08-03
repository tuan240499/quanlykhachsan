import { useState, useEffect } from "react";
// UI lib
import {
  Typography,
  Button,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Lottie from "react-lottie-player";
// UI custom
import Page from "../components/Page";
import NotFound from "./NotFound";
import successLottieJson from "../__MOCK__/lottie/complete.json";
import failLottieJson from "../__MOCK__/lottie/error.json";
// logic lib
import { Link, useSearchParams } from "react-router-dom";
// logic custom
import { STRING } from "../constants";
import {
  checkVnpayPaymentReturn,
  checkMomoPaymentReturn,
} from "../api/booking";
//#region CSS
//#endregion

//----------------------------
const PaymenReturn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentResult, setPaymentResult] = useState("");
  const [loading, setLoading] = useState(true);

  const booking = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_BOOKING_INFO)
  );
  const user = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  )._id;

  useEffect(() => {
    if (booking && user) {
      let params = {};
      for (const [key, value] of searchParams) {
        params[key] = value;
      }
      const created_booking = {
        user: user,
        hotel: booking.hotel,
        room_list: booking.roomIds,
        combo_list: booking.combo_list,
        amount: booking.amount,
        discount: booking.discount?._id,
        // payment_method: "VNPAY - Ngân hàng NCB",
        adult: booking.visitor.adult,
        kid: booking.visitor.kid,
        baby: booking.visitor.baby,
        effective_from: booking.startDate,
        effective_to: booking.endDate,
        payment_date: new Date(),
      };
      if (params.hasOwnProperty("vnp_ResponseCode")) {
        checkVnpayPaymentReturn({
          params: params,
          booking: created_booking,
        })
          .then((res) => {
            setPaymentResult(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setPaymentResult("FAIL");
            setLoading(false);
            console.log(err);
          });
      } else if (params.hasOwnProperty("resultCode")) {
        checkMomoPaymentReturn({ params: params, booking: created_booking })
          .then((res) => {
            setPaymentResult(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setPaymentResult("FAIL");
            setLoading(false);
            console.log(err);
          });
      } else {
        setPaymentResult("FAIL");
        setLoading(false);
      }
    }
  }, []);

  if (!booking || !user) return <NotFound />;

  const handleDeleteBookingInfo = () => {
    localStorage.removeItem(STRING.LOCAL_STORAGE_BOOKING_INFO);
  };

  return loading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <Stack flexDirection="column" alignItems="center">
        <CircularProgress style={{ color: "#FFF" }} />
        <Typography textAlign="center" variant="h6">
          Quý khách vui lòng chờ trong giây lát
        </Typography>
        <Typography textAlign="center" variant="h6">
          Thanh toán đang được thực hiện...
        </Typography>
      </Stack>
    </Backdrop>
  ) : paymentResult === "SUCCESS" ? (
    <Page
      title="Kết quả đặt phòng"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack flexDirection="column" alignItems="center">
        <Lottie
          loop={false}
          animationData={successLottieJson}
          play
          style={{ width: 200, height: 200 }}
        />
        <Typography variant="h4" textAlign="center" mb={2} color="primary">
          CHÚC MỪNG QUÝ KHÁCH ĐÃ ĐẶT PHÒNG THÀNH CÔNG
        </Typography>
        <Button
          variant="contained"
          onClick={handleDeleteBookingInfo}
          component={Link}
          to="/account?tab=booking"
        >
          XEM CHI TIẾT
        </Button>
      </Stack>
    </Page>
  ) : (
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack flexDirection="column" alignItems="center">
        <Lottie
          loop={false}
          animationData={failLottieJson}
          play
          style={{ width: 400, height: 400, maxWidth: "100%" }}
        />
        <Typography variant="h4" textAlign="center" mb={2} color="#000">
          ĐÃ CÓ LỖI XẢY RA TRONG QUÁ TRÌNH ĐẶT PHÒNG
        </Typography>
        <Typography variant="h4" textAlign="center" mb={2} color="#000">
          QUÝ KHÁCH VUI LÒNG ĐẶT LẠI PHÒNG
        </Typography>
        <Button
          variant="contained"
          component={Link}
          onClick={handleDeleteBookingInfo}
          to="/hotel"
        >
          ĐẶT LẠI PHÒNG
        </Button>
      </Stack>
    </Page>
  );
};

export default PaymenReturn;
