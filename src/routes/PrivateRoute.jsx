import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
    const accessToken = localStorage.getItem("access_token");
    let role = localStorage.getItem("role")?.trim().toLowerCase();

    // 🚨 Debugging Toggle (Set to `true` to enable logs)
    const DEBUG = true;

    if (!accessToken) {
        DEBUG && console.log("🚨 No access token found. Redirecting to login.");
        return <Navigate to="/" replace />;
    }

    if (!role) {
        DEBUG && console.log("🚨 No role found. Redirecting to unauthorized.");
        return <Navigate to="/unauthorized" replace />;
    }

    // ✅ Normalize "base user" to "customer"
    if (role === "base user") {
        DEBUG && console.warn("🔄 Mapping 'base user' to 'customer'");
        role = "customer";  
    }

    // ✅ Ensure case-insensitive role matching
    const allowedRolesLower = allowedRoles.map(r => r.toLowerCase());

    if (!allowedRolesLower.includes(role)) {
        DEBUG && console.log(`🚨 Unauthorized: Role "${role}" not allowed. Redirecting.`);
        return <Navigate to="/unauthorized" replace />;
    }

    DEBUG && console.log(`✅ Access granted: Role "${role}".`);
    return <Outlet />;
};

export default PrivateRoute;
