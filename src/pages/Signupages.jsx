import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signuplogic } from "../api/auth"; // Ensure API function is correctly imported

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer", // Default role
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // API error state
  const [loading, setLoading] = useState(false); // Loading state
  const [emailSent, setEmailSent] = useState(false); // Email verification message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // Clear previous errors
    setLoading(true); // Set loading state

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const { name, email, password, role } = formData;

      console.log("Submitting Signup:", { name, email, password, role });

      const response = await signuplogic(name, email, password, role);

      console.log("Processed API Response:", response);

      if (response && response.success) {
        setEmailSent(true); // Show verification message
        setTimeout(() => navigate("/login"), 5000); // Redirect after 5s
      } else {
        setServerError(response?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setServerError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-Up Function (Mock)
  const handleGoogleSignUp = () => {
    alert("Google Sign-Up clicked! Implement authentication here.");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
  {/* Left Section - Hidden on mobile */}
  <div className="hidden md:flex w-1/2 bg-gray-800 flex-col justify-center items-center p-8 text-center">
    <p className="text-white text-4xl md:text-5xl font-bold animate-pulse">
      Build Modern <span className="text-orange-400">Applications</span> with
      <span className="text-orange-400"> Free</span> Database on
      <span className="text-blue-400"> CYRIOX</span>
    </p>
  </div>

  {/* Right Section */}
  <main className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
    <h1 className="font-bold text-lg text-gray-800">Signup with Cyriox</h1>

    <form onSubmit={handleSubmit} className="w-full max-w-sm mt-4">
      {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
      {emailSent && (
        <p className="text-green-500 text-sm text-center">
          Signup successful! A verification email has been sent.
        </p>
      )}

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

      {/* Role Selection */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Customer" className="text-gray-400">Customer</option>
        <option value="Distributor" className="text-gray-400">Distributor</option>
      </select>

      <button
        type="submit"
        className={`w-full py-2 mt-5 text-white rounded-full transition ${
          loading ? "bg-gray-500" : "bg-gray-800 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Signing up..." : "SIGNUP"}
      </button>
    </form>

    {/* Google Sign-Up Button - Adjusted width */}
    <button
  onClick={handleGoogleSignUp}
  className="flex items-center justify-center w-96 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full mt-4 shadow-sm hover:bg-gray-100 transition"
>
  <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google Logo" />
  Sign up with Google
</button>



    <div className="text-xs mt-4 text-gray-500 text-center">
      <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
    </div>

    <div className="mt-5 text-blue-400 text-sm font-bold flex justify-center space-x-4">
      <p>Already have an account?</p>
      <button onClick={() => navigate("/login")} className="text-blue-500 underline">
        Login
      </button>
    </div>
  </main>
</div>

  );
};

export default Signup;
