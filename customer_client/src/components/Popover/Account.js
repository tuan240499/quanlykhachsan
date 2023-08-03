import { useEffect, useRef, useState, useContext } from "react";
// UI lib
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

// UI custom
import MenuPopover from "./index";
import Iconify from "../../components/Iconify";

// logic lib
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// logic custom
import NotificationContext from "../../context/Context";
import { logout } from "../../redux/actions/user";
import useReponsive from "../../theme/useReponsive";
import { STRING } from "../../constants";
import { checkAuth } from "../../api/user";

//#region CSS

//#endregion

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover({ iconColor }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(NotificationContext);
  const user = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  );
  const autoClose = useReponsive("up", 950);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoClose) setOpen(false);
  }, [autoClose]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleMoveToAccountPage = async () => {
    await checkAuth()
      .then((res) => {
        setOpen(false);
        navigate("/account");
      })
      .catch((err) => {
        context.setNotification({ type: "error", content: err.response.data });
        context.setOpen(true);
        setOpen(false);
        if (err.response.status === 401)
          navigate("/login", { state: { returnUrl: "/account" } });
      });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        {user ? (
          <Avatar src={user.profile_image} alt="photoURL" />
        ) : (
          <Iconify
            icon="bi:person-circle"
            color={iconColor}
            sx={{
              transition: "color .4s ease",
              width: 35,
              height: 35,
            }}
          />
        )}
      </IconButton>

      <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {user ? (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle1" noWrap>
                {user.full_name}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />
            <MenuItem
              // to="/account"
              // component={RouterLink}
              onClick={handleMoveToAccountPage}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              <Iconify
                icon="eva:person-fill"
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              Tài khoản
            </MenuItem>
            <Box
              sx={{ p: 2, pt: 1.5 }}
              onClick={() =>
                dispatch(
                  logout(
                    () => {
                      setOpen(false);
                      navigate("/login");
                    },
                    () => {}
                  )
                )
              }
            >
              <Button fullWidth color="inherit" variant="outlined">
                Logout
              </Button>
            </Box>
          </>
        ) : (
          <>
            <MenuItem
              to="/login"
              component={RouterLink}
              onClick={() => setOpen(false)}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              <Iconify
                icon="mdi:login"
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              Đăng nhập
            </MenuItem>
            <MenuItem
              to="/register"
              component={RouterLink}
              onClick={() => setOpen(false)}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              <Iconify
                icon="ant-design:user-add-outlined"
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />
              Đăng ký
            </MenuItem>
          </>
        )}
      </MenuPopover>
    </>
  );
}
