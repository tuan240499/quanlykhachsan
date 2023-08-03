import { useState } from "react";
// UI lib
import { Button, Stack, Typography } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
// UI custom
import ConfirmationDialog from "../../components/ConfirmationDialog";
import RestoreDialog from "./RestoreDialog";
import Page from "../../components/Page";
import List from "./BackupRestoreList";
import Form from "./BackupRestoreForm";
import { INTEGER, STRING } from "../../constants";
import NotFound from "../NotFound";
// logic lib
// logic custom

//----------------------------

const BackupRestore = () => {
  const [restoreId, setRestoreId] = useState();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // CHECK ROLE
  const role = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  ).role;
  if (role !== INTEGER.ADMIN_ROLE) return <NotFound />;

  const handleOpenDialog = () => {
    setOpenEditDialog(true);
  };

  return (
    <Page title="Sao lưu và Khôi phục">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">SAO LƯU VÀ KHÔI PHỤC</Typography>
        <Button
          startIcon={<RestoreIcon />}
          style={{ height: 50, minWidth: 180 }}
          variant="contained"
          onClick={handleOpenDialog}
        >
          TẠO BẢN SAO LƯU
        </Button>
      </Stack>
      <List
        setRestoreId={setRestoreId}
        setOpenDeleteDialog={setOpenDeleteDialog}
        setOpenRestoreDialog={setOpenRestoreDialog}
        setOpenEditDialog={setOpenEditDialog}
      />
      <ConfirmationDialog
        deleteType="BACKUP"
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        id={restoreId}
        setId={setRestoreId}
        title="Xóa bản sao lưu"
      />
      <Form
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        editedId={restoreId}
        setEditedId={setRestoreId}
      />
      <RestoreDialog
        open={openRestoreDialog}
        setOpen={setOpenRestoreDialog}
        id={restoreId}
        setId={setRestoreId}
      />
    </Page>
  );
};

export default BackupRestore;
