import PropTypes from "prop-types";
// UI lib
import { styled } from "@mui/material/styles";
import { Stack, IconButton } from "@mui/material";
// UI custom
import Iconify from "./Iconify";
// logic lib
// logic custom
import { INTEGER } from "../constants";
import AccountPopover from "./Popover/Account";
//#region CSS
const RootStyle = styled("div")(({ theme }) => ({
  zIndex: theme.zIndex.appBar,
  height: INTEGER.APP_BAR_DESKTOP,
  backdropFilter: "blur(6px)",
  // backgroundColor: "gray",
  position: "sticky",
  padding: "0 20px",
  top: 0,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    height: INTEGER.APP_BAR_MOBILE,
  },
}));
//#endregion

// ----------------------------------------------------------------------

Navbar.propTypes = {
  setOpenSidebar: PropTypes.func,
  openSidebar: PropTypes.bool,
};

export default function Navbar({ setOpenSidebar, openSidebar }) {
  return (
    <RootStyle>
      <Stack flexDirection="row">
        <IconButton
          sx={{ color: "text.primary", display: { lg: "none" } }}
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      </Stack>
      <AccountPopover />
    </RootStyle>
  );
}
