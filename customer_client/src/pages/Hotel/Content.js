import { useState } from "react";
import PropTypes from "prop-types";
// UI lib
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
// UI custom
import Overview from "./Overview";
import Room from "./Room";
import Review from "./Review";
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

const Content = ({ hotel }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const data = [
    {
      tab: "overview",
      label: "TỔNG QUAN",
      index: 0,
      page: <Overview hotel={hotel} />,
    },
    {
      tab: "room-list",
      label: "HẠNG PHÒNG",
      index: 1,
      page: <Room hotel={hotel} />,
    },
    {
      tab: "review",
      label: "ĐÁNH GIÁ",
      index: 2,
      page: <Review hotel={hotel} />,
    },
  ];

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
    <Container
      maxWidth="lg"
      style={{ backgroundColor: "#FFF", paddingTop: 20 }}
    >
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map((item, index) => (
            <Tab key={index} label={item.label} {...a11yProps(item.index)} />
          ))}
          {/* <Tab label="TỔNG QUAN" {...a11yProps(0)} />
          <Tab label="HẠNG PHÒNG" {...a11yProps(1)} />
          <Tab label="ĐÁNH GIÁ" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      {data.map((item, index) => (
        <TabPanel key={index} value={value} index={item.index}>
          {item.page}
        </TabPanel>
      ))}
    </Container>
  );
};

export default Content;
