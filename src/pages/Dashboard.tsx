
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Clock, Users, Star, LogOut, User } from 'lucide-react';
import CourseCard from '@/components/CourseCard';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Dashboard Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center animate-gradient hover:animate-pulse-glow transition-all duration-300 group-hover:scale-110">
                <BookOpen className="w-6 h-6 text-white animate-float" />
              </div>
              <span className="text-2xl font-bold text-foreground group-hover:text-primary-600 transition-colors duration-300">
                EduPlatform
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <User className="w-5 h-5" />
                <span>Welcome back!</span>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 hover-lift"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-bounce-in">
            Your Learning Dashboard
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Continue your educational journey with our curated courses
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-600">3</div>
              <p className="text-xs text-muted-foreground">2 in progress</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-600">1</div>
              <p className="text-xs text-muted-foreground">With certificate</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-lift" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">47</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Discovery Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0 animate-bounce-in">
              Discover New Courses
            </h2>
            
            {/* Search Bar */}
            <div className="max-w-md w-full md:w-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary-500 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-3 w-full rounded-full border-2 border-border focus:border-primary-500 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
