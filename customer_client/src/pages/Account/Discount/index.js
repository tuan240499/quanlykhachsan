import { useEffect, useState, useContext } from "react";
// UI lib
import { Box, Typography } from "@mui/material";
// UI custom
import LoadingItem from "./LoadingItem";
import Item from "./Item";
// logic lib
import { useNavigate } from "react-router-dom";
import NotificationContext from "../../../context/Context";
// logic custom
import { getDiscountByUser } from "../../../api/discount";
//#region CSS
//#endregion

//----------------------------
const Discount = () => {
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  const performFailure = (needLogin, message, isMounted) => {
    if (isMounted) {
      context.setNotification({
        type: "error",
        content: message,
      });
      context.setOpen(true);
      setIsLoading(false);
      if (needLogin)
        navigate("/login", {
          state: { returnUrl: "/account?tab=discount" },
        });
    }
  };

  useEffect(() => {
    let isMounted = true;
    getDiscountByUser()
      .then((res) => {
        if (isMounted) {
          setList(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!err.response || err.response.status !== 401)
          performFailure(
            false,
            "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau",
            isMounted
          );
        else performFailure(true, "Phiên đăng nhập hết hạn", isMounted);
      });

    return () => (isMounted = false);
  }, [navigate]);

  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      {isLoading ? (
        <>
          <LoadingItem />
          <LoadingItem />
          <LoadingItem />
        </>
      ) : list.length > 0 ? (
        <>
          {list.map((item) => (
            <Item data={item} key={item._id} />
          ))}
        </>
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/static/hotel_list/no-result.webp"
            alt="no booking"
            style={{ width: "60%" }}
          />
          <Typography variant="h6" mb={1}>
            Hiện tại chưa có ưu đãi dành cho quý khách
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Discount;
