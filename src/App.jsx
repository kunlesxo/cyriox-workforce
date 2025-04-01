import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signupages";
import UserDashboard from "./components/user/Dashboard";
import DistributorDashboard from "./components/distributor/DistributorDashboard";
import ProductList from "./pages/distributor/Product";
import DistributorUserManagement from "./pages/distributor/UserManagement";
import OrderManagement from "./pages/distributor/OrderDetails";
import InvoiceManagement from "./pages/distributor/InvoiceDetails";

function App() {
    return (
        <Routes> 
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Route for Distributor */}
            <Route path="/distributor/dashboard" element={<PrivateRoute allowedRoles={["distributor"]} />}>
                <Route element={<DistributorDashboard />}>
                    {/* ✅ Redirect default dashboard to products */}
                    <Route index element={<Navigate to="products" replace />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="usermanagement" element={<DistributorUserManagement />} />
                    <Route path="orders" element={< OrderManagement/>} />
                    <Route path="invoiceget" element={<InvoiceManagement />} />



                </Route>
            </Route>

            {/* Private Route for Customer */}
            <Route path="/customer/dashboard" element={<PrivateRoute allowedRoles={["customer"]} />}>
                <Route index element={<UserDashboard />} />
            </Route>

            {/* Fallback Unauthorized Page */}
            <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        </Routes>
    );
}

export default App;
