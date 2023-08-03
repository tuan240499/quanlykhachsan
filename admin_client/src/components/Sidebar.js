import React, { useState } from "react";
// UI lib
import {
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemButton,
  styled,
  Collapse,
} from "@mui/material";
// UI custom
import Iconify from "./Iconify";

// logic lib
import { useLocation, Link } from "react-router-dom";
// logic custom
import useResponsive from "../hooks/useReponsive";
import { INTEGER, STRING } from "../constants";
//#region CSS
const SidebarHolder = styled("div")(({ theme }) => ({
  width: INTEGER.DRAWER_WIDTH,
  "& .MuiDrawer-paper::-webkit-scrollbar": {
    width: "10px",
  },
  "& .MuiDrawer-paper::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "& .MuiDrawer-paper::-webkit-scrollbar-thumb": {
    backgroundColor: "#D7DBDF",
    borderRadius: 4,
  },
  "& .MuiDrawer-paper::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  [theme.breakpoints.down("lg")]: {
    width: 0,
  },
}));
//#endregion

//----------------------------

const links = [
  {
    text: "Tổng quan",
    icon: "ant-design:pie-chart-outlined",
    path: "/dashboard",
    isAdminRequired: true,
  },
  {
    text: "Khách sạn",
    icon: "bi:building",
    path: "/hotel",
    isAdminRequired: true,
  },
  {
    text: "Phòng",
    icon: "ic:outline-meeting-room",
    isAdminRequired: true,
    children: [
      {
        text: "Danh sách",
        path: "/room/list",
      },
      {
        text: "Gói dịch vụ",
        path: "/room/combo",
      },
      {
        text: "Loại phòng",
        path: "/room/type",
      },
      {
        text: "Dịch vụ",
        path: "/room/service",
      },
    ],
  },
  {
    text: "Đơn đặt chỗ",
    icon: "akar-icons:schedule",
    path: "/booking",
    isAdminRequired: false,
  },
  {
    text: "Mã khuyến mãi",
    icon: "ic:outline-discount",
    path: "/discount",
    isAdminRequired: false,
  },
  {
    text: "Chi phí",
    icon: "la:file-invoice-dollar",
    path: "/expense",
    isAdminRequired: false,
  },
  {
    text: "Ngày cao điểm",
    icon: "bi:calendar-week",
    path: "/peak-day",
    isAdminRequired: false,
  },
  {
    text: "Tài khoản",
    icon: "bxs:user-account",
    path: "/user",
    isAdminRequired: true,
  },
  {
    text: "Phản hồi khách hàng",
    icon: "carbon:task-star",
    path: "/review",
    isAdminRequired: false,
  },
  {
    text: "Lịch sử thao tác",
    icon: "codicon:github-action",
    path: "/log",
    isAdminRequired: true,
  },
  {
    text: "Sao lưu - Khôi phục",
    icon: "ic:baseline-restore",
    path: "/backup-restore",
    isAdminRequired: true,
  },
  {
    text: "Cài đặt",
    icon: "ci:settings-filled",
    path: "/settings",
    isAdminRequired: false,
  },
  {
    text: "TEST",
    icon: "file-icons:test-generic",
    path: "/test",
    isAdminRequired: false,
  },
];

const childItemIcon = "ci:dot-02-s";

const Sidebar = ({ setOpenSidebar, openSidebar }) => {
  const path = useLocation().pathname;
  const isMobile = useResponsive("down", "lg");
  const [collapseIndex, setCollapseIndex] = useState(-1);

  const ROLE = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  )?.role;

  const handleClick = (index) => {
    if (collapseIndex === index) setCollapseIndex(-1);
    else setCollapseIndex(index);
  };

  const handleCloseSidebar = () => {
    if (openSidebar) setOpenSidebar(false);
  };
  return (
    <SidebarHolder>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={openSidebar}
        onClose={handleCloseSidebar}
      >
        <Box
          role="presentation"
          style={{
            width: INTEGER.DRAWER_WIDTH,
            padding: 10,
          }}
        >
          <List>
            {links.map(
              (item, index) =>
                (item.isAdminRequired
                  ? ROLE === INTEGER.ADMIN_ROLE
                  : ROLE === INTEGER.ADMIN_ROLE ||
                    ROLE === INTEGER.EMPLOYEE_ROLE) &&
                (item.children ? (
                  <React.Fragment key={index}>
                    <ListItemButton
                      onClick={() => handleClick(index)}
                      style={{ borderRadius: 8, marginBottom: 5 }}
                    >
                      <ListItemIcon>
                        <Iconify
                          icon={item.icon}
                          style={{ width: 25, height: 25 }}
                          sx={
                            path === item.path ? { color: "primary.main" } : {}
                          }
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant="body1"
                          sx={
                            path === item.path
                              ? {
                                  color: "primary.main",
                                  fontWeight: "bold",
                                }
                              : {}
                          }
                        >
                          {item.text}
                        </Typography>
                      </ListItemText>
                      <Iconify
                        icon={
                          collapseIndex === index
                            ? "dashicons:arrow-down-alt2"
                            : "dashicons:arrow-right-alt2"
                        }
                      />
                    </ListItemButton>
                    <Collapse
                      in={collapseIndex === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.children.map((subItem, subIndex) => (
                          <ListItemButton
                            key={subIndex + 50}
                            component={Link}
                            to={subItem.path}
                            style={{ borderRadius: 8, marginBottom: 5 }}
                            selected={path === subItem.path}
                            onClick={handleCloseSidebar}
                            sx={
                              path === subItem.path
                                ? { color: "primary.main" }
                                : {}
                            }
                          >
                            <ListItemIcon>
                              <Iconify
                                icon={childItemIcon}
                                style={{ width: 25, height: 25 }}
                                sx={
                                  path === subItem.path
                                    ? { color: "primary.main" }
                                    : {}
                                }
                              />
                            </ListItemIcon>
                            <ListItemText>
                              <Typography
                                variant="body1"
                                sx={
                                  path === subItem.path
                                    ? {
                                        fontWeight: "bold",
                                      }
                                    : {}
                                }
                              >
                                {subItem.text}
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ) : (
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    key={index}
                    onClick={handleCloseSidebar}
                    style={{ borderRadius: 8, marginBottom: 5 }}
                    sx={path === item.path ? { color: "primary.main" } : {}}
                    selected={path === item.path}
                  >
                    <ListItemIcon>
                      <Iconify
                        icon={item.icon}
                        style={{ width: 25, height: 25 }}
                        sx={path === item.path ? { color: "primary.main" } : {}}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="body1"
                        sx={
                          path === item.path
                            ? {
                                color: "primary.main",
                                fontWeight: "bold",
                              }
                            : {}
                        }
                      >
                        {item.text}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                ))
            )}
          </List>
        </Box>
      </Drawer>
    </SidebarHolder>
  );
};

export default Sidebar;
