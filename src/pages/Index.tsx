import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Play, Users, Clock, Star, BookOpen, Award, Zap } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CourseCard from '@/components/CourseCard';
import TestimonialCard from '@/components/TestimonialCard';
import Footer from '@/components/Footer';

const Index = () => {
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
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      content: 'The courses here transformed my career. The interactive quizzes and practical projects made learning enjoyable and effective.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b6e3?w=60&h=60&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Data Analyst',
      content: 'Outstanding quality content and excellent instructor support. I landed my dream job after completing the Data Science course.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      content: 'The flexibility to learn at my own pace while working full-time was perfect. The course content is always up-to-date.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      rating: 5
    }
  ];

  const features = [
    {
      icon: Play,
      title: 'Interactive Video Lectures',
      description: 'High-quality video content with interactive elements and real-time Q&A.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Materials',
      description: 'Access to downloadable resources, code samples, and reading materials.'
    },
    {
      icon: Zap,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with engaging quizzes after each lesson.'
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Earn industry-recognized certificates upon course completion.'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      <div id="home">
        <HeroSection />
      </div>
      
      {/* Features Section */}
      <section id="about" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the most comprehensive and engaging learning experience with cutting-edge technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlights Section */}
      <section id="courses" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover our most popular courses designed by industry experts
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-3 w-full rounded-full border-2 border-gray-200 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied learners who achieved their goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="blog" className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest courses, tips, and educational content
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
            <Button className="bg-white text-primary-600 hover:bg-blue-50 font-semibold px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
