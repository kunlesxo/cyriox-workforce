import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // Ensure this API function is correctly set up

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [serverError, setServerError] = useState("");

    // ✅ Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token && role) {
            navigateBasedOnRole(role);
        }
    }, []);

    // 🔹 Navigate based on role
    const navigateBasedOnRole = (role) => {
        if (!role) {
            console.error("🚨 Role is missing! Cannot navigate.");
            navigate("/unauthorized", { replace: true });
            return;
        }
    
        const normalizedRole = role.trim().toLowerCase();
        console.log("🔀 Navigating to:", normalizedRole);
    
        setTimeout(() => {
            if (normalizedRole === "distributor") {
                navigate("/distributor/dashboard", { replace: true });
            } else if (normalizedRole === "customer") {
                navigate("/customer/dashboard", { replace: true });
            } else if (normalizedRole === "base user") {
                navigate("/customer/dashboard", { replace: true }); // Adjust this based on your needs
            } else {
                console.warn("⚠️ Unexpected role:", normalizedRole);
                navigate("/unauthorized", { replace: true });
            }
        }, 500);
    };
    
    

    // 🔹 Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setServerError("");
    
        try {
            const response = await login(formData.email, formData.password);
            console.log("🔍 Full API Response:", response);
    
            if (!response || typeof response !== "object" || !response.success) {
                console.error("🚨 Invalid API response:", response);
                setServerError(response?.message || "Invalid response from server.");
                return;
            }
    
            // Extract `access`, `refresh`, and `role` from nested `data`
            const { access, refresh, data } = response.data || {};
            const role = data?.role; // Role is inside `data`
    
            if (!access) {
                console.error("🚨 Missing access token:", response);
                setServerError("Login failed. No token received.");
                return;
            }
    
            if (!role) {
                console.error("🚨 Missing role in API response:", response);
                setServerError("Login failed. No role received.");
                return;
            }
    
            // ✅ Store token and role
            localStorage.setItem("token", access);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("role", role.trim().toLowerCase());
    
            console.log("✅ Token & Role Saved:", access, role);
            navigateBasedOnRole(role);
        } catch (error) {
            console.error("❌ Login Error:", error);
            setServerError("An error occurred. Please check your credentials.");
        }
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
    
        {/* Right Section - Login Form */}
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
                >
                    Login
                </button>
            </form>
    
            <div className="mt-5 text-blue-400 text-sm font-bold flex justify-center space-x-4">
                <a href="#">Forgot Password?</a>
                <a href="/signup">Signup</a>
            </div>
        </main>
    </div>
    
    );
};

export default LoginPage;
