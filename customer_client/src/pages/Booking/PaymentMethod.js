import PropTypes from "prop-types";
// UI lib
import {
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Grid,
  Box,
  Radio,
  Button,
} from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// UI custom
// logic lib
// logic custom
import {
  createBooking,
  createVnpayPaymentUrl,
  createMomoPaymentUrl,
} from "../../api/booking";
import { INTERNAL_BANKS, EXTERNAL_BANKS } from "../../__MOCK__/index";
import { STRING } from "../../constants/index";
//#region CSS
//#endregion

const PAYMENT_METHOD = [
  {
    text: "Thẻ/tài khoản ngân hàng (ATM nội địa)",
    ariaControls: "panel1a-content",
    id: "panel1a-header",
    banks: INTERNAL_BANKS,
    buttonText: "THANH TOÁN NỘI ĐỊA",
  },
  {
    text: "Thẻ tín dụng/ghi nợ quốc tế",
    ariaControls: "panel2a-content",
    id: "panel2a-header",
    banks: EXTERNAL_BANKS,
    buttonText: "THANH TOÁN QUỐC TẾ",
  },
];

const VND_TO_DOLLAR = (vnd) => (vnd / 23000).toFixed(2);

//----------------------------
const PaymentMethod = ({
  selectedBank,
  setSelectedBank,
  setOpenCompleteDialog,
  setPaymentProcessing,
}) => {
  const booking = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_BOOKING_INFO)
  );

  const handleVnpayCheckout = () => {
    if (!selectedBank) alert("Quý khách vui lòng chọn ngân  hàng");
    else {
      setPaymentProcessing(true);
      createVnpayPaymentUrl({ bank: selectedBank, amount: booking.amount })
        .then((res) => (window.location.href = res.data))
        .catch((err) => {
          setPaymentProcessing(false);
          alert("Đã xảy ra lỗi, quý khách vui lòng thử lại sau");
        });
    }
  };

  const handleMomoCheckout = () => {
    setPaymentProcessing(true);
    createMomoPaymentUrl({ amount: booking.amount })
      .then((res) => (window.location.href = res.data))
      .catch((err) => {
        setPaymentProcessing(false);
        alert("Đã xảy ra lỗi, quý khách vui lòng thử lại sau");
      });
  };

  const handleCreateBooking = () => {
    createBooking({
      hotel: booking.hotel,
      room_list: booking.roomIds,
      combo_list: booking.combo_list,
      amount: booking.amount,
      discount: booking.discount?._id,
      payment_method: "PAYPAL",
      adult: booking.visitor.adult,
      kid: booking.visitor.kid,
      baby: booking.visitor.baby,
      effective_from: booking.startDate,
      effective_to: booking.endDate,
      payment_date: new Date(),
    })
      .then((res) => {
        setOpenCompleteDialog(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {PAYMENT_METHOD.map((method) => (
        <Accordion key={method.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={method.ariaControls}
            id={method.id}
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <Typography variant="body1" fontWeight="bold">
              {method.text}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor: "#F2F2F2" }}>
            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1.5 }}>
              {method.banks.map((bank) => (
                <Grid key={bank.value} item xs={4} sm={3}>
                  <Box
                    style={{
                      height: 130,
                      backgroundColor: "#FFF",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      borderWidth: 2,
                      borderColor:
                        selectedBank === bank.value ? "#5393f9" : "#FFF",
                      borderStyle: "solid",
                      transition: "border .3s ease",
                    }}
                    onClick={() => setSelectedBank(bank.value)}
                  >
                    <Radio
                      checked={selectedBank === bank.value}
                      style={{ position: "absolute", top: 1, left: 1 }}
                    />
                    <img
                      src={bank.img}
                      alt="bank logo"
                      style={{
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              style={{ marginTop: 20, padding: 10 }}
              onClick={handleVnpayCheckout}
            >
              {method.buttonText}
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* PAYPAL */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          style={{ backgroundColor: "#F2F2F2" }}
        >
          <Typography variant="body1" fontWeight="bold">
            Paypal
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#F2F2F2" }}>
          <PayPalScriptProvider
            //client-id stands for the id of business account, who is the seller in this transaction
            //you must log in with another account to purchase
            options={{
              "client-id":
                "AQBTdnr3dm6TENNubrGRnauD8Dy_oReUCTL-5kuAvXE5pkCu78s_dDJs_jHp5Tuc4pHaWdHCJTaCnMH1",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: VND_TO_DOLLAR(booking.amount),
                      },
                      payee: {
                        email_address: "sb-pcny315242414@business.example.com",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order
                  .capture()
                  .then((details) => handleCreateBooking());
              }}
              onCancel={() => console.log("CANCEL")}
            />
          </PayPalScriptProvider>
        </AccordionDetails>
      </Accordion>

      {/* MOMO */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
          style={{ backgroundColor: "#F2F2F2" }}
        >
          <Typography variant="body1" fontWeight="bold">
            MOMO
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#F2F2F2" }}>
          <img
            src="/static/bank/MOMO.png"
            alt="momo logo"
            width="200"
            height="200"
            style={{ margin: "0 auto" }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#D82D8B",
              margin: "10px 0",
              padding: "10px 0",
            }}
            onClick={handleMomoCheckout}
          >
            THANH TOÁN QUA MOMO
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

PaymentMethod.propTypes = {
  selectedBank: PropTypes.string,
  setSelectedBank: PropTypes.func,
};

export default PaymentMethod;
