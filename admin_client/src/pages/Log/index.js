// UI lib
import { Typography } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import NotFound from "../NotFound";
import List from "./LogList";

// logic lib
// logic custom
import { INTEGER, STRING } from "../../constants";
//----------------------------

const Log = () => {
  // CHECK ROLE
  const role = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  ).role;
  if (role !== INTEGER.ADMIN_ROLE) return <NotFound />;

  return (
    <Page title="LỊCH SỬ THAO TÁC">
      <Typography variant="h4" mb={4}>
        LỊCH SỬ THAO TÁC
      </Typography>
      <List />
    </Page>
  );
};

export default Log;
