import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // Ensure login API function is imported

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [serverError, setServerError] = useState(""); // ✅ Fix: Define error state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setServerError(""); // Reset error state

        try {
            console.log("Logging in with:", formData);

            const response = await login(formData.email, formData.password);

            console.log("API Response:", response); // ✅ Debug response

            if (response && response.token) {
                alert(response.message || "Login successful!");
                localStorage.setItem("token", response.token); // Store JWT
                navigate("/dashboard");
            } else {
                setServerError(response?.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setServerError("Login failed. Please try again.");
        }
    };

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            const googleAuth = window.google.accounts.oauth2.initTokenClient({
                client_id: "", // ⚠️ Add your Google Client ID here
                scope: "profile email",
                callback: async (response) => {
                    if (response.access_token) {
                        try {
                            const data = await googleSignIn(response.access_token);
                            localStorage.setItem("access_token", data.access);
                            localStorage.setItem("username", data.data.username);
                            localStorage.setItem("email", data.data.email);
                            localStorage.setItem("id", data.data.id);

                            navigate("/dashboard"); // Redirect after successful login
                        } catch (error) {
                            setServerError(error.message);
                        }
                    } else {
                        setServerError("Google Sign-In failed.");
                    }
                },
            });
            googleAuth.requestAccessToken();
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            setServerError("An error occurred with Google Sign-In. Please try again.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Section */}
            <div className="w-full md:w-1/2 bg-gray-800 flex flex-col justify-center items-center p-8 text-center">
                <p className="text-white text-4xl md:text-5xl font-bold animate-pulse">
                    Build Modern <span className="text-orange-400">Applications</span> with 
                    <span className="text-orange-400"> Free</span> Database on 
                    <span className="text-blue-400"> CYRIOX</span>
                </p>
            </div>

            {/* Right Section */}
            <main className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
                <h1 className="font-bold text-lg text-gray-800">Login With Cyriox</h1>

                <form onSubmit={handleLogin} className="w-full max-w-sm mt-4">
                    {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
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
                            onChange={handleChange}
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

                <div className="text-xs mt-4 text-gray-500 text-center">
                    <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
                </div>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full mt-4 shadow-sm hover:bg-gray-100 transition"
                >
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google Logo" />
                    Sign in with Google
                </button>

                <div className="mt-5 text-blue-400 text-sm font-bold flex justify-center space-x-4">
                    <a href="#">Forgot Password?</a>
                    <a href="/signup">Signup</a>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
