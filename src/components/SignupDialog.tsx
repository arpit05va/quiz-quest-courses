
import { useState, useEffect } from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Mail, Lock, GraduationCap, UserCheck, AlertCircle, CheckCircle, Lightbulb, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface SignupDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type SignupRole = 'jobseeker' | 'expert' | 'hr';

const SignupDialog = ({ open, onOpenChange }: SignupDialogProps = {}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SignupRole>('jobseeker');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    collegeName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    companyEmail: '',
    companyWebsite: '',
    expertId: '',
    linkedinProfile: ''
  });
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const { toast } = useToast();

  // Use external state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const roleOptions = [
    {
      id: 'jobseeker' as SignupRole,
      title: 'Jobseeker',
      icon: User,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'expert' as SignupRole,
      title: 'Expert',
      icon: Lightbulb,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'hr' as SignupRole,
      title: 'HR',
      icon: Building,
      color: 'from-purple-500 to-indigo-600'
    }
  ];

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

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      collegeName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      companyName: '',
      companyEmail: '',
      companyWebsite: '',
      expertId: '',
      linkedinProfile: ''
    });
    setPasswordMatch(null);
    setPasswordStrength(null);
  };

  const handleSuccessfulSignup = (userEmail: string, role: SignupRole) => {
    console.log(`${role} signup successful for:`, userEmail);
    localStorage.setItem('user', JSON.stringify({ email: userEmail, role }));
    setIsOpen(false);
    resetForm();
    
    toast({
      title: "Account Created Successfully",
      description: `Welcome! Your ${role} account has been created.`,
    });
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('userLoggedIn'));
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      console.log('Initiating Google OAuth signup for jobseeker');
      
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockGoogleUser = {
        email: 'jobseeker@gmail.com',
        name: 'John Doe'
      };
      
      handleSuccessfulSignup(mockGoogleUser.email, 'jobseeker');
      
    } catch (error) {
      console.error('Google signup error:', error);
      toast({
        title: "Signup Failed",
        description: "Failed to signup with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobseekerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Jobseeker signup attempt:', formData);
      
      // Simulate signup validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!passwordMatch || passwordStrength === 'weak') {
        throw new Error('Please ensure your password is strong and matches');
      }
      
      handleSuccessfulSignup(formData.email, 'jobseeker');
      
    } catch (error) {
      console.error('Jobseeker signup error:', error);
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpertSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Expert signup attempt:', formData);
      
      // Simulate signup validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!passwordMatch || passwordStrength === 'weak') {
        throw new Error('Please ensure your password is strong and matches');
      }
      
      handleSuccessfulSignup(formData.email, 'expert');
      
    } catch (error) {
      console.error('Expert signup error:', error);
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "Failed to create expert account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHRSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('HR signup attempt:', formData);
      
      // Simulate signup validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!formData.fullName.trim() || !formData.companyEmail.trim() || !formData.companyName.trim() || !formData.password.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
        throw new Error('Please enter a valid company email address');
      }
      
      if (!passwordMatch || passwordStrength === 'weak') {
        throw new Error('Please ensure your password is strong and matches');
      }
      
      handleSuccessfulSignup(formData.companyEmail, 'hr');
      
    } catch (error) {
      console.error('HR signup error:', error);
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "Failed to create HR account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  const renderSignupForm = () => {
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
              <h3 className="text-lg font-semibold mb-2">Create Jobseeker Account</h3>
              <p className="text-muted-foreground text-sm">Join our learning community</p>
            </div>

            {/* Google Signup Button */}
            <Button
              onClick={handleGoogleSignup}
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
              {isLoading ? 'Creating account...' : 'Continue with Google'}
            </Button>

            <div className="relative">
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
                disabled={!passwordMatch || passwordStrength === 'weak' || isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
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
              <h3 className="text-lg font-semibold mb-2">Create Expert Account</h3>
              <p className="text-muted-foreground text-sm">Share your expertise with the community</p>
            </div>
            
            <form onSubmit={handleExpertSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expertFullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="expertFullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="expertEmail"
                    type="email"
                    placeholder="expert@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinProfile">LinkedIn Profile (Optional)</Label>
                <div className="relative">
                  <Lightbulb className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="linkedinProfile"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="expertPassword"
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
                <Label htmlFor="expertConfirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="expertConfirmPassword"
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
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                disabled={!passwordMatch || passwordStrength === 'weak' || isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Expert Account'}
              </Button>
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
              <h3 className="text-lg font-semibold mb-2">Create HR Account</h3>
              <p className="text-muted-foreground text-sm">Join our talent acquisition platform</p>
            </div>
            
            <form onSubmit={handleHRSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hrFullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrFullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hrCompanyName">Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrCompanyName"
                    type="text"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hrCompanyEmail">Company Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrCompanyEmail"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.companyEmail}
                    onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hrCompanyWebsite">Company Website (Optional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrCompanyWebsite"
                    type="url"
                    placeholder="https://company.com"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hrPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrPassword"
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
                <Label htmlFor="hrConfirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="hrConfirmPassword"
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
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                disabled={!passwordMatch || passwordStrength === 'weak' || isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create HR Account'}
              </Button>
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
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0 overflow-hidden">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-center">Join Our Platform</DialogTitle>
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
                        <h4 className="font-medium text-sm">{role.title}</h4>
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
            
            {/* Signup Form with ScrollArea */}
            <ScrollArea className="max-h-[calc(90vh-300px)]">
              <div className="pr-6">
                <AnimatePresence mode="wait">
                  {renderSignupForm()}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <div className="text-center text-sm text-muted-foreground mt-4 pt-4 border-t">
              Already have an account?{' '}
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-primary hover:underline"
              >
                Sign in here
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center">Join Our Platform</DialogTitle>
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
                      <h4 className="font-medium text-sm">{role.title}</h4>
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
          
          {/* Signup Form with ScrollArea */}
          <ScrollArea className="max-h-[calc(90vh-300px)]">
            <div className="pr-6">
              <AnimatePresence mode="wait">
                {renderSignupForm()}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <div className="text-center text-sm text-muted-foreground mt-4 pt-4 border-t">
            Already have an account?{' '}
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-primary hover:underline"
            >
              Sign in here
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
