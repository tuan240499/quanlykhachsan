import { useState, useMemo, useEffect } from "react";
// UI lib
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
// UI custom
import Iconify from "../../../components/Iconify";
// logic lib
import { useNavigate } from "react-router-dom";
// logic custom
import { formatDate, getDiffDays } from "../../../utils/Date";
import { formatNumber } from "../../../utils/Number";
import { INTEGER, STRING } from "../../../constants";
import { holdRoom } from "../../../api/room";
import { checkAuth } from "../../../api/user";
import { checkDiscount } from "../../../api/discount";

//#region CSS
const AccordionStyle = styled(Accordion)({
  padding: 0,
  boxShadow: "none",
  border: "none",
  "&:before": {
    display: "none",
  },
});
const AccordionSummaryStyle = styled(AccordionSummary)({
  padding: 0,
});
const AccordionDetailsStyle = styled(AccordionDetails)({
  padding: 0,
});
//#endregion

//----------------------------
const HOLDING_TIME = 1200000; // 20 minutes
const Result = ({
  hotelId,
  hotelName,
  startDate,
  endDate,
  visitor,
  selectedRooms,
  setSelectedRooms,
  selectedComboList,
  setSelectedComboList,
  setOpenNotEnoughDialog,
  setNotEnoughRooms,
  setOpenAuthenticatedDialog,
  numPeakDay,
}) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const diffDays = getDiffDays(startDate, endDate);

  const basedAmount = useMemo(() => {
    const price = selectedRooms.reduce(
      (result, room) => result + room.rent_bill,
      0
    );
    const peakday = numPeakDay > 0 ? numPeakDay - 1 : 0;
    // console.log(price);
    // console.log(diffDays);
    // console.log(peakday);
    return Math.floor(price * (diffDays + peakday * (20 / 100)));
  }, [diffDays, selectedRooms, numPeakDay]);

  const amount = useMemo(
    () =>
      discount
        ? discount.type === INTEGER.AMOUNT_DISCOUNT
          ? basedAmount - discount.value
          : basedAmount - basedAmount * (discount.value / 100)
        : basedAmount,
    [basedAmount, discount]
  );

  //REMOVE DISCOUNT IF USER RE-SEARCH
  useEffect(() => {
    let isMounted = true;
    if (selectedRooms.length === 0 && isMounted) {
      setDiscount(null);
      setCode("");
    }

    return () => {
      isMounted = false;
    };
  }, [selectedRooms]);

  const validateBookingInfo = () => {
    if (selectedRooms.length > 0) {
      holdRoom({
        hotel: hotelId,
        selectedRoomTypes: selectedRooms,
        holding_time: HOLDING_TIME,
        date: [startDate, endDate],
      })
        .then((res) => {
          localStorage.setItem(
            STRING.LOCAL_STORAGE_BOOKING_INFO,
            JSON.stringify({
              hotel: hotelId,
              hotelName: hotelName,
              startDate: startDate,
              endDate: endDate,
              visitor: visitor,
              discount: discount,
              selectedRooms: selectedRooms,
              combo_list: selectedComboList,
              expire: Date.now() + HOLDING_TIME, //add 10 minutes
              amount: amount,
              basedAmount: basedAmount,
              roomIds: res.data,
            })
          );
          navigate("/booking");
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            setNotEnoughRooms(err.response.data);
            setOpenNotEnoughDialog(true);
          }
        });
    } else alert("Quý khách vui lòng chọn phòng");
  };
  const handleSetBookingInfo = () => {
    checkAuth()
      .then(() => {
        validateBookingInfo();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setOpenAuthenticatedDialog(true);
        }
      });
  };

  const handleRemoveSelectedRoom = (remove_index) => {
    setSelectedRooms(
      selectedRooms.filter((room, index) => index !== remove_index)
    );
    setSelectedComboList(
      selectedComboList.filter((combo, index) => index !== remove_index)
    );
  };

  const applyDiscount = () => {
    if (code === "") {
      alert("Quý khách vui lòng nhập mã khuyến mãi");
      return;
    }
    checkDiscount({ code: code, amount: amount })
      .then((res) => {
        setDiscount(res.data);
      })
      .catch((err) => {
        if (err.response.status === 409) alert(err.response.data);
        else if (err.response.status === 401) {
          setOpenAuthenticatedDialog(true);
        }
      });
  };

  const removeDiscount = () => {
    setDiscount(null);
    setCode("");
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Thông tin đặt phòng
      </Typography>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      <Typography variant="body1" fontWeight="bold">
        {hotelName}
      </Typography>
      {/* SCHEDULE */}
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Box>
          <Typography variant="body2" textAlign="center">
            Nhận phòng
          </Typography>
          <Typography variant="h6" textAlign="center">
            {formatDate(startDate)}
          </Typography>
        </Box>
        <Iconify
          icon="ri:building-line"
          sx={{ width: 30, height: 30, color: "primary.main" }}
        />
        <Box>
          <Typography variant="body2" textAlign="center">
            Trả phòng
          </Typography>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            {formatDate(endDate)}
          </Typography>
        </Box>
      </Stack>
      {/* NUM PEOPLE */}
      <Stack
        style={{ width: "100%" }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body1">
            Người lớn:{" "}
            <span style={{ fontWeight: "bolder" }}>{visitor.adult}</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body1">
            Trẻ em: <span style={{ fontWeight: "bolder" }}>{visitor.kid}</span>
          </Typography>
        </Box>
        <Box
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#e6e6e6" }}
        >
          <Typography variant="body1">
            Em bé: <span style={{ fontWeight: "bolder" }}>{visitor.baby}</span>
          </Typography>
        </Box>
      </Stack>
      {/* DURATION */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số đêm</Typography>
        <Typography variant="body1" fontWeight="bold">
          {diffDays + 1} ngày {diffDays} đêm
        </Typography>
      </Stack>
      {/* PEAK DAY */}
      {numPeakDay > 0 && (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <Typography variant="body1">Số ngày cao điểm(+20%)</Typography>
          <Typography variant="body1" fontWeight="bold">
            {numPeakDay - 1} ngày
          </Typography>
        </Stack>
      )}
      {/* NUMBER OF ROOMS */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Typography variant="body1">Số phòng</Typography>
        <Typography variant="body1" fontWeight="bold">
          {selectedRooms.length}
        </Typography>
      </Stack>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* ROOM LIST */}
      <AccordionStyle defaultExpanded>
        <AccordionSummaryStyle
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Thông tin phòng</Typography>
        </AccordionSummaryStyle>
        <AccordionDetailsStyle>
          {/* LIST */}
          {selectedRooms.length > 0 ? (
            selectedRooms.map((room, index) => (
              <Stack
                key={index}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="body1" style={{ maxWidth: "50%" }}>
                  <span style={{ fontWeight: "bold" }}>Phòng {index + 1}:</span>{" "}
                  {room.name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  {formatNumber(room.rent_bill)} đ
                </Typography>
                <Tooltip title="Xóa" placement="top">
                  <IconButton
                    color="error"
                    style={{ height: 30, width: 30 }}
                    onClick={() => handleRemoveSelectedRoom(index)}
                  >
                    <RemoveIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))
          ) : (
            <Typography variant="body1">Chưa chọn phòng</Typography>
          )}
        </AccordionDetailsStyle>
      </AccordionStyle>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* DISCOUNT */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <TextField
          size="small"
          label="Mã khuyến mãi"
          name="discount"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={discount !== null || selectedRooms.length === 0}
        />
        <Button
          variant="contained"
          color={discount ? "error" : "primary"}
          onClick={discount ? removeDiscount : applyDiscount}
          disabled={selectedRooms.length === 0}
        >
          {discount ? "Gỡ" : "Áp dụng"}
        </Button>
      </Stack>
      <Divider
        style={{
          backgroundColor: "#637381",
          marginTop: 10,
          marginBottom: 10,
          height: 1.5,
        }}
      />
      {/* PRICE */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold">
          Tổng tiền:
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold">
          {formatNumber(basedAmount)} <span style={{ fontSize: 17 }}>đ</span>
        </Typography>
      </Stack>
      {/* PRICE AFTER APPLYING DISCOUNT */}
      {discount && (
        <>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Khuyến mãi:
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              -{formatNumber(discount.value)}
              {discount.type === INTEGER.PERCENTAGE_DISCOUNT && "%"}
            </Typography>
          </Stack>
          {/* PRICE AFTER APPLYING DISCOUNT */}
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Sau khuyến mãi:
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              {formatNumber(amount)} <span style={{ fontSize: 17 }}>đ</span>
            </Typography>
          </Stack>
        </>
      )}
      {/* BUTTON */}
      <Button
        fullWidth
        onClick={handleSetBookingInfo}
        variant="contained"
        style={{ padding: 8, marginTop: 15, marginBottom: 10, fontSize: 18 }}
      >
        ĐẶT NGAY
      </Button>
    </>
  );
};

export default Result;
