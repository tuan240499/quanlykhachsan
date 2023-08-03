import { forwardRef } from "react";
// UI lib
import { Box, Container, styled } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { INTEGER } from "../constants";
// UI custom
// logic lib
import PropTypes from "prop-types";
// logic custom
//#region CSS
const RootStyle = styled(Box)({
  minHeight: `calc(100vh - ${INTEGER.APP_BAR_DESKTOP}px)`,
});

//#endregion

//----------------------------

const Page = forwardRef(({ children, title = "", maxWidth, ...other }, ref) => (
  <RootStyle ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Container
      maxWidth={maxWidth ? maxWidth : "xl"}
      disableGutters
      style={{ padding: "20px 20px 50px" }}
    >
      {children}
    </Container>
  </RootStyle>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default Page;
