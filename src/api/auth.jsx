export const signuplogic = async (username, email, password, role) => {
  const BASE_URL = "http://127.0.0.1:8000/signup/";
  let signupUrl = BASE_URL + "user/"; // Default to customer signup

  if (role === "Distributor") {
    signupUrl = BASE_URL + "distributor/";
  }

  try {
    const response = await fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.detail || "Signup failed" };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
};

  


  export const login=async(email, password)=> {
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
        console.log("Login API Response:", data); // 👀 See what API returns

        return data;
    } catch (error) {
        console.error("Login API Error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
}


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
    const response = await fetch("http://127.0.0.1:8000/google/auth", {
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
  