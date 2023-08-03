import { Box, Container, Typography, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const social = [
  {
    icon: <FacebookIcon sx={{ color: "#FFF", fontSize: 30 }} />,
    link: "https://www.facebook.com/AndroidOfficial/",
  },
  {
    icon: <YouTubeIcon sx={{ color: "#FFF", fontSize: 30 }} />,
    link: "https://www.youtube.com/user/GoogleMobile/",
  },
  {
    icon: <InstagramIcon sx={{ color: "#FFF", fontSize: 30 }} />,
    link: "https://www.instagram.com/android/",
  },
  {
    icon: <TwitterIcon sx={{ color: "#FFF", fontSize: 30 }} />,
    link: "https://twitter.com/android/",
  },
  {
    icon: <LinkedInIcon sx={{ color: "#FFF", fontSize: 30 }} />,
    link: "https://www.linkedin.com/showcase/android_by_google/",
  },
];

const Footer = () => {
  return (
    <Box
      style={{
        marginTop: 50,
        width: "100%",
        backgroundColor: "#1C1C1C",
      }}
    >
      <Container
        maxWidth="lg"
        style={{
          paddingTop: 40,
          paddingBottom: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/static/logo.jpg" alt="logo" width={80} height={80} />
        <Typography
          variant="body1"
          color="#FFF"
          textAlign="center"
          style={{ paddingTop: 20, paddingBottom: 20 }}
        >
          TUANVU COTO HOTEL, nhà cung cấp dịch vụ du lịch trực tuyến & các dịch
          vụ có liên quan hàng đầu thế giới.
        </Typography>
        <Stack direction="row" spacing={2}>
          {social.map((item, index) => (
            <IconButton
              key={index}
              onClick={() => window.open(item.link, "_blank")}
            >
              {item.icon}
            </IconButton>
          ))}
        </Stack>
      </Container>
      <Box
        style={{ width: "100%", backgroundColor: "#000", textAlign: "center" }}
      >
        <Typography
          variant="body2"
          color="#FFF"
          textAlign="center"
          style={{ paddingTop: 5, paddingBottom: 5 }}
        >
          Copyright © 2022 TUANVU COTO HOTEL
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
