
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Play, Users, Clock, Star, BookOpen, Award, Zap, Briefcase, UserCheck, MessageCircle, TrendingUp, Shield, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CourseCard from '@/components/CourseCard';
import TestimonialCard from '@/components/TestimonialCard';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const navigate = useNavigate();
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Auto-scroll features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % enhancedFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

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
    },
    {
      name: 'David Kumar',
      role: 'Product Manager',
      content: 'Excellent platform with real-world projects. The mentorship program helped me transition into tech successfully.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'UX Designer',
      content: 'The design courses are comprehensive and up-to-date with industry standards. Highly recommend!',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
      rating: 5
    }
  ];

  const keyPanels = [
    {
      icon: Briefcase,
      title: 'Aspirant Panel',
      description: 'Find jobs that match your skills, apply easily, and prepare with our interview readiness tools.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop',
      bgGradient: 'from-blue-500 to-cyan-500',
      delay: '0.2s',
      route: '/aspirant-panel'
    },
    {
      icon: UserCheck,
      title: 'HR Panel',
      description: 'Post job openings, screen jobseekers, and streamline your recruitment process efficiently.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
      bgGradient: 'from-purple-500 to-pink-500',
      delay: '0.4s',
      route: '/hr-panel'
    },
    {
      icon: MessageCircle,
      title: 'Expert Connect',
      description: 'Connect with industry experts for career guidance, resume reviews, and mentorship.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop',
      bgGradient: 'from-green-500 to-teal-500',
      delay: '0.6s',
      route: '/expert-connect'
    }
  ];

  const enhancedFeatures = [
    {
      icon: Target,
      title: 'Aspirant Job Tools & Interview Prep',
      description: 'Comprehensive tools for job search and interview preparation'
    },
    {
      icon: TrendingUp,
      title: 'HR Hiring Workflow',
      description: 'Streamlined recruitment process for efficient hiring'
    },
    {
      icon: MessageCircle,
      title: 'Direct Industry Expert Access',
      description: 'Connect directly with experienced professionals'
    },
    {
      icon: Play,
      title: 'Interactive Video Lectures',
      description: 'High-quality video content with interactive elements'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Materials',
      description: 'Access to downloadable resources and code samples'
    },
    {
      icon: Zap,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with engaging quizzes'
    },
    {
      icon: Award,
      title: 'Industry Certificates',
      description: 'Earn recognized certificates upon completion'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and secure learning environment'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow learners and instructors'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Learn at your own pace, anytime, anywhere'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExplorePanel = (route: string) => {
    navigate(route);
  };

  const getVisibleFeatures = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(enhancedFeatures[(currentFeatureIndex + i) % enhancedFeatures.length]);
    }
    return visible;
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentTestimonialIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background particles with parallax */}
      <motion.div 
        style={{ y }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-primary-500/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </motion.div>
      
      <Header />
      
      <div id="home" ref={heroRef}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <HeroSection />
        </motion.div>
      </div>

      {/* Key Panels Feature Highlights Section */}
      <motion.section 
        className="py-20 px-4 bg-muted/20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Explore Our Key Panels</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive platforms designed for aspirants, HR professionals, and industry experts
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {keyPanels.map((panel, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="group cursor-pointer border-none shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-card/80 backdrop-blur-sm h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${panel.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10 text-center">
                    <motion.div 
                      className={`mx-auto w-20 h-20 bg-gradient-to-r ${panel.bgGradient} rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <panel.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary-600 transition-colors duration-300">
                      {panel.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <motion.div 
                      className="mb-6 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={panel.image} 
                        alt={panel.title}
                        className="w-full h-48 object-cover transition-transform duration-500"
                      />
                    </motion.div>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {panel.description}
                    </p>
                    <div className="mt-6 text-center">
                      <Button 
                        onClick={() => handleExplorePanel(panel.route)}
                        className={`bg-gradient-to-r ${panel.bgGradient} hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300`}
                      >
                        Explore Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Enhanced Why Choose Our Platform Section */}
      <motion.section 
        id="about" 
        className="py-20 px-4 bg-background relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide the most comprehensive and engaging learning experience with cutting-edge technology
            </p>
          </motion.div>
          
          <motion.div 
            className="relative max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {getVisibleFeatures().map((feature, index) => (
                <motion.div
                  key={`${feature.title}-${index}`}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden bg-card/90 backdrop-blur-sm h-full">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 animate-shimmer"></div>
                    </div>
                    <CardHeader className="relative z-10">
                      <motion.div 
                        className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary-600 transition-colors duration-300 min-h-[3rem] flex items-center justify-center">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Course Highlights Section */}
      <motion.section 
        id="courses" 
        className="py-20 px-4 bg-muted/30 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Popular Courses</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our most popular courses designed by industry experts
            </p>
            
            <motion.div 
              className="max-w-md mx-auto mb-8"
              variants={scaleIn}
            >
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
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CourseCard course={course} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        id="testimonials" 
        className="py-20 px-4 bg-background relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied learners who achieved their goals
            </p>
          </motion.div>
          
          <motion.div 
            className="relative max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div 
                  key={`${testimonial.name}-${index}`}
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full"
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        id="blog" 
        className="py-20 px-4 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 animate-gradient"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest courses, tips, and educational content
            </p>
          </motion.div>
          <motion.div 
            className="max-w-md mx-auto flex gap-4"
            variants={scaleIn}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20 transition-all duration-300"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white text-primary-600 hover:bg-blue-50 font-semibold px-8 group relative overflow-hidden">
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300"></div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
