import { Navigate, useRoutes } from "react-router-dom";
// layouts
import MainLayout from "./layouts/MainLayout";
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import HotelList from "./pages/HotelList";
import Booking from "./pages/Booking";
import PaymentReturn from "./pages/PaymentReturn";
import PrivateRoute from "./components/PrivateRoute";
import Test from "./pages/Test";
import Hotel from "./pages/Hotel";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // Public routes
        { path: "", element: <Home /> },
        { path: "hotel", element: <HotelList /> },
        { path: "hotel/:id", element: <Hotel /> },
        { path: "booking", element: <Booking /> },
        { path: "login", element: <Login /> },
        { path: "test", element: <Test /> },
        { path: "register", element: <Register /> },
        { path: "register", element: <Register /> },
        { path: "payment-return", element: <PaymentReturn /> },
        // Protected routes
        {
          path: "account",
          element: (
            <PrivateRoute redirectPath="/login" returnUrl="/account">
              <Account />
            </PrivateRoute>
          ),
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
