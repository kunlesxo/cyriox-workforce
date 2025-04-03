import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const navigateBasedOnRole = (role) => {
    if (!role) {
      navigate("/unauthorized", { replace: true });
      return;
    }

    const normalizedRole = role.trim().toLowerCase();
    const currentPath = window.location.pathname;

    const targetPath =
      normalizedRole === "distributor"
        ? "/distributor/dashboard"
        : normalizedRole === "customer" || normalizedRole === "base user"
        ? "/customer/dashboard"
        : "/unauthorized";

    if (currentPath !== targetPath) {
      navigate(targetPath, { replace: true });
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (accessToken && role) {
      navigateBasedOnRole(role);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
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

      // Check if OTP is required
      if (data.otp_required) {
        setOtpRequired(true);  // Show OTP input
        setLoading(false);
        return;
      }

      // Handle successful login
      if (!data.access_token || !data.role) {
        throw new Error("Missing access token or role!");
      }

      let normalizedRole = data.role.trim().toLowerCase();
      if (normalizedRole === "base user") {
        normalizedRole = "customer";
      }

      // Store tokens and role in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("role", normalizedRole);

      // Navigate based on the role
      setTimeout(() => {
        const storedRole = localStorage.getItem("role");
        if (storedRole) {
          navigateBasedOnRole(storedRole);
        }
      }, 300);
    } catch (error) {
      setServerError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
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

      // OTP verification success, save tokens and role
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("role", data.role);

      // Navigate based on the role
      navigateBasedOnRole(data.role);
    } catch (error) {
      setServerError(error.message || "Invalid OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex w-1/2 bg-gray-800 flex-col justify-center items-center p-8 text-center">
        <p className="text-white text-4xl md:text-5xl font-bold animate-pulse">
          Build Modern <span className="text-orange-400">Applications</span> with
          <span className="text-orange-400"> Free</span> Database on
          <span className="text-blue-400"> CYRIOX</span>
        </p>
      </div>

      <main className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
        <h1 className="font-bold text-lg text-gray-800">Login With Cyriox</h1>

        <form onSubmit={handleLogin} className="w-full max-w-sm mt-4">
          {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

          <div className="mt-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-5 bg-gray-800 text-white rounded-full hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {otpRequired && (
          <div className="mt-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={verifyOTP}
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        )}

        <div className="mt-5 text-blue-400 text-sm font-bold flex justify-center space-x-4">
          <a href="#">Forgot Password?</a>
          <a href="/signup">Signup</a>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
