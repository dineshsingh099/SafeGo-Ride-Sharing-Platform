import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/auth/Login/Login"));
const Signup = lazy(() => import("./pages/auth/Signup/Signup"));
const OtpVerify = lazy(() => import("./pages/auth/OtpVerify/OtpVerify"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword/ResetPassword"));
const AdminLogin = lazy(() => import("./pages/auth/AdminLogin/AdminLogin"));

const DashboardLayout = lazy(() => import("./pages/Dashboard/DashboardLayout"));
const UserDashboard = lazy(() => import("./pages/Dashboard/Users/UserDashboard"));
const DriverDashboard = lazy(() => import("./pages/Dashboard/Drivers/DriverDashboard"));
const AdminDashboard = lazy(() => import("./pages/Dashboard/Admin/AdminDashboard"));

const UserProfile = lazy(() => import("./pages/Profile/User/UserProfile"));
const DriverProfile = lazy(() => import("./pages/Profile/Driver/DriverProfile"));
const AdminProfile = lazy(() => import("./pages/Profile/Admin/AdminProfile"));

const HelpCenter = lazy(() => import("./pages/support/HelpCenter/HelpCenter"));
const FAQ = lazy(() => import("./pages/support/FAQ/FAQ"));
const Terms = lazy(() => import("./pages/support/Terms/Terms"));
const Privacy = lazy(() => import("./pages/support/Privacy/Privacy"));
const CancellationPolicy = lazy(() => import("./pages/support/CancellationPolicy/CancellationPolicy"));

const NotFound = lazy(() => import("./pages/errors/NotFound"));
const Unauthorized = lazy(() => import("./pages/errors/Unauthorized"));

const PageLoader = () => <SkeletonLoader type="page" />;

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<OtpVerify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/user" element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route path="dashboard" element={<UserDashboard />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="/driver" element={
                  <ProtectedRoute allowedRoles={["driver"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route path="dashboard" element={<DriverDashboard />} />
                  <Route path="profile" element={<DriverProfile />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="/help" element={<HelpCenter />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cancellation-policy" element={<CancellationPolicy />} />

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
