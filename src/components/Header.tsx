
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BookOpen, Menu, Code, Zap } from 'lucide-react';
import LoginDialog from '@/components/LoginDialog';
import SignupDialog from '@/components/SignupDialog';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Transform values for parallax effects
  const headerBackground = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);
  const headerPadding = useTransform(scrollY, [0, 100], ['1rem', '0.5rem']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
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

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 3,
      transition: { duration: 0.3 }
    }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.header 
      variants={headerVariants}
      initial="initial"
      animate="animate"
      style={{ 
        backgroundColor: headerBackground,
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent'
      }}
      className="fixed top-0 z-50 w-full transition-all duration-500"
    >
      <motion.div 
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
        className="container mx-auto px-4"
      >
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Animated Logo */}
          <motion.div variants={logoVariants} whileHover="hover">
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <motion.div 
                style={{ scale: logoScale }}
                className="relative"
              >
                {/* Main Logo Container */}
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 relative overflow-hidden"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated Background Pattern */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Primary Icon */}
                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Code className="w-7 h-7 text-white relative z-10" />
                  </motion.div>
                  
                  {/* Secondary Icon - Animated */}
                  <motion.div
                    className="absolute top-1 right-1"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Zap className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                </motion.div>
                
                {/* Glow Effect */}
                <motion.div 
                  className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl blur-lg -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Enhanced Text Logo */}
              <motion.div 
                className="flex flex-col"
                whileHover={{
                  x: 2,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  code<span className="text-orange-500">X</span>mania
                </motion.span>
                <motion.span 
                  className="text-xs text-muted-foreground font-medium tracking-wider"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  Code • Connect • Conquer
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-8"
            variants={{
              animate: {
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
          >
            {navigation.map((item, index) => (
              <motion.div key={item.name} variants={navItemVariants} whileHover="hover">
                <Link
                  to={item.href}
                  className={`transition-all duration-300 font-medium relative group ${
                    isActiveRoute(item.href)
                      ? 'text-primary-600'
                      : 'text-muted-foreground hover:text-primary-600'
                  }`}
                >
                  {item.name}
                  <motion.span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500`}
                    initial={{ width: isActiveRoute(item.href) ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            variants={{
              animate: {
                transition: { staggerChildren: 0.1, delayChildren: 0.6 }
              }
            }}
          >
            <motion.div variants={buttonVariants}>
              <ThemeToggle />
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <LoginDialog />
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <SignupDialog />
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon">
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <motion.div 
                  className="flex flex-col space-y-6 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, staggerChildren: 0.1 }}
                >
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <Link
                        to={item.href}
                        className={`text-lg font-medium transition-all duration-300 ${
                          isActiveRoute(item.href)
                            ? 'text-primary-600'
                            : 'text-muted-foreground hover:text-primary-600'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div 
                    className="pt-6 border-t border-border space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <LoginDialog />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <SignupDialog />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
