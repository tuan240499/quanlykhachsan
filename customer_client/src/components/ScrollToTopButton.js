import { useEffect, useState } from "react";
import Iconify from "./Iconify";
import { IconButton } from "@mui/material";
const ScrollToTopButton = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const changeDisplay = () => {
      if (window.scrollY >= 120) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    // adding the event when scroll
    window.addEventListener("scroll", changeDisplay);

    return () => window.removeEventListener("scroll", changeDisplay);
  }, []);

  return (
    <IconButton
      onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
      style={{
        color: "#000",
        position: "fixed",
        zIndex: 10,
        right: 15,
        borderRadius: "50%",
        background: "#FFF",
        boxShadow: "0 0 3pt 0pt gray",
        bottom: active ? 15 : 0,
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden",
        transition: "opacity .3s ease, visibility .3s ease, bottom .3s ease",
        width: 55,
        height: 55,
      }}
    >
      <Iconify
        icon="ep:arrow-up-bold"
        style={{ width: 30, height: 30, color: "#5393f9" }}
      />
    </IconButton>
  );
};

export default ScrollToTopButton;
