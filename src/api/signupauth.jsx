export const signuplogic = async (username, email, password, role) => {
  const BASE_URL = "https://rival-melinde-cirus-f8c901fe.koyeb.app/user/signup/"; // Ensure correct API path

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



