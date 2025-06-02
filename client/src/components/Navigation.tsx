import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap, Sparkles } from "lucide-react";
import config from "@/data/config.json";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Rules", path: "/rules" },
    { label: "Resources", path: "/resources" },
    { label: "Sign Up", path: "/signup" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Submit", path: "/submission" },
    { label: "Evaluate", path: "/evaluation" },
  ];

  const isActive = (path: string) => {
    return location === path;
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
