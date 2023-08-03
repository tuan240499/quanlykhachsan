import { useState } from "react";
// UI lib
import { Stack, Typography } from "@mui/material";
// UI custom
import Page from "../../components/Page";
import List from "./UserList";
import NotFound from "../NotFound";
// logic lib
// logic custom
import { INTEGER, STRING } from "../../constants";
import UserDialog from "./UserDialog";

//----------------------------

const User = () => {
  const [editedId, setEditedId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [typeDialog, setTypeDialog] = useState();

  // CHECK ROLE
  const role = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  ).role;
  if (role !== INTEGER.ADMIN_ROLE) return <NotFound />;

  return (
    <Page title="Tài khoản">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">QUẢN LÝ TÀI KHOẢN</Typography>
      </Stack>
      <List
        setEditedId={setEditedId}
        setOpenDialog={setOpenDialog}
        setTypeDialog={setTypeDialog}
      />
      <UserDialog
        id={editedId}
        setId={setEditedId}
        open={openDialog}
        setOpen={setOpenDialog}
        typeDialog={typeDialog}
      />
    </Page>
  );
};

export default User;
