import { forwardRef } from "react";
// UI lib
import { Box, styled } from "@mui/material";
import { Helmet } from "react-helmet-async";
// UI custom

// logic lib
import PropTypes from "prop-types";
// logic custom
import { INTEGER } from "../constants";

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  paddingTop: INTEGER.APP_BAR_DESKTOP,
  [theme.breakpoints.down(600)]: {
    paddingTop: INTEGER.APP_BAR_MOBILE,
  },
}));
//#endregion

//----------------------------

const Page = forwardRef(({ children, title = "", ...other }, ref) => (
  <RootStyle ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </RootStyle>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
