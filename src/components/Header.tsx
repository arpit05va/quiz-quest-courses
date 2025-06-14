
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BookOpen, Menu, Code, Zap } from 'lucide-react';
import LoginDialog from '@/components/LoginDialog';
import SignupDialog from '@/components/SignupDialog';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 animate-slide-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Animated Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              {/* Main Logo Container */}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 animate-gradient hover:shadow-purple-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Primary Icon */}
                <Code className="w-7 h-7 text-white animate-float relative z-10" />
                
                {/* Secondary Icon - Animated */}
                <Zap className="w-4 h-4 text-yellow-300 absolute top-1 right-1 animate-bounce opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10"></div>
            </div>
            
            {/* Enhanced Text Logo */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-blue-500 group-hover:to-cyan-400 transition-all duration-300">
                code<span className="text-orange-500 group-hover:text-orange-400 transition-colors duration-300">X</span>Mania
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                Learn • Code • Excel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-all duration-300 font-medium relative group animate-fade-in hover:scale-105 ${
                  isActiveRoute(item.href)
                    ? 'text-primary-600'
                    : 'text-muted-foreground hover:text-primary-600'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 ${
                  isActiveRoute(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <ThemeToggle />
            <div className="hover-lift">
              <LoginDialog />
            </div>
            <div className="hover-lift">
              <SignupDialog />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:animate-pulse">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-lg font-medium transition-all duration-300 animate-slide-in hover:translate-x-2 ${
                        isActiveRoute(item.href)
                          ? 'text-primary-600'
                          : 'text-muted-foreground hover:text-primary-600'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border space-y-4">
                    <div className="animate-bounce-in" style={{ animationDelay: '0.7s' }}>
                      <LoginDialog />
                    </div>
                    <div className="animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                      <SignupDialog />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
