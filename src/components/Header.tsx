
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BookOpen, Menu } from 'lucide-react';
import LoginDialog from '@/components/LoginDialog';
import SignupDialog from '@/components/SignupDialog';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Courses', href: '#courses' },
    { name: 'About Us', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">EduPlatform</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <LoginDialog />
            <SignupDialog />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="pt-6 border-t border-border space-y-4">
                    <LoginDialog />
                    <SignupDialog />
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
