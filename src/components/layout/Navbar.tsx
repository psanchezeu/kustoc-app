
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close the mobile menu when the location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/how-it-works" },
    { name: "Precios", path: "/pricing" },
    { name: "FAQ", path: "/faq" },
    { name: "Sobre Nosotros", path: "/about" },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo className="h-8 w-auto mr-2" />
            <span className="font-bold text-xl">Kustoc</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-foreground font-bold"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-2">
              <Link to={user.isAdmin ? "/admin" : "/dashboard"}>
                <Button variant="ghost">
                  {user.isAdmin ? "Panel Admin" : "Mi Cuenta"}
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-bloodRed hover:bg-red-900">Registro</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && isMobile && (
        <div className="md:hidden border-t">
          <div className="container py-4 px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium py-2 ${
                  location.pathname === item.path
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <Link to={user.isAdmin ? "/admin" : "/dashboard"}>
                    <Button variant="outline" className="w-full">
                      {user.isAdmin ? "Panel Admin" : "Mi Cuenta"}
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full">Iniciar Sesión</Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full bg-bloodRed hover:bg-red-900">Registro</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
