import { useState } from "react";
// UI lib
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// UI custom
import ConfirmationDialog from "../../components/ConfirmationDialog";
import Page from "../../components/Page";
import Form from "./PeakDayForm";
import List from "./PeakDayList";
// logic lib
// logic custom
//----------------------------
const PeakDay = () => {
  const [editedId, setEditedId] = useState();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenEditDialog(true);
  };

  return (
    <Page title="Ngày cao điểm">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">NGÀY CAO ĐIỂM</Typography>
        <Button
          startIcon={<AddIcon />}
          style={{ height: 40 }}
          variant="contained"
          onClick={handleOpenDialog}
        >
          THÊM MỚI
        </Button>
      </Stack>
      <List
        setOpenDeleteDialog={setOpenDeleteDialog}
        setOpenEditDialog={setOpenEditDialog}
        setEditedId={setEditedId}
      />
      <Form
        setEditedId={setEditedId}
        editedId={editedId}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
      />
      <ConfirmationDialog
        deleteType="PEAK_DAY"
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        id={editedId}
        setId={setEditedId}
        title="Xóa ngày cao điểm"
      />
    </Page>
  );
};

export default PeakDay;
