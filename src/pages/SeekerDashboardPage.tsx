
import React, { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Filter, Search, Star, MessageSquare, Video, Calendar } from 'lucide-react';

const SeekerDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories (3)',
    'Product Management (1)',
    'Software Engineering (1)',
    'Leadership (1)'
  ];

  const experts = [
    {
      id: 1,
      name: 'Pranita Bajoria',
      title: 'Senior Product Manager at Google',
      rating: 4.9,
      sessions: 150,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=150&h=150&fit=crop&crop=face',
      skills: ['Product Strategy', 'Career Growth'],
      bio: '10+ years in product management at top tech companies. Specialized in...',
      hourlyRate: 125
    },
    {
      id: 2,
      name: 'Aishwarya Srinivasan',
      title: 'Tech Lead at Microsoft',
      rating: 4.8,
      sessions: 200,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      skills: ['Software Engineering'],
      bio: 'Senior software engineer with expertise in distributed systems and team...',
      hourlyRate: 150
    },
    {
      id: 3,
      name: 'Colleen Ballesteros',
      title: 'VP of Engineering at Netflix',
      rating: 5.0,
      sessions: 75,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      skills: ['Engineering Leadership'],
      bio: 'Engineering executive with 15+ years building and scaling high-performanc...',
      hourlyRate: 200
    }
  ];

  const myBookings = [
    {
      id: 1,
      expertName: 'Sarah Johnson',
      topic: 'Product Management Career Transition',
      date: '2024-06-25T14:00:00',
      status: 'confirmed',
      type: 'video_call'
    }
  ];

  return (
    <DashboardWrapper title="Find Experts">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Expert</h1>
          <p className="text-muted-foreground">Connect with industry leaders and accelerate your career growth</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search experts by name, skills, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experts Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={expert.image} alt={expert.name} />
                    <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">{expert.title}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{expert.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {expert.sessions} sessions
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {expert.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {expert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${expert.hourlyRate}/hour</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>Message</span>
                    </Button>
                    <Button size="sm" className="flex items-center space-x-1">
                      <Video className="w-3 h-3" />
                      <span>Book</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Bookings Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {myBookings.length > 0 ? (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{booking.expertName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.expertName}</p>
                        <p className="text-sm text-muted-foreground">{booking.topic}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No bookings yet. Start by connecting with an expert!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rewards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Unlock Rewards</h3>
              <p className="text-muted-foreground">Complete sessions and earn points for exclusive benefits!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default SeekerDashboardPage;
