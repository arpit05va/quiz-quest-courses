
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, UserCheck, Users, BarChart3, Clock, Star, Filter, FileText, Calendar, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HRPanelPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: FileText,
      title: 'Job Posting Management',
      description: 'Create, publish, and manage job postings across multiple platforms with ease',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Candidate Screening',
      description: 'Advanced filtering and screening tools to find the perfect candidates quickly',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Recruitment Analytics',
      description: 'Track hiring metrics, analyze recruitment performance, and optimize processes',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Calendar,
      title: 'Interview Scheduling',
      description: 'Streamlined interview scheduling with automated reminders and calendar integration',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MessageCircle,
      title: 'Communication Hub',
      description: 'Centralized communication platform for candidate interactions and team collaboration',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Filter,
      title: 'Smart Filtering',
      description: 'AI-powered candidate matching based on skills, experience, and job requirements',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const hrStats = [
    { label: 'Time Saved', value: '60%', description: 'Faster hiring process' },
    { label: 'Quality Hires', value: '85%', description: 'Better candidate matches' },
    { label: 'Cost Reduction', value: '40%', description: 'Lower recruitment costs' },
    { label: 'Client Satisfaction', value: '95%', description: 'Happy HR teams' }
  ];

  const testimonials = [
    {
      name: 'Jennifer Smith',
      role: 'HR Director at TechCorp',
      content: 'This platform revolutionized our hiring process. We reduced time-to-hire by 50% and found better candidates.',
      rating: 5
    },
    {
      name: 'David Wilson',
      role: 'Talent Acquisition Lead at StartupXYZ',
      content: 'The analytics dashboard gives us incredible insights into our recruitment performance. Highly recommended!',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      role: 'HR Manager at GlobalTech',
      content: 'Candidate screening has never been easier. The smart filtering saves us hours of manual work.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      features: ['Up to 5 job postings', 'Basic candidate screening', 'Email support', 'Standard analytics'],
      recommended: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      features: ['Unlimited job postings', 'Advanced screening tools', 'Priority support', 'Advanced analytics', 'Team collaboration'],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Custom integrations', 'Dedicated account manager', 'Custom analytics', 'White-label solution', 'SLA guarantees'],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Streamline Your Hiring Process
            </h1>
            <p className="text-xl mb-8 text-purple-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Powerful HR tools designed to help you find, screen, and hire the best talent efficiently
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3">
                <UserCheck className="mr-2 h-5 w-5" />
                Start Hiring
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Complete HR Solution</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage your recruitment process from start to finish
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

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Proven Results</h2>
            <p className="text-xl text-muted-foreground">
              See how our platform transforms HR departments worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hrStats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
                  <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                  <p className="text-muted-foreground text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What HR Leaders Say</h2>
            <p className="text-xl text-muted-foreground">
              Trusted by HR professionals at leading companies
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

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              Flexible pricing options to suit your hiring needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`${plan.recommended ? 'border-purple-500 border-2 relative' : ''} hover:shadow-lg transition-all duration-300`}>
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                    Recommended
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-600">
                    {plan.price}
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <UserCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.recommended ? 'bg-purple-600 hover:bg-purple-700' : ''}`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Transform Your Hiring Process Today</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of HR professionals who streamlined their recruitment with our platform
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3">
            Start Free Trial
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HRPanelPage;
