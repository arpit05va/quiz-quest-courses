
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, Users, Video, Clock, Star, Award, BookOpen, Calendar, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ExpertConnectPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: MessageCircle,
      title: '1-on-1 Mentorship',
      description: 'Connect directly with industry experts for personalized career guidance and advice',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'Schedule video calls with experts for face-to-face career discussions and feedback',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Resume Review',
      description: 'Get professional feedback on your resume from industry veterans',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Learn new skills and technologies from experts in your field of interest',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Network Building',
      description: 'Build valuable professional connections and expand your industry network',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions at your convenience with our easy scheduling system',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const expertCategories = [
    { name: 'Software Engineering', experts: 1250, rating: 4.9 },
    { name: 'Data Science', experts: 890, rating: 4.8 },
    { name: 'Product Management', experts: 456, rating: 4.9 },
    { name: 'UI/UX Design', experts: 678, rating: 4.7 },
    { name: 'Digital Marketing', experts: 543, rating: 4.8 },
    { name: 'Business Strategy', experts: 789, rating: 4.9 }
  ];

  const topExperts = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Senior Software Architect at Google',
      expertise: 'Software Engineering, System Design',
      rating: 4.9,
      reviews: 150,
      price: '$80/hour',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b6e3?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'VP of Product at Meta',
      expertise: 'Product Strategy, Leadership',
      rating: 4.8,
      reviews: 120,
      price: '$100/hour',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Data Scientist at Netflix',
      expertise: 'Machine Learning, Analytics',
      rating: 4.9,
      reviews: 180,
      price: '$90/hour',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Thompson',
      role: 'Software Developer',
      content: 'The career guidance I received was invaluable. My mentor helped me transition from junior to senior developer.',
      rating: 5
    },
    {
      name: 'Jessica Lee',
      role: 'Product Manager',
      content: 'Resume review session was amazing! Got my dream job offer within 2 weeks of implementing the feedback.',
      rating: 5
    },
    {
      name: 'David Kumar',
      role: 'Data Analyst',
      content: 'Expert Connect helped me learn new skills and build a strong professional network in the industry.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Connect with Industry Experts
            </h1>
            <p className="text-xl mb-8 text-green-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Get personalized career guidance, mentorship, and professional advice from experienced industry leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3">
                <MessageCircle className="mr-2 h-5 w-5" />
                Find an Expert
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                Become an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How Expert Connect Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with verified industry experts for personalized career growth and professional development
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

      {/* Expert Categories */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Expert Categories</h2>
            <p className="text-xl text-muted-foreground">
              Find experts across various industries and specializations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertCategories.map((category, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold">{category.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{category.experts} experts available</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Experts */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Experts</h2>
            <p className="text-xl text-muted-foreground">
              Connect with our top-rated industry professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {topExperts.map((expert, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground">{expert.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{expert.expertise}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold mr-2">{expert.rating}</span>
                      <span className="text-xs text-muted-foreground">({expert.reviews} reviews)</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">{expert.price}</div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Connect Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              See how our experts have helped professionals achieve their career goals
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

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to connect with the right expert for your career needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Browse Experts</h3>
              <p className="text-muted-foreground">Search and find experts in your field of interest</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Schedule Session</h3>
              <p className="text-muted-foreground">Book a convenient time for your consultation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Connect & Learn</h3>
              <p className="text-muted-foreground">Have your session and get valuable insights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Achieve Goals</h3>
              <p className="text-muted-foreground">Apply learnings and advance your career</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your Expert Connection Today</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Connect with industry experts and accelerate your career growth with personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3">
              Find Your Expert
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
              Join as Expert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExpertConnectPage;
