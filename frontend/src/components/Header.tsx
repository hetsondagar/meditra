import { Bell, Search, User, Settings, Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { theme, toggle } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Patient Profile", href: "/patient-profile" },
    { label: "Appointments", href: "/appointment-scheduler" },
    { label: "Analytics", href: "/health-analytics" },
    { label: "Medications", href: "/medication-tracker" },
    { label: "Wellness", href: "/wellness-coach" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src="/logomain.png" alt="meditra logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold font-brand tracking-[0.03em] text-[hsl(var(--primary))]">
              meditra
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 ml-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-primary/5",
                location.pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden xl:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search health records, appointments..." 
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            title="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          {/* Theme Toggle */}
          <Button 
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggle}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            className="hidden sm:flex"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></div>
          </Button>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="icon"
            className="hidden sm:flex"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Profile */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-10 w-10 rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur">
          <nav className="container px-4 py-6 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/10 border border-transparent"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};