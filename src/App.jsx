import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signupages";
import UserDashboard from "./components/user/Dashboard";
import DistributorDashboard from "./components/distributor/DistributorDashboard";
import ProductList from "./pages/distributor/Product";
import DistributorUserManagement from "./pages/distributor/UserManagement";
import OrderManagement from "./pages/distributor/OrderDetails";
import  DistributorsInvoice from "./pages/distributor/InvoiceControl";
import CategoryManagement from "./pages/distributor/Category";
import DistributorProductsOutlet from "./pages/distributor/ProductDisplay";
import PaystackPayment from "./pages/distributor/Transactions";
import DistributorCustomerChat from "./pages/distributor/Chat";

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
                    <Route index element={<Navigate to="productdisplay" replace />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="categories" element={<CategoryManagement />} />
                    <Route path="usermanagement" element={<DistributorUserManagement />} />
                    <Route path="orders" element={< OrderManagement/>} />
                    <Route path="invoicecreate" element={< DistributorsInvoice />} />
                    <Route path="productdisplay" element={< DistributorProductsOutlet />} />
                    <Route path="payments" element={<PaystackPayment />} />
                    <Route path="chats" element={<DistributorCustomerChat/>}/>





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
