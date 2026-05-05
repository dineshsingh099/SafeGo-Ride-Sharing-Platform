import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <SkeletonLoader type="page" />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
