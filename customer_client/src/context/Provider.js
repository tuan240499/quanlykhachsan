import { useState } from "react";
import NotificationContext from "./Context";

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ type: "", content: "" });
  const [open, setOpen] = useState(false);

  return (
    <NotificationContext.Provider
      value={{
        notification: notification,
        open: open,
        setNotification: setNotification,
        setOpen: setOpen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
