import * as React from "react";
import { TextField, styled, Box, Badge } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePickerDay as MuiDateRangePickerDay } from "@mui/x-date-pickers-pro/DateRangePickerDay";
import addDays from "date-fns/addDays";

import Page from "../components/Page";

const highlightedDays = [
  addDays(new Date().setHours(0, 0, 0, 0), 1).getTime(),
  addDays(new Date().setHours(0, 0, 0, 0), 2).getTime(),
  addDays(new Date().setHours(0, 0, 0, 0), 3).getTime(),
  addDays(new Date().setHours(0, 0, 0, 0), 20).getTime(),
  addDays(new Date().setHours(0, 0, 0, 0), 70).getTime(),
];

const renderWeekPickerDay = (date, dateRangePickerDayProps) => {
  const isSeleted = highlightedDays.indexOf(date.getTime()) >= 0;
  return (
    <Badge
      key={date.toString()}
      overlap="circular"
      badgeContent={isSeleted ? <GradeIcon color="error" /> : undefined}
    >
      <MuiDateRangePickerDay {...dateRangePickerDayProps} />{" "}
    </Badge>
  );
};

export default function Test() {
  const [value, setValue] = React.useState([null, null]);
  return (
    <Page title="TEST">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Check-in"
          endText="Check-out"
          value={value}
          renderDay={renderWeekPickerDay}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Page>
  );
}
