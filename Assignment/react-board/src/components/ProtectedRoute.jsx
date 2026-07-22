import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../store/userStore.js";

export default function ProtectedRoute({ children }) {
  const user = useUserStore((s) => s.user); const location = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
