import { useRef, useState } from "react";
import PropTypes from "prop-types";
// UI lib
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  styled,
  TextField,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import GradeIcon from "@mui/icons-material/Grade";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePickerDay as MuiDateRangePickerDay } from "@mui/x-date-pickers-pro/DateRangePickerDay";
// UI custom
import MenuPopover from "../../../components/Popover";
// logic lib
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import viLocale from "date-fns/locale/vi";
// logic custom
import CustomDateAdapter from "../../../components/CustomDateAdapter";
import { getAvailableRoomType } from "../../../redux/actions/room_type";
//#region CSS
const FilterStyle = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down(928)]: {
    flexDirection: "column",
  },
}));

const VistorChooser = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down(928)]: {
    marginBottom: 20,
    width: "100%",
  },
}));
const CountButton = styled(IconButton)(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.primary,
  width: 30,
  height: 30,
}));

const DateChooser = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down(928)]: {
    width: "100%",
    marginBottom: 20,
  },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  height: 50,
  width: 100,
  [theme.breakpoints.down(928)]: {
    width: "100%",
  },
}));
//#endregion

const initialValues = {
  date: [new Date(), new Date(Date.now() + 86400000)], // add one day to second element
  adult: 1,
  kid: 0,
  baby: 0,
};

const Filter = ({
  setResult,
  hotel_id,
  setStartDate,
  setEndDate,
  setVisitor,
  setSelectedRooms,
  peakDayList,
  setNumPeakDay,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleCloseVisitorChooser = () => {
    setOpen(false);
  };

  const renderWeekPickerDay = (date, dateRangePickerDayProps) => {
    let isSelected = false;
    for (let item of peakDayList) {
      const val = date.getTime();
      if (val >= item.start_date && val <= item.end_date) {
        isSelected = true;
        break;
      }
    }
    return (
      <Badge
        key={date.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? <GradeIcon color="error" fontSize="small" /> : undefined
        }
      >
        <MuiDateRangePickerDay {...dateRangePickerDayProps} />{" "}
      </Badge>
    );
  };

  return (
    <Box
      boxShadow={3}
      style={{
        borderRadius: 4,
        padding: 20,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          fake: Yup.number()
            .min(1, "Chọn tỉnh / thành phố")
            .max(64, "Chọn tỉnh / thành phố"),
          // adult: Yup.number().min(1, "Số lượng khách không hợp lệ"),
          // kid: Yup.number().min(0, "Số lượng khách không hợp lệ"),
          // baby: Yup.number().min(0, "Số lượng khách không hợp lệ"),
          date: Yup.array().of(Yup.date().required("Chưa nhập ngày")),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (
            new Date(values.date[0]).setHours(0, 0, 0, 0) ===
            new Date(values.date[1]).setHours(0, 0, 0, 0)
          ) {
            setSubmitting(false);
            return alert(
              "Ngày nhận phòng và ngày trả phòng không được giống nhau"
            );
          }
          setStartDate(values.date[0]);
          setEndDate(values.date[1]);
          setVisitor({
            adult: values.adult,
            kid: values.kid,
            baby: values.baby,
          });
          setSelectedRooms([]);
          setResult({ loading: true, num: -1 });
          dispatch(
            getAvailableRoomType(
              hotel_id,
              values,
              (numResult, numPeakDay) => {
                setSubmitting(false);
                setResult({ loading: false, num: numResult });
                setNumPeakDay(numPeakDay);
              },
              () => {
                setSubmitting(false);
                setResult({ loading: false, num: 0 });
              }
            )
          );
        }}
      >
        {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <FilterStyle
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* DATETIME PICKER */}
              <LocalizationProvider
                locale={viLocale}
                dateAdapter={CustomDateAdapter}
              >
                <DateRangePicker
                  calendars={2}
                  disabled={isSubmitting}
                  inputFormat="dd/MM/yyyy"
                  disablePast
                  name="date"
                  startText="Ngày nhận phòng"
                  endText="Ngày trả phòng"
                  value={values.date}
                  onChange={(newValue) => setFieldValue("date", [...newValue])}
                  renderDay={renderWeekPickerDay}
                  renderInput={(startProps, endProps) => (
                    <DateChooser flexDirection="row" alignItems="center">
                      <TextField {...startProps} />
                      <Box sx={{ mx: 1, cursor: "default" }}> đến </Box>
                      <TextField {...endProps} />
                    </DateChooser>
                  )}
                />
              </LocalizationProvider>
              {/* NUMBER VISITOR */}
              <VistorChooser
                ref={anchorRef}
                value={`${values.adult} Người lớn - ${values.kid} Trẻ em - ${values.baby} Em bé`}
                name="people"
                label="Số lượng khách"
                focused={open}
                disabled={isSubmitting}
                type="text"
                variant="outlined"
                onClick={() => setOpen(true)}
              />
              <MenuPopover
                open={open}
                onClose={handleCloseVisitorChooser}
                anchorEl={anchorRef.current}
              >
                <Box style={{ padding: 10, width: 400 }}>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{
                      borderBottom: "1px solid gray",
                      paddingBottom: 10,
                    }}
                  >
                    {/* ADULT */}
                    <Box style={{ flex: 1 }}>
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <CountButton
                          color="primary"
                          onClick={() => {
                            if (values.adult > 1)
                              setFieldValue("adult", values.adult - 1);
                          }}
                        >
                          <RemoveIcon />
                        </CountButton>
                        <Typography>{values.adult}</Typography>
                        <CountButton
                          color="primary"
                          onClick={() =>
                            setFieldValue("adult", values.adult + 1)
                          }
                        >
                          <AddIcon />
                        </CountButton>
                      </Stack>
                      <Typography textAlign="center" variant="body1">
                        Người lớn
                      </Typography>
                    </Box>
                    {/* KID */}
                    <Box
                      style={{
                        flex: 1,
                        borderRight: "1px solid gray",
                        borderLeft: "1px solid gray",
                        marginLeft: 20,
                        marginRight: 20,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                    >
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <CountButton
                          color="primary"
                          onClick={() => {
                            if (values.kid > 0)
                              setFieldValue("kid", values.kid - 1);
                          }}
                        >
                          <RemoveIcon />
                        </CountButton>
                        <Typography>{values.kid}</Typography>
                        <CountButton
                          color="primary"
                          onClick={() => setFieldValue("kid", values.kid + 1)}
                        >
                          <AddIcon />
                        </CountButton>
                      </Stack>
                      <Typography textAlign="center" variant="body1">
                        Trẻ em
                      </Typography>
                    </Box>
                    {/* BABY */}
                    <Box style={{ flex: 1 }}>
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <CountButton
                          color="primary"
                          onClick={() => {
                            if (values.baby > 0)
                              setFieldValue("baby", values.baby - 1);
                          }}
                        >
                          <RemoveIcon />
                        </CountButton>
                        <Typography>{values.baby}</Typography>
                        <CountButton
                          color="primary"
                          onClick={() => setFieldValue("baby", values.baby + 1)}
                        >
                          <AddIcon />
                        </CountButton>
                      </Stack>
                      <Typography textAlign="center" variant="body1">
                        Em bé
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" color="gray" marginTop={1}>
                    Em bé : 0 tuổi - 2 tuổi / Trẻ em : 2 tuổi - 4 tuổi
                  </Typography>
                </Box>
              </MenuPopover>
              {/* SUBMIT BUTTON */}
              <ButtonStyle
                type="submit"
                variant="contained"
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? (
                  <CircularProgress style={{ color: "#252525" }} />
                ) : (
                  "TÌM KIẾM"
                )}
              </ButtonStyle>
            </FilterStyle>
          </form>
        )}
      </Formik>
    </Box>
  );
};

Filter.propTypes = {
  setIsLoading: PropTypes.func,
};

export default Filter;
