import { forwardRef } from "react";
import Slide from "@mui/material/Slide";

const SlideTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" mountOnEnter unmountOnExit {...props} />;
});

export default SlideTransition;
