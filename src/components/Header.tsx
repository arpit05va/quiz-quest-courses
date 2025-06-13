
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BookOpen, Menu } from 'lucide-react';
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
          {/* Animated Logo */}
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center animate-gradient hover:animate-pulse-glow transition-all duration-300 group-hover:scale-110">
              <BookOpen className="w-6 h-6 text-white animate-float" />
            </div>
            <span className="text-2xl font-bold text-foreground group-hover:text-primary-600 transition-colors duration-300">
              EduPlatform
            </span>
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
