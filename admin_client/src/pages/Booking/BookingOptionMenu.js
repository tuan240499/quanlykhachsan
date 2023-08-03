import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import Iconify from "../../components/Iconify";
import { INTEGER } from "../../constants/index";

const BookingOptionMenu = ({
  status,
  id,
  setEditedId,
  setDialogContent,
  setOpenBookingDialog,
  setOpenDetailDialog,
}) => {
  const [open, setOpen] = useState(false);
  const anchor = useRef();
  const handleCloseMenu = () => {
    if (open) setOpen(false);
  };

  const handleViewDetail = () => {
    setEditedId(id);
    setOpenDetailDialog(true);
    setOpen(false);
  };

  const handleCheckIn = () => {
    setEditedId(id);
    setDialogContent({
      title: "KHÁCH CHECK-IN",
      content: "Thực hiện check-in cho khách ?",
      buttonText: "CHECK-IN",
      type: "CHECK_IN",
      successMessage: "Thực hiện check-in thành công",
    });
    setOpenBookingDialog(true);
    setOpen(false);
  };

  const handleCheckOut = () => {
    setEditedId(id);
    setDialogContent({
      title: "KHÁCH CHECK-OUT",
      content: "Thực hiện check-out cho khách ?",
      buttonText: "CHECK-OUT",
      type: "CHECK_OUT",
      successMessage: "Thực hiện check-out thành công",
    });
    setOpenBookingDialog(true);
    setOpen(false);
  };

  const handleCancel = () => {
    setEditedId(id);
    setDialogContent({
      title: "HỦY ĐƠN",
      content: "Thực hiện hủy đơn cho khách ?",
      buttonText: "HỦY ĐƠN",
      type: "CANCEL_BOOKING",
      successMessage: "Hủy đơn thành công",
    });
    setOpenBookingDialog(true);
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };
  return (
    <>
      <Tooltip title="Tùy chọn" placement="top">
        <IconButton ref={anchor} onClick={handleOpenMenu}>
          <Iconify icon="bx:dots-vertical-rounded" />
        </IconButton>
      </Tooltip>

      <Menu
        open={open}
        anchorEl={anchor.current}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        PaperProps={{ sx: { width: 200, maxWidth: "100%" } }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          disabled={status !== INTEGER.BOOKING_IN_PROGRESS}
          onClick={handleCheckIn}
        >
          <ListItemIcon>
            <Iconify icon="codicon:sign-in" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Nhận phòng"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: "text.secondary" }}
          disabled={status !== INTEGER.BOOKING_CHECK_IN}
          onClick={handleCheckOut}
        >
          <ListItemIcon>
            <Iconify icon="codicon:sign-out" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Trả phòng"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          disabled={status !== INTEGER.BOOKING_IN_PROGRESS}
          onClick={handleCancel}
        >
          <ListItemIcon>
            <Iconify
              icon="mdi:file-document-remove-outline"
              width={24}
              height={24}
              sx={{ color: "error.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Hủy đơn"
            sx={{ color: "error.main" }}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "primary.main" }} onClick={handleViewDetail}>
          <ListItemIcon>
            <Iconify
              icon="carbon:data-view-alt"
              width={24}
              height={24}
              sx={{ color: "primary.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Chi tiết"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default BookingOptionMenu;
