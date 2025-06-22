
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Briefcase, FileText, Users, Clock, Star, Target, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AspirantPanelPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: Search,
      title: 'Smart Job Matching',
      description: 'AI-powered job recommendations based on your skills, experience, and preferences',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'Professional resume templates with industry-specific guidance and tips',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Interview Preparation',
      description: 'Mock interviews, common questions, and expert feedback to boost confidence',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Evaluate your skills and get personalized learning recommendations',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: TrendingUp,
      title: 'Career Analytics',
      description: 'Track your job application progress and career growth metrics',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Calendar,
      title: 'Interview Scheduler',
      description: 'Seamlessly schedule and manage your interviews with integrated calendar',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const jobCategories = [
    { name: 'Software Engineering', jobs: 1250, growth: '+15%' },
    { name: 'Data Science', jobs: 890, growth: '+22%' },
    { name: 'Product Management', jobs: 456, growth: '+18%' },
    { name: 'UI/UX Design', jobs: 678, growth: '+12%' },
    { name: 'Digital Marketing', jobs: 543, growth: '+20%' },
    { name: 'Sales & Business', jobs: 789, growth: '+10%' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer at Google',
      content: 'The interview preparation tools helped me land my dream job. The mock interviews were incredibly realistic!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist at Microsoft',
      content: 'Smart job matching saved me hours of searching. I found the perfect role that matched my skills exactly.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager at Meta',
      content: 'The resume builder and career analytics gave me the edge I needed in a competitive market.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Your Career Journey Starts Here
            </h1>
            <p className="text-xl mb-8 text-blue-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Find your dream job with our AI-powered platform designed specifically for job seekers and career aspirants
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                <Briefcase className="mr-2 h-5 w-5" />
                Explore Jobs
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Build Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Tools for Job Seekers</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to find, apply, and land your next job opportunity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group cursor-pointer border-none shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Popular Job Categories</h2>
            <p className="text-xl text-muted-foreground">
              Explore trending opportunities across various industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {category.growth}
                    </Badge>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{category.jobs} open positions</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who found their dream careers with our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who found their dream careers with our platform
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AspirantPanelPage;
