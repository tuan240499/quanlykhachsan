import { useEffect } from "react";
import PropTypes from "prop-types";
// UI lib
import {
  styled,
  Drawer,
  Box,
  ListItem,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
// logic lib
import { Link as RouterLink, useLocation } from "react-router-dom";
// Logic custom
import useReponsive from "../theme/useReponsive";
import { INTEGER } from "../constants";
import { STRING } from "../constants";
//--------------------------------------------------

//#region CSS
const DrawerInner = styled("div")(({ theme }) => ({
  width: INTEGER.DRAWER_WIDTH,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));

//#endregion
const data = [
  {
    title: "TRANG CHỦ",
    link: "/",
  },
  {
    title: "ĐẶT CHỖ",
    link: "/hotel",
  },
];

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const user = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  );
  const isDesktop = useReponsive("up", 956);
  const pathname = useLocation().pathname;
  useEffect(() => {
    if (isDesktop) setOpenSidebar(false);
  }, [isDesktop, setOpenSidebar]);
  useEffect(() => {
    setOpenSidebar(false);
  }, [pathname, setOpenSidebar]);
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openSidebar}
      onClose={() => setOpenSidebar(false)}
    >
      <DrawerInner>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            height: 200,
            position: "relative",
          }}
        >
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              background:
                "linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.05) 40%,rgba(0,0,0,.9))",
              display: "flex",
              alignItems: "flex-end",
              paddingLeft: 10,
              paddingBottom: 10,
            }}
          >
            {user && (
              <Typography variant="h6" color="#FFF">
                Xin chào {user.full_name}!
              </Typography>
            )}
          </Box>
          <img
            style={{
              zIndex: 1,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src="/static/home/nhatrang.jpg"
            alt="banner"
          />
        </Box>
        <List>
          {data.map((item, index) => (
            <ListItem button component={RouterLink} to={item.link} key={index}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </DrawerInner>
    </Drawer>
  );
};

Sidebar.propTypes = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
};

export default Sidebar;
