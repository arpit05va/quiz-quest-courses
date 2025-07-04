import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, BookOpen, Clock, Users, Star, LogOut, User, FileText, Award, Settings, ChevronDown, Play, ExternalLink, CheckCircle2, XCircle, Timer, Eye, Heart, Briefcase, Calendar, BarChart3, GraduationCap, Library, Code, Zap, PlayCircle, Video, FileCode } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { useAuthCheck } from '@/hooks/useAuthCheck';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated, setShowLoginDialog } = useAuthCheck();

  // Check for enrolled courses from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const enrolledCoursesData = enrollments.map((enrollment: any) => {
        // Find the course data
        const allCourses = [
          {
            id: 1,
            title: 'Introduction to Web Development',
            description: 'Learn HTML, CSS, and JavaScript from scratch with hands-on projects.',
            duration: '12 weeks',
            students: 1250,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
            price: '$99',
            category: 'Programming',
            level: 'Beginner',
            instructor: 'John Smith'
          },
          {
            id: 2,
            title: 'Data Science Fundamentals',
            description: 'Master Python, statistics, and machine learning for data analysis.',
            duration: '16 weeks',
            students: 890,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            price: '$149',
            category: 'Data Science',
            level: 'Intermediate',
            instructor: 'Dr. Michael Chen'
          },
          {
            id: 3,
            title: 'Digital Marketing Mastery',
            description: 'Complete guide to SEO, social media, and online advertising.',
            duration: '8 weeks',
            students: 2100,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
            price: '$79',
            category: 'Marketing',
            level: 'Beginner',
            instructor: 'Sarah Johnson'
          }
        ];
        
        const courseData = allCourses.find(c => c.id === enrollment.courseId);
        if (courseData) {
          return {
            ...courseData,
            progress: enrollment.progress || 0
          };
        }
        return null;
      }).filter(Boolean);
      
      setEnrolledCourses(enrolledCoursesData);
    }
  }, [isAuthenticated]);

  // All available courses (excluding enrolled ones)
  const availableCourses = [
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master Python, statistics, and machine learning for data analysis.',
      duration: '16 weeks',
      students: 890,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      price: '$149',
      category: 'Data Science',
      level: 'Intermediate',
      instructor: 'Dr. Michael Chen'
    },
    {
      id: 4,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps using React Native and Flutter.',
      duration: '20 weeks',
      students: 675,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      price: '$199',
      category: 'Programming',
      level: 'Advanced',
      instructor: 'Alex Rodriguez'
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      description: 'Master design thinking and create beautiful user interfaces.',
      duration: '10 weeks',
      students: 945,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      price: '$129',
      category: 'Design',
      level: 'Intermediate',
      instructor: 'Emily Davis'
    },
    {
      id: 6,
      title: 'Cybersecurity Essentials',
      description: 'Learn to protect systems and networks from digital attacks.',
      duration: '14 weeks',
      students: 623,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
      price: '$179',
      category: 'Security',
      level: 'Advanced',
      instructor: 'James Wilson'
    }
  ].filter(course => !enrolledCourses.find(enrolled => enrolled.id === course.id));

  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn HTML, CSS, and JavaScript from scratch with hands-on projects.',
      duration: '12 weeks',
      students: 1250,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
      price: '$99',
      category: 'Programming',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master Python, statistics, and machine learning for data analysis.',
      duration: '16 weeks',
      students: 890,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      price: '$149',
      category: 'Data Science',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to SEO, social media, and online advertising.',
      duration: '8 weeks',
      students: 2100,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      price: '$79',
      category: 'Marketing',
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps using React Native and Flutter.',
      duration: '20 weeks',
      students: 675,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      price: '$199',
      category: 'Programming',
      level: 'Advanced'
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      description: 'Master design thinking and create beautiful user interfaces.',
      duration: '10 weeks',
      students: 945,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      price: '$129',
      category: 'Design',
      level: 'Intermediate'
    },
    {
      id: 6,
      title: 'Cybersecurity Essentials',
      description: 'Learn to protect systems and networks from digital attacks.',
      duration: '14 weeks',
      students: 623,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
      price: '$179',
      category: 'Security',
      level: 'Advanced'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with React',
      description: 'Learn the basics of React and component-based development through hands-on exercises and real-world examples.',
      duration: '30 min',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      views: 15420,
      rating: 4.7,
      completed: false,
      category: 'Programming',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'CSS Grid Layout Mastery',
      description: 'Master CSS Grid for creating responsive layouts with practical examples and advanced techniques.',
      duration: '45 min',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      views: 12380,
      rating: 4.8,
      completed: true,
      category: 'Web Development',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'JavaScript ES6+ Features',
      description: 'Explore modern JavaScript features and best practices including arrow functions, destructuring, and async/await.',
      duration: '60 min',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      views: 18950,
      rating: 4.9,
      completed: false,
      category: 'Programming',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js and Express, including REST APIs and database integration.',
      duration: '75 min',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      views: 9876,
      rating: 4.6,
      completed: false,
      category: 'Backend',
      level: 'Advanced'
    },
    {
      id: 5,
      title: 'Vue.js Fundamentals',
      description: 'Learn Vue.js framework for building interactive user interfaces with components and reactive data.',
      duration: '50 min',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
      views: 11250,
      rating: 4.5,
      completed: false,
      category: 'Frontend',
      level: 'Beginner'
    },
    {
      id: 6,
      title: 'Python Data Analysis',
      description: 'Analyze data using Python libraries like Pandas, NumPy, and Matplotlib for data science projects.',
      duration: '90 min',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      views: 8765,
      rating: 4.8,
      completed: false,
      category: 'Data Science',
      level: 'Advanced'
    }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Web Development Trends in 2024',
      excerpt: 'Discover the latest trends shaping the future of web development including AI integration, serverless architecture, and progressive web apps...',
      author: 'John Smith',
      readTime: '5 min read',
      publishedDate: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      tags: ['Web Development', 'Trends', 'Technology'],
      views: 2580,
      likes: 154,
      bookmarked: false
    },
    {
      id: 2,
      title: 'The Future of AI in Education',
      excerpt: 'How artificial intelligence is transforming online learning experiences through personalized content, adaptive learning paths, and intelligent tutoring systems...',
      author: 'Jane Doe',
      readTime: '7 min read',
      publishedDate: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      tags: ['AI', 'Education', 'Machine Learning'],
      views: 3240,
      likes: 298,
      bookmarked: true
    },
    {
      id: 3,
      title: 'Building Responsive Websites',
      excerpt: 'Best practices for creating websites that work seamlessly across all devices using modern CSS techniques, flexible layouts, and mobile-first design...',
      author: 'Mike Johnson',
      readTime: '6 min read',
      publishedDate: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      tags: ['CSS', 'Responsive Design', 'Mobile'],
      views: 1870,
      likes: 112,
      bookmarked: false
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'HTML Fundamentals Quiz',
      description: 'Test your knowledge of HTML basics, semantics, and best practices.',
      questions: 15,
      difficulty: 'Beginner',
      timeLimit: '20 min',
      completed: false,
      score: null,
      attempts: 0,
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'CSS Selectors Challenge',
      description: 'Master CSS selectors, specificity rules, and advanced styling techniques.',
      questions: 20,
      difficulty: 'Intermediate',
      timeLimit: '25 min',
      completed: true,
      score: 85,
      attempts: 2,
      category: 'Web Development'
    },
    {
      id: 3,
      title: 'JavaScript Array Methods',
      description: 'Test your understanding of JavaScript array manipulation and functional programming.',
      questions: 12,
      difficulty: 'Intermediate',
      timeLimit: '15 min',
      completed: false,
      score: null,
      attempts: 1,
      category: 'Programming'
    },
    {
      id: 4,
      title: 'React Hooks Deep Dive',
      description: 'Advanced quiz on React hooks, state management, and component lifecycle.',
      questions: 18,
      difficulty: 'Advanced',
      timeLimit: '30 min',
      completed: false,
      score: null,
      attempts: 0,
      category: 'React'
    }
  ];

  const filteredAvailableCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    console.log('User logged out');
    window.location.href = '/';
  };

  const handleEnrollCourse = (courseId: number) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    // Navigate to course details page instead of direct enrollment
    navigate(`/course/${courseId}/details`);
  };

  const handleContinueCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const handleStartTutorial = (tutorialId: number) => {
    console.log(`Starting tutorial ${tutorialId}`);
    navigate(`/tutorial/${tutorialId}`);
  };

  const handleReadArticle = (articleId: number) => {
    console.log(`Reading article ${articleId}`);
    navigate(`/article/${articleId}`);
  };

  const handleStartQuiz = (quizId: number) => {
    console.log(`Starting quiz ${quizId}`);
    navigate(`/quiz/${quizId}`);
  };

  const handleRetakeQuiz = (quizId: number) => {
    console.log(`Retaking quiz ${quizId}`);
    navigate(`/quiz/${quizId}/retake`);
  };

  const handleBookmarkArticle = (articleId: number) => {
    console.log(`Bookmarking article ${articleId}`);
  };

  const tabItems = [
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'tutorials', label: 'Tutorials', icon: Play },
    { key: 'articles', label: 'Articles', icon: FileText },
    { key: 'quizzes', label: 'Quizzes', icon: Award }
  ];

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
                  Learn • Code • Conquer
                </span>
              </div>
            </div>

            {/* Navigation Tabs - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
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
                  <DropdownMenuItem onClick={() => navigate('/problems')}>
                    <FileCode className="w-4 h-4 mr-2" />
                    Practice
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/quizzes')}>
                    <Award className="w-4 h-4 mr-2" />
                    Quizzes
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* ExpertConnect Dropdown - NEW */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>ExpertConnect</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
                  <DropdownMenuLabel>Connect with Experts</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/expertconnect/seeker')}>
                    <Search className="w-4 h-4 mr-2" />
                    Find Experts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/expertconnect/expert')}>
                    <Video className="w-4 h-4 mr-2" />
                    Expert Dashboard
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

          {/* Mobile Navigation */}
          <div className="lg:hidden pb-4">
            <div className="flex space-x-2 overflow-x-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 whitespace-nowrap"
                  >
                    <Library className="w-4 h-4" />
                    <span>Content</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border shadow-lg z-50">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/expertconnect/seeker')}
                className="flex items-center space-x-1 whitespace-nowrap"
              >
                <Users className="w-4 h-4" />
                <span>ExpertConnect</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard/profile')}
                className="flex items-center space-x-1 whitespace-nowrap"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard/student')}
                className="flex items-center space-x-1 whitespace-nowrap"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Aspirant</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard/recruiter')}
                className="flex items-center space-x-1 whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4" />
                <span>HR Panel</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section with ExpertConnect CTA */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-bounce-in">
            Your Learning Dashboard
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in mb-4" style={{ animationDelay: '0.2s' }}>
            Continue your educational journey with our curated content
          </p>
          
          {/* ExpertConnect Quick Access */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🚀 New: ExpertConnect</h3>
                <p className="text-purple-100 mb-4">Connect with industry experts for personalized mentoring and career guidance</p>
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => navigate('/expertconnect/seeker')}
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    Find Experts
                  </Button>
                  <Button 
                    onClick={() => navigate('/expertconnect/expert')}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    Become Expert
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <Users className="w-24 h-24 text-purple-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'courses' && (
          <>
            {/* Enrolled Courses Section */}
            {isAuthenticated && enrolledCourses.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6 animate-bounce-in">
                  Your Enrolled Courses
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course, index) => (
                    <Card key={course.id} className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg animate-fade-in overflow-hidden hover-lift relative" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="relative overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-600 text-white">
                            Enrolled
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-secondary-500 text-white">
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">By {course.instructor}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleContinueCourse(course.id)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-300"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Enrolled</p>
                      <p className="text-2xl font-bold text-primary">{enrolledCourses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-secondary">1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                      <p className="text-2xl font-bold text-green-600">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                      <p className="text-2xl font-bold text-yellow-600">1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Discover New Courses Section */}
            <section className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0 animate-bounce-in">
                  Discover New Courses
                </h2>
                
                {/* Search Bar */}
                <div className="max-w-md w-full md:w-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors duration-300" />
                    <Input
                      type="text"
                      placeholder="Search courses..."
                      className="pl-10 pr-4 py-3 w-full rounded-full border-2 border-border focus:border-primary transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Available Courses Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAvailableCourses.map((course, index) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    index={index} 
                    isEnrolled={false}
                  />
                ))}
              </div>

              {filteredAvailableCourses.length === 0 && (
                <div className="text-center py-12 animate-fade-in">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* Enhanced Tutorials Section - Same style as courses */}
        {activeTab === 'tutorials' && (
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Interactive Tutorials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card key={tutorial.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in hover-lift" style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={tutorial.image} 
                      alt={tutorial.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/20">
                        {tutorial.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/20">
                        {tutorial.level}
                      </Badge>
                    </div>
                    {tutorial.completed && (
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {tutorial.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{(tutorial.views / 1000).toFixed(1)}k views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{tutorial.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-sm">
                        {tutorial.difficulty}
                      </Badge>
                      <Button 
                        onClick={() => handleStartTutorial(tutorial.id)}
                        className="bg-primary hover:bg-primary/90 transform transition-all duration-200 hover:scale-105"
                        variant={tutorial.completed ? "outline" : "default"}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {tutorial.completed ? 'Watch Again' : 'Start Tutorial'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Articles Section */}
        {activeTab === 'articles' && (
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Latest Articles & Insights</h2>
            <div className="grid gap-6">
              {articles.map((article, index) => (
                <Card key={article.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in cursor-pointer" style={{ animationDelay: `${0.1 * index}s` }} onClick={() => handleReadArticle(article.id)}>
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkArticle(article.id);
                          }}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Star className={`w-4 h-4 ${article.bookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <span>By {article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.publishedDate).toLocaleDateString()}
                        </span>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReadArticle(article.id);
                          }}
                          className="flex items-center space-x-2"
                        >
                          <span>Read Article</span>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Quizzes Section */}
        {activeTab === 'quizzes' && (
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Practice Quizzes & Assessments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {quizzes.map((quiz, index) => (
                <Card key={quiz.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover-lift" style={{ animationDelay: `${0.1 * index}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${quiz.completed ? 'bg-green-100' : 'bg-primary/10'}`}>
                          <Award className={`w-6 h-6 ${quiz.completed ? 'text-green-600' : 'text-primary'}`} />
                        </div>
                        <Badge variant="outline">{quiz.category}</Badge>
                      </div>
                      {quiz.completed && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-green-600">{quiz.score}%</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">{quiz.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{quiz.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="font-medium">{quiz.questions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <Badge variant="outline">{quiz.difficulty}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Time Limit:</span>
                        <div className="flex items-center space-x-1">
                          <Timer className="w-3 h-3" />
                          <span className="font-medium">{quiz.timeLimit}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Attempts:</span>
                        <span className="font-medium">{quiz.attempts}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => quiz.completed ? handleRetakeQuiz(quiz.id) : handleStartQuiz(quiz.id)}
                        variant={quiz.completed ? "outline" : "default"}
                      >
                        {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                      </Button>
                      {quiz.completed && (
                        <Button variant="ghost">
                          View Results
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
