
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, BookOpen } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Students Enrolled', value: '50,000+' },
    { icon: BookOpen, label: 'Courses Available', value: '500+' },
    { icon: Award, label: 'Certificates Issued', value: '25,000+' },
    { icon: Target, label: 'Success Rate', value: '95%' }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: '/placeholder.svg',
      description: 'Former tech executive with 15+ years in education technology.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Curriculum',
      image: '/placeholder.svg',
      description: 'PhD in Computer Science, expert in developing cutting-edge curricula.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: '/placeholder.svg',
      description: 'Full-stack engineer passionate about building scalable learning platforms.'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Student Success',
      image: '/placeholder.svg',
      description: 'Dedicated to ensuring every student achieves their learning goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About EduPlatform</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize education and make high-quality learning accessible to everyone, 
            everywhere. Our platform combines cutting-edge technology with expert instruction to deliver 
            transformative learning experiences.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To provide world-class education that empowers individuals to achieve their full potential 
                and create meaningful impact in their careers and communities. We believe that learning 
                should be engaging, practical, and accessible to all.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading global platform for skill development and career advancement, 
                bridging the gap between education and industry needs while fostering a community 
                of lifelong learners and innovators.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of students who have transformed their careers with our courses.
          </p>
          <Button size="lg" className="mr-4">
            Browse Courses
          </Button>
          <Button variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
