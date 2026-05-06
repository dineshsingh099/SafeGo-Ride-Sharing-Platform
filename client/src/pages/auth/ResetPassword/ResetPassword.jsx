import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Reset password ab ForgotPassword page ke 3-step flow me handle hota hai.
// Agar koi directly /reset-password pe aaye to /forgot-password bhejo.
export default function ResetPassword() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/forgot-password", { replace: true }); }, [navigate]);
  return null;
}
