import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../api/loginauth"; // Import the hook

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin, verifyOTP, serverError, otpRequired, loading, otpLoading, setOtpRequired } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const accessToken = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (accessToken && role) {
      navigateBasedOnRole(role); // Navigate directly to their role-based dashboard
    }
  }, []);

  const navigateBasedOnRole = (role) => {
    role = role.trim().toLowerCase(); // Normalize the role
    console.log("Navigating to role:", role); // Debugging the navigation

    if (role === "distributor") {
      navigate("/distributor/dashboard");
    } else if (role === "customer") {
      navigate("/customer/dashboard");
    } else {
      navigate("/unauthorized");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e, formData);  // Pass formData to handleLogin
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setOtpError("");  // Clear any previous error
    verifyOTP(otp, formData)
      .catch((error) => {
        setOtpError("Invalid OTP. Please try again.");
      });
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

        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-4">
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
              onClick={handleOtpSubmit}
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            {otpError && <p className="text-red-500 text-sm text-center mt-2">{otpError}</p>}
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
