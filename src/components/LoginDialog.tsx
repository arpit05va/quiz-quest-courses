
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface LoginDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps = {}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Use external state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const handleSuccessfulLogin = (userEmail: string) => {
    console.log('Login successful for:', userEmail);
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    setIsOpen(false);
    
    toast({
      title: "Login Successful",
      description: "Welcome back! You're now logged in.",
    });
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('userLoggedIn'));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Email login attempt:', { email, password });
      
      // Simulate login validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email.trim() || !password.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      handleSuccessfulLogin(email);
      
    } catch (error) {
      console.error('Email login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      console.log('Initiating Google OAuth login');
      
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would be handled by Google OAuth
      const mockGoogleUser = {
        email: 'user@gmail.com',
        name: 'John Doe',
        picture: 'https://example.com/profile.jpg'
      };
      
      handleSuccessfulLogin(mockGoogleUser.email);
      
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Login Failed",
        description: "Failed to login with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Forgot password request for:', forgotPasswordEmail);
      
      // Simulate password reset email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!forgotPasswordEmail.trim()) {
        throw new Error('Please enter your email address');
      }
      
      if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
        throw new Error('Please enter a valid email address');
      }
      
      toast({
        title: "Password Reset Sent",
        description: "Check your email for password reset instructions.",
      });
      
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
      
    } catch (error) {
      console.error('Forgot password error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderForgotPasswordForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
        <p className="text-muted-foreground text-sm">Enter your email to receive reset instructions</p>
      </div>
      
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resetEmail">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="resetEmail"
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowForgotPassword(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );

  const renderLoginForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Google Login Button */}
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full flex items-center gap-2"
        disabled={isLoading}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {isLoading ? 'Signing in...' : 'Continue with Google'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Email Login Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-primary hover:underline"
        >
          Forgot your password?
        </button>
      </div>
    </motion.div>
  );

  // If external control is provided, don't render the trigger button
  if (open !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>
              Sign in to your account to continue learning
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <AnimatePresence mode="wait">
              {showForgotPassword ? renderForgotPasswordForm() : renderLoginForm()}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground hover:text-primary-600">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue learning
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AnimatePresence mode="wait">
            {showForgotPassword ? renderForgotPasswordForm() : renderLoginForm()}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
