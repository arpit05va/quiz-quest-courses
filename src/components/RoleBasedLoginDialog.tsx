
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Lock, Eye, EyeOff, User, Lightbulb, Building, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface RoleBasedLoginDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type LoginRole = 'jobseeker' | 'expert' | 'hr';

const RoleBasedLoginDialog = ({ open, onOpenChange }: RoleBasedLoginDialogProps = {}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<LoginRole>('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    expertId: ''
  });
  const { toast } = useToast();

  // Use external state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const roleOptions = [
    {
      id: 'jobseeker' as LoginRole,
      title: 'Login as Jobseeker',
      icon: User,
      description: 'Continue with Google',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'expert' as LoginRole,
      title: 'Login as Expert',
      icon: Lightbulb,
      description: 'Expert credentials required',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'hr' as LoginRole,
      title: 'Login as HR',
      icon: Building,
      description: 'Company email required',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const handleSuccessfulLogin = (userEmail: string, role: LoginRole) => {
    console.log(`${role} login successful for:`, userEmail);
    localStorage.setItem('user', JSON.stringify({ email: userEmail, role }));
    setIsOpen(false);
    
    toast({
      title: "Login Successful",
      description: `Welcome back! You're now logged in as ${role}.`,
    });
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('userLoggedIn'));
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      console.log('Initiating Google OAuth login for jobseeker');
      
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would be handled by Google OAuth
      const mockGoogleUser = {
        email: 'jobseeker@gmail.com',
        name: 'John Doe',
        picture: 'https://example.com/profile.jpg'
      };
      
      handleSuccessfulLogin(mockGoogleUser.email, 'jobseeker');
      
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

  const handleLinkedInLogin = async () => {
    setIsLoading(true);
    try {
      console.log('Initiating LinkedIn OAuth login for expert');
      
      // Simulate LinkedIn OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would be handled by LinkedIn OAuth
      const mockLinkedInUser = {
        email: 'expert@linkedin.com',
        name: 'Jane Expert',
        profileUrl: 'https://linkedin.com/in/jane-expert'
      };
      
      handleSuccessfulLogin(mockLinkedInUser.email, 'expert');
      
    } catch (error) {
      console.error('LinkedIn login error:', error);
      toast({
        title: "Login Failed",
        description: "Failed to login with LinkedIn. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpertLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Expert login attempt:', { expertId: formData.expertId, email: formData.email });
      
      // Simulate login validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!formData.expertId.trim() || !formData.password.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      handleSuccessfulLogin(formData.email || formData.expertId, 'expert');
      
    } catch (error) {
      console.error('Expert login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHRLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('HR login attempt:', { email: formData.email, password: formData.password });
      
      // Simulate login validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!formData.email.trim() || !formData.password.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      handleSuccessfulLogin(formData.email, 'hr');
      
    } catch (error) {
      console.error('HR login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please try again.",
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

  const renderLoginForm = () => {
    if (showForgotPassword) {
      return renderForgotPasswordForm();
    }

    switch (selectedRole) {
      case 'jobseeker':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Welcome, Jobseeker!</h3>
              <p className="text-muted-foreground text-sm">Sign in with your Google account to continue</p>
            </div>
            
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full flex items-center gap-3 h-12 text-base hover:bg-gray-50 border-2"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </Button>
          </motion.div>
        );

      case 'expert':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Expert Login</h3>
              <p className="text-muted-foreground text-sm">Choose your preferred login method</p>
            </div>

            {/* LinkedIn Login Button */}
            <Button
              onClick={handleLinkedInLogin}
              variant="outline"
              className="w-full flex items-center gap-3 h-12 text-base hover:bg-blue-50 border-2 mb-6"
              disabled={isLoading}
            >
              <Linkedin className="w-5 h-5 text-blue-600" />
              {isLoading ? 'Signing in...' : 'Continue with LinkedIn'}
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with credentials</span>
              </div>
            </div>
            
            <form onSubmit={handleExpertLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expertId">Expert ID or Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="expertId"
                    type="text"
                    placeholder="Enter your Expert ID or email"
                    value={formData.expertId}
                    onChange={(e) => setFormData({ ...formData, expertId: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="expertPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Login as Expert'}
              </Button>
              
              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-primary hover:underline"
                >
                  Forgot your password?
                </button>
                <a href="#" className="text-primary hover:underline">
                  Need help? Contact Support
                </a>
              </div>
            </form>
          </motion.div>
        );

      case 'hr':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">HR Login</h3>
              <p className="text-muted-foreground text-sm">Access your company dashboard</p>
            </div>
            
            <form onSubmit={handleHRLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hrEmail">Company Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrEmail"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hrPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Login as HR'}
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // If external control is provided, don't render the trigger button
  if (open !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
            </DialogHeader>
            
            {/* Role Selection Cards */}
            {!showForgotPassword && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {roleOptions.map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <motion.div
                      key={role.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 border-2 ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-lg'
                            : 'border-border hover:border-primary/50 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-medium text-sm">{role.title.replace('Login as ', '')}</h4>
                          {isSelected && (
                            <Badge variant="secondary" className="mt-2 text-xs">
                              Selected
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            {/* Login Form */}
            <AnimatePresence mode="wait">
              {renderLoginForm()}
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
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
          </DialogHeader>
          
          {/* Role Selection Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roleOptions.map((role) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 border-2 ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-sm">{role.title.replace('Login as ', '')}</h4>
                      {isSelected && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Selected
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {/* Login Form */}
          <AnimatePresence mode="wait">
            {renderLoginForm()}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleBasedLoginDialog;
