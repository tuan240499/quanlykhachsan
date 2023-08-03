import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// layouts
import ProtectedRoute from "./components/ProtectedRoute";
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Hotel from "./pages/Hotel";
import Room from "./pages/Room";
import Booking from "./pages/Booking";
import Discount from "./pages/Discount";
import Expense from "./pages/Expense";
import RoomService from "./pages/RoomService";
import RoomType from "./pages/RoomType";
import Log from "./pages/Log";
import Review from "./pages/Review";
import BackupRestore from "./pages/BackupRestore";
import Settings from "./pages/Settings";
import Combo from "./pages/Combo";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import PeakDay from "./pages/PeakDay";
// ----------------------------------------------------------------------

export default function AppRoutes() {
  return (
    <Routes>
      {/* auth pages (important: do not place under /auth path) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* protected routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="hotel" element={<Hotel />} />
        <Route path="room" element={<Outlet />}>
          <Route index element={<Navigate to="/room/list" replace />} />
          <Route path="list" element={<Room />} />
          <Route path="service" element={<RoomService />} />
          <Route path="combo" element={<Combo />} />
          <Route path="type" element={<RoomType />} />
        </Route>
        <Route path="booking" element={<Booking />} />
        <Route path="peak-day" element={<PeakDay />} />
        <Route path="discount" element={<Discount />} />
        <Route path="expense" element={<Expense />} />
        <Route path="backup-restore" element={<BackupRestore />} />
        <Route path="log" element={<Log />} />
        <Route path="review" element={<Review />} />
        <Route path="settings" element={<Settings />} />
        <Route path="test" element={<Test />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
