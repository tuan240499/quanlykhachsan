// UI lib
import { styled } from "@mui/material";
// UI custom
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// logic lib
import { Outlet } from "react-router-dom";
import { useState } from "react";

// logic custom
import { INTEGER } from "../constants";
//#region CSS
const RootStyle = styled("div")({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
});
const MainStyle = styled("div")(({ theme }) => ({
  // flexGrow: 1,
  width: `calc(100% - ${INTEGER.DRAWER_WIDTH}px)`,
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

//#endregion

//----------------------------
const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <RootStyle>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <MainStyle>
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

export default MainLayout;
