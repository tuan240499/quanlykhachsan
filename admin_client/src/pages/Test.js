import { Box, Button } from "@mui/material";
import Page from "../components/Page";
import Calendar from "./PeakDay/Calendar";
//-----------------------------------------

const Test = () => {
  return (
    <Page title="TEST">
      <Box
        boxShadow={3}
        style={{ borderRadius: 4, marginTop: 30, padding: 10 }}
      >
        {/* <Calendar /> */}
      </Box>
    </Page>
  );
};

export default Test;
