import { useState, useEffect } from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Mail, Lock, GraduationCap, UserCheck, AlertCircle, CheckCircle, Lightbulb, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import ExpertSignupDialog from './ExpertSignupDialog';
import HRSignupDialog from './HRSignupDialog';

const SignupDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expertDialogOpen, setExpertDialogOpen] = useState(false);
  const [hrDialogOpen, setHRDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    collegeName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  // Check password strength
  useEffect(() => {
    if (formData.password.length === 0) {
      setPasswordStrength(null);
      return;
    }
    
    const hasUpper = /[A-Z]/.test(formData.password);
    const hasLower = /[a-z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const isLongEnough = formData.password.length >= 8;
    
    const strengthScore = [hasUpper, hasLower, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;
    
    if (strengthScore < 3) setPasswordStrength('weak');
    else if (strengthScore < 5) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [formData.password]);

  // Check password match
  useEffect(() => {
    if (formData.confirmPassword.length === 0) {
      setPasswordMatch(null);
      return;
    }
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoogleSignup = () => {
    console.log('Google signup for jobseeker');
    setIsOpen(false);
    window.location.href = '/dashboard';
  };

  const handleJobseekerSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordMatch && passwordStrength !== 'weak') {
      console.log('Jobseeker signup data:', formData);
      setIsOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        collegeName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      window.location.href = '/dashboard';
    }
  };

  const handleExpertSignupClick = () => {
    setIsOpen(false);
    setExpertDialogOpen(true);
  };

  const handleHRSignupClick = () => {
    setIsOpen(false);
    setHRDialogOpen(true);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'strong': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak password';
      case 'medium': return 'Medium strength';
      case 'strong': return 'Strong password';
      default: return '';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-bold text-center">Join Our Platform</DialogTitle>
            <DialogDescription className="text-center">
              Choose your role to get started
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-full max-h-[calc(85vh-100px)]">
            <div className="px-6 pb-6">
              {/* Role Selection Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {/* Jobseeker Card */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="cursor-pointer transition-all duration-300 border-2 border-primary bg-primary/5 shadow-lg">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-sm">Jobseeker</h4>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Selected
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Expert Card */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card 
                    className="cursor-pointer transition-all duration-300 border-2 border-border hover:border-primary/50 hover:shadow-md"
                    onClick={handleExpertSignupClick}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-sm">Expert</h4>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* HR Card */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card 
                    className="cursor-pointer transition-all duration-300 border-2 border-border hover:border-primary/50 hover:shadow-md"
                    onClick={handleHRSignupClick}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-medium text-sm">HR</h4>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Jobseeker Signup Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Create Jobseeker Account</h3>
                  <p className="text-muted-foreground text-sm">Join our learning community</p>
                </div>

                {/* Google Signup Button */}
                <Button
                  onClick={handleGoogleSignup}
                  variant="outline"
                  className="w-full flex items-center gap-3 h-12 text-base hover:bg-gray-50 border-2 mb-6"
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
                  Continue with Google
                </Button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or create account manually</span>
                  </div>
                </div>

                <form onSubmit={handleJobseekerSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collegeName">College Name</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="collegeName"
                        type="text"
                        placeholder="University of Technology"
                        value={formData.collegeName}
                        onChange={(e) => handleInputChange('collegeName', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe123"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
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
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    {passwordStrength && (
                      <div className={`flex items-center gap-2 text-sm ${getPasswordStrengthColor()}`}>
                        {passwordStrength === 'strong' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {getPasswordStrengthText()}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10"
                        required
                      />
                      {passwordMatch !== null && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {passwordMatch ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {passwordMatch === false && (
                      <p className="text-sm text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!passwordMatch || passwordStrength === 'weak'}
                  >
                    Create Account
                  </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-primary hover:underline"
                  >
                    Sign in here
                  </button>
                </div>
              </motion.div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Separate Expert and HR Signup Dialogs */}
      <ExpertSignupDialog open={expertDialogOpen} onOpenChange={setExpertDialogOpen} />
      <HRSignupDialog open={hrDialogOpen} onOpenChange={setHRDialogOpen} />
    </>
  );
};

export default SignupDialog;
