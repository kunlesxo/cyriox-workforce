import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signupages";
import UserDashboard from "./components/user/Dashboard";
import DistributorDashboard from "./components/distributor/DistributorDashboard";

function App() {
    return (
        <Routes> 
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Route for Base User */}
            <Route path="/distributor/dashboard" element={<PrivateRoute allowedRoles={["distributor"]} />}>
  <Route index element={<DistributorDashboard />} />
</Route>

<Route path="/customer/dashboard" element={<PrivateRoute allowedRoles={["customer"]} />}>
    <Route index element={<UserDashboard />} />
</Route>



            {/* Fallback Unauthorized Page (optional) */}
            <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        </Routes>
    );
}

export default App;
