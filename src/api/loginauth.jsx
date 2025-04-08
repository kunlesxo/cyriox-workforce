import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [serverError, setServerError] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  // Navigate based on user role
  const navigateBasedOnRole = (role) => {
    role = role.trim().toLowerCase(); // Normalize the role
    console.log("Navigating based on role:", role); // Debugging the role

    if (role === "distributor") {
      navigate("/distributor/dashboard");
    } else if (role === "customer") {
      navigate("/customer/dashboard");
    } else {
      navigate("/unauthorized");
    }
  };

  const handleLogin = async (e, formData) => {
    e.preventDefault(); // Prevents the default form submission
    setServerError("");
    setLoading(true);
    setOtpRequired(false); // Reset OTP requirement on login attempt

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      console.log("🔍 API Response:", data); // ✅ Debug: Check response structure

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (data.otp_required) {
        // If OTP is required, update the state and set the OTP flag
        setOtpRequired(true);
        return; // Early exit to handle OTP process
      }

      if (!data.access_token || !data.role) {
        throw new Error("Missing access token or role!");
      }

      // Store tokens and role in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("role", data.role.trim().toLowerCase());
      localStorage.setItem("distributor_id", data.distributor_id);
      console.log("🔑 Tokens stored:", data.access_token, data.refresh_token, data.role);

      // Navigate based on the role
      navigateBasedOnRole(data.role);

    } catch (error) {
      console.error("Login Error:", error);
      setServerError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp, formData) => {
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

      // Store tokens and role in localStorage
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("role", data.role.toLowerCase());

      // Navigate based on the role
      navigateBasedOnRole(data.role);
    } catch (error) {
      setServerError(error.message || "Invalid OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  return {
    handleLogin,
    verifyOTP,
    serverError,
    otpRequired,
    loading,
    otpLoading,
    setOtpRequired, // Provide setter for otpRequired
  };
};

export default useAuth;
