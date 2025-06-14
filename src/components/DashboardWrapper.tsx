
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, User, Settings, LogOut, ChevronDown, GraduationCap, Briefcase, Search, FileText, Eye, Calendar, BarChart3, Users, Play, Award, Library, Code, Zap } from 'lucide-react';

interface DashboardWrapperProps {
  children: ReactNode;
  title: string;
}

const DashboardWrapper = ({ children, title }: DashboardWrapperProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('User logged out');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Dashboard Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo - Navigate to dashboard */}
            <div 
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
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
            </div>

            {/* Page Title - Only show the title without CodeXMania prefix */}
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            </div>

            {/* Navigation Dropdowns */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
              
              {/* Learning Content Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Library className="w-4 h-4" />
                    <span>Learning Content</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
                  <DropdownMenuLabel>Learning Resources</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/courses')}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/tutorials')}>
                    <Play className="w-4 h-4 mr-2" />
                    Tutorials
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/articles')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Articles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/quizzes')}>
                    <Award className="w-4 h-4 mr-2" />
                    Quizzes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Student Panel Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Aspirant Panel</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
                  <DropdownMenuLabel>Student / Aspirant Panel</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student')}>
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Open Student Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student?tab=job-discovery')}>
                    <Search className="w-4 h-4 mr-2" />
                    AI Job Discovery
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student?tab=application-tracker')}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Application Tracker
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student?tab=profile-resume')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile & Resume
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student?tab=interview-prep')}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Interview Prep
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student?tab=career-insights')}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Career Insights
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Recruiter Panel Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4" />
                    <span>HR Panel</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
                  <DropdownMenuLabel>Recruiter / HR Panel</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/recruiter')}>
                    <Users className="w-4 h-4 mr-2" />
                    Open HR Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/recruiter?tab=candidate-discovery')}>
                    <Search className="w-4 h-4 mr-2" />
                    AI Candidate Discovery
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/recruiter?tab=job-posting')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Job Posting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/recruiter?tab=candidate-preview')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Candidate Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/recruiter?tab=interview-tools')}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Interview Tools
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/recruiter?tab=analytics')}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Dashboard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Profile Dropdown */}
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-muted">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
