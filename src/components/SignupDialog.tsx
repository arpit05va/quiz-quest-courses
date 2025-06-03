
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
import { User, Mail, Lock, GraduationCap, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';

const SignupDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordMatch && passwordStrength !== 'weak') {
      console.log('Signup data:', formData);
      // Add signup logic here
      setIsOpen(false);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        collegeName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Account</DialogTitle>
          <DialogDescription>
            Join our learning community and start your educational journey
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-primary hover:underline"
          >
            Sign in here
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
