import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    let role = localStorage.getItem("role")?.trim().toLowerCase();

    if (!token) {
        console.log("🚨 No token found. Redirecting to login.");
        return <Navigate to="/" replace />;
    }

    // ✅ Convert "base user" to "customer" (if needed)
    if (role === "base user") {
        console.warn("🔄 Mapping 'base user' to 'customer'");
        role = "customer";  
    }

    if (!role || !allowedRoles.includes(role)) {
        console.log(`🚨 Unauthorized: Role "${role}" not allowed. Redirecting.`);
        return <Navigate to="/unauthorized" replace />;
    }

    console.log(`✅ Access granted: Role "${role}".`);
    return <Outlet />;
};

export default PrivateRoute;
