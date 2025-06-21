import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ArrowLeft,
  CheckCircle,
  Award,
  PlayCircle,
  Globe,
  Download,
  Shield
} from 'lucide-react';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock course data - in real app, this would come from API
  const courseData = {
    1: {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn HTML, CSS, and JavaScript from scratch with hands-on projects. This comprehensive course will take you from complete beginner to confident web developer.',
      fullDescription: `This comprehensive course is designed for complete beginners who want to learn web development from the ground up. You'll start with the fundamentals of HTML and CSS, then progress to JavaScript and modern web development practices.

Throughout the course, you'll build real-world projects that you can add to your portfolio. By the end, you'll have the skills and confidence to create your own websites and web applications.

The course includes lifetime access to all materials, regular updates, and a supportive community of fellow learners.`,
      duration: '12 weeks',
      students: 1250,
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
      price: '$99',
      originalPrice: '$149',
      category: 'Programming',
      level: 'Beginner',
      instructor: {
        name: 'John Smith',
        title: 'Senior Web Developer',
        experience: '8+ years experience',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'John is a senior web developer with over 8 years of experience in building modern web applications. He has worked with companies like Google and Microsoft.'
      },
      topics: [
        'HTML5 Fundamentals and Semantic Markup',
        'CSS3 Styling and Responsive Design',
        'JavaScript ES6+ Features and DOM Manipulation',
        'Modern CSS with Flexbox and Grid',
        'JavaScript Frameworks Introduction',
        'Web Development Best Practices',
        'Project Development and Deployment',
        'Performance Optimization Techniques'
      ],
      features: [
        '24/7 Access to Course Materials',
        'Downloadable Resources and Code Examples',
        'Interactive Coding Exercises',
        'Real-world Project Assignments',
        'Certificate of Completion',
        'Community Forum Access',
        '30-day Money-back Guarantee'
      ],
      requirements: [
        'Basic computer skills',
        'No prior programming experience required',
        'Access to a computer with internet connection',
        'Willingness to learn and practice regularly'
      ]
    },
    2: {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master Python, statistics, and machine learning for data analysis.',
      fullDescription: `Dive deep into the world of data science with this comprehensive course covering Python programming, statistical analysis, and machine learning fundamentals.

You'll learn to work with popular libraries like Pandas, NumPy, and Scikit-learn while building real data science projects that solve actual business problems.

Perfect for beginners looking to break into the data science field or professionals wanting to add data skills to their toolkit.`,
      duration: '16 weeks',
      students: 890,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      price: '$149',
      originalPrice: '$199',
      category: 'Data Science',
      level: 'Intermediate',
      instructor: {
        name: 'Dr. Michael Chen',
        title: 'Data Science Lead',
        experience: '10+ years experience',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Dr. Chen is a data science lead with expertise in machine learning and statistical modeling. He holds a PhD in Statistics.'
      },
      topics: [
        'Python Programming for Data Science',
        'Data Manipulation with Pandas',
        'Statistical Analysis and Visualization',
        'Machine Learning Algorithms',
        'Data Cleaning and Preprocessing',
        'Feature Engineering Techniques',
        'Model Evaluation and Selection',
        'Real-world Data Science Projects'
      ],
      features: [
        'Live coding sessions',
        'Real datasets from industry',
        'Jupyter notebook templates',
        'Machine learning project portfolio',
        'Industry-recognized certificate',
        'Job placement assistance',
        'Lifetime updates'
      ],
      requirements: [
        'Basic mathematics knowledge',
        'Some programming experience helpful but not required',
        'Python development environment',
        'Analytical mindset'
      ]
    }
    // Add more courses as needed
  };

  const course = courseData[parseInt(courseId || '1') as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    // In a real app, this would integrate with payment gateway
    console.log(`Purchasing course ${course.id}`);
    // For now, simulate enrollment and redirect to course content
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-foreground">Course Details</h1>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="animate-fade-in">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-primary/10 text-primary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">{course.title}</h1>
                <p className="text-xl text-muted-foreground">{course.description}</p>
              </div>

              {/* Course Stats */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Course Image */}
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Course Description */}
            <Card className="border-none shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {course.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topics Covered */}
            <Card className="border-none shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-none shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className="border-none shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle>Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{course.instructor.name}</h3>
                    <p className="text-primary font-medium">{course.instructor.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">{course.instructor.experience}</p>
                    <p className="text-muted-foreground">{course.instructor.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="border-none shadow-lg sticky top-24 animate-fade-in">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <Badge className="bg-green-100 text-green-800">
                      Save {Math.round(((parseInt(course.originalPrice.slice(1)) - parseInt(course.price.slice(1))) / parseInt(course.originalPrice.slice(1))) * 100)}%
                    </Badge>
                  )}
                </div>

                <Button 
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 text-lg mb-4"
                  size="lg"
                >
                  Buy Now
                </Button>

                <div className="text-center text-sm text-muted-foreground mb-4">
                  30-day money-back guarantee
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">This course includes:</h4>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card className="border-none shadow-lg animate-fade-in">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Course Stats</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Students Enrolled</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium">English</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
