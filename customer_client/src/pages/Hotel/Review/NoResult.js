import { Container, Typography } from "@mui/material";

const NoResult = () => {
  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="/static/hotel_list/no-result.webp"
        alt="banner"
        width="100%"
        style={{ maxHeight: "50vh", objectFit: "contain" }}
      />
      <Typography textAlign="center" variant="h6">
        Oops, chưa có bất kỳ bài đánh giá nào cho khách sạn.
      </Typography>
    </Container>
  );
};

export default NoResult;
