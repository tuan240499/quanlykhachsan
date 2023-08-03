import { useState } from "react";
// UI lib
import { styled } from "@mui/material/styles";

// UI custom
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";

// logic lib
import { Outlet } from "react-router-dom";

// logic custom
import NotificationProvider from "../context/Provider";

//#region CSS
const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100%",
  // overflow: "hidden",
  // => because this attribute prevents position:sticky child element so we replace it by overflow: "clip"
  overflow: "clip",
  position: "relative",
}));
//#endregion

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <NotificationProvider>
      <RootStyle>
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <MainStyle>
          <Outlet />
          <Footer />
          <ScrollToTopButton />
        </MainStyle>
        <Notification />
      </RootStyle>
    </NotificationProvider>
  );
}
