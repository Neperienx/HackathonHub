import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap, Sparkles, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import config from "@/data/config.json";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const publicNavItems = [
    { label: "Home", path: "/" },
    { label: "Rules", path: "/rules" },
  ];

  const authenticatedNavItems = [
    { label: "Home", path: "/" },
    { label: "Rules", path: "/rules" },
    { label: "My Projects", path: "/projects" },
  ];

  const navigationItems = user ? authenticatedNavItems : publicNavItems;

  const isActive = (path: string) => {
    return location === path;
  };

  const handleAuthAction = async () => {
    try {
      if (user) {
        await logout();
      } else {
        setLocation('/auth');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <nav className="nav-modern sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <Zap className="text-purple-600 text-2xl mr-3 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="absolute -top-1 -right-1 text-blue-500 text-sm opacity-70 floating-animation" />
              </div>
              <span className="text-xl font-bold text-gradient">
                {config.landing.title}
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-white bg-gradient-innovation shadow-lg"
                        : "text-gray-600 hover:text-purple-600 hover:bg-gradient-card"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.displayName}</span>
                </div>
                <Button
                  onClick={handleAuthAction}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={handleAuthAction}
                className="btn-innovation"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 rounded-lg hover:bg-gradient-card transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200/50">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-white bg-gradient-innovation shadow-lg"
                    : "text-gray-600 hover:text-purple-600 hover:bg-gradient-card"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-gray-200/50">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 text-gray-700 text-sm">
                    {user.displayName}
                  </div>
                  <Button
                    onClick={handleAuthAction}
                    variant="outline"
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAuthAction}
                  className="w-full btn-innovation"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
