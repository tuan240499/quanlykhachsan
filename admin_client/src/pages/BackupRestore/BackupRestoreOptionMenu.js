import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import Iconify from "../../components/Iconify";

const BackupRestoreOptionMenu = ({
  id,
  setRestoreId,
  setOpenDeleteDialog,
  setOpenRestoreDialog,
  setOpenEditDialog,
}) => {
  const [open, setOpen] = useState(false);
  const anchor = useRef();
  const handleCloseMenu = () => {
    if (open) setOpen(false);
  };

  const handleRestore = () => {
    setRestoreId(id);
    setOpenRestoreDialog(true);
    setOpen(false);
  };

  const handleDelete = () => {
    setRestoreId(id);
    setOpenDeleteDialog(true);
    setOpen(false);
  };
  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    setRestoreId(id);
    setOpenEditDialog(true);
    setOpen(false);
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
        <MenuItem onClick={handleRestore} sx={{ color: "success.main" }}>
          <ListItemIcon>
            <Iconify
              icon="ic:baseline-restore"
              width={24}
              height={24}
              sx={{ color: "success.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Khôi phục"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem onClick={handleUpdate} sx={{ color: "primary.main" }}>
          <ListItemIcon>
            <Iconify
              icon="eva:edit-fill"
              width={24}
              height={24}
              sx={{ color: "primary.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Sửa"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <Iconify
              icon="eva:trash-2-outline"
              width={24}
              height={24}
              sx={{ color: "error.main" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Xóa"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default BackupRestoreOptionMenu;
