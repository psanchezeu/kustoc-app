
import { useState } from "react";
import { Navigate, Route, Routes, useLocation, Link } from "react-router-dom";
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
} from "lucide-react";
import Overview from "./Overview";
import Orders from "./Orders";
import Customers from "./Customers";
import Chat from "./Chat";
import Settings as SettingsPage from "./Settings";

// Simulate authentication check
const isAdmin = true; // This would be a real admin auth check in production

const AdminDashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
            P
          </div>
          <span className="font-bold text-xl tracking-tight">Admin</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          className="lg:hidden"
        >
          {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-background lg:static transform transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b hidden lg:block">
              <Link to="/admin" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
                  P
                </div>
                <span className="font-bold text-xl tracking-tight">Admin Panel</span>
              </Link>
            </div>
            
            <div className="p-4 border-b">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">Administrador</span>
                  <span className="text-xs text-muted-foreground">admin@protospark.com</span>
                </div>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <Link to="/admin">
                <Button
                  variant={location.pathname === "/admin" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/admin/orders">
                <Button
                  variant={location.pathname.includes("/admin/orders") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Pedidos
                  <span className="ml-auto bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                    3
                  </span>
                </Button>
              </Link>
              <Link to="/admin/customers">
                <Button
                  variant={location.pathname.includes("/admin/customers") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Clientes
                </Button>
              </Link>
              <Link to="/admin/chat">
                <Button
                  variant={location.pathname.includes("/admin/chat") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Mensajes
                  <span className="ml-auto bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                    5
                  </span>
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button
                  variant={location.pathname.includes("/admin/settings") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Configuración
                </Button>
              </Link>
            </nav>
            
            <div className="p-4 border-t mt-auto">
              <Button variant="ghost" className="w-full justify-start text-bloodRed">
                <LogOut className="mr-2 h-5 w-5" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
