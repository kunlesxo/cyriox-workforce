import { useState } from "react";

const useAuth = () => {
  const [serverError, setServerError] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleLogin = async (formData, navigateBasedOnRole) => {
    setServerError("");
    setLoading(true);

    try {
      const response = await fetch("https://rival-melinde-cirus-f8c901fe.koyeb.app/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (data.otp_required) {
        setOtpRequired(true);
        setLoading(false);
        return;
      }

      if (!data.access_token || !data.role) {
        throw new Error("Missing access token or role!");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("role", data.role.toLowerCase());

      setTimeout(() => {
        navigateBasedOnRole(data.role);
      }, 300);
    } catch (error) {
      setServerError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp, formData, navigateBasedOnRole) => {
    setOtpLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/login/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Invalid OTP");
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("role", data.role.toLowerCase());

      navigateBasedOnRole(data.role);
    } catch (error) {
      setServerError(error.message || "Invalid OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  return { handleLogin, verifyOTP, serverError, otpRequired, loading, otpLoading };
};

export default useAuth;
