import { styled, IconButton, Badge } from "@mui/material";
import Iconify from "../../../components/Iconify";

const RootStyle = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: "calc(50vh)",
  zIndex: 10,
  left: 7,
  backgroundColor: "#FFF",
  boxShadow: "0 0 2pt 0pt gray",
  width: 50,
  height: 50,
  display: "none",
  [theme.breakpoints.down(1144)]: {
    display: "block",
  },
}));

const ResultButton = ({ number, setOpen }) => {
  const handle = () => {
    setOpen(true);
  };
  return (
    <RootStyle onClick={handle}>
      <Badge color="error" badgeContent={number} max={99}>
        <Iconify
          icon="emojione-monotone:shopping-cart"
          flip="horizontal"
          sx={{ color: "primary.main" }}
        />
      </Badge>
    </RootStyle>
  );
};
export default ResultButton;
