import { useState } from "react";
import PropTypes from "prop-types";
// UI lib
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// UI custom
import Page from "../../components/Page";
import Info from "./Info";
import Discount from "./Discount";
import BookingHistory from "./BookingHistory";
import Review from "./Review";
import Authentication from "./Authentication";
import SecurityIcon from "@mui/icons-material/Security";

// logic lib
import { useSearchParams } from "react-router-dom";
// logic custom

//#region CSS

//#endregion

//----------------------------

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const data = [
  {
    tab: "info",
    icon: <AccountBoxIcon />,
    label: "THÔNG TIN",
    index: 0,
    page: <Info />,
  },
  {
    tab: "discount",
    icon: <CardGiftcardIcon />,
    label: "QUÀ CỦA TÔI",
    index: 1,
    page: <Discount />,
  },
  {
    tab: "booking",
    icon: <CreditScoreIcon />,
    label: "LỊCH SỬ ĐẶT CHỖ",
    index: 2,
    page: <BookingHistory />,
  },
  {
    tab: "review",
    icon: <ThumbsUpDownIcon />,
    label: "BÀI NHẬN XÉT",
    index: 3,
    page: <Review />,
  },
  {
    tab: "security",
    icon: <SecurityIcon />,
    label: "MẬT KHẨU VÀ BẢO MẬT",
    index: 4,
    page: <Authentication />,
  },
];

const User = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(() => {
    const item = data.filter((item) => searchParams.get("tab") === item.tab)[0];
    if (item === undefined) {
      return 0;
    } else {
      return item.index;
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Tài khoản | TuanVQ">
      <Container maxWidth="lg">
        <Typography variant="h4" style={{ marginTop: 20 }}>
          TÀI KHOẢN
        </Typography>
        <Box sx={{ borderBottom: 2, borderColor: "divider", marginBottom: 3 }}>
          <Tabs
            variant="scrollable"
            allowScrollButtonsMobile
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {data.map((item, index) => (
              <Tab
                onClick={() => setSearchParams({ tab: item.tab })}
                key={index}
                icon={item.icon}
                iconPosition="start"
                label={item.label}
                {...a11yProps(item.index)}
              />
            ))}
          </Tabs>
        </Box>
        {data.map((item, index) => (
          <TabPanel key={index} value={value} index={item.index}>
            {item.page}
          </TabPanel>
        ))}
      </Container>
    </Page>
  );
};

export default User;
