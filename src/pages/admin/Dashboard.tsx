
import { useState } from "react";
import { Navigate, Route, Routes, useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  ClipboardList,
  LogOut,
  Settings,
  LayoutDashboard,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Overview from "./Overview";
import Orders from "./Orders";
import Customers from "./Customers";
import Chat from "./Chat";
import SettingsPage from "./Settings";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const AdminDashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { theme } = useTheme();

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b shadow-sm">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
            K
          </div>
          <span className="font-bold text-xl tracking-tight">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileSidebar}
            aria-label="Toggle menu"
            className="lg:hidden"
          >
            {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 border-r bg-sidebar text-sidebar-foreground lg:static transform transition-all duration-300 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${
            sidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          <div className="flex flex-col h-full relative">
            {/* Collapse button (visible only on desktop) */}
            <button 
              onClick={toggleSidebar}
              className="absolute -right-3 top-20 bg-background border rounded-full p-1 hidden lg:flex items-center justify-center z-50 hover:bg-accent"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? 
                <ChevronRight className="h-4 w-4" /> : 
                <ChevronLeft className="h-4 w-4" />
              }
            </button>

            <div className={`p-6 border-b hidden lg:flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
              <Link to="/admin" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
                  K
                </div>
                {!sidebarCollapsed && (
                  <span className="font-bold text-xl tracking-tight">Kustoc</span>
                )}
              </Link>
              
              {!sidebarCollapsed && (
                <ThemeToggle />
              )}
            </div>
            
            <div className={`p-4 border-b ${sidebarCollapsed ? "items-center" : ""}`}>
              <div className={`p-4 bg-sidebar-accent/20 rounded-lg ${sidebarCollapsed ? "flex justify-center" : ""}`}>
                <div className={`flex ${sidebarCollapsed ? "flex-col items-center" : "flex-col"}`}>
                  {!sidebarCollapsed && (
                    <span className="font-medium">{user?.name || "Administrador"}</span>
                  )}
                  {!sidebarCollapsed && (
                    <span className="text-xs text-sidebar-foreground/70">{user?.email || "admin@kustoc.com"}</span>
                  )}
                  {sidebarCollapsed && (
                    <Users className="h-6 w-6" />
                  )}
                </div>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <Link to="/admin">
                <Button
                  variant={location.pathname === "/admin" ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <LayoutDashboard className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && "Dashboard"}
                </Button>
              </Link>
              <Link to="/admin/orders">
                <Button
                  variant={location.pathname.includes("/admin/orders") ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"} relative`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <ClipboardList className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && (
                    <>
                      Pedidos
                      <span className="ml-auto bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                        3
                      </span>
                    </>
                  )}
                  {sidebarCollapsed && (
                    <span className="absolute top-0 right-0 bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/admin/customers">
                <Button
                  variant={location.pathname.includes("/admin/customers") ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <Users className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && "Clientes"}
                </Button>
              </Link>
              <Link to="/admin/chat">
                <Button
                  variant={location.pathname.includes("/admin/chat") ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"} relative`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <MessageSquare className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && (
                    <>
                      Mensajes
                      <span className="ml-auto bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                        5
                      </span>
                    </>
                  )}
                  {sidebarCollapsed && (
                    <span className="absolute top-0 right-0 bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                      5
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button
                  variant={location.pathname.includes("/admin/settings") ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <Settings className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && "Configuración"}
                </Button>
              </Link>
              
              {sidebarCollapsed && (
                <Button
                  variant="ghost"
                  className="w-full justify-center px-2 mt-4"
                >
                  <ThemeToggle />
                </Button>
              )}
            </nav>
            
            <div className="p-4 border-t mt-auto">
              <Button 
                variant="ghost" 
                className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"} text-bloodRed hover:text-bloodRed/80`}
                onClick={handleLogout}
              >
                <LogOut className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                {!sidebarCollapsed && "Cerrar Sesión"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-screen">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
