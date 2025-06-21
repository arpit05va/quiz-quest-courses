import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogOut } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from '@/components/ModeToggle';
import { useTheme } from 'next-themes';
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen">
      {children}
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated, setShowLoginDialog } = useAuthCheck();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const storedEnrollments = localStorage.getItem('enrollments');
    if (storedEnrollments) {
      setEnrollments(JSON.parse(storedEnrollments));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowLoginDialog(false);
    navigate('/');
    toast({
      title: "Logged out!",
      description: "You have been successfully logged out.",
    })
  };

  const filterEnrolledCourses = (courses: any[]) => {
    return courses.filter(course => enrollments.some(e => e.courseId === course.id));
  };

  // Enhanced course data with more variety
  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn HTML, CSS, and JavaScript from scratch with hands-on projects.',
      duration: '8 weeks',
      students: 1250,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
      price: '$99',
      category: 'Web Development',
      level: 'Beginner',
      instructor: 'John Smith'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master Python, statistics, and machine learning for data analysis.',
      duration: '12 weeks',
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
      title: 'React & Next.js Complete Guide',
      description: 'Build modern web applications with React, Next.js, and TypeScript.',
      duration: '10 weeks',
      students: 2100,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      price: '$129',
      category: 'Frontend',
      level: 'Advanced',
      instructor: 'Sarah Johnson'
    },
    {
      id: 4,
      title: 'Python for Automation',
      description: 'Automate repetitive tasks and build powerful scripts with Python.',
      duration: '6 weeks',
      students: 756,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop',
      price: '$79',
      category: 'Programming',
      level: 'Beginner',
      instructor: 'Alex Rodriguez'
    },
    {
      id: 5,
      title: 'Digital Marketing Mastery',
      description: 'Learn SEO, social media marketing, and conversion optimization.',
      duration: '8 weeks',
      students: 1450,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      price: '$119',
      category: 'Marketing',
      level: 'Intermediate',
      instructor: 'Emma Davis'
    },
    {
      id: 6,
      title: 'Cloud Computing with AWS',
      description: 'Master cloud architecture and deployment with Amazon Web Services.',
      duration: '14 weeks',
      students: 680,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
      price: '$199',
      category: 'Cloud',
      level: 'Advanced',
      instructor: 'David Kim'
    },
    {
      id: 7,
      title: 'Mobile App Development',
      description: 'Build native iOS and Android apps with React Native.',
      duration: '12 weeks',
      students: 945,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      price: '$159',
      category: 'Mobile',
      level: 'Intermediate',
      instructor: 'Lisa Wang'
    },
    {
      id: 8,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn ethical hacking, network security, and threat analysis.',
      duration: '16 weeks',
      students: 524,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
      price: '$249',
      category: 'Security',
      level: 'Advanced',
      instructor: 'Marcus Thompson'
    },
    {
      id: 9,
      title: 'UI/UX Design Bootcamp',
      description: 'Create stunning user interfaces and optimize user experiences.',
      duration: '10 weeks',
      students: 1680,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop',
      price: '$139',
      category: 'Design',
      level: 'Beginner',
      instructor: 'Sophia Martinez'
    },
    {
      id: 10,
      title: 'Blockchain Development',
      description: 'Build decentralized applications and smart contracts with Solidity.',
      duration: '18 weeks',
      students: 320,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
      price: '$299',
      category: 'Blockchain',
      level: 'Expert',
      instructor: 'Ryan Foster'
    },
    {
      id: 11,
      title: 'Machine Learning with TensorFlow',
      description: 'Deep dive into neural networks and AI model development.',
      duration: '20 weeks',
      students: 412,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
      price: '$349',
      category: 'AI/ML',
      level: 'Expert',
      instructor: 'Dr. Jennifer Lee'
    },
    {
      id: 12,
      title: 'DevOps & CI/CD Pipeline',
      description: 'Master Docker, Kubernetes, and automated deployment strategies.',
      duration: '14 weeks',
      students: 587,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop',
      price: '$189',
      category: 'DevOps',
      level: 'Advanced',
      instructor: 'Carlos Mendez'
    }
  ];

  return (
    <DashboardWrapper>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Sheet>
                  <SheetTrigger className="mr-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:w-1/2 md:w-1/3">
                    <SheetHeader>
                      <SheetTitle>Profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="h-[400px] w-full pr-6">
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="name" className="text-right">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value="shadcn"
                            className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="username" className="text-right">
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            value="@shadcn"
                            className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
                <span className="text-lg font-semibold text-foreground">Dashboard</span>
              </div>
              <div className="space-x-2 flex items-center">
                <ModeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      Profile
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                      <LogOut className="ml-auto h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Enrolled Courses Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Enrolled Courses</h2>
                <p className="text-muted-foreground">Continue your learning journey</p>
              </div>
              <Button
                onClick={() => navigate('/courses')}
                variant="outline"
                className="hidden sm:flex"
              >
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[150px] w-full rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterEnrolledCourses(courses).map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    isEnrolled={true}
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-8 sm:hidden">
              <Button
                onClick={() => navigate('/courses')}
                variant="outline"
                className="w-full"
              >
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Discover Courses Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Discover Courses</h2>
                <p className="text-muted-foreground">Explore our comprehensive course catalog</p>
              </div>
              <Button
                onClick={() => navigate('/courses')}
                variant="outline"
                className="hidden sm:flex"
              >
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.slice(0, 8).map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                  isEnrolled={enrollments.some(e => e.courseId === course.id)}
                />
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Button
                onClick={() => navigate('/courses')}
                variant="outline"
                className="w-full"
              >
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to start learning?</h2>
            <p className="text-muted-foreground text-lg mb-8">Join our community and unlock your potential with our expert-led courses.</p>
            <Button
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-8 text-lg"
            >
              Explore All Courses
            </Button>
          </section>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
