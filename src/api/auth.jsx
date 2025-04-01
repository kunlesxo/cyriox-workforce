export const signuplogic = async (username, email, password, role) => {
  const BASE_URL = "http://127.0.0.1:8000/user/signup/"; // Ensure correct API path

  let signupUrl = `${BASE_URL}`; // Default to customer signup
  if (role === "Distributor") {
    signupUrl = `${BASE_URL}distributor`; // Update for distributor signup
  }

  try {
    console.log('Signup URL:', signupUrl); // Log the URL for debugging

    const response = await fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    console.log('API Response:', data); // Log the response data

    if (!response.ok) {
      return { success: false, message: data.detail || "Signup failed" };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error during signup:', error); // Log any network error
    return { success: false, message: "Network error. Please try again." };
  }
};



export const login = async (email, password) => {
  try {
      const response = await fetch(
          "http://127.0.0.1:8000/login/",
          {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          }
      );

      const data = await response.json();
      console.log("🔍 API Response:", data);

      if (!response.ok) {
          console.error("❌ Login Failed:", data);
          return { success: false, message: data.detail || "Invalid login" };
      }

      if (data.access && data.refresh) {
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          console.log("✅ Tokens Stored Successfully");
          return { success: true, data };
      } else {
          console.error("🚨 Missing access token:", data);
          return { success: false, message: "Missing authentication token" };
      }
  } catch (error) {
      console.error("⚠️ Login API Error:", error);
      return { success: false, message: "Network error. Please try again." };
  }
};
 



     
// ✅ Logout function
export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    return !!token; // Returns true if token exists
};

export const googleSignIn = async (id_token) => {
    const response = await fetch("http://secondary-chad-cirus-03a80251.koyeb.app/google/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Google Sign-In failed!");
    }
    return data;
  };
  