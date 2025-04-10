
import { useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import Overview from "./Overview";
import Chat from "./Chat";
import Orders from "./Orders";
import Profile from "./Profile";

// Simulate authentication check
const isAuthenticated = true; // This would be a real auth check in production

const Dashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
            P
          </div>
          <span className="font-bold text-xl tracking-tight">ProtoSpark</span>
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
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
                  P
                </div>
                <span className="font-bold text-xl tracking-tight">ProtoSpark</span>
              </Link>
            </div>
            
            <div className="p-4 border-b">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Cliente Demo</h3>
                      <p className="text-xs text-muted-foreground">cliente@demo.com</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Prototipo Premium</span>
                      <span className="font-medium">En desarrollo</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>6 días restantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <Link to="/dashboard">
                <Button
                  variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Resumen
                </Button>
              </Link>
              <Link to="/dashboard/orders">
                <Button
                  variant={location.pathname.includes("/dashboard/orders") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Mis Pedidos
                </Button>
              </Link>
              <Link to="/dashboard/chat">
                <Button
                  variant={location.pathname.includes("/dashboard/chat") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat
                  <span className="ml-auto bg-bloodRed text-white text-xs px-1.5 py-0.5 rounded-full">
                    2
                  </span>
                </Button>
              </Link>
              <Link to="/dashboard/profile">
                <Button
                  variant={location.pathname.includes("/dashboard/profile") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Perfil
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
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
