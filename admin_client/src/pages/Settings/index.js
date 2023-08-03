import { useState } from "react";
import PropTypes from "prop-types";
// UI lib
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SecurityIcon from "@mui/icons-material/Security";
// UI custom
import Page from "../../components/Page";
import Account from "./Account";
import Authentication from "./Authentication";

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
    page: <Account />,
  },
  {
    tab: "security",
    icon: <SecurityIcon />,
    label: "MẬT KHẨU VÀ BẢO MẬT",
    index: 1,
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
    <Page title="CÀI ĐẶT CHUNG">
      <Container maxWidth="xl">
        <Typography variant="h4" style={{ marginTop: 20 }}>
          CÀI ĐẶT CHUNG
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
