
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import RequestPrototype from "./pages/RequestPrototype";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardOrders from "./pages/dashboard/Orders";
import DashboardChat from "./pages/dashboard/Chat";
import DashboardProfile from "./pages/dashboard/Profile";
import DashboardSupport from "./pages/dashboard/Support";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOverview from "./pages/admin/Overview";
import AdminOrders from "./pages/admin/Orders";
import AdminChat from "./pages/admin/Chat";
import AdminSettings from "./pages/admin/Settings";
import AdminCustomers from "./pages/admin/Customers";
import AdminClients from "./pages/admin/Clients";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="request-prototype" element={<RequestPrototype />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Client Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="chat" element={<DashboardChat />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="support" element={<DashboardSupport />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
