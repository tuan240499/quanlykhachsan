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
import { INTEGER } from "../../constants";

const ReviewOptionMenu = ({
  id,
  setId,
  setOpenReviewDialog,
  setDialogContent,
  status,
  setOpenDetailDialog,
}) => {
  const [open, setOpen] = useState(false);
  const anchor = useRef();
  const handleCloseMenu = () => {
    if (open) setOpen(false);
  };

  const handleViewDetail = () => {
    setId(id);
    setOpenDetailDialog(true);
    setOpen(false);
  };

  const handleReset = () => {
    setId(id);
    setDialogContent({
      title: "Đặt lại đánh giá",
      content: "Thực hiện đặt lại đánh giá của khách hàng ?",
      buttonText: "ĐẶT LẠI",
      buttonColor: "primary",
      type: "WAITING",
      successMessage: "Đặt lại đánh giá thành công",
    });
    setOpenReviewDialog(true);
    setOpen(false);
  };
  const handleApprove = () => {
    setId(id);
    setDialogContent({
      title: "Phê duyệt đánh giá",
      content: "Thực hiện phê duyệt đánh giá của khách hàng ?",
      buttonText: "PHÊ DUYỆT",
      buttonColor: "success",
      type: "APPROVE",
      successMessage: "Phê duyệt đánh giá thành công",
    });
    setOpenReviewDialog(true);
    setOpen(false);
  };

  const handleReject = () => {
    setId(id);
    setDialogContent({
      title: "Từ chối đánh giá",
      content: "Thực hiện từ chối đánh giá của khách hàng ?",
      buttonText: "TỪ CHỐI",
      buttonColor: "error",
      type: "REJECT",
      successMessage: "Từ chối đánh giá đánh giá thành công",
    });
    setOpenReviewDialog(true);
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
        PaperProps={{ sx: { width: 150, maxWidth: "100%" } }}
      >
        <MenuItem
          onClick={handleReset}
          disabled={status === INTEGER.REVIEW_WAITING}
          sx={{ color: "primary.main" }}
        >
          <ListItemIcon>
            <Iconify
              icon="akar-icons:chat-dots"
              width={24}
              height={24}
              sx={{ color: "primary.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Chờ duyệt"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          onClick={handleApprove}
          disabled={status === INTEGER.REVIEW_ACCEPTED}
          sx={{ color: "success.main" }}
        >
          <ListItemIcon>
            <Iconify
              icon="akar-icons:chat-approve"
              width={24}
              height={24}
              sx={{ color: "success.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Phê duyệt"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          onClick={handleReject}
          disabled={status === INTEGER.REVIEW_REJECTED}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <Iconify
              icon="akar-icons:chat-error"
              width={24}
              height={24}
              sx={{ color: "error.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Từ chối"
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

export default ReviewOptionMenu;
