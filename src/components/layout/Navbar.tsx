
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "../common/Logo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium transition-colors hover:text-primary">
            Inicio
          </Link>
          <Link to="/how-it-works" className="font-medium transition-colors hover:text-primary">
            Cómo Funciona
          </Link>
          <Link to="/pricing" className="font-medium transition-colors hover:text-primary">
            Precios
          </Link>
          <Link to="/about" className="font-medium transition-colors hover:text-primary">
            Nosotros
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Iniciar Sesión</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-bloodRed hover:bg-red-900">Registrarse</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <Button variant="ghost" className="md:hidden" size="icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background border-b animate-fade-in">
          <nav className="flex flex-col gap-4 text-sm">
            <Link 
              to="/" 
              className="flex py-2 font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Inicio
            </Link>
            <Link 
              to="/how-it-works" 
              className="flex py-2 font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Cómo Funciona
            </Link>
            <Link 
              to="/pricing" 
              className="flex py-2 font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Precios
            </Link>
            <Link 
              to="/about" 
              className="flex py-2 font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Nosotros
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={toggleMobileMenu}>
                <Button variant="outline" className="w-full">Iniciar Sesión</Button>
              </Link>
              <Link to="/register" onClick={toggleMobileMenu}>
                <Button className="bg-bloodRed hover:bg-red-900 w-full">Registrarse</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
