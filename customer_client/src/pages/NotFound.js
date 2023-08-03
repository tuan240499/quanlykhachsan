// UI lib
import { Typography, Button } from "@mui/material";

// UI custom
import Page from "../components/Page";
// logic lib
import { Link } from "react-router-dom";

// logic custom
//#region CSS

//#endregion

//----------------------------
const NotFound = () => {
  return (
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" textAlign="center">
        404: Không tìm thấy trang
      </Typography>
      <Typography variant="body1" fontSize={20} textAlign="center">
        Trang bạn yêu cầu không tồn tại
      </Typography>
      <img
        src="/static/404.png"
        alt="image"
        style={{
          width: "50%",
          objectFit: "cover",
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <Button variant="outlined" color="primary" component={Link} to="/">
        QUAY LẠI TRANG CHỦ
      </Button>
    </Page>
  );
};

export default NotFound;
