
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut } from "lucide-react";
import Logo from "@/components/common/Logo";
import { ThemeToggle } from "../theme/ThemeToggle";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-background py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Navegación Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:text-bloodRed"
              }`
            }
            end
          >
            Inicio
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:text-bloodRed"
              }`
            }
          >
            Cómo Funciona
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:text-bloodRed"
              }`
            }
          >
            Precios
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:text-bloodRed"
              }`
            }
          >
            Nosotros
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.name || "Usuario"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button size="sm" className="bg-bloodRed hover:bg-red-900">
                  Registro
                </Button>
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md p-2 text-gray-500 hover:text-bloodRed focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden border-t border-gray-200 dark:border-gray-700 py-2`}
      >
        <div className="container space-y-1">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
            end
          >
            Inicio
          </NavLink>
          <NavLink
            to="/how-it-works"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            Cómo Funciona
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            Precios
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "text-bloodRed"
                  : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            Nosotros
          </NavLink>
          {!isAuthenticated && (
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-bloodRed hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Registro
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
