
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

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

// Footer Pages
import Prototypes from "./pages/footer/Prototypes";
import Development from "./pages/footer/Development";
import Consultation from "./pages/footer/Consultation";
import AboutUs from "./pages/footer/AboutUs";
import ClientsPage from "./pages/footer/ClientsPage";
import Team from "./pages/footer/Team";
import Contact from "./pages/footer/Contact";
import Privacy from "./pages/footer/Privacy";
import Terms from "./pages/footer/Terms";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
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
              
              {/* Footer Pages */}
              <Route path="prototypes" element={<Prototypes />} />
              <Route path="development" element={<Development />} />
              <Route path="consultation" element={<Consultation />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="team" element={<Team />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Client Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="customer">
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
                <ProtectedRoute role="admin">
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
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
