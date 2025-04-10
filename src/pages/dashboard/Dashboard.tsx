
import { useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  User,
  MessageSquare,
  ClipboardList,
  LogOut,
  Clock,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Overview from "./Overview";
import Chat from "./Chat";
import Orders from "./Orders";
import Profile from "./Profile";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Dashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isCustomer, logout } = useAuth();

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

  // Redirect to login if not authenticated as customer
  if (!isCustomer) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b shadow-sm">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
            K
          </div>
          <span className="font-bold text-xl tracking-tight">Mi Cuenta</span>
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

            <div className={`p-6 border-b hidden lg:flex items-center ${sidebarCollapsed ? "justify-center" : ""}`}>
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
                  K
                </div>
                {!sidebarCollapsed && (
                  <span className="font-bold text-xl tracking-tight">Kustoc</span>
                )}
              </Link>
            </div>
            
            <div className="p-4 border-b">
              <Card className={`bg-sidebar-accent/20 ${sidebarCollapsed ? "p-2" : ""}`}>
                <CardContent className={`${sidebarCollapsed ? "p-2" : "p-4"}`}>
                  <div className={`flex ${sidebarCollapsed ? "flex-col" : "items-center"} gap-2 mb-2`}>
                    <div className="w-12 h-12 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-sidebar-foreground" />
                    </div>
                    {!sidebarCollapsed && (
                      <div className="overflow-hidden">
                        <h3 className="font-medium truncate">{user?.name || "Cliente"}</h3>
                        <p className="text-xs text-sidebar-foreground/70 truncate">{user?.email || "cliente@demo.com"}</p>
                      </div>
                    )}
                  </div>
                  
                  {!sidebarCollapsed && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Prototipo Premium</span>
                        <span className="font-medium">En desarrollo</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <div className="flex items-center gap-1 text-xs text-sidebar-foreground/70">
                        <Clock className="h-3 w-3" />
                        <span>6 días restantes</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <Link to="/dashboard">
                <Button
                  variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <BarChart3 className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && "Resumen"}
                </Button>
              </Link>
              <Link to="/dashboard/orders">
                <Button
                  variant={location.pathname.includes("/dashboard/orders") ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <ClipboardList className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && "Mis Pedidos"}
                </Button>
              </Link>
              <Link to="/dashboard/chat">
                <Button
                  variant={location.pathname.includes("/dashboard/chat") ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"} relative`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <MessageSquare className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && (
                    <>
                      Chat
                      <span className="ml-auto bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                        2
                      </span>
                    </>
                  )}
                  {sidebarCollapsed && (
                    <span className="absolute top-0 right-0 bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                      2
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/dashboard/profile">
                <Button
                  variant={location.pathname.includes("/dashboard/profile") ? "secondary" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <Settings className={`${sidebarCollapsed ? "" : "mr-2"} h-5 w-5`} />
                  {!sidebarCollapsed && "Perfil"}
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
              
              {!sidebarCollapsed && (
                <div className="mt-4 flex justify-end">
                  <ThemeToggle />
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-screen">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
