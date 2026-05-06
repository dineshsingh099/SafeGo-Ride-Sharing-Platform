import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // App startup me profile fetch ho rahi hai — wait karo
  if (loading) return <SkeletonLoader type="page" />;

  // Cookie nahi hai / expired — login par bhejo
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  // Role check — galat role wala unauthorized page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
